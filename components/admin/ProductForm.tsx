'use client'
import { useState, useRef, useEffect } from 'react'
import type { Product, ProductInsert, AnimalCategory } from '@/types'
import { convertToWebP, removeBackgroundCanvas, uploadToCloudinary } from '@/lib/cloudinary'

interface Props {
  product: Product | null
  onSaved: (p: Product) => void
}

type FilterField = 'raza' | 'etapa' | 'linea'

const CAT_META: Record<string, { emoji: string; label: string; bg: string; sub: string }> = {
  perros:      { emoji:'🐶', label:'Perros',      bg:'bg-dogs',        sub:'perros' },
  gatos:       { emoji:'🐱', label:'Gatos',       bg:'bg-cats',        sub:'gatos' },
  granja:      { emoji:'🐄', label:'Granja',      bg:'bg-farm',        sub:'granja' },
  aves:        { emoji:'🐦', label:'Aves',        bg:'bg-birds',       sub:'aves' },
  peces:       { emoji:'🐟', label:'Peces',       bg:'bg-fish',        sub:'peces' },
  accesorios:  { emoji:'🎾', label:'Accesorios',  bg:'bg-accessories', sub:'accesorios' },
  'pequeños':  { emoji:'🐹', label:'Pequeños',    bg:'bg-small',       sub:'pequeños' },
}

const CHIPS: Record<string, { label: string; steps: { label: string; field: FilterField; opts: { v: string; l: string }[] }[] }> = {
  perros: { label: 'Perros', steps: [
    { label: 'Tamaño / Raza', field: 'raza',  opts: [{ v:'pequeña', l:'🐩 Raza pequeña' }, { v:'mediana', l:'🐕 Raza mediana' }, { v:'grande', l:'🦮 Raza grande' }, { v:'todas', l:'🐾 Todas las razas' }] },
    { label: 'Etapa de vida', field: 'etapa', opts: [{ v:'cachorro', l:'🍼 Cachorro' }, { v:'adulto', l:'🐶 Adulto' }, { v:'senior', l:'🧓 Senior' }, { v:'todas', l:'✨ Todas las etapas' }] },
    { label: 'Línea',         field: 'linea', opts: [{ v:'economica', l:'💰 Económica' }, { v:'premium', l:'⭐ Premium' }, { v:'super-premium', l:'🏆 Super Premium' }] },
  ]},
  gatos: { label: 'Gatos', steps: [
    { label: 'Tipo de gato',  field: 'raza',  opts: [{ v:'interior', l:'🏠 Interior' }, { v:'exterior', l:'🌿 Exterior' }, { v:'castrado', l:'✂️ Castrado/Esterilizado' }, { v:'todas', l:'🐱 Todos los tipos' }] },
    { label: 'Etapa de vida', field: 'etapa', opts: [{ v:'cachorro', l:'🍼 Gatito (cachorro)' }, { v:'adulto', l:'🐱 Adulto' }, { v:'senior', l:'🧓 Senior' }, { v:'todas', l:'✨ Todas las etapas' }] },
    { label: 'Línea',         field: 'linea', opts: [{ v:'economica', l:'💰 Económica' }, { v:'premium', l:'⭐ Premium' }, { v:'super-premium', l:'🏆 Super Premium' }] },
  ]},
  granja: { label: 'Granja', steps: [
    { label: 'Tipo de animal',   field: 'raza',  opts: [{ v:'aves', l:'🐓 Aves de corral' }, { v:'porcinos', l:'🐷 Porcinos' }, { v:'equinos', l:'🐴 Equinos' }, { v:'ovinos', l:'🐑 Ovinos' }, { v:'bovinos', l:'🐄 Bovinos' }] },
    { label: 'Etapa / Propósito',field: 'etapa', opts: [{ v:'crecimiento', l:'📈 Crecimiento' }, { v:'mantenimiento', l:'⚖️ Mantenimiento' }, { v:'postura', l:'🥚 Postura' }, { v:'engorde', l:'🥩 Engorde' }] },
    { label: 'Formato',          field: 'linea', opts: [{ v:'pellet', l:'🔵 Pellet' }, { v:'extrusado', l:'🟠 Extrusado' }, { v:'grano', l:'🌾 Grano entero' }, { v:'harina', l:'🫙 Harina' }] },
  ]},
  aves: { label: 'Aves', steps: [
    { label: 'Tipo de ave',   field: 'raza',  opts: [{ v:'canario', l:'🐤 Canario' }, { v:'loro', l:'🦜 Loro/Cotorra' }, { v:'paloma', l:'🕊️ Paloma' }, { v:'todas', l:'🐦 Todas' }] },
    { label: 'Etapa de vida', field: 'etapa', opts: [{ v:'cria', l:'🐣 Cría' }, { v:'adulto', l:'🐦 Adulto' }] },
    { label: 'Línea',         field: 'linea', opts: [{ v:'economica', l:'💰 Económica' }, { v:'premium', l:'⭐ Premium' }] },
  ]},
  peces: { label: 'Peces', steps: [
    { label: 'Tipo',  field: 'raza',  opts: [{ v:'agua-fria', l:'🧊 Agua fría' }, { v:'agua-caliente', l:'🌡️ Agua caliente/tropical' }, { v:'marino', l:'🌊 Marino' }] },
    { label: 'Línea', field: 'linea', opts: [{ v:'economica', l:'💰 Económica' }, { v:'premium', l:'⭐ Premium' }] },
  ]},
  accesorios: { label: 'Accesorios', steps: [
    { label: 'Tipo de accesorio', field: 'raza',  opts: [{ v:'collar-correa', l:'🦮 Collar / Correa' }, { v:'juguetes', l:'🎾 Juguetes' }, { v:'camas-refugios', l:'🛏️ Camas / Refugios' }, { v:'comederos', l:'🥣 Comederos / Bebederos' }, { v:'higiene', l:'🪮 Higiene / Grooming' }, { v:'transporte', l:'🧳 Transporte' }, { v:'otros', l:'📦 Otros' }] },
    { label: 'Para qué animal',   field: 'etapa', opts: [{ v:'perros', l:'🐶 Perros' }, { v:'gatos', l:'🐱 Gatos' }, { v:'todos', l:'🐾 Todos' }] },
  ]},
  'pequeños': { label: 'Pequeños', steps: [
    { label: 'Tipo', field: 'raza',  opts: [{ v:'conejo', l:'🐰 Conejos' }, { v:'hamster', l:'🐹 Hámsters' }, { v:'cobayo', l:'🐾 Cobayos' }, { v:'todos', l:'✨ Todos' }] },
    { label: 'Línea',field: 'linea', opts: [{ v:'economica', l:'💰 Económica' }, { v:'premium', l:'⭐ Premium' }] },
  ]},
}

const inputCls = "w-full border-[1.5px] border-[#E5E7EB] rounded-[8px] px-3 py-[10px] text-[.92rem] text-[#1B1B2F] bg-white outline-none transition-all focus:border-[#FF6B35] focus:shadow-[0_0_0_3px_rgba(255,107,53,0.12)] font-[inherit]"

export default function ProductForm({ product, onSaved }: Props) {
  const isEdit = !!product

  const [name,        setName]        = useState(product?.name        ?? '')
  const [brand,       setBrand]       = useState(product?.brand       ?? '')
  const [price,       setPrice]       = useState<number>(product?.price ?? 0)
  const [weight,      setWeight]      = useState(product?.weight      ?? '')
  const [flavor,      setFlavor]      = useState(product?.flavor      ?? '')
  const [emoji,       setEmoji]       = useState(product?.emoji       ?? '🐾')
  const [img,         setImg]         = useState(product?.img         ?? '')
  const [description, setDescription] = useState(product?.description ?? '')
  const [features,    setFeatures]    = useState((product?.features ?? []).join('\n'))
  const [badge,       setBadge]       = useState(() => {
    if (!product?.badge) return ''
    return `${product.badge}|${product.badge_type ?? 'badge-top'}`
  })
  const [stock,       setStock]       = useState(product?.stock    ?? true)
  const [featured,    setFeatured]    = useState(product?.featured ?? false)

  // Category selector state
  const [category,    setCategory]    = useState<string>(product?.category ?? '')
  const [chips,       setChips]       = useState<Record<FilterField, string>>({
    raza:  product?.raza  ?? '',
    etapa: product?.etapa ?? '',
    linea: product?.linea ?? '',
  })

  // Image upload state
  const [uploading,   setUploading]   = useState(false)
  const [uploadPct,   setUploadPct]   = useState(0)
  const [removeBg,    setRemoveBg]    = useState(true)
  const [saving,      setSaving]      = useState(false)
  const [saveError,   setSaveError]   = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  // Restore category chips when editing
  useEffect(() => {
    if (product?.category) setCategory(product.category)
  }, [product])

  const selectCat = (cat: string) => {
    setCategory(cat)
    setChips({ raza: '', etapa: '', linea: '' })
  }

  const selectChip = (field: FilterField, val: string) => {
    setChips(prev => ({ ...prev, [field]: prev[field] === val ? '' : val }))
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadPct(5)
    try {
      let blob: Blob
      if (removeBg) {
        setUploadPct(25)
        blob = await removeBackgroundCanvas(file)
      } else {
        setUploadPct(30)
        blob = await convertToWebP(file, 0.85)
      }
      setUploadPct(55)
      const webpFile = new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' })
      const { url } = await uploadToCloudinary(webpFile, pct => setUploadPct(55 + Math.round(pct * 0.45)))
      setImg(url)
      setUploadPct(100)
      setTimeout(() => setUploadPct(0), 800)
    } catch {
      alert('Error al subir imagen. Podés pegar una URL directamente.')
      setShowUrlInput(true)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setSaveError('El nombre es obligatorio'); return }
    if (!brand.trim()) { setSaveError('La marca es obligatoria'); return }
    if (!category)     { setSaveError('Seleccioná una categoría'); return }
    if (!price)        { setSaveError('El precio es obligatorio'); return }

    setSaving(true)
    setSaveError('')

    const badgeParts = badge ? badge.split('|') : ['', '']
    const meta = CAT_META[category]

    const payload: ProductInsert = {
      name:        name.trim(),
      brand:       brand.trim(),
      category:    category as AnimalCategory,
      subcategory: meta?.sub ?? category,
      price,
      weight:      weight.trim(),
      flavor:      flavor.trim(),
      emoji:       emoji.trim() || '🐾',
      img:         img.trim(),
      bg_class:    meta?.bg ?? 'bg-dogs',
      description: description.trim(),
      features:    features.split('\n').map(s => s.trim()).filter(Boolean),
      raza:        chips.raza,
      etapa:       chips.etapa,
      linea:       chips.linea,
      badge:       badgeParts[0] || '',
      badge_type:  badgeParts[1] || null,
      stock,
      featured,
    }

    try {
      const url = isEdit ? `/api/admin/products/${product!.id}` : '/api/admin/products'
      const res = await fetch(url, {
        method:  isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Error desconocido')
      onSaved(json as Product)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : String(err))
    } finally {
      setSaving(false)
    }
  }

  const chipDef = category ? CHIPS[category] : null

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ background:'#fff', borderRadius:14, boxShadow:'0 2px 12px rgba(0,0,0,.07)', overflow:'hidden' }}>
        <div style={{ padding:'22px 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'18px 24px' }} className="admin-form-grid">

          {/* ── Nombre ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <label style={{ fontSize:'.78rem', fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'.06em' }}>
              Nombre del producto <span style={{ color:'#FF6B35' }}>*</span>
            </label>
            <input className={inputCls} value={name} onChange={e => setName(e.target.value)}
              placeholder="Ej: Pro Plan Adulto Razas Medianas" required />
          </div>

          {/* ── Marca ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <label style={{ fontSize:'.78rem', fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'.06em' }}>
              Marca <span style={{ color:'#FF6B35' }}>*</span>
            </label>
            <input className={inputCls} value={brand} onChange={e => setBrand(e.target.value)}
              placeholder="Ej: Pro Plan, Royal Canin" required />
          </div>

          {/* ── Categoría visual ── */}
          <div style={{ gridColumn:'1/-1', display:'flex', flexDirection:'column', gap:8 }}>
            <label style={{ fontSize:'.78rem', fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'.06em' }}>
              Categoría <span style={{ color:'#FF6B35' }}>*</span>
            </label>

            {/* Step 1 — main category cards */}
            <div style={{ marginBottom:6 }}>
              <div style={{ fontSize:'.68rem', fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:10, display:'flex', alignItems:'center', gap:8 }}>
                1 · Elegí el tipo de animal
                <span style={{ flex:1, height:1, background:'#E5E7EB', display:'block' }} />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10 }} className="admin-cat-grid">
                {Object.entries(CAT_META).map(([key, m]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectCat(key)}
                    style={{
                      border: `2px solid ${category === key ? '#FF6B35' : '#E5E7EB'}`,
                      borderRadius:12,
                      padding:'14px 8px',
                      textAlign:'center',
                      cursor:'pointer',
                      background: category === key ? 'rgba(255,107,53,.1)' : '#fff',
                      boxShadow: category === key ? '0 0 0 3px rgba(255,107,53,.15)' : 'none',
                      transition:'all .2s ease',
                    }}
                  >
                    <span style={{ fontSize:'1.8rem', display:'block', marginBottom:6 }}>{m.emoji}</span>
                    <div style={{ fontSize:'.82rem', fontWeight:700, color:'#1B1B2F' }}>{m.label}</div>
                  </button>
                ))}
              </div>
              {!category && saveError.includes('categoría') && (
                <p style={{ color:'#ef4444', fontSize:'.78rem', marginTop:6 }}>Seleccioná una categoría</p>
              )}
            </div>

            {/* Step 2+ — chips */}
            {chipDef && chipDef.steps.map((step, si) => (
              <div key={step.field} style={{ marginBottom:8 }}>
                <div style={{ fontSize:'.68rem', fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'1.5px', marginBottom:8, display:'flex', alignItems:'center', gap:8 }}>
                  {si + 2} · {step.label}
                  <span style={{ flex:1, height:1, background:'#E5E7EB', display:'block' }} />
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {step.opts.map(o => (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => selectChip(step.field, o.v)}
                      style={{
                        padding:'7px 16px',
                        borderRadius:50,
                        border: `1.5px solid ${chips[step.field] === o.v ? '#FF6B35' : '#E5E7EB'}`,
                        background: chips[step.field] === o.v ? '#FF6B35' : '#fff',
                        color: chips[step.field] === o.v ? '#fff' : '#1B1B2F',
                        fontSize:'.82rem', fontWeight:600,
                        cursor:'pointer', transition:'all .2s ease',
                        boxShadow: chips[step.field] === o.v ? '0 3px 10px rgba(255,107,53,.3)' : 'none',
                      }}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Precio ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <label style={{ fontSize:'.78rem', fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'.06em' }}>
              Precio <span style={{ color:'#FF6B35' }}>*</span>
            </label>
            <input type="number" min={0} className={inputCls} value={price || ''}
              onChange={e => setPrice(Number(e.target.value))} placeholder="89900" required />
          </div>

          {/* ── Peso ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <label style={{ fontSize:'.78rem', fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'.06em' }}>Peso / Presentación</label>
            <input className={inputCls} value={weight} onChange={e => setWeight(e.target.value)}
              placeholder="Ej: 15 kg, 400 g, Pack x3" />
          </div>

          {/* ── Sabor ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <label style={{ fontSize:'.78rem', fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'.06em' }}>Sabor / Desc. breve</label>
            <input className={inputCls} value={flavor} onChange={e => setFlavor(e.target.value)}
              placeholder="Ej: Pollo y arroz" />
          </div>

          {/* ── Emoji ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <label style={{ fontSize:'.78rem', fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'.06em' }}>Emoji</label>
            <div style={{ display:'flex', gap:10, alignItems:'center' }}>
              <input className={inputCls} value={emoji} onChange={e => setEmoji(e.target.value)}
                placeholder="🐾" maxLength={4} style={{ width:90 }} />
              <div style={{
                fontSize:'2rem', width:52, height:52, flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center',
                background:'#f8fafc', border:'1.5px solid #E5E7EB', borderRadius:8,
              }}>
                {emoji || '🐾'}
              </div>
            </div>
          </div>

          {/* ── Imagen ── */}
          <div style={{ gridColumn:'1/-1', display:'flex', flexDirection:'column', gap:8 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <label style={{ fontSize:'.78rem', fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'.06em' }}>
                Imagen del producto
              </label>
              <label style={{ display:'flex', alignItems:'center', gap:6, fontSize:'.8rem', color:'#6B7280', cursor:'pointer', fontWeight:400 }}>
                <input type="checkbox" checked={removeBg} onChange={e => setRemoveBg(e.target.checked)}
                  style={{ accentColor:'#FF6B35', width:14, height:14 }} />
                ✨ Quitar fondo automático
              </label>
            </div>

            {/* Upload area */}
            {!img && (
              <div
                style={{
                  border:'2px dashed #E5E7EB', borderRadius:12, padding:20,
                  textAlign:'center', cursor:'pointer', background:'#fafafa',
                  transition:'all .2s ease', position:'relative',
                }}
                onClick={() => fileRef.current?.click()}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor='#FF6B35'; (e.currentTarget as HTMLDivElement).style.background='rgba(255,107,53,.05)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor='#E5E7EB'; (e.currentTarget as HTMLDivElement).style.background='#fafafa' }}
              >
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile}
                  style={{ position:'absolute', inset:0, opacity:0, cursor:'pointer', width:'100%', height:'100%' }} />
                <div style={{ fontSize:'2rem', marginBottom:8 }}>🖼️</div>
                <div style={{ fontSize:'.85rem', color:'#6B7280' }}>
                  <strong style={{ color:'#FF6B35' }}>Hacé clic</strong> o arrastrá una imagen aquí
                </div>
                <div style={{ fontSize:'.72rem', color:'#6B7280', marginTop:4 }}>
                  {uploading ? `Procesando... ${uploadPct}%` : 'JPG, PNG, WEBP · Se comprime automáticamente'}
                </div>
              </div>
            )}

            {/* Progress bar */}
            {uploadPct > 0 && uploadPct < 100 && (
              <div style={{ height:4, background:'#E5E7EB', borderRadius:4, overflow:'hidden' }}>
                <div style={{ height:'100%', background:'#FF6B35', width:`${uploadPct}%`, transition:'width .3s ease' }} />
              </div>
            )}

            {/* Preview */}
            {img && (
              <div style={{ display:'flex', alignItems:'center', gap:14, marginTop:4 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="Preview" style={{ width:90, height:90, objectFit:'cover', borderRadius:8, border:'2px solid #E5E7EB', flexShrink:0 }} />
                <div>
                  <p style={{ fontSize:'.8rem', color:'#1B1B2F', fontWeight:600, marginBottom:4 }}>Imagen cargada ✅</p>
                  <p style={{ fontSize:'.75rem', color:'#6B7280', marginBottom:6, wordBreak:'break-all', maxWidth:300 }}>{img.slice(0, 60)}{img.length > 60 ? '…' : ''}</p>
                  <button
                    type="button"
                    onClick={() => { setImg(''); setShowUrlInput(false) }}
                    style={{ background:'none', border:'1px solid #ef4444', color:'#ef4444', borderRadius:6, padding:'3px 10px', fontSize:'.75rem', cursor:'pointer' }}
                  >
                    ✕ Quitar imagen
                  </button>
                </div>
              </div>
            )}

            {/* URL input fallback */}
            <div style={{ marginTop: img ? 0 : 4 }}>
              <button type="button" onClick={() => setShowUrlInput(v => !v)}
                style={{ background:'none', border:'none', color:'#FF6B35', fontSize:'.78rem', fontWeight:600, cursor:'pointer', padding:0 }}>
                {showUrlInput ? '▲ Ocultar' : '🔗 Pegar URL de imagen directamente'}
              </button>
              {showUrlInput && (
                <input className={inputCls} value={img} onChange={e => setImg(e.target.value)}
                  placeholder="https://..." style={{ marginTop:8 }} />
              )}
            </div>
          </div>

          {/* ── Descripción ── */}
          <div style={{ gridColumn:'1/-1', display:'flex', flexDirection:'column', gap:6 }}>
            <label style={{ fontSize:'.78rem', fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'.06em' }}>Descripción larga</label>
            <textarea className={inputCls} value={description} onChange={e => setDescription(e.target.value)}
              rows={3} placeholder="Descripción detallada del producto..." style={{ resize:'vertical', minHeight:90 }} />
          </div>

          {/* ── Características ── */}
          <div style={{ gridColumn:'1/-1', display:'flex', flexDirection:'column', gap:6 }}>
            <label style={{ fontSize:'.78rem', fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'.06em' }}>Características</label>
            <textarea className={inputCls} value={features} onChange={e => setFeatures(e.target.value)}
              rows={4} placeholder={'Una característica por línea\nEj: Pollo como primer ingrediente\nSin colorantes artificiales'} style={{ resize:'vertical', minHeight:100 }} />
            <span style={{ fontSize:'.74rem', color:'#6B7280' }}>Una característica por línea</span>
          </div>

          {/* ── Badge ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <label style={{ fontSize:'.78rem', fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'.06em' }}>Etiqueta del producto</label>
            <select className={inputCls} value={badge} onChange={e => setBadge(e.target.value)}
              style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.5'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat:'no-repeat', backgroundPosition:'right 12px center', paddingRight:36, appearance:'none' }}>
              <option value="">Sin etiqueta</option>
              <option value="Más vendido|badge-top">⭐ Más vendido</option>
              <option value="Oferta|badge-sale">🔥 Oferta</option>
              <option value="Nuevo|badge-new">✨ Nuevo</option>
              <option value="Popular|badge-top">💫 Popular</option>
            </select>
          </div>

          {/* ── Toggles ── */}
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <label style={{ fontSize:'.78rem', fontWeight:700, color:'#6B7280', textTransform:'uppercase', letterSpacing:'.06em' }}>Estado</label>
            <div style={{ display:'flex', flexDirection:'column', gap:14, marginTop:4 }}>
              {[
                { id:'stock',    label:'En stock',           val:stock,    set:setStock },
                { id:'featured', label:'Producto destacado', val:featured, set:setFeatured },
              ].map(t => (
                <div key={t.id} style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <label style={{ position:'relative', width:46, height:26, flexShrink:0 }}>
                    <input type="checkbox" checked={t.val} onChange={e => t.set(e.target.checked)}
                      style={{ opacity:0, width:0, height:0, position:'absolute' }} />
                    <span style={{
                      position:'absolute', inset:0, borderRadius:99, cursor:'pointer', transition:'all .22s ease',
                      background: t.val ? '#FF6B35' : '#cbd5e1',
                    }}>
                      <span style={{
                        position:'absolute', width:20, height:20, background:'#fff',
                        borderRadius:'50%', top:3, left: t.val ? 23 : 3, transition:'all .22s ease',
                        boxShadow:'0 1px 4px rgba(0,0,0,.15)',
                      }} />
                    </span>
                  </label>
                  <span style={{ fontSize:'.9rem', fontWeight:500, color:'#1B1B2F' }}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Actions bar ── */}
        <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap', padding:'18px 24px', borderTop:'1px solid #E5E7EB', background:'#f8fafc' }}>
          {saveError && (
            <span style={{ color:'#ef4444', fontSize:'.85rem', display:'flex', alignItems:'center', gap:6 }}>
              ⚠️ {saveError}
            </span>
          )}
          <div style={{ flex:1 }} />
          <button type="button" onClick={() => window.history.back()}
            style={{ padding:'9px 18px', borderRadius:8, background:'#f1f5f9', color:'#1B1B2F', border:'none', fontWeight:600, fontSize:'.88rem', cursor:'pointer' }}>
            Cancelar
          </button>
          <button type="submit" disabled={saving}
            style={{
              padding:'9px 22px', borderRadius:8,
              background: saving ? '#fda07a' : '#FF6B35',
              color:'#fff', border:'none', fontWeight:700, fontSize:'.92rem',
              cursor: saving ? 'not-allowed' : 'pointer',
              display:'flex', alignItems:'center', gap:8,
              boxShadow:'0 4px 14px rgba(255,107,53,.35)',
            }}>
            {saving ? '⏳ Guardando...' : `💾 ${isEdit ? 'Actualizar' : 'Guardar'} producto`}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .admin-form-grid { grid-template-columns: 1fr !important; }
          .admin-cat-grid  { grid-template-columns: repeat(3,1fr) !important; }
        }
      `}</style>
    </form>
  )
}
