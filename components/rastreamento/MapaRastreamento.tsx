'use client'

import dynamic from 'next/dynamic'
import type { Posicao } from '@/lib/rastreamento'

/**
 * CLIENT COMPONENT 3 de 4. Justificativa: mapa interativo com marcador que
 * se move — não existe equivalente em servidor.
 *
 * Este arquivo é só o WRAPPER do import dinâmico. O peso real (MapLibre)
 * fica em MapaCanvas e só é baixado quando este componente monta.
 *
 * BIBLIOTECA: MapLibre GL JS (~40KB) no lugar da Google Maps JS API
 * (200KB+ e cobrança por carregamento). O caso de uso é um marcador se
 * movendo sobre um mapa; não precisa do ecossistema do Google.
 *
 * IMPACTO NO LCP: zero nas páginas indexadas. Como o import é dinâmico e
 * este componente só existe em /rastreamento/[id] — que é noindex — o peso
 * fica contido em quem já é cliente e já está esperando.
 *
 * ssr:false porque MapLibre toca window/document no construtor.
 */
const MapaCanvas = dynamic(
  () => import('./MapaCanvas').then((m) => m.MapaCanvas),
  {
    ssr: false,
    // Placeholder com a MESMA altura do mapa final: CLS zero na troca.
    loading: () => (
      <div
        className="flex h-[420px] w-full items-center justify-center bg-asfalto text-texto-claro"
        role="status"
      >
        Carregando o mapa…
      </div>
    ),
  },
)

export function MapaRastreamento({ posicao }: { posicao: Posicao }) {
  return <MapaCanvas posicao={posicao} />
}
