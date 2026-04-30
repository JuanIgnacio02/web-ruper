import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Combina clases de Tailwind sin conflictos */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Formatea precio en pesos argentinos */
export function formatPrice(amount: number): string {
  return '$' + amount.toLocaleString('es-AR')
}

/** Escapa caracteres HTML peligrosos */
export function escHtml(str: string | null | undefined): string {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Genera un ID único simple para toasts */
export function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}
