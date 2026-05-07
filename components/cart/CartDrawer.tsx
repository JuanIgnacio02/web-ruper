'use client'
import { useCart } from '@/hooks/useCart'
import CartItem from './CartItem'

export default function CartDrawer() {
  const { items, count, total, totalStr, isOpen, close, sendToWA } = useCart()

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        className={`fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Carrito de pedido"
        style={{ willChange: 'transform' }}
        className={`fixed top-0 right-0 bottom-0 w-[400px] max-w-full bg-white z-[1001] flex flex-col transition-transform duration-300 shadow-[-4px_0_30px_rgba(0,0,0,.1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <i className="fas fa-shopping-cart text-[var(--primary)]" /> Mi Pedido
          </h2>
          <button onClick={close} aria-label="Cerrar carrito" className="w-9 h-9 rounded-full hover:bg-[var(--light)] flex items-center justify-center text-[var(--gray)] transition-colors">
            <i className="fas fa-times" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-[var(--gray)]">
              <i className="fas fa-shopping-basket text-5xl opacity-30" />
              <h3 className="font-bold text-lg text-[var(--dark)]">Tu pedido está vacío</h3>
              <p className="text-[.88rem]">Agregá productos desde el catálogo</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map(item => <CartItem key={item.name} item={item} />)}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[var(--border)]">
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex justify-between text-[.88rem] text-[var(--gray)]">
                <span>Subtotal</span><span>{totalStr}</span>
              </div>
              <div className="flex justify-between text-[.88rem] text-[var(--gray)]">
                <span>Entrega</span><span>A coordinar por WhatsApp</span>
              </div>
              <div className="flex justify-between font-bold text-[var(--dark)] pt-2 border-t border-[var(--border)]">
                <span>Total del pedido</span><span className="text-[var(--primary)]">{totalStr}</span>
              </div>
            </div>
            <button
              onClick={sendToWA}
              className="w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 rounded-[50px] flex items-center justify-center gap-2.5 transition-all text-[.95rem]"
            >
              <i className="fab fa-whatsapp text-[1.2rem]" />
              Enviar pedido por WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  )
}
