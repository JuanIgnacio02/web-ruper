'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/useToast'
import { formatPrice } from '@/lib/utils'

export default function ProductDetail({ product: p }: { product: Product }) {
  const { add } = useCart()
  const { showToast } = useToast()
  const [added,   setAdded]   = useState(false)
  const [qty,     setQty]     = useState(1)
  const [imgZoom, setImgZoom] = useState(false)

  /* ── GSAP entrance ── */
  useEffect(() => {
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.pd-breadcrumb', { y: -16, opacity: 0, duration: 0.4 })
        .from('.pd-img-wrap',   { x: -70, opacity: 0, duration: 0.75 }, '-=0.2')
        .from('.pd-badge',      { y: -14, opacity: 0, duration: 0.4, ease: 'back.out(2)' }, '-=0.5')
        .from('.pd-brand',      { y: 20,  opacity: 0, duration: 0.4 }, '-=0.3')
        .from('.pd-title',      { y: 30,  opacity: 0, duration: 0.55, ease: 'power4.out' }, '-=0.3')
        .from('.pd-meta span',  { y: 16,  opacity: 0, duration: 0.35, stagger: 0.08 }, '-=0.3')
        .from('.pd-desc',       { y: 20,  opacity: 0, duration: 0.4 }, '-=0.25')
        .from('.pd-spec',       { x: -20, opacity: 0, duration: 0.35, stagger: 0.07 }, '-=0.2')
        .from('.pd-price-box',  { y: 24,  opacity: 0, duration: 0.45, ease: 'back.out(1.5)' }, '-=0.2')
        .from('.pd-atc',        { y: 18,  opacity: 0, duration: 0.4 }, '-=0.25')
        .from('.pd-share',      { y: 14,  opacity: 0, duration: 0.35 }, '-=0.2')
    })
  }, [])

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      add({ name: p.name, price: p.price, emoji: p.emoji, cat: p.subcategory ?? p.category })
    }
    showToast(`${p.emoji} ${p.name.split(' ').slice(0, 3).join(' ')} agregado`, 'ok')
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  const specs = [
    p.raza   && { icon: 'fa-dog',            label: 'Tamaño/Tipo',   value: capitalize(p.raza) },
    p.etapa  && { icon: 'fa-seedling',        label: 'Etapa de vida', value: capitalize(p.etapa) },
    p.linea  && { icon: 'fa-star',            label: 'Línea',         value: capitalize(p.linea.replace(/-/g, ' ')) },
    p.weight && { icon: 'fa-weight-hanging',  label: 'Presentación',  value: p.weight },
    p.flavor && { icon: 'fa-utensils',        label: 'Sabor',         value: p.flavor },
  ].filter(Boolean) as { icon: string; label: string; value: string }[]

  return (
    <div className="min-h-screen pt-24 pb-20" style={{ background: 'var(--light)' }}>
      <div className="max-w-[1160px] mx-auto px-7">

        {/* Breadcrumb */}
        <nav className="pd-breadcrumb flex items-center gap-2 text-[.78rem] text-[var(--gray)] mb-10 flex-wrap">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors flex items-center gap-1">
            <i className="fas fa-home text-[.7rem]" /> Inicio
          </Link>
          <i className="fas fa-chevron-right text-[.6rem] opacity-40" />
          <Link href="/#productos" className="hover:text-[var(--primary)] transition-colors">Productos</Link>
          <i className="fas fa-chevron-right text-[.6rem] opacity-40" />
          <span className="text-[var(--dark)] font-semibold truncate max-w-[240px]">{p.name}</span>
        </nav>

        {/* Main card */}
        <div className="bg-white rounded-[24px] overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* ─── Imagen ─── */}
            <div
              className={`pd-img-wrap relative ${p.bg_class} flex items-center justify-center cursor-zoom-in transition-all`}
              style={{ minHeight: 420, padding: '56px 48px' }}
              onClick={() => p.img && setImgZoom(true)}
            >
              {/* Badge */}
              {p.badge && (
                <div className={`pd-badge absolute top-5 left-5 px-4 py-1.5 rounded-full text-[.68rem] font-black uppercase tracking-wide z-10 shadow-sm ${p.badge_type ?? 'badge-top'}`}>
                  {p.badge}
                </div>
              )}

              {/* Stock indicator */}
              <div
                className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[.7rem] font-bold z-10"
                style={{
                  background: p.stock ? 'rgba(45,106,79,.12)' : 'rgba(239,68,68,.1)',
                  color: p.stock ? '#2D6A4F' : '#EF4444',
                  border: `1px solid ${p.stock ? 'rgba(45,106,79,.2)' : 'rgba(239,68,68,.2)'}`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: p.stock ? '#2D6A4F' : '#EF4444' }}
                />
                {p.stock ? 'En stock' : 'Sin stock'}
              </div>

              {p.img ? (
                <Image
                  src={p.img}
                  alt={p.name}
                  width={380} height={380}
                  className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  priority
                  style={{ maxHeight: 360 }}
                />
              ) : (
                <span className="text-[9rem] drop-shadow-lg hover:scale-105 transition-transform duration-500 block select-none">
                  {p.emoji}
                </span>
              )}

              {p.img && (
                <div
                  className="absolute bottom-4 right-4 flex items-center gap-1.5 text-[.68rem] font-medium px-2.5 py-1 rounded-full pointer-events-none"
                  style={{ background: 'rgba(0,0,0,.28)', color: 'rgba(255,255,255,.8)' }}
                >
                  <i className="fas fa-search-plus text-[.6rem]" /> Ampliar
                </div>
              )}
            </div>

            {/* ─── Info ─── */}
            <div className="flex flex-col p-8 md:p-12">

              {/* Brand */}
              {p.brand && (
                <div className="pd-brand flex items-center gap-2 text-[.72rem] font-bold uppercase tracking-[2px] mb-3" style={{ color: 'var(--primary)' }}>
                  <i className="fas fa-tag text-[.65rem]" /> {p.brand}
                </div>
              )}

              {/* Title */}
              <h1 className="pd-title font-black leading-tight mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: 'var(--dark)' }}>
                {p.name}
              </h1>

              {/* Category chips */}
              <div className="pd-meta flex flex-wrap gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 text-[.72rem] font-semibold px-3 py-1.5 rounded-full capitalize"
                  style={{ background: 'rgba(255,107,53,.08)', color: 'var(--primary)', border: '1px solid rgba(255,107,53,.15)' }}>
                  <i className="fas fa-paw text-[.65rem]" /> {p.category}
                </span>
                {p.subcategory && p.subcategory !== p.category && (
                  <span className="inline-flex items-center gap-1.5 text-[.72rem] font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: 'var(--light)', color: 'var(--dark)', border: '1px solid var(--border)' }}>
                    <i className="fas fa-layer-group text-[.65rem]" style={{ color: 'var(--primary)' }} /> {p.subcategory}
                  </span>
                )}
              </div>

              {/* Description */}
              {p.description && (
                <p className="pd-desc text-[.9rem] leading-relaxed mb-6" style={{ color: 'var(--gray)' }}>
                  {p.description}
                </p>
              )}

              {/* Specs */}
              {specs.length > 0 && (
                <div className="flex flex-col gap-2.5 mb-6">
                  {specs.map(s => (
                    <div key={s.label} className="pd-spec flex items-center gap-3 text-[.85rem]">
                      <div className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(255,107,53,.1)' }}>
                        <i className={`fas ${s.icon} text-[.75rem]`} style={{ color: 'var(--primary)' }} />
                      </div>
                      <span className="min-w-[90px]" style={{ color: 'var(--gray)' }}>{s.label}</span>
                      <span className="font-semibold" style={{ color: 'var(--dark)' }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Features */}
              {p.features && p.features.length > 0 && (
                <ul className="flex flex-col gap-1.5 mb-6">
                  {p.features.map((f, i) => (
                    <li key={i} className="pd-spec flex items-start gap-2 text-[.85rem]" style={{ color: 'var(--dark)' }}>
                      <i className="fas fa-check-circle mt-0.5 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {/* Divider */}
              <div className="border-t mb-6" style={{ borderColor: 'var(--border)' }} />

              {/* Price + qty */}
              <div className="pd-price-box flex items-center justify-between mb-2">
                <div>
                  <div className="text-[.7rem] font-medium mb-1" style={{ color: 'var(--gray)' }}>Precio por unidad</div>
                  <div className="font-black leading-none" style={{ fontSize: '2.2rem', color: 'var(--dark)' }}>
                    <span className="text-[1rem] font-semibold mr-1" style={{ color: 'var(--gray)' }}>$</span>
                    {p.price.toLocaleString('es-AR')}
                  </div>
                </div>

                {/* Qty */}
                <div className="flex items-center gap-3 rounded-[12px] px-3 py-2.5" style={{ background: 'var(--light)' }}>
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-[8px] flex items-center justify-center text-[.85rem] transition-all"
                    style={{ background: 'var(--white)', color: 'var(--dark)', boxShadow: '0 1px 4px rgba(0,0,0,.08)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--primary)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--white)'; (e.currentTarget as HTMLElement).style.color = 'var(--dark)' }}
                  >
                    <i className="fas fa-minus" />
                  </button>
                  <span className="font-bold min-w-[20px] text-center" style={{ color: 'var(--dark)' }}>{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-7 h-7 rounded-[8px] flex items-center justify-center text-[.85rem] transition-all"
                    style={{ background: 'var(--white)', color: 'var(--dark)', boxShadow: '0 1px 4px rgba(0,0,0,.08)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--primary)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--white)'; (e.currentTarget as HTMLElement).style.color = 'var(--dark)' }}
                  >
                    <i className="fas fa-plus" />
                  </button>
                </div>
              </div>

              {qty > 1 && (
                <div className="text-[.8rem] mb-4" style={{ color: 'var(--gray)' }}>
                  Subtotal: <span className="font-bold" style={{ color: 'var(--primary)' }}>{formatPrice(p.price * qty)}</span>
                </div>
              )}

              {/* ATC */}
              <button
                onClick={handleAdd}
                disabled={!p.stock}
                className="pd-atc w-full py-[17px] rounded-[50px] font-bold text-[1rem] flex items-center justify-center gap-2.5 transition-all border-none mb-3"
                style={
                  added
                    ? { background: 'linear-gradient(135deg,#4CAF50,#388E3C)', color: '#fff', boxShadow: '0 6px 22px rgba(76,175,80,.35)' }
                    : p.stock
                      ? { background: 'linear-gradient(135deg,var(--primary),var(--primary-dark))', color: '#fff', boxShadow: '0 6px 22px rgba(255,107,53,.38)', cursor: 'pointer' }
                      : { background: 'var(--border)', color: 'var(--gray)', cursor: 'not-allowed' }
                }
              >
                <i className={`fas ${added ? 'fa-check' : 'fa-shopping-cart'}`} />
                {added ? '¡Agregado al pedido!' : p.stock ? `Agregar${qty > 1 ? ` (×${qty})` : ''} al pedido` : 'Sin stock'}
              </button>

              {/* Share / back */}
              <div className="pd-share flex items-center gap-2.5">
                <Link
                  href="/#productos"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[50px] text-[.85rem] font-semibold transition-all"
                  style={{ color: 'var(--gray)', border: '2px solid var(--border)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLElement).style.color = 'var(--primary)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--gray)' }}
                >
                  <i className="fas fa-arrow-left text-[.75rem]" /> Volver
                </Link>
                <a
                  href={`https://wa.me/2604123456?text=${encodeURIComponent(`Hola RUPER! Me interesa: *${p.name}*${p.weight ? ` (${p.weight})` : ''} — $${p.price.toLocaleString('es-AR')} 🐾`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[50px] text-[.85rem] font-bold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg,#25D366,#128C7E)', boxShadow: '0 4px 16px rgba(37,211,102,.3)' }}
                >
                  <i className="fab fa-whatsapp" /> Consultar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {imgZoom && p.img && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,.88)', backdropFilter: 'blur(8px)' }}
          onClick={() => setImgZoom(false)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all"
            style={{ background: 'rgba(255,255,255,.12)' }}
            onClick={() => setImgZoom(false)}
          >
            <i className="fas fa-times" />
          </button>
          <Image
            src={p.img}
            alt={p.name}
            width={700} height={700}
            className="object-contain rounded-2xl"
            style={{ maxWidth: '90vw', maxHeight: '90vh' }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
