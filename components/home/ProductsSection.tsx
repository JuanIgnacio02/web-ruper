'use client'
import { useEffect, useRef } from 'react'
import type { Product, FilterAnimal, ActiveFilter } from '@/types'
import ProductCard from './ProductCard'

const FILTER_BUTTONS: { label: string; value: FilterAnimal }[] = [
  { label: 'Todos',          value: 'all' },
  { label: '🐶 Perros',     value: 'perros' },
  { label: '🐱 Gatos',      value: 'gatos' },
  { label: '🐄 Granja',     value: 'granja' },
  { label: '🎾 Accesorios', value: 'accesorios' },
]

interface Props {
  products: Product[]
  visible:  Product[]
  active:   ActiveFilter
  onFilter: (animal: FilterAnimal) => void
}

export default function ProductsSection({ visible, active, onFilter }: Props) {
  const gridRef = useRef<HTMLDivElement>(null)

  // Animate cards whenever the visible list changes
  useEffect(() => {
    if (!visible.length) return
    import('gsap').then(({ gsap }) => {
      gsap.fromTo(
        '.prod-card-anim',
        { y: 44, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.52, stagger: 0.065, ease: 'back.out(1.35)', clearProps: 'all' }
      )
    })
  }, [visible.length, active.animal])

  return (
    <section id="productos" className="bg-[var(--light)] py-24">
      <div className="max-w-[1300px] mx-auto px-7">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[var(--primary)]/8 text-[var(--primary)] px-[18px] py-2 rounded-full text-[.74rem] font-bold uppercase tracking-[1.5px] mb-3.5">
            <i className="fas fa-box-open" /> Nuestro catálogo
          </div>
          <h2 className="text-[clamp(1.8rem,2.8vw,2.7rem)] font-black text-[var(--dark)] mb-3.5">Productos disponibles</h2>
          <p className="text-[.96rem] text-[var(--gray)] max-w-[580px] mx-auto leading-relaxed">
            Seleccioná tus productos y enviá tu pedido directamente por WhatsApp.
          </p>
        </div>

        {/* Filter bar */}
        <div className="relative mb-10">
          <div className="flex gap-2.5 flex-wrap">
            {FILTER_BUTTONS.map(btn => (
              <button
                key={btn.value}
                onClick={() => onFilter(btn.value)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-[.82rem] font-semibold border-2 transition-all whitespace-nowrap ${
                  active.animal === btn.value
                    ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                    : 'bg-white text-[var(--gray)] border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="prod-grid gap-[22px]"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(255px, 1fr))' }}
        >
          {active.animal === null ? (
            <div className="col-span-full text-center py-20 px-6">
              <div className="text-5xl mb-5 opacity-40">🐶🐱🐄</div>
              <h3 className="text-[1.3rem] font-black text-[var(--dark)] mb-2.5">Seleccioná una categoría</h3>
              <p className="text-[.9rem] text-[var(--gray)] max-w-[400px] mx-auto leading-relaxed">
                Usá el selector de arriba para elegir el tipo de animal y ver los productos disponibles.
              </p>
            </div>
          ) : visible.length === 0 ? (
            <div className="col-span-full text-center py-20 text-[var(--gray)]">
              <i className="fas fa-search text-4xl mb-4 opacity-30 block" />
              <p className="font-medium">No hay productos para este filtro aún.</p>
            </div>
          ) : (
            visible.map(p => (
              <div key={p.id} className="prod-card-anim">
                <ProductCard product={p} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
