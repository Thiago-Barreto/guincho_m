'use client'

import { useState } from 'react'
import { site } from '@/lib/site'
import { IconeWhatsApp } from '@/components/ui/Icones'

/**
 * CLIENT COMPONENT 1 de 4. Justificativa: navigator.geolocation.
 *
 * Está na FOLHA da árvore — não envolve nenhum outro componente. O Hero que
 * o renderiza continua sendo Server Component.
 *
 * DEGRADAÇÃO: renderiza como link comum do WhatsApp e SÓ pede a localização
 * quando o usuário toca. Se a permissão for negada, houver erro ou timeout,
 * o link original é seguido — o usuário nunca fica sem WhatsApp por causa
 * disso. Nada é solicitado no carregamento da página: pedir GPS sem uma ação
 * do usuário gera um prompt do navegador que assusta quem já está em pânico.
 */
export function BotaoWhatsAppComLocal({ hrefPadrao }: { hrefPadrao: string }) {
  const [obtendo, setObtendo] = useState(false)

  function aoClicar(evento: React.MouseEvent<HTMLAnchorElement>) {
    if (typeof navigator === 'undefined' || !navigator.geolocation) return
    if (obtendo) return

    // Segura a navegação só o tempo do GPS responder.
    evento.preventDefault()
    setObtendo(true)

    const abrir = (url: string) => {
      setObtendo(false)
      window.open(url, '_blank', 'noopener,noreferrer')
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        const mapa = `https://maps.google.com/?q=${latitude},${longitude}`
        const texto = `Olá! Preciso de um guincho em Manaus. Minha localização: ${mapa}`
        abrir(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`)
      },
      // Negado, indisponível ou expirado: segue o link comum.
      () => abrir(hrefPadrao),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 60_000 },
    )
  }

  return (
    <a
      href={hrefPadrao}
      target="_blank"
      rel="noopener noreferrer"
      onClick={aoClicar}
      aria-busy={obtendo}
      className="btn btn-zap flex-1 sm:flex-initial"
    >
      <IconeWhatsApp />
      {obtendo ? 'Obtendo local…' : 'WhatsApp'}
    </a>
  )
}
