import Link from 'next/link'
import { site } from '@/lib/site'
import { IconeTelefone } from '@/components/ui/Icones'

/**
 * SERVER COMPONENT. Zero JavaScript.
 *
 * Quem cai aqui pode estar no acostamento com o endereço errado. A 404 não
 * é uma piada nem um beco sem saída: o telefone continua em primeiro plano.
 */
export default function NotFound() {
  return (
    <div className="wrap py-20">
      <p className="inline-block bg-giratorio px-3 py-1 font-display text-xl tracking-[0.16em] text-noite">ERRO 404</p>
      <h1 className="text-d2 mt-3 font-bold uppercase">Página não encontrada</h1>
      <p className="medida mt-3 text-texto-fraco">
        O endereço que você acessou não existe ou foi movido. Se você precisa de
        um guincho agora, ligue — o atendimento é 24 horas.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={`tel:${site.telefoneHref}`} className="btn btn-primario">
          <IconeTelefone />
          <span className="tabular">{site.telefone}</span>
        </a>
        <Link href="/" className="btn btn-contorno bg-white">
          Ir para o início
        </Link>
      </div>
    </div>
  )
}
