'use client'
import { useState } from 'react'
import Image from 'next/image'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

interface Props {
  products:  Product[]
  onEdit:    (p: Product) => void
  onDeleted: (id: number) => void
}

export default function ProductTable({ products, onEdit, onDeleted }: Props) {
  const [deleting, setDeleting] = useState<number | null>(null)
  const supabase = createClient()

  const handleDelete = async (p: Product) => {
    if (!confirm(`¿Eliminar "${p.name}"?`)) return
    setDeleting(p.id)
    const { error } = await supabase.from('productos').delete().eq('id', p.id)
    if (error) { alert('Error al eliminar: ' + error.message); setDeleting(null); return }
    onDeleted(p.id)
    setDeleting(null)
  }

  const handleToggleStock = async (p: Product) => {
    const { data, error } = await supabase
      .from('productos').update({ stock: !p.stock }).eq('id', p.id).select().single()
    if (!error && data) onEdit(data as Product)
  }

  if (!products.length) {
    return (
      <div className="bg-white rounded-2xl p-16 text-center shadow-[var(--shadow)]">
        <i className="fas fa-box-open text-5xl text-[var(--border)] mb-4 block" />
        <h3 className="font-bold text-[var(--dark)]">Sin productos</h3>
        <p className="text-[var(--gray)] text-sm mt-1">Creá tu primer producto.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-[var(--shadow)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {['Producto', 'Categoría', 'Precio', 'Stock', 'Acciones'].map(h => (
                <th key={h} className="text-left text-[.72rem] font-bold text-[var(--gray)] uppercase tracking-wide px-5 py-3.5">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--light)] transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 ${p.bg_class}`}>
                      {p.img
                        ? <Image src={p.img} alt={p.name} width={40} height={40} className="object-contain w-full h-full" />
                        : <span className="text-xl">{p.emoji}</span>
                      }
                    </div>
                    <div>
                      <div className="font-semibold text-[.88rem] text-[var(--dark)] max-w-[220px] truncate">{p.name}</div>
                      <div className="text-[.72rem] text-[var(--gray)]">{p.brand}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="bg-[var(--light)] text-[var(--dark)] text-[.72rem] font-semibold px-2.5 py-1 rounded-lg capitalize">{p.category}</span>
                </td>
                <td className="px-5 py-3.5 font-bold text-[.9rem] text-[var(--dark)] whitespace-nowrap">{formatPrice(p.price)}</td>
                <td className="px-5 py-3.5">
                  <button onClick={() => handleToggleStock(p)}
                    className={`px-3 py-1 rounded-full text-[.72rem] font-bold transition-colors ${
                      p.stock ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-600 hover:bg-red-200'
                    }`}>
                    {p.stock ? '✓ En stock' : '✗ Sin stock'}
                  </button>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onEdit(p)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors text-sm">
                      <i className="fas fa-edit" />
                    </button>
                    <button onClick={() => handleDelete(p)} disabled={deleting === p.id}
                      className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors text-sm disabled:opacity-50">
                      <i className={`fas ${deleting === p.id ? 'fa-spinner fa-spin' : 'fa-trash-alt'}`} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
