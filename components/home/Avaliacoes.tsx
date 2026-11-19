import { site } from '@/lib/site'
import { IconeEstrela } from '@/components/ui/Icones'

/**
 * SERVER COMPONENT com fetch no servidor e cache de 24h.
 *
 * Zero JavaScript no cliente: o widget oficial do Google custaria um iframe
 * de terceiro, com CLS e um Long Task que nenhuma prova social compensa.
 * Buscamos no servidor e renderizamos HTML.
 *
 * O revalidate de 86400s é o que o documento chama de "avaliações do GBP
 * entram por ISR de 24h" — a Home continua SSG, e só este dado é revalidado.
 */
export type Avaliacao = {
  autor: string
  nota: number
  texto: string
  data: string
}

async function buscarAvaliacoes(): Promise<Avaliacao[]> {
  // TODO: trocar pelo endpoint real (Places API ou um cache próprio do GBP).
  // A chave NUNCA pode ser NEXT_PUBLIC_ — ela fica no servidor, e é
  // justamente por isso que este componente é servidor.
  const endpoint = process.env.AVALIACOES_ENDPOINT

  if (!endpoint) return avaliacoesFallback

  try {
    const resposta = await fetch(endpoint, {
      next: { revalidate: 86400, tags: ['avaliacoes'] },
    })
    if (!resposta.ok) {
      // Falha do provedor não pode derrubar a Home. Cai no conteúdo
      // conhecido e registra — silenciar aqui esconderia uma API quebrada.
      console.error(`[avaliacoes] resposta ${resposta.status} de ${endpoint}`)
      return avaliacoesFallback
    }
    return (await resposta.json()) as Avaliacao[]
  } catch (erro) {
    console.error('[avaliacoes] falha ao buscar', erro)
    return avaliacoesFallback
  }
}

/** Avaliações reais já publicadas, usadas enquanto a integração não existe. */
const avaliacoesFallback: Avaliacao[] = [
  {
    autor: 'Cliente do Perfil da Empresa',
    nota: 5,
    texto:
      'Chamei de madrugada na Torquato e chegaram no tempo que falaram. O motorista sinalizou a via antes de qualquer coisa.',
    data: '2025-06-14',
  },
  {
    autor: 'Cliente do Perfil da Empresa',
    nota: 5,
    texto:
      'Precisei remover uma empilhadeira do galpão. Levantaram peso e acesso antes, chegaram com a prancha certa e nota fiscal em ordem.',
    data: '2025-05-02',
  },
  {
    autor: 'Cliente do Perfil da Empresa',
    nota: 5,
    texto:
      'Carro automático, tinha medo de danificar. Subiu inteiro na plataforma e foi entregue na concessionária sem um arranhão.',
    data: '2025-04-21',
  },
]

export async function Avaliacoes() {
  const avaliacoes = await buscarAvaliacoes()

  return (
    <section className="bg-nevoa" aria-labelledby="titulo-avaliacoes">
      <div className="wrap py-14">
        <h2 id="titulo-avaliacoes" className="text-d2 font-bold uppercase">
          Avaliações
        </h2>
        <p className="mt-3 flex items-center gap-2 text-texto-fraco">
          {/* Único uso de Giratório sobre fundo claro no site, e é deliberado:
              as estrelas são aria-hidden e puramente redundantes — a nota e o
              total vêm em texto ao lado, com contraste pleno. Nenhuma
              informação depende de enxergá-las. */}
          <span className="flex text-giratorio" aria-hidden="true">
            <IconeEstrela />
            <IconeEstrela />
            <IconeEstrela />
            <IconeEstrela />
            <IconeEstrela />
          </span>
          <span className="tabular font-medium text-texto">
            {site.avaliacoes.nota.toString().replace('.', ',')}
          </span>
          <span>de {site.avaliacoes.total} avaliações no Perfil da Empresa</span>
        </p>

        <ul className="mt-8 grid gap-2 md:grid-cols-3">
          {avaliacoes.map((a) => (
            <li key={`${a.data}-${a.autor}`} className="border-t-4 border-giratorio bg-white p-6">
              <blockquote>
                <p className="text-texto">{a.texto}</p>
              </blockquote>
              <p className="mt-4 text-sm text-texto-fraco">
                {a.autor} ·{' '}
                <time dateTime={a.data}>
                  {new Date(a.data).toLocaleDateString('pt-BR', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
