'use client'
import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/useToast'
import { getProductBg } from '@/lib/constants'
import { getOptimizedUrl } from '@/lib/cloudinary'

export default function ProductCard({ product: p }: { product: Product }) {
  const { add }        = useCart()
  const { showToast }  = useToast()
  const [added, setAdded] = useState(false)

  // useCallback: evita que handleAdd sea una nueva función en cada render
  const handleAdd = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    add({ name: p.name, price: p.price, emoji: p.emoji, cat: p.subcategory ?? p.category })
    showToast(`${p.emoji} ${p.name.split(' ').slice(0, 3).join(' ')} agregado`, 'ok')
    setAdded(true)
    setTimeout(() => setAdded(false), 900)
  }, [add, showToast, p])

  const bg = getProductBg(p.bg_class, p.category)

  return (
    <Link
      href={`/producto/${p.id}`}
      className="prod-card-anim group relative bg-white rounded-[var(--radius)] overflow-hidden shadow-[var(--shadow)] hover:-translate-y-2 hover:shadow-[var(--shadow-lg)] transition-[transform,box-shadow] duration-300 flex flex-col h-full active:scale-[.98]"
    >
      {/* Badge */}
      {p.badge && (
        <div className={`absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2.5 py-1 rounded-full text-[.62rem] font-black uppercase tracking-wide z-10 ${p.badge_type ?? 'badge-top'}`}>
          {p.badge}
        </div>
      )}

      {/* Image area */}
      <div
        className="h-[160px] sm:h-[190px] md:h-[210px] flex items-center justify-center overflow-hidden relative"
        style={{ background: bg }}
      >
        {p.img ? (
          <Image
            src={getOptimizedUrl(p.img, 400)}
            alt={p.name}
            width={180}
            height={180}
            // sizes: le dice al browser qué ancho real tendrá la imagen en cada breakpoint.
            // Sin esto, Next.js descarga el tamaño equivocado → LCP lento + datos de más.
            sizes="(max-width: 640px) 160px, (max-width: 768px) 190px, 210px"
            className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <span className="text-[4.5rem] sm:text-[5.5rem] select-none">{p.emoji}</span>
        )}
      </div>

      {/* Info */}
      <div className="px-3.5 pt-3 pb-3.5 sm:px-5 sm:pt-[18px] sm:pb-5 flex flex-col flex-1">
        <div className="prod-cat text-[.6rem] sm:text-[.68rem] font-bold text-[var(--primary)] uppercase tracking-[1.5px] mb-1">
          {p.subcategory ?? p.category}
        </div>
        <h3 className="prod-name font-bold text-[.88rem] sm:text-[.97rem] text-[var(--dark)] leading-tight mb-1 line-clamp-2">
          {p.name}
        </h3>
        <p className="prod-weight text-[.7rem] sm:text-[.76rem] text-[var(--gray)] mb-3">
          {p.weight}{p.flavor ? ` · ${p.flavor}` : ''}
        </p>

        {/* Price + ATC */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="prod-price font-black text-[1.1rem] sm:text-[1.22rem] text-[var(--dark)]">
            <span className="text-[.65rem] sm:text-[.7rem] font-semibold mr-0.5">$</span>
            {p.price.toLocaleString('es-AR')}
          </div>
          <button
            onClick={handleAdd}
            aria-label="Agregar al pedido"
            className="flex items-center justify-center text-white flex-shrink-0 border-none active:scale-90 transition-transform duration-150"
            style={{
              width:        44,
              height:       44,
              minWidth:     44,
              borderRadius: 12,
              fontSize:     '0.9rem',
              background:   added
                ? '#22C55E'
                : 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
              boxShadow:    added
                ? '0 3px 10px rgba(34,197,94,.35)'
                : '0 4px 14px rgba(255,107,53,.32)',
            }}
          >
            <i className={`fas ${added ? 'fa-check' : 'fa-plus'}`} />
          </button>
        </div>
      </div>
    </Link>
  )
}
