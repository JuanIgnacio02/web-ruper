import { CONFIG } from '@/lib/config'

export default function WaFloat() {
  return (
    <div className="fixed bottom-[30px] right-[30px] z-[998]">
      <a
        href={`https://wa.me/${CONFIG.WA_NUMBER}?text=Hola%20RUPER!%20Me%20gustar%C3%ADa%20hacer%20una%20consulta.`}
        target="_blank"
        rel="noopener"
        aria-label="Contactar por WhatsApp"
        className="w-[58px] h-[58px] bg-[#25D366] rounded-full flex items-center justify-center text-white text-[1.6rem] shadow-[0_4px_20px_rgba(37,211,102,.4)] transition-all hover:scale-110 hover:shadow-[0_8px_30px_rgba(37,211,102,.55)] [animation:waPulse_2s_ease-in-out_infinite]"
      >
        <i className="fab fa-whatsapp" />
      </a>
    </div>
  )
}
