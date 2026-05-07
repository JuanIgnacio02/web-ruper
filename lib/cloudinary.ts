import type { CloudinaryUploadResult } from '@/types'

const CLOUD_NAME    = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!

/** Máximo lado en px antes de redimensionar (evita subir imágenes de 4K a Cloudinary) */
const MAX_PX  = 1200
/** Calidad WebP de salida (0.82 = excelente equilibrio calidad/tamaño) */
const QUALITY = 0.82

/** Calcula dimensiones finales respetando aspect ratio, sin superar MAX_PX en ningún lado */
function resizeToMax(
  naturalWidth: number,
  naturalHeight: number,
  maxPx = MAX_PX
): { w: number; h: number } {
  if (naturalWidth <= maxPx && naturalHeight <= maxPx) {
    return { w: naturalWidth, h: naturalHeight }
  }
  const ratio = Math.min(maxPx / naturalWidth, maxPx / naturalHeight)
  return {
    w: Math.round(naturalWidth  * ratio),
    h: Math.round(naturalHeight * ratio),
  }
}

/** Convierte cualquier imagen a WebP via Canvas, redimensionando si supera MAX_PX */
export function convertToWebP(file: File, quality = QUALITY): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img       = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      const { w, h } = resizeToMax(img.naturalWidth, img.naturalHeight)
      const canvas    = document.createElement('canvas')
      canvas.width    = w
      canvas.height   = h
      canvas.getContext('2d')!.drawImage(img, 0, 0, w, h)
      URL.revokeObjectURL(objectUrl)
      canvas.toBlob(
        blob => blob ? resolve(blob) : reject(new Error('No se pudo convertir a WebP')),
        'image/webp',
        quality
      )
    }
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('No se pudo cargar la imagen')) }
    img.src = objectUrl
  })
}

/** Remueve el fondo via BFS flood-fill desde los bordes y exporta en WebP.
 *  Redimensiona antes del BFS para evitar freezes en el main thread con fotos grandes. */
export function removeBackgroundCanvas(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img       = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      const { w: width, h: height } = resizeToMax(img.naturalWidth, img.naturalHeight)
      const canvas = document.createElement('canvas')
      canvas.width  = width
      canvas.height = height
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!
      ctx.drawImage(img, 0, 0, width, height)
      URL.revokeObjectURL(objectUrl)

      const imageData = ctx.getImageData(0, 0, width, height)
      const d = imageData.data

      const px = (x: number, y: number) => {
        const i = (y * width + x) * 4
        return [d[i], d[i + 1], d[i + 2]] as [number, number, number]
      }

      const corners = [px(0, 0), px(width - 1, 0), px(0, height - 1), px(width - 1, height - 1)]
      const bg = corners
        .reduce((a, c) => [a[0] + c[0], a[1] + c[1], a[2] + c[2]] as [number, number, number], [0, 0, 0] as [number, number, number])
        .map(v => v / 4)

      const threshold = 45

      const dist = (x: number, y: number) => {
        const i = (y * width + x) * 4
        return Math.sqrt((d[i] - bg[0]) ** 2 + (d[i + 1] - bg[1]) ** 2 + (d[i + 2] - bg[2]) ** 2)
      }

      const visited = new Uint8Array(width * height)
      const queue: number[] = []
      for (let x = 0; x < width; x++)  { queue.push(x, 0); queue.push(x, height - 1) }
      for (let y = 1; y < height - 1; y++) { queue.push(0, y); queue.push(width - 1, y) }

      let qi = 0
      while (qi < queue.length) {
        const x = queue[qi++], y = queue[qi++]
        if (x < 0 || x >= width || y < 0 || y >= height) continue
        const idx = y * width + x
        if (visited[idx]) continue
        visited[idx] = 1
        if (dist(x, y) > threshold) continue
        d[idx * 4 + 3] = 0
        queue.push(x - 1, y, x + 1, y, x, y - 1, x, y + 1)
      }

      ctx.putImageData(imageData, 0, 0)
      canvas.toBlob(
        blob => blob ? resolve(blob) : reject(new Error('Error al procesar imagen')),
        'image/webp',
        QUALITY
      )
    }

    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('No se pudo cargar la imagen')) }
    img.src = objectUrl
  })
}

/** Sube un archivo a Cloudinary y retorna la URL pública */
export function uploadToCloudinary(
  file: File,
  onProgress?: (pct: number) => void
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)

    const xhr = new XMLHttpRequest()
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`)

    if (onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const res = JSON.parse(xhr.responseText)
        resolve({ url: res.secure_url, publicId: res.public_id })
      } else {
        reject(new Error(`Cloudinary error ${xhr.status}`))
      }
    }
    xhr.onerror = () => reject(new Error('Error de red al subir imagen'))
    xhr.send(formData)
  })
}

/**
 * Transforma una URL de Cloudinary para entregar la imagen optimizada:
 * webp automático, calidad auto, limitada a `width` px de ancho.
 *
 * @example
 * getOptimizedUrl(product.img, 800)
 * // .../upload/w_800,f_auto,q_auto,c_limit/...
 */
export function getOptimizedUrl(url: string | null | undefined, width = 800): string {
  if (!url) return ''
  if (!url.includes('res.cloudinary.com')) return url
  return url.replace('/upload/', `/upload/w_${width},f_auto,q_auto,c_limit/`)
}
