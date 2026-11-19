import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  buscarAtendimento,
  idValido,
  minutosDesde,
  posicaoConfiavel,
  LIMITE_POSICAO_MIN,
} from '@/lib/rastreamento'
import { PainelRastreamento } from '@/components/rastreamento/PainelRastreamento'

/**
 * SERVER COMPONENT · force-dynamic · noindex, nofollow.
 *
 * Esta rota carrega dado pessoal em tempo real. Ela NUNCA pode entrar em
 * índice, em sitemap ou em cache de CDN. São três defesas independentes:
 *
 *   1. metadata.robots aqui (noindex, nofollow)
 *   2. header X-Robots-Tag + Cache-Control: no-store no next.config.ts
 *   3. a rota é excluída do app/sitemap.ts
 *
 * Nenhuma sozinha basta: o header cobre o que o crawler busca antes de ler
 * o HTML, o metadata cobre o que renderiza, o sitemap cobre o que é
 * oferecido ativamente.
 */
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Acompanhamento do atendimento',
  robots: { index: false, follow: false, nocache: true },
}

export default async function RastreamentoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // 404 para formato inválido, sem revelar se o ID existe ou não —
  // a resposta é idêntica nos dois casos, o que não dá pista a quem itera.
  if (!idValido(id)) notFound()

  const atendimento = await buscarAtendimento(id)
  if (!atendimento) notFound()

  const confiavel = posicaoConfiavel(atendimento.posicao)
  const minutos = atendimento.posicao
    ? minutosDesde(atendimento.posicao.atualizadoEm)
    : null

  return (
    <PainelRastreamento
      atendimento={atendimento}
      posicaoConfiavel={confiavel}
      minutosDesdeAtualizacao={minutos}
      limiteMinutos={LIMITE_POSICAO_MIN}
    />
  )
}
