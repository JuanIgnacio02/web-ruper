'use client'
import { createContext, useState, useCallback, useEffect } from 'react'
import type { ToastMessage, ToastKind } from '@/types'
import { uid } from '@/lib/utils'
import { CONFIG } from '@/lib/config'

interface ToastContextValue {
  showToast: (text: string, kind?: ToastKind) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback((text: string, kind: ToastKind = 'ok') => {
    const id = uid()
    setToasts(prev => [...prev, { id, text, kind }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), CONFIG.TOAST_DURATION)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-[90px] right-6 z-[2000] flex flex-col gap-2.5 pointer-events-none"
      >
        {toasts.map(t => (
          <div
            key={t.id}
            className="bg-dark text-white px-[18px] py-[13px] rounded-[var(--radius-sm)] text-[.84rem] font-medium flex items-center gap-2 shadow-lg pointer-events-auto animate-[toastIn_.3s_ease]"
          >
            {t.kind === 'ok'  && <i className="fas fa-check-circle text-green-500" />}
            {t.kind === 'err' && <i className="fas fa-times-circle text-red-500" />}
            {t.kind === 'info'&& <i className="fas fa-info-circle text-blue-400" />}
            {t.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
