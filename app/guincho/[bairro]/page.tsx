import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { bairros, bairroPorSlug } from '@/lib/bairros'
import { site, linkWhatsApp } from '@/lib/site'
import { servicos } from '@/lib/servicos'
import { JsonLdServico, JsonLdMigalhas } from '@/components/seo/JsonLd'
import { IconeTelefone, IconeWhatsApp } from '@/components/ui/Icones'

/**
 * SERVER COMPONENT · SSG ESTRITO.
 *
 * Rota no formato /guincho/[bairro] — Opção A do documento. Pasta estática
 * com o segmento dinâmico dentro: sem colisão na raiz, sem lista de slugs
 * reservados para conferir a cada rota nova.
 *
 * dynamicParams = false é o ponto crítico aqui. Sem ele, qualquer URL do
 * tipo /guincho/qualquer-coisa geraria uma página sob demanda, e o site
 * viraria uma fábrica de doorway pages sem ninguém ter decidido isso.
 * Com ele, só existem os bairros escritos à mão em lib/bairros.ts.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return bairros.map((b) => ({ bairro: b.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bairro: string }>
}): Promise<Metadata> {
  const { bairro: slug } = await params
  const bairro = bairroPorSlug(slug)

  if (!bairro) return {}

  const titulo = `Guincho 24 horas em ${bairro.nome}, Manaus`
  const descricao = `Guincho e reboque em ${bairro.nome}. ${bairro.perfil} Chegada estimada de ${bairro.tempoMedio}. Atendimento 24 horas pelo ${site.telefone}.`

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: `/guincho/${bairro.slug}` },
    openGraph: {
      title: titulo,
      description: descricao,
      url: `${site.url}/guincho/${bairro.slug}`,
    },
  }
}

export default async function BairroPage({
  params,
}: {
  params: Promise<{ bairro: string }>
}) {
  const { bairro: slug } = await params
  const bairro = bairroPorSlug(slug)

  if (!bairro) notFound()

  const url = `${site.url}/guincho/${bairro.slug}`
  const titulo = `Guincho 24 horas em ${bairro.nome}`

  // Bairros vizinhos para link interno lateral, sem repetir o atual.
  const outros = bairros.filter((b) => b.slug !== bairro.slug).slice(0, 4)

  return (
    <>
      <article className="wrap py-14">
        <nav aria-label="Trilha de navegação" className="text-sm text-texto-fraco">
          <Link href="/" className="hover:text-farol">
            Início
          </Link>
          <span aria-hidden="true"> / </span>
          <Link href="/#onde-atendemos" className="hover:text-farol">
            Cobertura
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{bairro.nome}</span>
        </nav>

        <h1 className="text-d2 mt-4 font-bold uppercase">{titulo}</h1>

        <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-y border-linha py-4">
          <div>
            <dt className="text-sm text-texto-fraco">Chegada estimada</dt>
            <dd className="tabular font-display text-xl font-semibold">
              {bairro.tempoMedio}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-texto-fraco">Principais vias de acesso</dt>
            <dd className="font-display text-xl font-semibold">
              {bairro.vias.join(' · ')}
            </dd>
          </div>
        </dl>

        <div className="medida mt-8 space-y-4 text-lg">
          {bairro.corpo.map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3 border-t border-linha pt-8">
          <a href={`tel:${site.telefoneHref}`} className="btn btn-primario">
            <IconeTelefone />
            <span className="tabular">{site.telefone}</span>
          </a>
          <a
            href={linkWhatsApp(`Olá! Preciso de um guincho em ${bairro.nome}, Manaus.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-zap"
          >
            <IconeWhatsApp />
            WhatsApp
          </a>
        </div>

        <section aria-labelledby="servicos-bairro" className="mt-12">
          <h2 id="servicos-bairro" className="font-display text-2xl font-semibold">
            O que atendemos em {bairro.nome}
          </h2>
          <ul className="mt-4 grid gap-2 md:grid-cols-3">
            {servicos.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicos/${s.slug}`}
                  className="block h-full border-t-4 border-farol bg-white p-5 hover:shadow-lg"
                >
                  <span className="font-display text-lg font-semibold">{s.nome}</span>
                  <span className="mt-1 block text-sm text-texto-fraco">{s.resumo}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <nav aria-labelledby="outros-bairros" className="mt-12">
          <h2 id="outros-bairros" className="font-display text-2xl font-semibold">
            Outras áreas atendidas
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {outros.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/guincho/${b.slug}`}
                  className="inline-block border border-linha bg-white px-4 py-2 hover:border-farol hover:text-farol"
                >
                  {b.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>

      <JsonLdServico
        nome={titulo}
        descricao={`Guincho e reboque 24 horas em ${bairro.nome}, Manaus.`}
        url={url}
      />
      <JsonLdMigalhas
        itens={[
          { nome: 'Início', url: site.url },
          { nome: bairro.nome, url },
        ]}
      />
    </>
  )
}
