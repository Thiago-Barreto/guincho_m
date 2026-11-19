import { site, linkWhatsApp } from '@/lib/site'
import { IconeTelefone, IconeWhatsApp } from '@/components/ui/Icones'

/**
 * SERVER COMPONENT. Zero JavaScript.
 *
 * Fixa via position:sticky em CSS puro — sem listener de scroll, sem estado.
 * Os dois CTAs são âncoras nativas (tel: e wa.me), então funcionam antes de
 * qualquer hidratação: se o JS falhar ou ainda não tiver carregado, o botão
 * de ligar continua ligando. Para o usuário parado no acostamento, isso é o
 * requisito, não uma otimização.
 */
export function BarraEmergencia() {
  return (
    <div className="sticky top-0 z-50 bg-noite text-white">
      <div className="wrap flex items-stretch justify-between gap-2 py-2">
        <a
          href={`tel:${site.telefoneHref}`}
          className="btn btn-primario flex-1 sm:flex-initial"
          aria-label={`Ligar agora para ${site.telefone}`}
        >
          <IconeTelefone />
          <span className="tabular">{site.telefone}</span>
        </a>

        <a
          href={linkWhatsApp()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-zap"
          aria-label="Falar no WhatsApp (abre em nova aba)"
        >
          <IconeWhatsApp />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
