'use client'
import { useState, useCallback, useMemo } from 'react'
import type { FilterAnimal, ProductFilters, ActiveFilter, Product } from '@/types'

const EMPTY_FILTERS: ProductFilters = { raza: '', etapa: '', linea: '' }

export function useFilters(products: Product[]) {
  const [active, setActive] = useState<ActiveFilter>({ animal: null, filters: EMPTY_FILTERS })

  const apply = useCallback((animal: FilterAnimal, filters: ProductFilters = EMPTY_FILTERS) => {
    setActive({ animal, filters })
  }, [])

  const reset = useCallback(() => {
    setActive({ animal: null, filters: EMPTY_FILTERS })
  }, [])

  // useMemo: evita recalcular la lista visible en cada render.
  // Solo se recalcula cuando cambian products, animal, o los filtros individuales.
  const visible = useMemo(() => {
    if (active.animal === null) return []
    return products.filter(p => {
      if (active.animal !== 'all' && p.category !== active.animal) return false
      if (active.filters.raza  && p.raza  && p.raza  !== active.filters.raza)  return false
      if (active.filters.etapa && p.etapa && p.etapa !== active.filters.etapa) return false
      if (active.filters.linea && p.linea && p.linea !== active.filters.linea) return false
      return true
    })
  }, [products, active.animal, active.filters.raza, active.filters.etapa, active.filters.linea])

  return { active, apply, reset, visible }
}
