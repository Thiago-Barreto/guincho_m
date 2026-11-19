import { site, linkWhatsApp } from '@/lib/site'
import { IconeTelefone, IconeEstrela } from '@/components/ui/Icones'
import { BotaoWhatsAppComLocal } from '@/components/ui/BotaoWhatsAppComLocal'

/**
 * SERVER COMPONENT. Os CTAs são <a href="tel:"> puros — nada a hidratar.
 *
 * O único filho cliente é o BotaoWhatsAppComLocal, e ele está na FOLHA da
 * árvore: envolve apenas a si mesmo, e degrada para link comum se a
 * geolocalização for negada.
 *
 * O telefone é o maior elemento tipográfico da página. Ele é o produto.
 */
export function Hero() {
  return (
    <section className="bg-noite text-white">
      <div className="wrap py-14 md:py-20">
        <h1 className="text-d1 font-bold uppercase">
          Guincho 24 horas
          <br />
          em Manaus
        </h1>

        {/* O telefone como herói visual, não como detalhe de contato. */}
        <a
          href={`tel:${site.telefoneHref}`}
          className="tabular mt-8 block font-display text-tel font-bold leading-none text-giratorio hover:brightness-110"
          aria-label={`Ligar agora para ${site.telefone}`}
        >
          {site.telefone}
        </a>

        {/* Zona do polegar, alvos com no mínimo 56px. */}
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`tel:${site.telefoneHref}`}
            className="btn btn-primario flex-1 sm:flex-initial"
          >
            <IconeTelefone />
            Ligar agora
          </a>
          <BotaoWhatsAppComLocal hrefPadrao={linkWhatsApp()} />
        </div>

        {/* Prova social acima da dobra. */}
        <p className="mt-6 flex items-center gap-2 text-texto-claro">
          <span className="flex text-giratorio" aria-hidden="true">
            <IconeEstrela />
            <IconeEstrela />
            <IconeEstrela />
            <IconeEstrela />
            <IconeEstrela />
          </span>
          <span className="tabular">
            {site.avaliacoes.nota.toString().replace('.', ',')}
          </span>
          <span aria-hidden="true">·</span>
          <span>{site.avaliacoes.total} avaliações no Google</span>
        </p>
      </div>
    </section>
  )
}
