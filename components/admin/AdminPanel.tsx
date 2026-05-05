'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Product } from '@/types'
import ProductTable from './ProductTable'
import ProductForm  from './ProductForm'
import { formatPrice } from '@/lib/utils'

type View = 'dashboard' | 'products' | 'new' | 'edit'

interface Toast { id: number; msg: string; type: 'ok' | 'err' | 'warn' }

export default function AdminPanel({ initialProducts }: { initialProducts: Product[] }) {
  const router = useRouter()
  const [products, setProducts]   = useState<Product[]>(initialProducts)
  const [view,     setView]       = useState<View>('dashboard')
  const [editing,  setEditing]    = useState<Product | null>(null)
  const [sideOpen, setSideOpen]   = useState(false)
  const [toasts,   setToasts]     = useState<Toast[]>([])

  const toast = useCallback((msg: string, type: Toast['type'] = 'ok') => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200)
  }, [])

  const navTo = (v: View) => {
    setView(v)
    setSideOpen(false)
    if (v !== 'edit') setEditing(null)
  }

  const startEdit = (p: Product) => {
    setEditing(p)
    setView('edit')
    setSideOpen(false)
  }

  const onSaved = (p: Product) => {
    setProducts(prev => {
      const idx = prev.findIndex(x => x.id === p.id)
      return idx >= 0 ? prev.map(x => x.id === p.id ? p : x) : [p, ...prev]
    })
    toast(view === 'edit' ? `✏️ "${p.name}" actualizado` : `✅ "${p.name}" agregado`)
    navTo('products')
  }

  const onDeleted = (id: number) => {
    const name = products.find(p => p.id === id)?.name ?? 'Producto'
    setProducts(prev => prev.filter(p => p.id !== id))
    toast(`🗑️ "${name}" eliminado`, 'warn')
  }

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
  }

  // Stats
  const total    = products.length
  const inStock  = products.filter(p => p.stock).length
  const cats     = new Set(products.map(p => p.category)).size
  const featured = products.filter(p => p.featured).length

  const navItems: { id: View; icon: string; label: string; badge?: number }[] = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { id: 'products',  icon: '📦', label: 'Productos', badge: total },
    { id: 'new',       icon: '➕', label: 'Agregar producto' },
  ]

  return (
    <>
      {/* ── Toasts ── */}
      <div style={{ position:'fixed', bottom:28, right:28, zIndex:9999, display:'flex', flexDirection:'column', gap:10, pointerEvents:'none' }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            display:'flex', alignItems:'center', gap:12,
            padding:'13px 18px', background:'#1e293b', color:'#fff',
            borderRadius:10, fontSize:'.88rem', fontWeight:500,
            boxShadow:'0 8px 28px rgba(0,0,0,.28)',
            borderLeft:`4px solid ${t.type==='ok'?'#22c55e':t.type==='err'?'#ef4444':'#f59e0b'}`,
            animation:'toastIn .3s ease', maxWidth:320, minWidth:220,
          }}>
            {t.msg}
          </div>
        ))}
      </div>

      <div style={{ display:'flex', minHeight:'100vh', background:'#f0f2f5' }}>

        {/* ── Sidebar overlay (mobile) ── */}
        {sideOpen && (
          <div
            onClick={() => setSideOpen(false)}
            style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:190 }}
          />
        )}

        {/* ── Sidebar ── */}
        <aside style={{
          position:'fixed', top:0, left:0, width:260, height:'100vh',
          background:'#13161f', display:'flex', flexDirection:'column',
          zIndex:200, overflowY:'auto',
          transition:'transform .28s ease',
        }}
          className={`admin-sidebar${sideOpen ? ' open-mobile' : ''}`}
        >
          {/* Logo */}
          <div style={{ padding:'22px 22px 18px', display:'flex', alignItems:'center', gap:12, borderBottom:'1px solid rgba(255,255,255,.07)' }}>
            <Image src="/img/logo.svg" alt="RUPER" width={36} height={36} className="rounded-full flex-shrink-0" />
            <div>
              <div style={{ fontSize:'1.05rem', fontWeight:800, color:'#fff', letterSpacing:'.04em' }}>RUPER</div>
              <div style={{ fontSize:'.68rem', color:'rgba(255,255,255,.38)', textTransform:'uppercase', letterSpacing:'.08em' }}>Panel Admin</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex:1, padding:'16px 12px' }}>
            <div style={{ fontSize:'.68rem', fontWeight:700, color:'rgba(255,255,255,.28)', textTransform:'uppercase', letterSpacing:'.1em', padding:'8px 10px 6px' }}>
              Principal
            </div>
            {navItems.map(n => (
              <button
                key={n.id}
                onClick={() => navTo(n.id)}
                style={{
                  display:'flex', alignItems:'center', gap:11,
                  padding:'10px 14px', borderRadius:8,
                  color: view === n.id ? '#fff' : 'rgba(255,255,255,.6)',
                  background: view === n.id ? '#FF6B35' : 'transparent',
                  fontWeight: view === n.id ? 600 : 500,
                  fontSize:'.9rem', cursor:'pointer', border:'none',
                  width:'100%', textAlign:'left', marginBottom:2,
                  transition:'all .2s ease',
                }}
              >
                <span style={{ fontSize:'1rem', width:22, textAlign:'center', flexShrink:0 }}>{n.icon}</span>
                <span style={{ flex:1 }}>{n.label}</span>
                {n.badge !== undefined && (
                  <span style={{
                    background: view === n.id ? 'rgba(255,255,255,.25)' : 'rgba(255,107,53,.22)',
                    color: view === n.id ? '#fff' : '#FF6B35',
                    fontSize:'.7rem', fontWeight:700, padding:'2px 8px',
                    borderRadius:99, minWidth:22, textAlign:'center',
                  }}>{n.badge}</span>
                )}
              </button>
            ))}

            <div style={{ fontSize:'.68rem', fontWeight:700, color:'rgba(255,255,255,.28)', textTransform:'uppercase', letterSpacing:'.1em', padding:'16px 10px 6px' }}>
              Sistema
            </div>
            <a
              href="/"
              target="_blank"
              style={{
                display:'flex', alignItems:'center', gap:11,
                padding:'10px 14px', borderRadius:8,
                color:'rgba(255,255,255,.6)', fontSize:'.9rem',
                fontWeight:500, textDecoration:'none',
              }}
            >
              <span style={{ fontSize:'1rem', width:22, textAlign:'center' }}>🌐</span>
              Ver sitio web
            </a>
          </nav>

          {/* Footer */}
          <div style={{ padding:'14px 12px', borderTop:'1px solid rgba(255,255,255,.07)' }}>
            <button
              onClick={handleLogout}
              style={{
                display:'flex', alignItems:'center', gap:10, width:'100%',
                padding:'10px 14px', borderRadius:8,
                background:'rgba(239,68,68,.12)', color:'#f87171',
                border:'none', fontSize:'.88rem', fontWeight:600, cursor:'pointer',
              }}
            >
              <span>🚪</span> Cerrar sesión
            </button>
            <div style={{ fontSize:'.68rem', color:'rgba(255,255,255,.18)', textAlign:'center', marginTop:10 }}>
              v2.0 · RUPER Admin
            </div>
          </div>
        </aside>

        {/* ── Main ── */}
        <div className="admin-main" style={{ flex:1, minHeight:'100vh', padding:'32px 28px' }}>

          {/* Mobile topbar */}
          <div className="admin-topbar" style={{
            display:'none', position:'fixed', top:0, left:0, right:0,
            height:64, background:'#13161f', alignItems:'center',
            padding:'0 16px', gap:14, zIndex:300, boxShadow:'0 2px 12px rgba(0,0,0,.2)',
          }}>
            <button
              onClick={() => setSideOpen(true)}
              style={{ background:'none', border:'none', color:'#fff', fontSize:'1.4rem', cursor:'pointer', padding:4 }}
            >
              ☰
            </button>
            <span style={{ fontSize:'1.05rem', fontWeight:800, color:'#fff', letterSpacing:'.04em' }}>RUPER Admin</span>
          </div>

          {/* ─── DASHBOARD ─── */}
          {view === 'dashboard' && (
            <div>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, marginBottom:28, flexWrap:'wrap' }}>
                <div>
                  <h2 style={{ fontSize:'1.55rem', fontWeight:800, color:'#1B1B2F', lineHeight:1.2 }}>Dashboard</h2>
                  <p style={{ fontSize:'.88rem', color:'#6B7280', marginTop:3 }}>Resumen general del catálogo RUPER</p>
                </div>
                <button
                  onClick={() => navTo('new')}
                  style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'9px 18px', borderRadius:8, background:'#FF6B35', color:'#fff', fontWeight:600, fontSize:'.88rem', border:'none', cursor:'pointer' }}
                >
                  ➕ Nuevo producto
                </button>
              </div>

              {/* Stats */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:18, marginBottom:28 }}>
                {[
                  { icon:'📦', color:'rgba(255,107,53,.13)', val: total,    label:'Total productos' },
                  { icon:'✅', color:'rgba(34,197,94,.13)',   val: inStock,  label:'En stock' },
                  { icon:'🏷️', color:'rgba(139,92,246,.13)',  val: cats,     label:'Categorías activas' },
                  { icon:'⭐', color:'rgba(59,130,246,.13)',   val: featured, label:'Destacados' },
                ].map((s, i) => (
                  <div key={i} style={{
                    background:'#fff', borderRadius:14, padding:'22px 20px',
                    boxShadow:'0 2px 12px rgba(0,0,0,.07)',
                    display:'flex', alignItems:'flex-start', gap:16,
                  }}>
                    <div style={{ width:50, height:50, borderRadius:12, background:s.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', flexShrink:0 }}>
                      {s.icon}
                    </div>
                    <div>
                      <div style={{ fontSize:'1.9rem', fontWeight:800, color:'#1B1B2F', lineHeight:1, marginBottom:4 }}>{s.val}</div>
                      <div style={{ fontSize:'.8rem', color:'#6B7280', fontWeight:500 }}>{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom grid */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:22 }} className="admin-dash-grid">
                {/* Quick actions */}
                <div style={{ background:'#fff', borderRadius:14, boxShadow:'0 2px 12px rgba(0,0,0,.07)', overflow:'hidden' }}>
                  <div style={{ padding:'16px 20px', borderBottom:'1px solid #E5E7EB', fontWeight:700, color:'#1B1B2F', display:'flex', alignItems:'center', gap:8 }}>
                    ⚡ Acciones rápidas
                  </div>
                  <div style={{ padding:20, display:'flex', flexDirection:'column', gap:10 }}>
                    {[
                      { label:'➕ Agregar producto', action: () => navTo('new'),      style:{ background:'#FF6B35', color:'#fff' } },
                      { label:'📋 Ver todos los productos', action: () => navTo('products'), style:{ background:'#f1f5f9', color:'#1B1B2F' } },
                    ].map((b, i) => (
                      <button key={i} onClick={b.action} style={{
                        ...b.style, width:'100%', padding:'9px 18px',
                        borderRadius:8, fontWeight:600, fontSize:'.88rem',
                        border:'none', cursor:'pointer',
                        display:'flex', alignItems:'center', justifyContent:'center', gap:7,
                      }}>
                        {b.label}
                      </button>
                    ))}
                    <a href="/" target="_blank" style={{
                      background:'#f1f5f9', color:'#1B1B2F', width:'100%', padding:'9px 18px',
                      borderRadius:8, fontWeight:600, fontSize:'.88rem',
                      textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center', gap:7,
                    }}>
                      🌐 Ver sitio web
                    </a>
                  </div>
                </div>

                {/* Recent products */}
                <div style={{ background:'#fff', borderRadius:14, boxShadow:'0 2px 12px rgba(0,0,0,.07)', overflow:'hidden' }}>
                  <div style={{ padding:'16px 20px', borderBottom:'1px solid #E5E7EB', fontWeight:700, color:'#1B1B2F', display:'flex', alignItems:'center', gap:8 }}>
                    🕐 Últimos productos
                  </div>
                  <div style={{ padding:'0 20px' }}>
                    {products.slice(0, 6).map((p, i) => (
                      <div key={p.id} style={{
                        display:'flex', alignItems:'center', gap:14,
                        padding:'13px 0',
                        borderBottom: i < Math.min(products.length, 6) - 1 ? '1px solid #E5E7EB' : 'none',
                      }}>
                        <span style={{ fontSize:'1.4rem', flexShrink:0 }}>{p.emoji}</span>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:'.88rem', fontWeight:600, color:'#1B1B2F', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.name}</div>
                          <div style={{ fontSize:'.76rem', color:'#6B7280' }}>{p.category} · {formatPrice(p.price)}</div>
                        </div>
                        <div style={{
                          padding:'3px 10px', borderRadius:99, fontSize:'.72rem', fontWeight:700,
                          background: p.stock ? '#f0fdf4' : '#fef2f2',
                          color: p.stock ? '#22c55e' : '#ef4444',
                        }}>
                          {p.stock ? 'Stock' : 'Sin stock'}
                        </div>
                      </div>
                    ))}
                    {products.length === 0 && (
                      <p style={{ padding:'24px 0', color:'#6B7280', fontSize:'.88rem', textAlign:'center' }}>Sin productos aún</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── PRODUCTS ─── */}
          {view === 'products' && (
            <div>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, marginBottom:24, flexWrap:'wrap' }}>
                <div>
                  <h2 style={{ fontSize:'1.55rem', fontWeight:800, color:'#1B1B2F' }}>Productos</h2>
                  <p style={{ fontSize:'.88rem', color:'#6B7280', marginTop:3 }}>{total} productos en el catálogo</p>
                </div>
                <button
                  onClick={() => navTo('new')}
                  style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'9px 18px', borderRadius:8, background:'#FF6B35', color:'#fff', fontWeight:600, fontSize:'.88rem', border:'none', cursor:'pointer' }}
                >
                  ➕ Agregar
                </button>
              </div>
              <ProductTable products={products} onEdit={startEdit} onDeleted={onDeleted} onNew={() => navTo('new')} />
            </div>
          )}

          {/* ─── FORM (add / edit) ─── */}
          {(view === 'new' || view === 'edit') && (
            <div>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, marginBottom:24, flexWrap:'wrap' }}>
                <div>
                  <h2 style={{ fontSize:'1.55rem', fontWeight:800, color:'#1B1B2F' }}>
                    {view === 'edit' ? '✏️ Editar producto' : '➕ Agregar producto'}
                  </h2>
                  <p style={{ fontSize:'.88rem', color:'#6B7280', marginTop:3 }}>
                    {view === 'edit' ? `Editando: ${editing?.name}` : 'Completá los campos para agregar al catálogo'}
                  </p>
                </div>
                <button
                  onClick={() => navTo('products')}
                  style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'9px 18px', borderRadius:8, background:'#f1f5f9', color:'#1B1B2F', fontWeight:600, fontSize:'.88rem', border:'none', cursor:'pointer' }}
                >
                  ← Volver
                </button>
              </div>
              <ProductForm product={editing} onSaved={onSaved} />
            </div>
          )}
        </div>
      </div>

      <style>{`
        .admin-sidebar { display: flex !important; }
        @media (max-width: 768px) {
          .admin-sidebar {
            transform: translateX(-100%);
          }
          .admin-sidebar.open-mobile {
            transform: translateX(0) !important;
          }
          .admin-main {
            margin-left: 0 !important;
            padding: 80px 16px 24px !important;
          }
          .admin-topbar {
            display: flex !important;
          }
          .admin-dash-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) {
          .admin-main {
            margin-left: 260px;
          }
        }
        @keyframes toastIn {
          from { opacity:0; transform: translateY(16px) scale(.95); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  )
}
