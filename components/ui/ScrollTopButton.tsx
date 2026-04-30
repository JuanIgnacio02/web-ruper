'use client'
import { useState, useEffect } from 'react'

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver al inicio"
      className={`fixed bottom-[100px] right-[30px] z-[997] w-11 h-11 bg-[var(--dark)] text-white rounded-xl flex items-center justify-center text-[.95rem] cursor-pointer transition-all hover:bg-[var(--primary)] hover:-translate-y-0.5 ${
        visible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
    >
      <i className="fas fa-arrow-up" />
    </button>
  )
}
