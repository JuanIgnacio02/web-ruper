'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import type { Product, ProductInsert, AnimalCategory } from '@/types'
import { createClient } from '@/lib/supabase/client'
import { convertToWebP, removeBackgroundCanvas, uploadToCloudinary } from '@/lib/cloudinary'

interface Props {
  product: Product | null
  onSaved: (p: Product) => void
}

const CATEGORIES: AnimalCategory[] = ['perros', 'gatos', 'granja', 'aves', 'pequeños', 'peces', 'accesorios']

export default function ProductForm({ product, onSaved }: Props) {
  const supabase = createClient()
  const isEdit   = !!product

  const [form, setForm] = useState<Partial<ProductInsert>>({
    name:        product?.name        ?? '',
    brand:       product?.brand       ?? '',
    category:    product?.category    ?? 'perros',
    subcategory: product?.subcategory ?? '',
    raza:        product?.raza        ?? '',
    etapa:       product?.etapa       ?? '',
    linea:       product?.linea       ?? '',
    price:       product?.price       ?? 0,
    weight:      product?.weight      ?? '',
    flavor:      product?.flavor      ?? '',
    emoji:       product?.emoji       ?? '🐾',
    img:         product?.img         ?? '',
    bg_class:    product?.bg_class    ?? 'bg-dogs',
    badge:       product?.badge       ?? '',
    badge_type:  product?.badge_type  ?? null,
    description: product?.description ?? '',
    stock:       product?.stock       ?? true,
    featured:    product?.featured    ?? false,
  })

  const [saving,    setSaving]    = useState(false)
  const [uploadPct, setUploadPct] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [removeBg,  setRemoveBg]  = useState(true)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = (key: keyof ProductInsert, value: unknown) =>
    setForm(prev => ({ ...prev, [key]: value }))

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
      set('img', url)
      setUploadPct(100)
      setTimeout(() => setUploadPct(0), 600)
    } catch (err) {
      alert('Error al procesar imagen: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.price) return
    setSaving(true)
    try {
      const payload = form as ProductInsert
      if (isEdit && product) {
        const { data, error } = await supabase.from('productos').update(payload).eq('id', product.id).select().single()
        if (error) throw error
        onSaved(data as Product)
      } else {
        const { data, error } = await supabase.from('productos').insert(payload).select().single()
        if (error) throw error
        onSaved(data as Product)
      }
    } catch (err) {
      alert('Error al guardar: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setSaving(false)
    }
  }

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[.78rem] font-bold text-[var(--dark)] uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )

  const inputClass = "w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[.9rem] text-[var(--dark)] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-[var(--shadow)] p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Imagen */}
        <div className="md:col-span-2">
          <Field label="Imagen del producto">
            <div className="flex items-center gap-4">
              {form.img ? (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-[var(--border)]">
                  <Image src={form.img} alt="Preview" fill className="object-contain" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-xl border-2 border-dashed border-[var(--border)] flex items-center justify-center text-3xl">
                  {form.emoji ?? '🐾'}
                </div>
              )}
              <div className="flex-1">
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
                <button type="button" onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="px-4 py-2.5 rounded-xl border-2 border-[var(--primary)] text-[var(--primary)] font-bold text-sm hover:bg-[var(--primary)] hover:text-white transition-all disabled:opacity-50">
                  {uploading ? '⏳ Procesando...' : '📤 Subir imagen'}
                </button>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="removeBg" checked={removeBg} onChange={e => setRemoveBg(e.target.checked)} className="accent-[var(--primary)]" />
                  <label htmlFor="removeBg" className="text-[.78rem] text-[var(--gray)]">Remover fondo automáticamente</label>
                </div>
                {uploadPct > 0 && (
                  <div className="mt-2 h-1.5 bg-[var(--border)] rounded-full overflow-hidden w-full max-w-[200px]">
                    <div className="h-full bg-[var(--primary)] rounded-full transition-all" style={{ width: `${uploadPct}%` }} />
                  </div>
                )}
              </div>
            </div>
          </Field>
        </div>

        {/* Nombre */}
        <div className="md:col-span-2">
          <Field label="Nombre *">
            <input required value={form.name ?? ''} onChange={e => set('name', e.target.value)} placeholder="Ej: Pro Plan Adulto Razas Medianas" className={inputClass} />
          </Field>
        </div>

        <Field label="Marca">
          <input value={form.brand ?? ''} onChange={e => set('brand', e.target.value)} placeholder="Ej: Pro Plan" className={inputClass} />
        </Field>

        <Field label="Precio *">
          <input required type="number" min={0} value={form.price ?? 0} onChange={e => set('price', Number(e.target.value))} className={inputClass} />
        </Field>

        <Field label="Categoría">
          <select value={form.category} onChange={e => set('category', e.target.value as AnimalCategory)} className={inputClass}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label="Subcategoría">
          <input value={form.subcategory ?? ''} onChange={e => set('subcategory', e.target.value)} placeholder="Ej: Perros · Pro Plan" className={inputClass} />
        </Field>

        <Field label="Peso / Presentación">
          <input value={form.weight ?? ''} onChange={e => set('weight', e.target.value)} placeholder="Ej: 15 kg" className={inputClass} />
        </Field>

        <Field label="Sabor">
          <input value={form.flavor ?? ''} onChange={e => set('flavor', e.target.value)} placeholder="Ej: Pollo y arroz" className={inputClass} />
        </Field>

        <Field label="Raza">
          <select value={form.raza ?? ''} onChange={e => set('raza', e.target.value)} className={inputClass}>
            <option value="">Todas</option>
            <option value="pequeña">Pequeña</option>
            <option value="mediana">Mediana</option>
            <option value="grande">Grande</option>
          </select>
        </Field>

        <Field label="Etapa de vida">
          <select value={form.etapa ?? ''} onChange={e => set('etapa', e.target.value)} className={inputClass}>
            <option value="">Todas</option>
            <option value="cachorro">Cachorro</option>
            <option value="adulto">Adulto</option>
            <option value="senior">Senior</option>
          </select>
        </Field>

        <Field label="Línea">
          <select value={form.linea ?? ''} onChange={e => set('linea', e.target.value)} className={inputClass}>
            <option value="">Todas</option>
            <option value="economica">Económica</option>
            <option value="premium">Premium</option>
            <option value="super-premium">Super Premium</option>
          </select>
        </Field>

        <Field label="Emoji">
          <input value={form.emoji ?? '🐾'} onChange={e => set('emoji', e.target.value)} placeholder="🐶" className={inputClass} />
        </Field>

        <div className="md:col-span-2">
          <Field label="Descripción">
            <textarea rows={3} value={form.description ?? ''} onChange={e => set('description', e.target.value)} placeholder="Descripción del producto..." className={`${inputClass} resize-none`} />
          </Field>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.stock ?? true} onChange={e => set('stock', e.target.checked)} className="accent-[var(--primary)] w-4 h-4" />
            <span className="text-[.88rem] font-medium text-[var(--dark)]">En stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.featured ?? false} onChange={e => set('featured', e.target.checked)} className="accent-[var(--primary)] w-4 h-4" />
            <span className="text-[.88rem] font-medium text-[var(--dark)]">Destacado</span>
          </label>
        </div>

        {/* Botón */}
        <div className="md:col-span-2 pt-2">
          <button type="submit" disabled={saving}
            className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold py-4 rounded-xl transition-all text-[.96rem] disabled:opacity-60 flex items-center justify-center gap-2">
            <i className={`fas ${saving ? 'fa-spinner fa-spin' : isEdit ? 'fa-save' : 'fa-plus'}`} />
            {saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear producto'}
          </button>
        </div>
      </div>
    </form>
  )
}
