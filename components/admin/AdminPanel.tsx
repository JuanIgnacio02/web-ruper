'use client'
import { useState } from 'react'
import type { Product } from '@/types'
import ProductTable from './ProductTable'
import ProductForm  from './ProductForm'

type View = 'list' | 'new' | 'edit'

export default function AdminPanel({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [view, setView]         = useState<View>('list')
  const [editing, setEditing]   = useState<Product | null>(null)

  const onSaved = (product: Product) => {
    setProducts(prev => {
      const idx = prev.findIndex(p => p.id === product.id)
      return idx >= 0
        ? prev.map(p => p.id === product.id ? product : p)
        : [product, ...prev]
    })
    setView('list')
    setEditing(null)
  }

  const onDeleted = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const startEdit = (product: Product) => {
    setEditing(product)
    setView('edit')
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] pt-6">
      <div className="max-w-[1300px] mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-[var(--dark)]">
              {view === 'list' ? '📦 Productos' : view === 'new' ? '➕ Nuevo producto' : '✏️ Editar producto'}
            </h1>
            <p className="text-[var(--gray)] text-sm mt-0.5">{products.length} productos en total</p>
          </div>
          <div className="flex gap-2">
            {view !== 'list' && (
              <button onClick={() => { setView('list'); setEditing(null) }}
                className="px-4 py-2.5 rounded-xl border border-[var(--border)] text-[var(--gray)] text-sm font-semibold hover:bg-white transition-colors">
                ← Volver
              </button>
            )}
            {view === 'list' && (
              <button onClick={() => { setEditing(null); setView('new') }}
                className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-bold hover:bg-[var(--primary-dark)] transition-colors flex items-center gap-2">
                <i className="fas fa-plus" /> Nuevo producto
              </button>
            )}
          </div>
        </div>

        {/* Contenido */}
        {view === 'list' ? (
          <ProductTable products={products} onEdit={startEdit} onDeleted={onDeleted} />
        ) : (
          <ProductForm product={editing} onSaved={onSaved} />
        )}
      </div>
    </div>
  )
}
