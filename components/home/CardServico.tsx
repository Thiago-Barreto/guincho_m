import Link from 'next/link'
import { servicos } from '@/lib/servicos'
import { IconeSeta } from '@/components/ui/Icones'

/** SERVER COMPONENT. Zero JavaScript. */
export function CardServico({
  slug,
  nome,
  resumo,
}: {
  slug: string
  nome: string
  resumo: string
}) {
  return (
    <Link
      href={`/servicos/${slug}`}
      className="group flex flex-col justify-between border-t-4 border-farol bg-white p-6 transition-shadow hover:shadow-lg"
    >
      <div>
        <h3 className="font-display text-xl font-semibold">{nome}</h3>
        <p className="mt-2 text-texto-fraco">{resumo}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-2 font-medium text-farol">
        Ver detalhes
        <IconeSeta />
      </span>
    </Link>
  )
}

/** SERVER COMPONENT. Grade de serviços da Home. */
export function GradeServicos() {
  return (
    <section className="bg-nevoa" aria-labelledby="titulo-servicos">
      <div className="wrap py-14">
        <h2 id="titulo-servicos" className="text-d2 font-bold uppercase">
          Serviços
        </h2>
        <p className="medida mt-3 text-texto-fraco">
          Do carro de passeio ao equipamento industrial, com a prancha compatível
          para cada caso.
        </p>

        <div className="mt-8 grid gap-2 md:grid-cols-3">
          {servicos.map((s) => (
            <CardServico key={s.slug} slug={s.slug} nome={s.nome} resumo={s.resumo} />
          ))}
        </div>
      </div>
    </section>
  )
}
