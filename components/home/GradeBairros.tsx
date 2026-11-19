import Link from 'next/link'
import { bairros } from '@/lib/bairros'
import { MapaEstatico } from '@/components/home/MapaEstatico'
import { IconeLocal } from '@/components/ui/Icones'

/**
 * SERVER COMPONENT. Zero JavaScript.
 *
 * Fonte dos links internos para as páginas de bairro — é por aqui que a
 * autoridade da Home flui para /guincho/[bairro].
 *
 * Cada card mostra o PERFIL real do bairro, não só o nome. Se a grade
 * conseguisse ser gerada trocando apenas o nome, as páginas por trás dela
 * seriam doorway pages.
 */
export function GradeBairros() {
  return (
    <section id="onde-atendemos" className="bg-noite text-white">
      <div className="wrap py-14">
        <h2 className="text-d2 font-bold uppercase">Onde atendemos</h2>
        <p className="medida mt-3 text-texto-claro">
          Manaus e região metropolitana, 24 horas. Cada área tem seu próprio
          tempo de deslocamento e seu tipo de chamado mais comum.
        </p>

        <ul className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {bairros.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/guincho/${b.slug}`}
                className="flex h-full flex-col bg-asfalto p-5 transition-colors hover:bg-[#22384a]"
              >
                <span className="flex items-center gap-2 font-display text-lg font-semibold">
                  <IconeLocal className="h-4 w-4 shrink-0 text-giratorio" />
                  {b.nome}
                </span>
                <span className="mt-1 text-sm text-texto-claro">{b.perfil}</span>
                <span className="mt-3 text-sm text-giratorio">{b.tempoMedio}</span>
              </Link>
            </li>
          ))}
        </ul>

        <MapaEstatico />
      </div>
    </section>
  )
}
