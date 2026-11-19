import { site } from '@/lib/site'

/**
 * SERVER COMPONENT. Zero JavaScript.
 *
 * AQUI a numeração é legítima: existe uma sequência real, e o <ol> comunica
 * isso à semântica e ao leitor de tela. Nas outras seções da Home não entra
 * numeração, porque ali os itens são paralelos e numerá-los seria decoração.
 *
 * Os números são gerados por CSS counter, e não digitados no conteúdo — assim
 * o leitor de tela recebe a ordem pela estrutura da lista, sem ouvir o dígito
 * lido duas vezes.
 */
const passos = [
  {
    titulo: 'Você liga ou chama no WhatsApp',
    texto: `Atendimento direto no ${site.telefone}, 24 horas. Informe onde está e o que aconteceu com o veículo.`,
  },
  {
    titulo: 'Confirmamos o valor antes de sair',
    texto:
      'O preço é calculado por distância e tipo de veículo, e fechado na ligação. Sem taxa extra por horário noturno, fim de semana ou feriado.',
  },
  {
    titulo: 'O guincho é deslocado',
    texto:
      'Sai a prancha compatível com o seu caso. Você recebe um código para acompanhar a posição e o tempo estimado.',
  },
  {
    titulo: 'Removemos até o destino',
    texto:
      'Oficina, residência, concessionária ou pátio. Você define o destino na abertura do atendimento.',
  },
]

export function ComoFunciona() {
  return (
    <section className="bg-white" aria-labelledby="titulo-como-funciona">
      <div className="wrap py-14">
        <h2 id="titulo-como-funciona" className="text-d2 font-bold uppercase">
          Como funciona
        </h2>

        <ol className="mt-8 grid gap-x-8 gap-y-6 md:grid-cols-2 [counter-reset:passo]">
          {passos.map((p) => (
            <li
              key={p.titulo}
              className="relative border-b border-linha pb-6 pl-16 [counter-increment:passo] before:absolute before:left-0 before:top-0 before:font-display before:flex before:h-11 before:w-11 before:items-center before:justify-center before:bg-giratorio before:text-2xl before:font-bold before:text-noite before:content-[counter(passo)]"
            >
              <h3 className="font-display text-xl font-semibold">{p.titulo}</h3>
              <p className="mt-1 text-texto-fraco">{p.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
