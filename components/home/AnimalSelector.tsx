'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { AnimalCategory, FilterAnimal, ProductFilters } from '@/types'

interface Props {
  activeAnimal: FilterAnimal | null
  onFilter: (animal: FilterAnimal, filters?: ProductFilters) => void
}

const EMPTY: ProductFilters = { raza: '', etapa: '', linea: '' }

const PANELS = [
  {
    animal:  'perros' as AnimalCategory,
    label:   'PERROS',
    emoji:   '🐶',
    bg:      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=900&q=80&fit=crop',
    overlay: 'linear-gradient(160deg,rgba(255,107,53,.72) 0%,rgba(217,90,40,.60) 100%)',
    overlayInactive: 'rgba(10,10,20,.55)',
    filters: [
      { key: 'raza'  as keyof ProductFilters, label: 'Tamaño de Raza',   options: [{ v: 'pequeña', l: 'Pequeñas' },    { v: 'mediana', l: 'Medianas' },      { v: 'grande', l: 'Grandes' }] },
      { key: 'etapa' as keyof ProductFilters, label: 'Etapa de vida',    options: [{ v: 'cachorro', l: 'Cachorros' },   { v: 'adulto',  l: 'Adultos' },       { v: 'senior', l: 'Senior' }] },
      { key: 'linea' as keyof ProductFilters, label: 'Línea',            options: [{ v: 'economica', l: 'Económica' }, { v: 'premium', l: 'Premium' },       { v: 'super-premium', l: 'Super Premium' }] },
    ],
  },
  {
    animal:  'gatos' as AnimalCategory,
    label:   'GATOS',
    emoji:   '🐱',
    bg:      'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=900&q=80&fit=crop',
    overlay: 'linear-gradient(160deg,rgba(124,58,237,.72) 0%,rgba(91,33,182,.60) 100%)',
    overlayInactive: 'rgba(10,10,20,.55)',
    filters: [
      { key: 'raza'  as keyof ProductFilters, label: 'Tipo de gato',    options: [{ v: 'interior', l: 'Interior' },   { v: 'exterior', l: 'Exterior' },     { v: 'castrado', l: 'Castrado' }] },
      { key: 'etapa' as keyof ProductFilters, label: 'Etapa de vida',   options: [{ v: 'cachorro', l: 'Gatito' },     { v: 'adulto',   l: 'Adulto' },       { v: 'senior',   l: 'Senior' }] },
      { key: 'linea' as keyof ProductFilters, label: 'Línea',           options: [{ v: 'economica', l: 'Económica' }, { v: 'premium',  l: 'Premium' },      { v: 'super-premium', l: 'Super Premium' }] },
    ],
  },
  {
    animal:  'granja' as AnimalCategory,
    label:   'GRANJA',
    emoji:   '🐄',
    bg:      'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80&fit=crop',
    overlay: 'linear-gradient(160deg,rgba(45,106,79,.72) 0%,rgba(29,74,54,.60) 100%)',
    overlayInactive: 'rgba(10,10,20,.55)',
    filters: [
      { key: 'raza'  as keyof ProductFilters, label: 'Especie',            options: [{ v: 'equinos', l: 'Equinos' }, { v: 'bovinos', l: 'Bovinos' }, { v: 'porcinos', l: 'Porcinos' }, { v: 'ovinos', l: 'Ovinos' }, { v: 'aves', l: 'Aves de corral' }] },
      { key: 'etapa' as keyof ProductFilters, label: 'Etapa / Propósito',  options: [{ v: 'crecimiento', l: 'Crecimiento' }, { v: 'mantenimiento', l: 'Mantenimiento' }, { v: 'postura', l: 'Postura / Producción' }] },
      { key: 'linea' as keyof ProductFilters, label: 'Presentación',       options: [{ v: 'pellet', l: 'Pellet' }, { v: 'extrusado', l: 'Extrusado' }, { v: 'harinas', l: 'Harinas' }] },
    ],
  },
]

export default function AnimalSelector({ activeAnimal, onFilter }: Props) {
  const [expanded, setExpanded] = useState<AnimalCategory>('perros')
  const [selects, setSelects]   = useState<Record<AnimalCategory, ProductFilters>>({
    perros: { ...EMPTY }, gatos: { ...EMPTY }, granja: { ...EMPTY },
    aves: { ...EMPTY }, 'pequeños': { ...EMPTY }, peces: { ...EMPTY }, accesorios: { ...EMPTY },
  })

  /* Sync with filter bar */
  useEffect(() => {
    if (activeAnimal && activeAnimal !== 'all') setExpanded(activeAnimal as AnimalCategory)
  }, [activeAnimal])

  /* GSAP scroll animation */
  useEffect(() => {
    let ctx: ReturnType<typeof import('gsap')['gsap']['context']> | undefined
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        gsap.from('.as-panel', {
          scrollTrigger: { trigger: '.animal-selector', start: 'top 82%', once: true },
          y: 80, duration: 0.75, stagger: 0.18, ease: 'power3.out', clearProps: 'transform',
        })
      })
    })
    return () => ctx?.revert()
  }, [])

  const setSelect = (animal: AnimalCategory, key: keyof ProductFilters, value: string) =>
    setSelects(prev => ({ ...prev, [animal]: { ...prev[animal], [key]: value } }))

  const handleVerProductos = (animal: AnimalCategory) => {
    onFilter(animal, selects[animal])
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="categorias" className="animal-selector" style={{ background: 'var(--dark-2)' }}>

      {/* ─── Mobile accordion ───────────────────────────────────────── */}
      <div className="block md:hidden">

        {/* Header */}
        <div style={{ textAlign: 'center', padding: '52px 20px 36px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,107,53,.12)', color: 'var(--primary-light)',
            border: '1px solid rgba(255,107,53,.2)', padding: '7px 16px',
            borderRadius: '50px', fontSize: '.7rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '14px',
          }}>
            <i className="fas fa-paw" /> Buscá por mascota
          </div>
          <h2 style={{ fontSize: '1.65rem', fontWeight: 900, color: '#fff', marginBottom: '10px', lineHeight: 1.2 }}>
            ¿Para quién es el alimento?
          </h2>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '.875rem', lineHeight: 1.65, maxWidth: 320, margin: '0 auto' }}>
            Tocá la categoría y encontrá el producto ideal.
          </p>
        </div>

        {/* Accordion cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '0 14px 48px' }}>
          {PANELS.map(panel => {
            const isActive = expanded === panel.animal

            return (
              <div
                key={panel.animal}
                className="as-panel"
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'box-shadow 0.3s ease',
                  boxShadow: isActive ? '0 12px 40px rgba(0,0,0,.45)' : '0 4px 16px rgba(0,0,0,.25)',
                }}
              >
                {/* Header row — always visible, tap to toggle */}
                <button
                  onClick={() => setExpanded(panel.animal)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '0 18px',
                    height: 72,
                    position: 'relative',
                    overflow: 'hidden',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                  aria-expanded={isActive}
                >
                  {/* Background image */}
                  <Image
                    src={panel.bg}
                    alt={panel.label}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="100vw"
                    quality={75}
                  />

                  {/* Overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: isActive ? panel.overlay : 'rgba(10,10,20,.62)',
                    transition: 'background 0.4s ease',
                    zIndex: 1,
                  }} />

                  {/* Emoji */}
                  <span style={{
                    fontSize: '2rem',
                    position: 'relative', zIndex: 2,
                    lineHeight: 1,
                    flexShrink: 0,
                    filter: isActive ? 'none' : 'saturate(.4)',
                    transition: 'filter 0.4s ease',
                  }}>
                    {panel.emoji}
                  </span>

                  {/* Label */}
                  <span style={{
                    flex: 1,
                    position: 'relative', zIndex: 2,
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: '1.1rem',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    textShadow: '0 2px 8px rgba(0,0,0,.3)',
                  }}>
                    {panel.label}
                  </span>

                  {/* Chevron */}
                  <i
                    className="fas fa-chevron-down"
                    style={{
                      position: 'relative', zIndex: 2,
                      color: 'rgba(255,255,255,.8)',
                      fontSize: '0.85rem',
                      flexShrink: 0,
                      transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.35s cubic-bezier(.4,0,.2,1)',
                    }}
                  />
                </button>

                {/* Expandable content */}
                <div style={{
                  maxHeight: isActive ? 600 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.45s cubic-bezier(.4,0,.2,1)',
                }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.04)',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    padding: '20px 18px 22px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                  }}>
                    {panel.filters.map(f => (
                      <div key={f.key}>
                        <label style={{
                          display: 'block',
                          color: 'rgba(255,255,255,.7)',
                          fontSize: '.7rem',
                          fontWeight: 700,
                          letterSpacing: '.8px',
                          marginBottom: 7,
                          textTransform: 'uppercase',
                        }}>
                          {f.label}:
                        </label>
                        <div style={{ position: 'relative' }}>
                          <select
                            value={selects[panel.animal][f.key]}
                            onChange={e => setSelect(panel.animal, f.key, e.target.value)}
                            style={{
                              width: '100%',
                              background: 'rgba(255,255,255,.1)',
                              border: '1.5px solid rgba(255,255,255,.2)',
                              borderRadius: 14,
                              padding: '12px 42px 12px 16px',
                              color: '#fff',
                              fontSize: '.85rem',
                              fontWeight: 500,
                              appearance: 'none',
                              WebkitAppearance: 'none',
                              cursor: 'pointer',
                              outline: 'none',
                              minHeight: 46,
                            }}
                          >
                            <option value="" style={{ background: '#1B1B2F', color: '#fff' }}>Todos</option>
                            {f.options.map(o => (
                              <option key={o.v} value={o.v} style={{ background: '#1B1B2F', color: '#fff' }}>{o.l}</option>
                            ))}
                          </select>
                          <i className="fas fa-chevron-down" style={{
                            position: 'absolute', right: 14, top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'rgba(255,255,255,.55)', fontSize: '.7rem',
                            pointerEvents: 'none',
                          }} />
                        </div>
                      </div>
                    ))}

                    {/* CTA */}
                    <button
                      onClick={() => handleVerProductos(panel.animal)}
                      style={{
                        background: '#fff',
                        color: 'var(--dark)',
                        border: 'none',
                        borderRadius: 14,
                        height: 50,
                        fontSize: '.9rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                        cursor: 'pointer',
                        marginTop: 4,
                        boxShadow: '0 4px 16px rgba(0,0,0,.2)',
                        width: '100%',
                      }}
                    >
                      Ver Productos <i className="fas fa-arrow-right" style={{ fontSize: '.8rem' }} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ─── Desktop horizontal panels ──────────────────────────────── */}
      <div className="hidden md:block">
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '70px 28px 50px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,107,53,.12)', color: 'var(--primary-light)',
            border: '1px solid rgba(255,107,53,.2)', padding: '8px 18px',
            borderRadius: '50px', fontSize: '.74rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '16px',
          }}>
            <i className="fas fa-paw" /> Buscá por mascota
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem,2.8vw,2.7rem)', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>
            ¿Para quién es el alimento?
          </h2>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '.96rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
            Seleccioná la categoría, ajustá los filtros y encontrá el producto ideal para tu animal.
          </p>
        </div>

        {/* Panels */}
        <div className="as-panels" style={{ display: 'flex', minHeight: '580px' }}>
          {PANELS.map(panel => {
            const isActive = expanded === panel.animal

            return (
              <div
                key={panel.animal}
                className="as-panel"
                onClick={() => !isActive && setExpanded(panel.animal)}
                style={{
                  position: 'relative',
                  cursor: isActive ? 'default' : 'pointer',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: isActive ? '2.2' : '0.9',
                  filter: isActive ? 'none' : 'saturate(.25) brightness(.75)',
                  transition: 'flex .55s cubic-bezier(.4,0,.2,1), filter .55s ease',
                }}
              >
                {/* Background image */}
                <Image
                  src={panel.bg}
                  alt={panel.label}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={75}
                />

                {/* Color overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: isActive ? panel.overlay : 'rgba(10,10,20,.55)',
                  transition: 'background .5s ease',
                  zIndex: 1,
                }} />

                {/* Bottom fade */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px',
                  background: 'linear-gradient(to top,rgba(0,0,0,.5),transparent)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }} />

                {/* Content */}
                <div
                  onClick={e => isActive && e.stopPropagation()}
                  style={{
                    position: 'relative', zIndex: 2,
                    display: 'flex', flexDirection: 'column',
                    alignItems: isActive ? 'flex-start' : 'center',
                    padding: '48px 40px',
                    width: '100%', maxWidth: '380px',
                    opacity: isActive ? 1 : 0.55,
                    transform: isActive ? 'scale(1)' : 'scale(.95)',
                    transition: 'opacity .4s ease, transform .4s ease',
                  }}
                >
                  {!isActive && (
                    <span style={{ fontSize: '2.8rem', marginBottom: '12px', display: 'block' }}>
                      {panel.emoji}
                    </span>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                    <div style={{
                      width: '28px', height: '28px',
                      border: isActive ? '2.5px solid #fff' : '2.5px solid rgba(255,255,255,.7)',
                      borderRadius: '4px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isActive ? 'rgba(255,255,255,.2)' : 'transparent',
                      transition: 'all .3s ease', flexShrink: 0,
                    }}>
                      <i className="fas fa-check" style={{
                        color: '#fff', fontSize: '.85rem',
                        opacity: isActive ? 1 : 0,
                        transform: isActive ? 'scale(1)' : 'scale(0)',
                        transition: 'opacity .25s ease, transform .3s cubic-bezier(.34,1.56,.64,1)',
                      }} />
                    </div>
                    <div>
                      {isActive && (
                        <span style={{
                          display: 'block', fontFamily: "'Fredoka One', sans-serif",
                          fontSize: '.85rem', letterSpacing: '5px', textTransform: 'uppercase',
                          opacity: .75, marginBottom: '5px', color: '#fff', lineHeight: 1,
                        }}>
                          RUPER
                        </span>
                      )}
                      <h3 style={{
                        fontSize: isActive ? '2.4rem' : '1.2rem',
                        fontWeight: 900, color: '#fff',
                        letterSpacing: '4px', textTransform: 'uppercase',
                        textShadow: '0 2px 12px rgba(0,0,0,.25)',
                        lineHeight: 1.1, margin: 0,
                        transition: 'font-size .4s ease',
                      }}>
                        {panel.label}
                      </h3>
                    </div>
                  </div>

                  {isActive && (
                    <div style={{
                      display: 'flex', flexDirection: 'column', gap: '14px',
                      marginTop: '24px', width: '100%',
                      animation: 'fadeUp .35s ease .15s both',
                    }}>
                      {panel.filters.map(f => (
                        <div key={f.key}>
                          <label style={{
                            display: 'block', color: 'rgba(255,255,255,.82)',
                            fontSize: '.76rem', fontWeight: 600, letterSpacing: '.5px',
                            marginBottom: '6px', textTransform: 'uppercase',
                          }}>
                            {f.label}:
                          </label>
                          <div style={{ position: 'relative' }}>
                            <select
                              value={selects[panel.animal][f.key]}
                              onChange={e => setSelect(panel.animal, f.key, e.target.value)}
                              style={{
                                width: '100%',
                                background: 'rgba(255,255,255,.12)',
                                border: '1.5px solid rgba(255,255,255,.25)',
                                borderRadius: '50px',
                                padding: '11px 42px 11px 18px',
                                color: '#fff',
                                fontSize: '.82rem', fontWeight: 500,
                                appearance: 'none', WebkitAppearance: 'none',
                                cursor: 'pointer',
                                outline: 'none',
                              }}
                            >
                              <option value="" style={{ background: '#1B1B2F', color: '#fff' }}>Seleccionar</option>
                              {f.options.map(o => (
                                <option key={o.v} value={o.v} style={{ background: '#1B1B2F', color: '#fff' }}>{o.l}</option>
                              ))}
                            </select>
                            <i className="fas fa-chevron-down" style={{
                              position: 'absolute', right: '16px', top: '50%',
                              transform: 'translateY(-50%)',
                              color: 'rgba(255,255,255,.6)', fontSize: '.75rem',
                              pointerEvents: 'none',
                            }} />
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={() => handleVerProductos(panel.animal)}
                        style={{
                          background: '#fff', color: 'var(--dark)',
                          border: 'none', borderRadius: '50px',
                          padding: '14px 28px',
                          fontSize: '.9rem', fontWeight: 700,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                          cursor: 'pointer', marginTop: '6px',
                          boxShadow: '0 4px 20px rgba(0,0,0,.18)',
                          width: '100%', transition: 'transform .3s ease, box-shadow .3s ease',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'
                          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(0,0,0,.25)'
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(0,0,0,.18)'
                        }}
                      >
                        Ver Productos <i className="fas fa-arrow-right" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </section>
  )
}
