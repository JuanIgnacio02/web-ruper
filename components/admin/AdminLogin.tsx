'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLogin() {
  const router   = useRouter()
  const [pw, setPw]         = useState('')
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      const { error: msg } = await res.json()
      setError(msg ?? 'Contraseña incorrecta')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--dark)] to-[var(--dark-2)] flex items-center justify-center px-4">
      <div className="w-full max-w-[360px] bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-8">
          <Image src="/img/logo.svg" alt="RUPER" width={56} height={56} className="rounded-full mb-3" />
          <div className="font-[var(--font-fredoka)] text-[var(--dark)] tracking-[2px] text-[1.5rem]">ruper</div>
          <p className="text-[var(--gray)] text-[.8rem] mt-0.5">Panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[.78rem] font-bold text-[var(--dark)] uppercase tracking-wide block mb-1.5">Contraseña</label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              required
              autoFocus
              placeholder="••••••••"
              className="w-full border border-[var(--border)] rounded-xl px-4 py-3 text-[.9rem] focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
            />
          </div>
          {error && (
            <p className="text-red-500 text-[.82rem] flex items-center gap-1.5">
              <i className="fas fa-times-circle" /> {error}
            </p>
          )}
          <button type="submit" disabled={loading}
            className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
            <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fa-sign-in-alt'}`} />
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
