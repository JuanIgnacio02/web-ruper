'use client'
import type { Product } from '@/types'
import { useFilters } from '@/hooks/useFilters'
import AnimalSelector from './AnimalSelector'
import ProductsSection from './ProductsSection'

export default function HomeClient({ products }: { products: Product[] }) {
  const { active, apply, visible } = useFilters(products)

  return (
    <>
      <AnimalSelector activeAnimal={active.animal} onFilter={apply} />
      <ProductsSection
        products={products}
        visible={visible}
        active={active}
        onFilter={apply}
      />
    </>
  )
}
