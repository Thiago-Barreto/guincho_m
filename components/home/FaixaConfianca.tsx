import { site } from '@/lib/site'

/**
 * SERVER COMPONENT. Zero JavaScript.
 *
 * Faixa de confiança logo abaixo do herói. Sem numeração decorativa: aqui não
 * existe sequência, são três fatos paralelos. A numeração só aparece em
 * "Como funciona", onde há ordem real.
 */
const provas = [
  { rotulo: 'CNPJ', valor: site.cnpj },
  { rotulo: 'No mercado desde', valor: site.fundacao },
  { rotulo: 'Atendimento', valor: '24h · todos os dias' },
]

export function FaixaConfianca() {
  return (
    <section className="bg-asfalto text-white" aria-label="Dados da empresa">
      <div className="wrap grid gap-6 py-6 sm:grid-cols-3">
        {provas.map((p) => (
          <div key={p.rotulo}>
            <p className="text-sm text-texto-claro">{p.rotulo}</p>
            <p className="tabular font-display text-xl font-semibold">{p.valor}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
