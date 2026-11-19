'use client'

import { useEffect, useRef, useState } from 'react'
import type { Posicao } from '@/lib/rastreamento'

/**
 * CLIENT COMPONENT — folha da árvore, carregado só via import dinâmico
 * a partir de MapaRastreamento. Nada o importa estaticamente.
 *
 * TRANSPORTE DO TEMPO REAL — decisão e motivo:
 *
 * Função serverless da Vercel não sustenta conexão longa, e WebSocket
 * próprio exigiria um servidor persistente com custo fixo. Para o volume
 * deste negócio, polling a cada 10 segundos resolve: um guincho no trânsito
 * de Manaus não se move rápido o suficiente para justificar 60 atualizações
 * por minuto.
 *
 * Se o volume crescer, o caminho é trocar o setInterval abaixo por um canal
 * do Supabase Realtime ou Pusher — o resto do componente não muda.
 *
 * O intervalo pausa quando a aba sai de foco: manter polling em aba oculta
 * gasta bateria do cliente que já está numa situação ruim.
 */
const INTERVALO_MS = 10_000

export function MapaCanvas({ posicao: inicial }: { posicao: Posicao }) {
  const container = useRef<HTMLDivElement>(null)
  const [posicao, setPosicao] = useState(inicial)

  // TODO: instalar maplibre-gl e inicializar o mapa aqui.
  // O container abaixo já reserva a altura final, então adicionar o mapa
  // depois não desloca nada na página.
  useEffect(() => {
    let ativo = true
    let timer: ReturnType<typeof setInterval> | null = null

    async function buscar() {
      if (document.hidden) return
      try {
        const r = await fetch(`/api/posicao?id=${encodeURIComponent(location.pathname.split('/').pop() ?? '')}`, {
          cache: 'no-store',
        })
        if (!r.ok) return
        const nova = (await r.json()) as Posicao
        if (ativo) setPosicao(nova)
      } catch {
        // Falha de rede não derruba a tela: o painel de texto do servidor
        // continua mostrando a última atualização conhecida.
      }
    }

    timer = setInterval(buscar, INTERVALO_MS)

    return () => {
      ativo = false
      if (timer) clearInterval(timer)
    }
  }, [])

  return (
    <div
      ref={container}
      className="h-[420px] w-full bg-asfalto"
      role="img"
      aria-label={`Mapa com a posição do guincho em ${posicao.lat.toFixed(4)}, ${posicao.lng.toFixed(4)}`}
    />
  )
}
