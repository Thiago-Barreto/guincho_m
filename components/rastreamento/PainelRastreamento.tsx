import type { Atendimento } from '@/lib/rastreamento'
import { MapaRastreamento } from '@/components/rastreamento/MapaRastreamento'
import { IconeTelefone } from '@/components/ui/Icones'

/**
 * SERVER COMPONENT. É ELE que decide se o mapa aparece.
 *
 * A tela NUNCA mostra só o mapa. Mostra sempre, e primeiro em texto:
 * status, tempo estimado, há quanto tempo a posição foi atualizada, e o
 * nome e o telefone do motorista.
 *
 * Se a posição envelhecer além do limite, o mapa some e dá lugar ao contato
 * direto. Um ícone parado no mapa faz o cliente concluir que foi abandonado —
 * e aí o diferencial vira reclamação. Dizer "não sei onde está, ligue para o
 * motorista" é pior de mostrar e melhor de viver.
 */
const rotulos: Record<Atendimento['status'], string> = {
  'a-caminho': 'Guincho a caminho',
  'no-local': 'Guincho no local',
  'em-transporte': 'Veículo em transporte',
  concluido: 'Atendimento concluído',
}

export function PainelRastreamento({
  atendimento,
  posicaoConfiavel,
  minutosDesdeAtualizacao,
  limiteMinutos,
}: {
  atendimento: Atendimento
  posicaoConfiavel: boolean
  minutosDesdeAtualizacao: number | null
  limiteMinutos: number
}) {
  const mostrarMapa = posicaoConfiavel && atendimento.posicao !== null

  return (
    <div className="wrap py-10">
      <h1 className="text-d3 font-bold uppercase">{rotulos[atendimento.status]}</h1>

      {/* O texto vem ANTES do mapa, e não como legenda dele. */}
      <dl className="mt-6 grid gap-4 border-y border-linha py-5 sm:grid-cols-3">
        <div>
          <dt className="text-sm text-texto-fraco">Tempo estimado</dt>
          <dd className="tabular font-display text-2xl font-semibold">
            {atendimento.tempoEstimadoMin !== null
              ? `${atendimento.tempoEstimadoMin} min`
              : 'A confirmar'}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-texto-fraco">Última atualização</dt>
          <dd className="tabular font-display text-2xl font-semibold">
            {minutosDesdeAtualizacao === null
              ? 'Sem sinal'
              : minutosDesdeAtualizacao < 1
                ? 'agora'
                : `há ${minutosDesdeAtualizacao} min`}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-texto-fraco">Destino</dt>
          <dd className="font-display text-2xl font-semibold">{atendimento.destino}</dd>
        </div>
      </dl>

      {/* Contato do motorista sempre visível, mapa ou não. */}
      <section
        aria-labelledby="motorista"
        className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-asfalto p-5 text-white"
      >
        <div>
          <h2 id="motorista" className="text-sm text-texto-claro">
            Motorista
          </h2>
          <p className="font-display text-xl font-semibold">
            {atendimento.motorista.nome}
          </p>
        </div>
        <a
          href={`tel:${atendimento.motorista.telefone}`}
          className="btn btn-primario"
          aria-label={`Ligar para ${atendimento.motorista.nome}`}
        >
          <IconeTelefone />
          <span className="tabular">Ligar para o motorista</span>
        </a>
      </section>

      {mostrarMapa ? (
        <div className="mt-6">
          <MapaRastreamento posicao={atendimento.posicao!} />
        </div>
      ) : (
        // Estado degradado explícito. Sem mapa fantasma, sem ícone parado.
        <div
          role="status"
          className="mt-6 border-l-4 border-triangulo bg-white p-5"
        >
          <p className="font-medium">
            Não estamos recebendo a posição do guincho há mais de {limiteMinutos}{' '}
            minutos.
          </p>
          <p className="mt-2 text-texto-fraco">
            Isso costuma ser falta de sinal no trecho, e não interrupção do
            atendimento. Para confirmar onde o guincho está agora, ligue direto
            para o motorista no botão acima.
          </p>
        </div>
      )}
    </div>
  )
}
