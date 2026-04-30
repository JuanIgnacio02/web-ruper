'use client'
import { useState, useEffect } from 'react'
import type { AnimalCategory, FilterAnimal, ProductFilters } from '@/types'

interface Props {
  activeAnimal: FilterAnimal | null
  onFilter: (animal: FilterAnimal, filters?: ProductFilters) => void
}

const EMPTY: ProductFilters = { raza: '', etapa: '', linea: '' }

const PANELS = [
  {
    animal: 'perros' as AnimalCategory,
    label: 'PERROS', emoji: '🐶',
    bg: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=900&q=80&fit=crop',
    /* gradient overlay activo — tono cálido naranja */
    overlayActive:   'bg-gradient-to-t from-[#1B1B2F]/90 via-[#FF6B35]/30 to-transparent',
    overlayInactive: 'bg-gradient-to-t from-[#1B1B2F]/80 via-black/50 to-black/30',
    accentColor: 'var(--primary)',
    filters: [
      { key: 'raza'  as keyof ProductFilters, label: 'Tamaño de Raza', options: [{ v: 'pequeña', l: 'Pequeñas' }, { v: 'mediana', l: 'Medianas' }, { v: 'grande', l: 'Grandes' }] },
      { key: 'etapa' as keyof ProductFilters, label: 'Etapa de vida',   options: [{ v: 'cachorro', l: 'Cachorros' }, { v: 'adulto', l: 'Adultos' }, { v: 'senior', l: 'Senior' }] },
      { key: 'linea' as keyof ProductFilters, label: 'Línea',           options: [{ v: 'economica', l: 'Económica' }, { v: 'premium', l: 'Premium' }, { v: 'super-premium', l: 'Super Premium' }] },
    ],
  },
  {
    animal: 'gatos' as AnimalCategory,
    label: 'GATOS', emoji: '🐱',
    bg: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=900&q=80&fit=crop',
    /* gradient overlay activo — tono violeta */
    overlayActive:   'bg-gradient-to-t from-[#1B1B2F]/90 via-[#7C3AED]/25 to-transparent',
    overlayInactive: 'bg-gradient-to-t from-[#1B1B2F]/80 via-black/50 to-black/30',
    accentColor: '#A78BFA',
    filters: [
      { key: 'raza'  as keyof ProductFilters, label: 'Tipo de gato',   options: [{ v: 'interior', l: 'Interior' }, { v: 'exterior', l: 'Exterior' }, { v: 'castrado', l: 'Castrado' }] },
      { key: 'etapa' as keyof ProductFilters, label: 'Etapa de vida',  options: [{ v: 'cachorro', l: 'Gatito' }, { v: 'adulto', l: 'Adulto' }, { v: 'senior', l: 'Senior' }] },
      { key: 'linea' as keyof ProductFilters, label: 'Línea',          options: [{ v: 'economica', l: 'Económica' }, { v: 'premium', l: 'Premium' }, { v: 'super-premium', l: 'Super Premium' }] },
    ],
  },
  {
    animal: 'granja' as AnimalCategory,
    label: 'GRANJA', emoji: '🐄',
    bg: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=900&q=80&fit=crop',
    /* gradient overlay activo — tono verde */
    overlayActive:   'bg-gradient-to-t from-[#1B1B2F]/90 via-[#2D6A4F]/35 to-transparent',
    overlayInactive: 'bg-gradient-to-t from-[#1B1B2F]/80 via-black/50 to-black/30',
    accentColor: '#6EE7B7',
    filters: [
      { key: 'raza'  as keyof ProductFilters, label: 'Especie',           options: [{ v: 'equinos', l: 'Equinos' }, { v: 'bovinos', l: 'Bovinos' }, { v: 'porcinos', l: 'Porcinos' }, { v: 'ovinos', l: 'Ovinos' }, { v: 'aves', l: 'Aves de corral' }] },
      { key: 'etapa' as keyof ProductFilters, label: 'Etapa / Propósito', options: [{ v: 'crecimiento', l: 'Crecimiento' }, { v: 'mantenimiento', l: 'Mantenimiento' }, { v: 'postura', l: 'Postura / Producción' }] },
      { key: 'linea' as keyof ProductFilters, label: 'Presentación',      options: [{ v: 'pellet', l: 'Pellet' }, { v: 'extrusado', l: 'Extrusado' }, { v: 'harinas', l: 'Harinas' }] },
    ],
  },
]

export default function AnimalSelector({ activeAnimal, onFilter }: Props) {
  const [expanded, setExpanded] = useState<AnimalCategory>('perros')
  const [selects, setSelects]   = useState<Record<AnimalCategory, ProductFilters>>({
    perros:      { ...EMPTY },
    gatos:       { ...EMPTY },
    granja:      { ...EMPTY },
    aves:        { ...EMPTY },
    'pequeños':  { ...EMPTY },
    peces:       { ...EMPTY },
    accesorios:  { ...EMPTY },
  })

  useEffect(() => {
    if (activeAnimal && activeAnimal !== 'all') setExpanded(activeAnimal as AnimalCategory)
  }, [activeAnimal])

  useEffect(() => {
    import('gsap').then(async ({ gsap }) => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsap.from('.as-panel-item', {
        scrollTrigger: { trigger: '.as-panels-wrap', start: 'top 82%', once: true },
        y: 60, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out', clearProps: 'all',
      })
    })
  }, [])

  const setSelect = (animal: AnimalCategory, key: keyof ProductFilters, value: string) =>
    setSelects(prev => ({ ...prev, [animal]: { ...prev[animal], [key]: value } }))

  const handleVerProductos = (animal: AnimalCategory) => {
    onFilter(animal, selects[animal])
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="categorias" className="bg-[var(--dark)]">
      {/* Header */}
      <div className="text-center pt-16 pb-10 px-7">
        <div className="inline-flex items-center gap-2 bg-[var(--primary)]/15 text-[var(--primary-light)] border border-[var(--primary)]/20 px-[18px] py-2 rounded-full text-[.74rem] font-bold uppercase tracking-[1.5px] mb-4">
          <i className="fas fa-paw" /> Buscá por mascota
        </div>
        <h2 className="text-[clamp(1.8rem,2.8vw,2.7rem)] font-black text-white mb-3">¿Para quién es el alimento?</h2>
        <p className="text-white/50 text-[.96rem] max-w-[540px] mx-auto leading-relaxed">
          Seleccioná la categoría, ajustá los filtros y encontrá el producto ideal para tu animal.
        </p>
      </div>

      {/* Panels */}
      <div className="as-panels-wrap flex flex-col md:flex-row min-h-[540px]">
        {PANELS.map(panel => {
          const isActive = expanded === panel.animal

          return (
            <div
              key={panel.animal}
              onClick={() => setExpanded(panel.animal)}
              className="as-panel-item relative flex-shrink-0 overflow-hidden cursor-pointer transition-all duration-500"
              style={{
                flex: isActive ? '3 1 0' : '1 1 0',
                minHeight: isActive ? '520px' : '90px',
              }}
            >
              {/* Background image con filtro CSS */}
              <div
                className="absolute inset-0 transition-all duration-700"
                style={{
                  backgroundImage: `url('${panel.bg}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: isActive
                    ? 'brightness(0.88) saturate(1.35) contrast(1.08)'
                    : 'brightness(0.55) saturate(0) contrast(1.1)',
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                  transition: 'filter 0.6s ease, transform 0.7s ease',
                }}
              />

              {/* Gradient overlay por categoría */}
              <div className={`absolute inset-0 transition-all duration-500 ${isActive ? panel.overlayActive : panel.overlayInactive}`} />

              {/* Borde luminoso en el top cuando está activo */}
              {isActive && (
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${panel.accentColor}, transparent)` }}
                />
              )}

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10 transition-all duration-300">

                {/* Collapsed: label vertical */}
                {!isActive && (
                  <div className="flex items-center gap-3 md:flex-col md:gap-2">
                    <span className="text-3xl drop-shadow-lg">{panel.emoji}</span>
                    <h3 className="text-white font-black text-[1.4rem] md:text-[1.1rem] tracking-wider drop-shadow-lg">{panel.label}</h3>
                  </div>
                )}

                {/* Expanded: form */}
                {isActive && (
                  <div onClick={e => e.stopPropagation()} className="w-full max-w-[400px]">
                    <span className="text-5xl mb-3 block drop-shadow-xl">{panel.emoji}</span>
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: panel.accentColor }}
                      >
                        <i className="fas fa-check text-[.6rem]" style={{ color: panel.accentColor }} />
                      </div>
                      <h3 className="text-white font-black text-[2rem] tracking-wider drop-shadow-lg">
                        <span className="text-[.9rem] font-black mr-1" style={{ color: panel.accentColor }}>RUPER</span>
                        {panel.label}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-3 mb-5">
                      {panel.filters.map(f => (
                        <div key={f.key}>
                          <label className="text-white/70 text-[.72rem] font-semibold uppercase tracking-wide block mb-1.5">{f.label}:</label>
                          <div className="relative">
                            <select
                              value={selects[panel.animal][f.key]}
                              onChange={e => setSelect(panel.animal, f.key, e.target.value)}
                              className="w-full bg-black/30 backdrop-blur-sm border border-white/20 text-white rounded-xl px-4 py-3 text-[.88rem] font-medium appearance-none focus:outline-none transition-colors"
                              style={{ ['--tw-ring-color' as string]: panel.accentColor }}
                            >
                              <option value="" className="text-[var(--dark)]">Seleccionar</option>
                              {f.options.map(o => (
                                <option key={o.v} value={o.v} className="text-[var(--dark)]">{o.l}</option>
                              ))}
                            </select>
                            <i className="fas fa-chevron-down absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 text-xs pointer-events-none" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handleVerProductos(panel.animal)}
                      className="w-full text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2.5 transition-all hover:-translate-y-0.5 hover:shadow-lg text-[.96rem]"
                      style={{ background: `linear-gradient(135deg, ${panel.accentColor}, ${panel.accentColor}cc)` }}
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
    </section>
  )
}
