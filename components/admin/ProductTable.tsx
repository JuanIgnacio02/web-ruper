'use client'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

interface Props {
  products:  Product[]
  onEdit:    (p: Product) => void
  onDeleted: (id: number) => void
  onNew?:    () => void
}

const CAT_ORDER = ['perros', 'gatos', 'granja', 'aves', 'peces', 'accesorios', 'pequeños']

// ── SVG Icons ────────────────────────────────────────────────────────────────
const IconEdit = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)
const IconTrash = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6"/><path d="M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
)
const IconSearch = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
)

export default function ProductTable({ products, onEdit, onDeleted, onNew }: Props) {
  const [deleting,  setDeleting]  = useState<number | null>(null)
  const [confirmId, setConfirmId] = useState<number | null>(null)
  const [search,    setSearch]    = useState('')
  const [catFilter, setCatFilter] = useState('todas')

  const usedCats = useMemo(() => {
    const set = new Set<string>(products.map(p => p.category))
    return ['todas', ...CAT_ORDER.filter(c => set.has(c))]
  }, [products])

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCat    = catFilter === 'todas' || p.category === catFilter
      const q           = search.toLowerCase()
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [products, search, catFilter])

  const handleDelete = async (p: Product) => {
    setDeleting(p.id)
    try {
      const res = await fetch(`/api/admin/products/${p.id}`, { method: 'DELETE' })
      if (!res.ok) {
        const json = await res.json()
        alert('Error al eliminar: ' + (json.error ?? 'Error desconocido'))
        return
      }
      onDeleted(p.id)
    } finally {
      setDeleting(null)
      setConfirmId(null)
    }
  }

  const handleToggleStock = async (p: Product) => {
    const res = await fetch(`/api/admin/products/${p.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stock: !p.stock }),
    })
    if (res.ok) {
      const data = await res.json()
      onEdit(data as Product)
    }
  }

  return (
    <div>
      {/* ── Toolbar ── */}
      <div style={{ display:'flex', gap:10, marginBottom:16, flexWrap:'wrap', alignItems:'center' }}>
        {/* Search */}
        <div style={{ position:'relative', flex:'1 1 200px', minWidth:0 }}>
          <span style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:'#9CA3AF', display:'flex' }}>
            <IconSearch />
          </span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre o marca..."
            style={{
              width:'100%', paddingLeft:36, paddingRight:14, paddingTop:9, paddingBottom:9,
              border:'1.5px solid #E5E7EB', borderRadius:8, fontSize:'.88rem',
              color:'#1B1B2F', background:'#fff', outline:'none',
              transition:'border-color .2s',
              fontFamily:'inherit',
            }}
            onFocus={e => (e.target.style.borderColor = '#FF6B35')}
            onBlur={e  => (e.target.style.borderColor = '#E5E7EB')}
          />
        </div>

        {/* Category filter pills */}
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', alignItems:'center' }}>
          {usedCats.map(c => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              style={{
                padding:'6px 13px', borderRadius:99, fontSize:'.76rem', fontWeight:600,
                border: catFilter === c ? 'none' : '1.5px solid #E5E7EB',
                background: catFilter === c ? '#FF6B35' : '#fff',
                color: catFilter === c ? '#fff' : '#6B7280',
                cursor:'pointer', transition:'all .15s ease', textTransform:'capitalize',
                whiteSpace:'nowrap',
              }}
            >
              {c === 'todas' ? `Todas (${products.length})` : c}
            </button>
          ))}
        </div>
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 ? (
        <div style={{ background:'#fff', borderRadius:14, padding:'60px 24px', textAlign:'center', boxShadow:'0 2px 12px rgba(0,0,0,.07)' }}>
          <div style={{ fontSize:'2.8rem', marginBottom:12, opacity:.35 }}>📦</div>
          <div style={{ fontSize:'1.05rem', fontWeight:700, color:'#1B1B2F', marginBottom:6 }}>
            {search || catFilter !== 'todas' ? 'Sin resultados' : 'Sin productos'}
          </div>
          <div style={{ fontSize:'.88rem', color:'#6B7280', marginBottom:20 }}>
            {search
              ? `Ningún producto coincide con "${search}"`
              : catFilter !== 'todas'
                ? `No hay productos en la categoría "${catFilter}"`
                : 'Agregá tu primer producto al catálogo'}
          </div>
          {onNew && !search && catFilter === 'todas' && (
            <button
              onClick={onNew}
              style={{ padding:'9px 22px', background:'#FF6B35', color:'#fff', border:'none', borderRadius:8, fontWeight:600, fontSize:'.88rem', cursor:'pointer', boxShadow:'0 4px 14px rgba(255,107,53,.3)' }}
            >
              ➕ Agregar producto
            </button>
          )}
        </div>
      ) : (
        <>
          {/* ── Desktop table ── */}
          <div style={{ background:'#fff', borderRadius:14, boxShadow:'0 2px 12px rgba(0,0,0,.07)', overflow:'hidden' }} className="prod-table-desktop">
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'.88rem' }}>
              <thead>
                <tr style={{ background:'#f8fafc', borderBottom:'1.5px solid #E5E7EB' }}>
                  {['Producto', 'Categoría', 'Precio', 'Stock', 'Acciones'].map(h => (
                    <th key={h} style={{ padding:'11px 16px', textAlign:'left', fontSize:'.7rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'.07em', color:'#6B7280', whiteSpace:'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr
                    key={p.id}
                    style={{ borderBottom:'1px solid #F3F4F6' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#fafbfc')}
                    onMouseLeave={e => (e.currentTarget.style.background = '')}
                  >
                    {/* Producto */}
                    <td style={{ padding:'12px 16px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <div style={{
                          width:46, height:46, borderRadius:10, flexShrink:0,
                          background:'#f8fafc', border:'1px solid #E5E7EB',
                          display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden',
                        }}>
                          {p.img
                            ? <Image src={p.img} alt={p.name} width={46} height={46} style={{ objectFit:'contain', width:'100%', height:'100%' }} />
                            : <span style={{ fontSize:'1.45rem' }}>{p.emoji}</span>
                          }
                        </div>
                        <div style={{ minWidth:0 }}>
                          <div style={{ fontWeight:600, color:'#1B1B2F', fontSize:'.88rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', maxWidth:230 }}>
                            {p.name}
                          </div>
                          <div style={{ fontSize:'.74rem', color:'#9CA3AF' }}>
                            {p.brand}{p.weight ? ` · ${p.weight}` : ''}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Categoría */}
                    <td style={{ padding:'12px 16px' }}>
                      <span style={{ display:'inline-block', padding:'3px 11px', borderRadius:99, fontSize:'.72rem', fontWeight:700, background:'rgba(255,107,53,.1)', color:'#FF6B35', textTransform:'capitalize' }}>
                        {p.category}
                      </span>
                    </td>

                    {/* Precio */}
                    <td style={{ padding:'12px 16px', fontWeight:700, color:'#FF6B35', whiteSpace:'nowrap', fontSize:'.9rem' }}>
                      {formatPrice(p.price)}
                    </td>

                    {/* Stock toggle */}
                    <td style={{ padding:'12px 16px' }}>
                      <button
                        onClick={() => handleToggleStock(p)}
                        title="Click para cambiar stock"
                        style={{
                          display:'inline-flex', alignItems:'center', gap:6,
                          padding:'4px 12px', borderRadius:99, fontSize:'.76rem', fontWeight:700,
                          border:'none', cursor:'pointer', transition:'all .15s ease',
                          background: p.stock ? '#f0fdf4' : '#fef2f2',
                          color: p.stock ? '#22c55e' : '#ef4444',
                        }}
                      >
                        <span style={{ width:7, height:7, borderRadius:'50%', background: p.stock ? '#22c55e' : '#ef4444', flexShrink:0, display:'inline-block' }} />
                        {p.stock ? 'En stock' : 'Sin stock'}
                      </button>
                    </td>

                    {/* Acciones */}
                    <td style={{ padding:'12px 16px' }}>
                      {confirmId === p.id ? (
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <span style={{ fontSize:'.78rem', color:'#6B7280', whiteSpace:'nowrap' }}>¿Eliminar?</span>
                          <button
                            onClick={() => handleDelete(p)}
                            disabled={deleting === p.id}
                            style={{ padding:'5px 12px', background:'#ef4444', color:'#fff', border:'none', borderRadius:6, fontSize:'.78rem', fontWeight:700, cursor:'pointer', whiteSpace:'nowrap', opacity: deleting === p.id ? .6 : 1 }}
                          >
                            {deleting === p.id ? 'Eliminando...' : 'Sí, borrar'}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            style={{ padding:'5px 10px', background:'#f1f5f9', color:'#6B7280', border:'none', borderRadius:6, fontSize:'.78rem', fontWeight:600, cursor:'pointer' }}
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <div style={{ display:'flex', gap:6 }}>
                          <button
                            onClick={() => onEdit(p)}
                            title="Editar"
                            style={{ width:34, height:34, borderRadius:8, background:'#eff6ff', color:'#3b82f6', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'background .15s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#dbeafe')}
                            onMouseLeave={e => (e.currentTarget.style.background = '#eff6ff')}
                          >
                            <IconEdit />
                          </button>
                          <button
                            onClick={() => setConfirmId(p.id)}
                            title="Eliminar"
                            style={{ width:34, height:34, borderRadius:8, background:'#fef2f2', color:'#ef4444', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'background .15s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#fee2e2')}
                            onMouseLeave={e => (e.currentTarget.style.background = '#fef2f2')}
                          >
                            <IconTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Mobile cards ── */}
          <div className="prod-table-mobile" style={{ display:'none', flexDirection:'column', gap:10 }}>
            {filtered.map(p => (
              <div key={p.id} style={{ background:'#fff', borderRadius:12, padding:14, boxShadow:'0 2px 8px rgba(0,0,0,.07)', display:'flex', gap:12, alignItems:'flex-start' }}>
                {/* Thumb */}
                <div style={{ width:54, height:54, borderRadius:10, flexShrink:0, background:'#f8fafc', border:'1px solid #E5E7EB', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                  {p.img
                    ? <Image src={p.img} alt={p.name} width={54} height={54} style={{ objectFit:'contain', width:'100%', height:'100%' }} />
                    : <span style={{ fontSize:'1.6rem' }}>{p.emoji}</span>
                  }
                </div>

                {/* Info */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:700, fontSize:'.9rem', color:'#1B1B2F', marginBottom:2, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</div>
                  <div style={{ fontSize:'.76rem', color:'#6B7280', marginBottom:7 }}>{p.brand} · <strong style={{ color:'#FF6B35' }}>{formatPrice(p.price)}</strong></div>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    <span style={{ padding:'2px 9px', borderRadius:99, fontSize:'.7rem', fontWeight:700, background:'rgba(255,107,53,.1)', color:'#FF6B35', textTransform:'capitalize' }}>
                      {p.category}
                    </span>
                    <button
                      onClick={() => handleToggleStock(p)}
                      style={{ padding:'2px 9px', borderRadius:99, fontSize:'.7rem', fontWeight:700, border:'none', cursor:'pointer', background: p.stock ? '#f0fdf4' : '#fef2f2', color: p.stock ? '#22c55e' : '#ef4444' }}
                    >
                      {p.stock ? '● Stock' : '● Sin stock'}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display:'flex', flexDirection:'column', gap:6, flexShrink:0 }}>
                  <button
                    onClick={() => onEdit(p)}
                    style={{ width:36, height:36, borderRadius:8, background:'#eff6ff', color:'#3b82f6', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
                  >
                    <IconEdit />
                  </button>

                  {confirmId === p.id ? (
                    <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                      <button
                        onClick={() => handleDelete(p)}
                        disabled={deleting === p.id}
                        style={{ width:36, height:36, borderRadius:8, background:'#ef4444', color:'#fff', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.6rem', fontWeight:700 }}
                      >
                        {deleting === p.id ? '...' : '✓'}
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        style={{ width:36, height:36, borderRadius:8, background:'#f1f5f9', color:'#6B7280', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'.6rem', fontWeight:700 }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmId(p.id)}
                      style={{ width:36, height:36, borderRadius:8, background:'#fef2f2', color:'#ef4444', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
                    >
                      <IconTrash />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Count */}
          <div style={{ marginTop:10, fontSize:'.76rem', color:'#9CA3AF', textAlign:'right' }}>
            {filtered.length !== products.length
              ? `${filtered.length} de ${products.length} productos`
              : `${products.length} productos en total`}
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 640px) {
          .prod-table-desktop { display: none !important; }
          .prod-table-mobile  { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
