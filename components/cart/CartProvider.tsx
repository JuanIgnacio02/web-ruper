'use client'
import { createContext, useReducer, useState, useCallback, useMemo } from 'react'
import type { CartItem, CartAction } from '@/types'
import { formatPrice } from '@/lib/utils'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

// ─── Reducer ────────────────────────────────────────────

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.name === action.payload.name)
      if (existing) return state.map(i => i.name === action.payload.name ? { ...i, qty: i.qty + 1 } : i)
      return [...state, { ...action.payload, qty: 1 }]
    }
    case 'CHANGE_QTY': {
      return state
        .map(i => i.name === action.payload.name ? { ...i, qty: i.qty + action.payload.delta } : i)
        .filter(i => i.qty > 0)
    }
    case 'REMOVE':
      return state.filter(i => i.name !== action.payload.name)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

// ─── Context ────────────────────────────────────────────

interface CartContextValue {
  items:       CartItem[]
  count:       number
  total:       number
  totalStr:    string
  isOpen:      boolean
  open:        () => void
  close:       () => void
  add:         (item: Omit<CartItem, 'qty'>) => void
  changeQty:   (name: string, delta: number) => void
  remove:      (name: string) => void
  clear:       () => void
  sendToWA:    () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, [])
  const [isOpen, setIsOpen] = useState(false)

  // useMemo: los reduce() corren una sola vez por cambio de `items`,
  // no en cada render del árbol bajo CartProvider.
  const count    = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items])
  const total    = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items])
  const totalStr = useMemo(() => formatPrice(total), [total])

  const open      = useCallback(() => setIsOpen(true),  [])
  const close     = useCallback(() => setIsOpen(false), [])
  const add       = useCallback((item: Omit<CartItem, 'qty'>) => dispatch({ type: 'ADD',        payload: item }), [])
  const changeQty = useCallback((name: string, delta: number) => dispatch({ type: 'CHANGE_QTY', payload: { name, delta } }), [])
  const remove    = useCallback((name: string) => dispatch({ type: 'REMOVE', payload: { name } }), [])
  const clear     = useCallback(() => dispatch({ type: 'CLEAR' }), [])
  const sendToWA  = useCallback(() => {
    if (!items.length) return
    window.open(buildWhatsAppUrl(items), '_blank')
  }, [items])

  // useMemo en el value del contexto: evita que todos los consumidores
  // se re-rendericen cuando CartProvider re-renderiza por razones externas.
  const value = useMemo<CartContextValue>(() => ({
    items, count, total, totalStr, isOpen,
    open, close, add, changeQty, remove, clear, sendToWA,
  }), [items, count, total, totalStr, isOpen, open, close, add, changeQty, remove, clear, sendToWA])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
