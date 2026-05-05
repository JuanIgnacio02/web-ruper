import { notFound }       from 'next/navigation'
import type { Metadata }  from 'next'
import { getProductById, getProducts } from '@/lib/supabase/queries'
import { createBuildClient } from '@/lib/supabase/server'
import ProductDetail      from '@/components/product/ProductDetail'

// ISR: regenera la página en background cada 5 minutos.
// Productos existentes se sirven desde caché estática (TTFB ~50ms).
// Productos nuevos se pre-renderizan en el primer request post-revalidación.
export const revalidate = 300

interface Props {
  params: Promise<{ id: string }>
}

// Pre-renderiza todas las páginas de producto existentes en build time.
// Usa createBuildClient (sin cookies) porque generateStaticParams corre
// en build time, fuera de un request HTTP donde cookies() no está disponible.
export async function generateStaticParams() {
  const supabase = createBuildClient()
  const { data } = await supabase.from('productos').select('id')
  return (data ?? []).map(p => ({ id: String(p.id) }))
}

// React.cache() (en queries.ts) deduplica la query: generateMetadata y
// ProductPage comparten la misma llamada — 1 sola query a Supabase por request.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(Number(id))
  if (!product) return { title: 'Producto no encontrado — RUPER' }
  return {
    title:       `${product.name} — RUPER`,
    description: product.description ?? `${product.name} · ${product.weight ?? ''} · RUPER Malargüe`,
    openGraph:   { images: product.img ? [{ url: product.img }] : [] },
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await getProductById(Number(id))
  if (!product) notFound()
  return <ProductDetail product={product} />
}
