import Image from 'next/image'
import { frota } from '@/lib/frota'

/**
 * SERVER COMPONENT. Zero JavaScript.
 *
 * Substitui o carrossel em JS do site atual por scroll-snap em CSS. Além de
 * eliminar o bundle, remove a fonte mais provável de CLS — carrossel que
 * mede o container depois do mount e reposiciona os slides.
 *
 * A rolagem é nativa: funciona com touch, com roda do mouse, com as setas do
 * teclado e com o leitor de tela, sem precisar de botões de "anterior/próximo"
 * que teriam que ser implementados e rotulados.
 *
 * Ativo de confiança para o público B2B: fotos REAIS da frota. Banco de
 * imagens destrói exatamente a credibilidade que a seção existe para criar.
 */
export function Galeria() {
  return (
    <section className="bg-white" aria-labelledby="titulo-frota">
      <div className="wrap py-14">
        <h2 id="titulo-frota" className="text-d2 font-bold uppercase">
          A frota
        </h2>
        <p className="medida mt-3 text-texto-fraco">
          Equipamento próprio, com capacidade declarada. Para transporte
          industrial, a capacidade da prancha é o que define a viabilidade do
          serviço — por isso ela está aqui, e não escondida em um orçamento.
        </p>
      </div>

      {/* Full-bleed: a rolagem começa alinhada ao wrap e sangra até a borda,
          o que sinaliza visualmente que há mais conteúdo à direita. */}
      <ul className="snap-x-galeria px-6 pb-6 [scroll-padding-left:1.5rem]">
        {frota.map((v) => (
          <li key={v.id} className="w-[min(85vw,420px)]">
            <figure className="flex h-full flex-col bg-nevoa">
              {v.foto ? (
                <Image
                  src={v.foto.src}
                  alt={v.foto.alt}
                  width={v.foto.width}
                  height={v.foto.height}
                  className="h-56 w-full object-cover"
                  sizes="(max-width: 640px) 85vw, 420px"
                />
              ) : (
                // Placeholder com a MESMA altura da foto final: quando a
                // imagem real entrar, o layout não se move.
                <div
                  className="flex h-56 w-full items-center justify-center bg-asfalto text-sm text-texto-claro"
                  role="img"
                  aria-label={`Foto de ${v.nome} ainda não disponível`}
                >
                  Foto da frota em breve
                </div>
              )}

              <figcaption className="p-5">
                <p className="font-display text-xl font-semibold">{v.nome}</p>
                <p className="tabular mt-1 font-medium text-farol">{v.capacidade}</p>
                <p className="mt-2 text-sm text-texto-fraco">{v.aplicacao}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
