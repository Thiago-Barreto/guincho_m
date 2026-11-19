import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { idValido } from '@/lib/rastreamento'
import { CampoCodigo } from '@/components/rastreamento/CampoCodigo'

/**
 * SERVER COMPONENT · noindex.
 *
 * Existe por dois motivos:
 *
 *  1. É o alvo do <form action="/rastreamento" method="get"> do CampoCodigo.
 *     Sem JavaScript, o navegador submete para cá com ?codigo=... e nós
 *     redirecionamos. O acompanhamento funciona sem JS.
 *  2. Dá um destino útil a quem chega em /rastreamento sem código.
 */
export const metadata: Metadata = {
  title: 'Acompanhar atendimento',
  robots: { index: false, follow: false },
}

export default async function RastreamentoIndex({
  searchParams,
}: {
  searchParams: Promise<{ codigo?: string }>
}) {
  const { codigo } = await searchParams

  if (codigo) {
    const limpo = codigo.trim()
    if (idValido(limpo)) redirect(`/rastreamento/${encodeURIComponent(limpo)}`)
  }

  return (
    <div className="wrap py-14">
      <h1 className="text-d2 font-bold uppercase">Acompanhar atendimento</h1>
      <p className="medida mt-3 text-texto-fraco">
        Informe o código que enviamos por WhatsApp na abertura do atendimento.
        {codigo && ' O código informado não é válido — confira a mensagem.'}
      </p>

      <CampoCodigo />
    </div>
  )
}
