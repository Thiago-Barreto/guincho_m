import { faq } from '@/lib/faq'

/**
 * SERVER COMPONENT. Zero JavaScript.
 *
 * Acordeão com <details>/<summary> nativo. O navegador já entrega abrir e
 * fechar, foco por teclado, semântica de expansão para o leitor de tela e
 * busca-na-página que abre o item correspondente (Ctrl+F). Um acordeão em
 * React custaria estado, listeners e aria-expanded para reimplementar,
 * pior, o que já vem pronto.
 *
 * O conteúdo vem de lib/faq.ts, a mesma fonte do JSON-LD FAQPage — as
 * perguntas do schema PRECISAM estar visíveis aqui.
 */
export function FAQ() {
  return (
    <section className="bg-white" aria-labelledby="titulo-faq">
      <div className="wrap py-14">
        <h2 id="titulo-faq" className="text-d2 font-bold uppercase">
          Perguntas frequentes
        </h2>

        <div className="mt-8 max-w-3xl">
          {faq.map((item) => (
            <details
              key={item.pergunta}
              className="group border-b border-linha"
              name="faq"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-xl font-semibold marker:content-none">
                {item.pergunta}
                {/* Indicador puramente visual: o estado real já é anunciado
                    pela semântica nativa do <details>.
                    Farol e não Giratório: o âmbar não atinge AA como cor de
                    texto sobre fundo claro, e este "+" é a única pista visual
                    de que a linha abre. */}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-2xl leading-none text-farol transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="medida pb-5 text-texto-fraco">{item.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
