import { CONFIG } from '@/lib/config'

export default function ContactSection() {
  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="max-w-[1300px] mx-auto px-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* Info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[var(--primary)]/8 text-[var(--primary)] px-[18px] py-2 rounded-full text-[.74rem] font-bold uppercase tracking-[1.5px] mb-4">
              <i className="fas fa-map-marker-alt" /> Encontranos
            </div>
            <h2 className="text-[clamp(1.8rem,2.5vw,2.4rem)] font-black text-[var(--dark)] mb-4">Estamos en el corazón de Malargüe</h2>
            <p className="text-[var(--gray)] text-[.96rem] leading-relaxed mb-8">
              Visitanos en nuestro local o contactanos por WhatsApp. Estamos disponibles de lunes a sábado para atenderte.
            </p>

            <div className="flex flex-col gap-5">
              {[
                { ico: 'fa-map-marker-alt', color: 'text-[var(--primary)]', title: 'Local 1 — Ortega',
                  content: 'Av. Rufino Ortega 602, Malargüe, Mendoza',
                  link: { href: 'https://maps.google.com/?q=Av.+Rufino+Ortega+602,+Malargüe,+Mendoza', label: '📍 Ver en Google Maps →' } },
                { ico: 'fa-map-marker-alt', color: 'text-[var(--primary)]', title: 'Local 2 — Maza',
                  content: 'Av. Juan Agustín Maza 2249, Malargüe, Mendoza',
                  link: { href: 'https://maps.google.com/?q=Av.+Juan+Agustín+Maza+2249,+Malargüe,+Mendoza', label: '📍 Ver en Google Maps →' } },
                { ico: 'fa-whatsapp fab', color: 'text-green-500', title: 'WhatsApp',
                  content: `+54 9 2604 34-2179 · Pedidos y consultas`,
                  link: { href: `https://wa.me/${CONFIG.WA_NUMBER}`, label: 'Escribinos →' } },
                { ico: 'fa-clock', color: 'text-[var(--gray)]', title: 'Horario de atención',
                  content: 'Lun–Vie: 8:30 a 13:00 · 17:00 a 21:00 | Sáb: 9:00 a 13:00' },
                { ico: 'fa-instagram fab', color: 'text-pink-500', title: 'Instagram',
                  content: '@ruper_malargue',
                  link: { href: 'https://www.instagram.com/ruper_malargue/', label: 'Seguinos →' } },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[var(--light)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className={`${item.ico.includes('fab') ? '' : 'fas'} ${item.ico} ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[var(--dark)] text-[.9rem] mb-0.5">{item.title}</h4>
                    <p className="text-[var(--gray)] text-[.85rem]">{item.content}</p>
                    {item.link && (
                      <a href={item.link.href} target="_blank" rel="noopener" className="text-[.78rem] text-[var(--primary)] hover:underline mt-0.5 inline-block">
                        {item.link.label}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mapas */}
          <div className="flex flex-col gap-3">
            {[
              { label: '📍 Local 1 — Av. Rufino Ortega 602', q: 'Av.+Rufino+Ortega+602,+Malarg%C3%BCe,+Mendoza,+Argentina' },
              { label: '📍 Local 2 — Av. Juan Agustín Maza 2249', q: 'Av.+Juan+Agust%C3%ADn+Maza+2249,+Malarg%C3%BCe,+Mendoza,+Argentina' },
            ].map(m => (
              <div key={m.q} className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,.1)]">
                <div className="bg-[var(--light)] px-3.5 py-2 text-[.75rem] font-bold text-[#555]">{m.label}</div>
                <iframe
                  src={`https://maps.google.com/maps?q=${m.q}&output=embed`}
                  width="100%" height="200"
                  style={{ border: 'none', display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={m.label}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
