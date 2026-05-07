'use client'
import { useEffect, useRef } from 'react'

export default function Loader() {
  const loaderRef  = useRef<HTMLDivElement>(null)
  const fillRef    = useRef<HTMLDivElement>(null)
  const logoRef    = useRef<HTMLDivElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const loader = loaderRef.current
    if (!loader) return

    // Solo mostrar en la primera visita de la sesión
    if (sessionStorage.getItem('ruper_visited')) {
      loader.style.display = 'none'
      return
    }
    sessionStorage.setItem('ruper_visited', '1')

    // Importar GSAP dinámicamente (solo en client)
    import('gsap').then(({ gsap }) => {
      gsap.set(logoRef.current,  { opacity: 0, y: 24 })
      gsap.set(subRef.current,   { opacity: 0, y: 10 })
      gsap.set(fillRef.current,  { scaleX: 0, transformOrigin: 'left center' })

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loader, {
            opacity: 0, duration: 0.5, ease: 'power2.inOut',
            onComplete: () => loader.classList.add('hidden'),
          })
        },
      })

      tl.to(logoRef.current,  { opacity: 1, y: 0, duration: 0.5,  ease: 'power3.out' })
        .to(subRef.current,   { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }, '-=0.15')
        .to(fillRef.current,  { scaleX: 1, duration: 1.1, ease: 'power1.inOut' }, '-=0.1')
        .to({}, { duration: 0.2 })
    })
  }, [])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-[var(--dark)] flex items-center justify-center"
    >
      <div className="text-center">
        <div
          ref={logoRef}
          className="font-[var(--font-fredoka)] text-white tracking-[4px] text-[2.4rem] mb-2"
        >
          ruper
        </div>
        <p ref={subRef} className="text-white/50 text-[.82rem] mb-6">Alimentos Balanceados · Malargüe</p>
        <div className="w-[160px] h-1 bg-white/10 rounded-full overflow-hidden mx-auto">
          <div ref={fillRef} className="h-full bg-[var(--primary)] rounded-full" />
        </div>
      </div>
    </div>
  )
}
