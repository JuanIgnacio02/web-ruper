import { notFound }       from 'next/navigation'
import type { Metadata }  from 'next'
import { getProductById } from '@/lib/supabase/queries'
import ProductDetail      from '@/components/product/ProductDetail'

interface Props {
  params: Promise<{ id: string }>
}

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
