import { NextResponse } from 'next/server'
import { idValido } from '@/lib/rastreamento'

/**
 * Ingestão do GPS do motorista e leitura da posição pelo cliente.
 *
 * Nunca em cache: é dado pessoal em tempo real.
 */
export const dynamic = 'force-dynamic'

/** GET — leitura da posição pela tela de acompanhamento. */
export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get('id')

  if (!id || !idValido(id)) {
    return NextResponse.json({ erro: 'ID inválido' }, { status: 400 })
  }

  // TODO: buscar a última posição no banco.
  return NextResponse.json(
    { erro: 'Não encontrado' },
    { status: 404, headers: { 'Cache-Control': 'no-store' } },
  )
}

/**
 * POST — o app do motorista envia a posição.
 *
 * ESTE ENDPOINT PRECISA DE AUTENTICAÇÃO ANTES DO GO-LIVE.
 * Sem ela, qualquer um posta coordenadas arbitrárias em qualquer
 * atendimento e o cliente vê o guincho do outro lado da cidade.
 * Um segredo compartilhado por motorista já resolve nesta escala.
 */
export async function POST(request: Request) {
  const segredo = request.headers.get('authorization')

  if (!segredo || segredo !== `Bearer ${process.env.MOTORISTA_TOKEN}`) {
    return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
  }

  const corpo = (await request.json()) as {
    id?: string
    lat?: number
    lng?: number
  }

  if (
    !corpo.id ||
    !idValido(corpo.id) ||
    typeof corpo.lat !== 'number' ||
    typeof corpo.lng !== 'number'
  ) {
    return NextResponse.json({ erro: 'Payload inválido' }, { status: 400 })
  }

  // TODO: gravar { id, lat, lng, atualizadoEm: new Date().toISOString() }.
  return NextResponse.json({ ok: true }, { headers: { 'Cache-Control': 'no-store' } })
}
