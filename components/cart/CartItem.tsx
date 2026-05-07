'use client'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'
import type { CartItem as CartItemType } from '@/types'

export default function CartItem({ item }: { item: CartItemType }) {
  const { changeQty, remove } = useCart()

  return (
    <div className="flex gap-3 p-3 bg-[var(--light)] rounded-xl">
      <div className="w-12 h-12 flex items-center justify-center text-2xl flex-shrink-0 bg-white rounded-lg">
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[.88rem] text-[var(--dark)] truncate">{item.name}</div>
        <div className="text-[.75rem] text-[var(--gray)] mb-2">{item.cat}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-white rounded-lg border border-[var(--border)] p-1">
            <button
              onClick={() => changeQty(item.name, -1)}
              aria-label="Reducir cantidad"
              className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--gray)] hover:bg-[var(--light)] transition-colors text-xs"
            >
              <i className="fas fa-minus" />
            </button>
            <span className="font-bold text-[.88rem] text-[var(--dark)] min-w-[20px] text-center">{item.qty}</span>
            <button
              onClick={() => changeQty(item.name, +1)}
              aria-label="Aumentar cantidad"
              className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--gray)] hover:bg-[var(--light)] transition-colors text-xs"
            >
              <i className="fas fa-plus" />
            </button>
          </div>
          <span className="font-bold text-[.92rem] text-[var(--primary)]">{formatPrice(item.price * item.qty)}</span>
        </div>
        <button
          onClick={() => remove(item.name)}
          aria-label={`Quitar ${item.name} del pedido`}
          className="mt-1.5 text-[.72rem] text-[var(--gray)] hover:text-red-500 transition-colors flex items-center gap-1"
        >
          <i className="fas fa-trash-alt" /> Quitar
        </button>
      </div>
    </div>
  )
}
