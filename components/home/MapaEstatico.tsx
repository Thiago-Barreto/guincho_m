import Image from 'next/image'

/**
 * SERVER COMPONENT. Zero JavaScript.
 *
 * Imagem da área de cobertura, NÃO mapa interativo. O mapa em JS custaria
 * mais de 200KB e um Long Task no meio do LCP para entregar algo que o
 * usuário não vai arrastar — ele quer saber se a cidade dele está coberta.
 *
 * O mapa interativo de verdade existe em um lugar só: /rastreamento/[id],
 * onde ele é o produto e a rota é noindex.
 *
 * width/height explícitos reservam o espaço e mantêm o CLS em zero.
 *
 * TODO: gerar public/mapa-cobertura.webp — recorte de Manaus com a área de
 * atendimento destacada em Azul Farol.
 */
export function MapaEstatico() {
  return (
    <figure className="mt-10">
      <Image
        src="/mapa-cobertura.webp"
        alt="Mapa de Manaus com a área de cobertura do atendimento destacada, incluindo Centro, zonas norte, leste e centro-sul, Distrito Industrial, Ponta Negra e o trecho urbano da BR-174."
        width={1080}
        height={600}
        className="h-auto w-full border border-linha-escura"
        sizes="(max-width: 1080px) 100vw, 1080px"
      />
      <figcaption className="mt-2 text-sm text-texto-claro">
        Área de cobertura. Fora desse limite, consulte o valor do deslocamento
        pelo telefone.
      </figcaption>
    </figure>
  )
}
