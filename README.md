# RUPER — Alimentos Balanceados · Malargüe

Sitio web oficial de RUPER, veterinaria y distribuidora de alimentos balanceados en Malargüe, Mendoza. Permite a los clientes explorar el catálogo, filtrar por tipo de animal y enviar pedidos directamente por WhatsApp.

🌐 **[web-ruper.vercel.app](https://web-ruper.vercel.app)**

---

## Stack

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org) | Framework (App Router, SSR, ISR) |
| [React 19](https://react.dev) | UI |
| [TypeScript](https://www.typescriptlang.org) | Tipado estático |
| [Tailwind CSS 4](https://tailwindcss.com) | Estilos |
| [Supabase](https://supabase.com) | Base de datos (productos) |
| [Cloudinary](https://cloudinary.com) | Hosting y optimización de imágenes |
| [GSAP](https://gsap.com) | Animaciones |
| [Vercel](https://vercel.com) | Deploy |

---

## Funcionalidades

- **Catálogo de productos** con filtros por animal (perros, gatos, granja, accesorios)
- **Selector de animal** con filtros de raza, etapa de vida y línea
- **Carrito de pedido** — envío directo a WhatsApp con resumen
- **Panel de administración** protegido con contraseña para gestionar productos
- **Subida de imágenes** con compresión automática a WebP y remoción de fondo por canvas
- **Optimización automática** de imágenes via Cloudinary CDN
- **Diseño responsive** con navegación mobile dedicada

---

## Variables de entorno

Crear un archivo `.env.local` con:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
ADMIN_PASSWORD=
```

---

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

---

## Deploy

El proyecto se despliega automáticamente en Vercel al hacer push a `main`.

```bash
git push origin main
```
