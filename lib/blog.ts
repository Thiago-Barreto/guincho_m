export type Post = {
  slug: string
  titulo: string
  resumo: string
  publicadoEm: string
  atualizadoEm: string
  corpo: string[]
}

/**
 * Autoridade tópica local. O blog não é conteúdo de volume: cada post
 * responde a uma dúvida real de quem quebrou o carro em Manaus.
 *
 * TODO: migrar para MDX ou CMS quando passar de ~15 posts. Até lá, o
 * array tipado evita uma dependência inteira para três arquivos.
 */
export const posts: Post[] = [
  {
    slug: 'o-que-fazer-quando-o-carro-quebra',
    titulo: 'O que fazer quando o carro quebra na rua ou na rodovia',
    resumo:
      'A ordem certa das primeiras ações, o que muda entre via urbana e rodovia, e o erro mais comum de quem espera o guincho.',
    publicadoEm: '2025-03-10',
    atualizadoEm: '2025-03-10',
    corpo: [
      'A primeira decisão não é para quem ligar: é onde ficar. Em via urbana, com o carro ainda andando, tire-o da faixa de rolamento antes de parar. Em rodovia, se o veículo morreu de vez, saia dele, atravesse a defensa e espere afastado da pista.',
      'Esperar dentro do carro parado no acostamento é o erro mais comum e o mais grave. Colisão traseira em veículo parado é o cenário que mata em rodovia, e o acostamento estreito da BR-174 não oferece a margem que as pessoas imaginam.',
      'Com a segurança resolvida, ligue o pisca-alerta e posicione o triângulo a uma distância que dê tempo de reação a quem vem em velocidade de rodovia. Só depois disso pegue o telefone.',
      'Ao ligar para o guincho, tenha três informações prontas: onde você está com a referência mais precisa possível, o que aconteceu com o veículo, e para onde ele deve ir. Essas três definem qual prancha sai da base e evitam um segundo deslocamento.',
    ],
  },
]

export function postPorSlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
