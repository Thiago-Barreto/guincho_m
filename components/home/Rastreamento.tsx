import { CampoCodigo } from '@/components/rastreamento/CampoCodigo'

/**
 * SERVER COMPONENT. Só o campo de código, dentro, é cliente.
 *
 * O diferencial fica ALTO na página, logo abaixo da faixa de confiança:
 * quem já tem atendimento aberto não deveria precisar rolar o site inteiro
 * para acompanhar o guincho.
 */
export function Rastreamento() {
  return (
    <section className="bg-nevoa" aria-labelledby="titulo-rastreamento">
      <div className="wrap py-14">
        <h2 id="titulo-rastreamento" className="text-d2 font-bold uppercase">
          Acompanhe seu guincho
        </h2>
        <p className="medida mt-3 text-texto-fraco">
          Já abriu um atendimento? Informe o código que enviamos por WhatsApp para
          ver a posição do guincho, o tempo estimado e o contato do motorista.
        </p>

        <CampoCodigo />
      </div>
    </section>
  )
}
