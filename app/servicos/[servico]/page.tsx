import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { servicos, servicoPorSlug } from '@/lib/servicos'
import { site, linkWhatsApp } from '@/lib/site'
import { frota } from '@/lib/frota'
import { JsonLdServico, JsonLdMigalhas } from '@/components/seo/JsonLd'
import { IconeTelefone, IconeWhatsApp } from '@/components/ui/Icones'

/**
 * SERVER COMPONENT · SSG com generateStaticParams.
 *
 * dynamicParams = false: qualquer slug fora da lista cai em 404 no build,
 * em vez de gerar página sob demanda. Alvo das buscas comerciais de
 * cauda longa, então o conteúdo precisa ser real, serviço a serviço.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return servicos.map((s) => ({ servico: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ servico: string }>
}): Promise<Metadata> {
  const { servico: slug } = await params
  const servico = servicoPorSlug(slug)

  if (!servico) return {}

  return {
    title: servico.titulo,
    description: servico.resumo,
    alternates: { canonical: `/servicos/${servico.slug}` },
    openGraph: {
      title: servico.titulo,
      description: servico.resumo,
      url: `${site.url}/servicos/${servico.slug}`,
    },
  }
}

export default async function ServicoPage({
  params,
}: {
  params: Promise<{ servico: string }>
}) {
  const { servico: slug } = await params
  const servico = servicoPorSlug(slug)

  if (!servico) notFound()

  const url = `${site.url}/servicos/${servico.slug}`

  return (
    <>
      <article className="wrap py-14">
        <nav aria-label="Trilha de navegação" className="text-sm text-texto-fraco">
          <Link href="/" className="hover:text-farol">
            Início
          </Link>
          <span aria-hidden="true"> / </span>
          <Link href="/servicos" className="hover:text-farol">
            Serviços
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{servico.nome}</span>
        </nav>

        <h1 className="text-d2 mt-4 font-bold uppercase">{servico.titulo}</h1>

        <div className="medida mt-6 space-y-4 text-lg">
          {servico.corpo.map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))}
        </div>

        {/* Prova de capacidade — o comprador industrial quer isso, não estética. */}
        {servico.publico === 'industrial' && (
          <section aria-labelledby="capacidade" className="mt-10">
            <h2 id="capacidade" className="font-display text-2xl font-semibold">
              Capacidade disponível
            </h2>
            <table className="mt-4 w-full border-collapse text-left">
              <thead>
                <tr className="bg-noite text-white">
                  <th scope="col" className="p-3 font-display font-semibold">
                    Equipamento
                  </th>
                  <th scope="col" className="p-3 font-display font-semibold">
                    Capacidade
                  </th>
                </tr>
              </thead>
              <tbody>
                {frota.map((v) => (
                  <tr key={v.id} className="border-b border-linha odd:bg-white">
                    <td className="p-3">{v.nome}</td>
                    <td className="tabular p-3">{v.capacidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-sm text-texto-fraco">
              Emitimos nota fiscal. CNPJ {site.cnpj} e seguro sobre a carga —
              documentação usual para cadastro de fornecedor.
            </p>
          </section>
        )}

        {/* CTA ao fim da leitura: quem chegou até aqui está pronto para ligar. */}
        <div className="mt-10 flex flex-wrap gap-3 border-t border-linha pt-8">
          <a href={`tel:${site.telefoneHref}`} className="btn btn-primario">
            <IconeTelefone />
            <span className="tabular">{site.telefone}</span>
          </a>
          <a
            href={linkWhatsApp(`Olá! Preciso de ${servico.nome.toLowerCase()} em Manaus.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-zap"
          >
            <IconeWhatsApp />
            WhatsApp
          </a>
        </div>
      </article>

      <JsonLdServico nome={servico.titulo} descricao={servico.resumo} url={url} />
      <JsonLdMigalhas
        itens={[
          { nome: 'Início', url: site.url },
          { nome: 'Serviços', url: `${site.url}/servicos` },
          { nome: servico.nome, url },
        ]}
      />
    </>
  )
}
