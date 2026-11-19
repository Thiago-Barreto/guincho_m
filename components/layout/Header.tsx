import Link from 'next/link'
import { site } from '@/lib/site'

/**
 * SERVER COMPONENT. Zero JavaScript.
 *
 * A navegação cabe em CSS: em telas pequenas os links viram uma linha com
 * rolagem horizontal, sem menu hambúrguer. O MenuMobile client-side do plano
 * só entra se a lista crescer a ponto de não caber — e hoje ela cabe.
 */
export function Header() {
  return (
    <header className="bg-noite text-white">
      <div className="wrap flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="font-display text-xl tracking-[0.16em] text-giratorio">
          {site.nome.toUpperCase()}
        </Link>

        <nav aria-label="Navegação principal">
          <ul className="flex items-center gap-6 text-[0.95rem]">
            <li>
              <Link href="/servicos" className="hover:text-giratorio">
                Serviços
              </Link>
            </li>
            <li>
              <Link href="/frota" className="hover:text-giratorio">
                Frota
              </Link>
            </li>
            <li>
              <Link href="/#onde-atendemos" className="hover:text-giratorio">
                Cobertura
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
