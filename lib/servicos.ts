export type Servico = {
  slug: string
  nome: string
  titulo: string
  resumo: string
  /**
   * Define o tom da página. A Home atende o motorista em pânico;
   * as páginas de serviço atendem também o comprador industrial,
   * que quer prova de capacidade — frota, carga, CNPJ, seguro.
   */
  publico: 'motorista' | 'industrial'
  corpo: string[]
}

export const servicos: Servico[] = [
  {
    slug: 'guincho-para-carros',
    nome: 'Carros de passeio',
    titulo: 'Guincho para carros em Manaus',
    resumo: 'Pane, colisão, bateria e pneu. Remoção para oficina, residência ou pátio.',
    publico: 'motorista',
    corpo: [
      'Atendimento para veículos de passeio em toda Manaus, com plataforma que carrega o carro inteiro sobre o assoalho — sem arrastar e sem apoiar sobre um dos eixos. Isso importa em câmbio automático e em tração integral, onde o reboque parcial danifica o conjunto.',
      'Chegamos com o básico resolvido: cones, triângulo e colete para sinalizar o ponto antes de qualquer manobra. Se o veículo estiver em faixa de rolamento, a sinalização vem antes do embarque.',
      'Se o carro ainda liga e anda, vale sair da via principal antes da nossa chegada. É mais seguro para você e reduz o tempo de operação no local.',
    ],
  },
  {
    slug: 'guincho-para-utilitarios-e-vans',
    nome: 'Utilitários e vans',
    titulo: 'Guincho para utilitários e vans em Manaus',
    resumo: 'Vans, furgões e picapes. Prancha com capacidade compatível com o porte.',
    publico: 'motorista',
    corpo: [
      'Utilitários e vans exigem prancha com comprimento e capacidade acima da usada em carro de passeio. Confirmamos o modelo e a carga antes de sair, para não chegar com equipamento incompatível e ter que voltar.',
      'Veículo de carga costuma estar carregado quando quebra. O peso da carga entra no cálculo de capacidade, então é a primeira informação que pedimos — não é burocracia, é o que define qual prancha sai da base.',
      'Para frotas com veículo parado em rota de entrega, o atendimento pode ser contratado com prioridade.',
    ],
  },
  {
    slug: 'transporte-de-maquinas',
    nome: 'Máquinas e equipamentos',
    titulo: 'Transporte de máquinas e equipamentos em Manaus',
    resumo:
      'Empilhadeiras, geradores e equipamento industrial. Prancha compatível e amarração conforme norma.',
    publico: 'industrial',
    corpo: [
      'Remoção e transporte de empilhadeiras, geradores, compressores e equipamento industrial no Distrito Industrial e região metropolitana. A operação é diferente da de veículo: importa o ponto de içamento, a distribuição de peso sobre a prancha e a amarração.',
      'O levantamento acontece antes do deslocamento. Peso, dimensões, ponto de içamento e as condições de acesso ao pátio — portão, pé-direito, raio de manobra — definem o equipamento e a equipe. Chegar e descobrir que a prancha não entra custa um dia de operação ao cliente.',
      'Trabalhamos com nota fiscal, CNPJ e cobertura de seguro sobre a carga. Para compras de indústria, esses três itens costumam ser pré-requisito de cadastro de fornecedor, e não detalhe.',
    ],
  },
]

export function servicoPorSlug(slug: string): Servico | undefined {
  return servicos.find((s) => s.slug === slug)
}
