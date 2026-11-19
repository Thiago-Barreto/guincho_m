import type { Metadata } from 'next'
import Link from 'next/link'
import { frota } from '@/lib/frota'
import { site, linkWhatsApp } from '@/lib/site'
import { Galeria } from '@/components/home/Galeria'
import { JsonLdMigalhas } from '@/components/seo/JsonLd'
import { IconeTelefone, IconeWhatsApp } from '@/components/ui/Icones'

/**
 * SERVER COMPONENT · SSG.
 *
 * Página voltada ao comprador industrial: ele quer prova de capacidade —
 * frota, capacidade de carga, CNPJ, seguro. Não é a página do motorista
 * em pânico, e o tom reflete isso.
 */
export const metadata: Metadata = {
  title: 'Frota de guinchos e pranchas',
  description:
    'Plataformas e pranchas com capacidade declarada para carros, utilitários, vans e equipamento industrial em Manaus.',
  alternates: { canonical: '/frota' },
}

export default function FrotaPage() {
  return (
    <>
      <div className="wrap py-14">
        <nav aria-label="Trilha de navegação" className="text-sm text-texto-fraco">
          <Link href="/" className="hover:text-farol">
            Início
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Frota</span>
        </nav>

        <h1 className="text-d2 mt-4 font-bold uppercase">Frota</h1>
        <p className="medida mt-3 text-texto-fraco">
          Equipamento próprio, com capacidade declarada. Para contratação
          industrial, a capacidade da prancha define a viabilidade do serviço —
          por isso ela está publicada aqui, e não guardada para o orçamento.
        </p>

        <table className="mt-8 w-full border-collapse text-left">
          <caption className="sr-only">
            Equipamentos da frota, capacidade de carga e aplicação
          </caption>
          <thead>
            <tr className="bg-noite text-white">
              <th scope="col" className="p-3 font-display font-semibold">
                Equipamento
              </th>
              <th scope="col" className="p-3 font-display font-semibold">
                Capacidade
              </th>
              <th scope="col" className="p-3 font-display font-semibold">
                Aplicação
              </th>
            </tr>
          </thead>
          <tbody>
            {frota.map((v) => (
              <tr key={v.id} className="border-b border-linha odd:bg-white">
                <td className="p-3 font-medium">{v.nome}</td>
                <td className="tabular p-3">{v.capacidade}</td>
                <td className="p-3 text-texto-fraco">{v.aplicacao}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 border-l-4 border-farol bg-white p-5">
          <p className="font-medium">Documentação para cadastro de fornecedor</p>
          <p className="mt-2 text-texto-fraco">
            CNPJ {site.cnpj}, emissão de nota fiscal e cobertura de seguro sobre a
            carga. O cadastro é feito uma vez e reaproveitado nos chamados
            seguintes.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`tel:${site.telefoneHref}`} className="btn btn-primario">
            <IconeTelefone />
            <span className="tabular">{site.telefone}</span>
          </a>
          <a
            href={linkWhatsApp('Olá! Gostaria de um orçamento para transporte de equipamento.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-zap"
          >
            <IconeWhatsApp />
            WhatsApp
          </a>
        </div>
      </div>

      <Galeria />

      <JsonLdMigalhas
        itens={[
          { nome: 'Início', url: site.url },
          { nome: 'Frota', url: `${site.url}/frota` },
        ]}
      />
    </>
  )
}
