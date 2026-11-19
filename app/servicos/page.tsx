import type { Metadata } from 'next'
import Link from 'next/link'
import { servicos } from '@/lib/servicos'
import { CardServico } from '@/components/home/CardServico'
import { JsonLdMigalhas } from '@/components/seo/JsonLd'
import { site } from '@/lib/site'

/** SERVER COMPONENT · SSG. */
export const metadata: Metadata = {
  title: 'Serviços de guincho e reboque em Manaus',
  description:
    'Guincho para carros, utilitários e vans, e transporte de máquinas e equipamentos industriais em Manaus. Atendimento 24 horas.',
  alternates: { canonical: '/servicos' },
}

export default function ServicosPage() {
  return (
    <>
      <div className="wrap py-14">
        <nav aria-label="Trilha de navegação" className="text-sm text-texto-fraco">
          <Link href="/" className="hover:text-farol">
            Início
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Serviços</span>
        </nav>

        <h1 className="text-d2 mt-4 font-bold uppercase">Serviços</h1>
        <p className="medida mt-3 text-texto-fraco">
          Cada serviço exige uma prancha diferente. Confirmamos o veículo ou o
          equipamento na ligação para sair da base com o equipamento certo.
        </p>

        <div className="mt-8 grid gap-2 md:grid-cols-3">
          {servicos.map((s) => (
            <CardServico key={s.slug} slug={s.slug} nome={s.nome} resumo={s.resumo} />
          ))}
        </div>
      </div>

      <JsonLdMigalhas
        itens={[
          { nome: 'Início', url: site.url },
          { nome: 'Serviços', url: `${site.url}/servicos` },
        ]}
      />
    </>
  )
}
