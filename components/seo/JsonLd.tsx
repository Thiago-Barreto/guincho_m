import { site, enderecoLinhaUnica } from '@/lib/site'
import type { Pergunta } from '@/lib/faq'

/**
 * SERVER COMPONENT. Zero JavaScript enviado ao navegador.
 *
 * O script é renderizado no HTML do servidor com type="application/ld+json",
 * que o navegador não executa. Não usa next/script — não há nada a hidratar.
 */
function Bloco({ dados }: { dados: object }) {
  return (
    <script
      type="application/ld+json"
      // O conteúdo vem de dados nossos, não de entrada de usuário.
      // Ainda assim escapamos '<' para fechar a porta de quebra de tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(dados).replace(/</g, '\\u003c'),
      }}
    />
  )
}

/** LocalBusiness — o schema que sustenta a presença no pacote local. */
export function JsonLdNegocio() {
  return (
    <Bloco
      dados={{
        '@context': 'https://schema.org',
        '@type': 'AutomotiveBusiness',
        '@id': `${site.url}/#negocio`,
        name: site.nome,
        legalName: site.nomeLegal,
        description: site.descricao,
        url: site.url,
        telephone: site.telefoneHref,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.endereco.rua,
          addressLocality: site.endereco.cidade,
          addressRegion: site.endereco.estado,
          postalCode: site.endereco.cep,
          addressCountry: site.endereco.pais,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: site.geo.lat,
          longitude: site.geo.lng,
        },
        // 24 horas, todos os dias. Precisa bater com o horário configurado
        // no Perfil da Empresa — divergência aqui derruba a confiança do sinal.
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '00:00',
          closes: '23:59',
        },
        areaServed: {
          '@type': 'City',
          name: 'Manaus',
          containedInPlace: { '@type': 'State', name: 'Amazonas' },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: site.avaliacoes.nota,
          reviewCount: site.avaliacoes.total,
        },
      }}
    />
  )
}

/** Service — uma por página de serviço. */
export function JsonLdServico({
  nome,
  descricao,
  url,
}: {
  nome: string
  descricao: string
  url: string
}) {
  return (
    <Bloco
      dados={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: nome,
        description: descricao,
        url,
        serviceType: 'Guincho e reboque',
        provider: { '@id': `${site.url}/#negocio` },
        areaServed: { '@type': 'City', name: 'Manaus' },
      }}
    />
  )
}

/**
 * FAQPage — as perguntas precisam estar visíveis na página.
 * Schema que descreve conteúdo ausente é violação de diretriz.
 */
export function JsonLdFaq({ perguntas }: { perguntas: Pergunta[] }) {
  return (
    <Bloco
      dados={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: perguntas.map((p) => ({
          '@type': 'Question',
          name: p.pergunta,
          acceptedAnswer: { '@type': 'Answer', text: p.resposta },
        })),
      }}
    />
  )
}

/** BreadcrumbList — para as rotas internas de serviço e bairro. */
export function JsonLdMigalhas({
  itens,
}: {
  itens: { nome: string; url: string }[]
}) {
  return (
    <Bloco
      dados={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: itens.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.nome,
          item: item.url,
        })),
      }}
    />
  )
}

/** Endereço em uma linha, reaproveitado pelo rodapé. Mantém o NAP único. */
export { enderecoLinhaUnica }
