import type { CartItem } from '@/types'
import { CONFIG } from './config'
import { formatPrice } from './utils'

export function buildWhatsAppMessage(items: CartItem[]): string {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  let msg = `🛒 *Hola ${CONFIG.STORE_NAME}! Quiero hacer el siguiente pedido:*\n\n`

  items.forEach((item, i) => {
    msg += `${i + 1}. ${item.emoji} *${item.name}*\n`
    msg += `   Cantidad: ${item.qty} unidad${item.qty > 1 ? 'es' : ''}\n`
    msg += `   Subtotal: ${formatPrice(item.price * item.qty)}\n\n`
  })

  msg += `━━━━━━━━━━━━━━━━━━\n`
  msg += `💰 *TOTAL: ${formatPrice(total)}*\n\n`
  msg += `📍 Por favor coordinar entrega / retiro en ${CONFIG.CITY}.\n`
  msg += `¡Gracias! 🐾`

  return msg
}

export function buildWhatsAppUrl(items: CartItem[]): string {
  const msg = buildWhatsAppMessage(items)
  return `https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(msg)}`
}
