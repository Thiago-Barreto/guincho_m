import Link from 'next/link'
import { site } from '@/lib/site'
import { servicos } from '@/lib/servicos'
import { bairros } from '@/lib/bairros'

/**
 * SERVER COMPONENT. Zero JavaScript.
 *
 * O NAP daqui precisa ser IDÊNTICO ao do Perfil da Empresa no Google —
 * mesma grafia, mesma abreviação, mesmo formato de telefone. Consistência
 * NAP é sinal de ranking local; divergência custa posição. Por isso tudo
 * vem de lib/site.ts e nada é digitado à mão aqui.
 */
export function Footer() {
  return (
    <footer className="bg-noite text-texto-claro">
      <div className="wrap grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-xl tracking-[0.16em] text-giratorio">
            {site.nome.toUpperCase()}
          </p>

          <address className="mt-4 not-italic leading-relaxed">
            {site.endereco.rua}
            <br />
            {site.endereco.bairro} — {site.endereco.cidade}/{site.endereco.estado}
            <br />
            CEP {site.endereco.cep}
            <br />
            <a
              href={`tel:${site.telefoneHref}`}
              className="tabular mt-3 inline-block text-white hover:text-giratorio"
            >
              {site.telefone}
            </a>
          </address>

          <p className="mt-4 text-sm">
            CNPJ {site.cnpj} · Atendimento 24 horas, todos os dias
          </p>
        </div>

        <nav aria-labelledby="rodape-servicos">
          <h2 id="rodape-servicos" className="font-display text-lg text-white">
            Serviços
          </h2>
          <ul className="mt-3 space-y-2">
            {servicos.map((s) => (
              <li key={s.slug}>
                <Link href={`/servicos/${s.slug}`} className="hover:text-giratorio">
                  {s.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="rodape-bairros">
          <h2 id="rodape-bairros" className="font-display text-lg text-white">
            Onde atendemos
          </h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            {bairros.map((b) => (
              <li key={b.slug}>
                <Link href={`/guincho/${b.slug}`} className="hover:text-giratorio">
                  {b.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-linha-escura">
        <div className="wrap py-5 text-sm">
          © {new Date().getFullYear()} {site.nomeLegal}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}
