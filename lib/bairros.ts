/**
 * REGRA DE ESCOPO — leia antes de adicionar um bairro.
 *
 * Gerar dezenas de páginas que só trocam o nome do bairro é o padrão que as
 * diretrizes do Google descrevem como doorway page. O risco não é ficar em
 * segundo lugar: é ação manual.
 *
 * O limite deste arquivo é de 8 a 12 bairros. Cada um precisa de contexto real —
 * vias de acesso, pontos de referência, que tipo de chamado acontece ali.
 * Se você não consegue escrever ~300 palavras genuínas sobre um bairro, ele não
 * merece página. Não afrouxe esta regra para ganhar volume.
 */
export type Bairro = {
  slug: string
  nome: string
  /** Uma linha sobre o que caracteriza a demanda ali. Aparece na grade da Home. */
  perfil: string
  /** Vias e referências reais, usadas no corpo e no texto de cobertura. */
  vias: string[]
  tempoMedio: string
  corpo: string[]
}

export const bairros: Bairro[] = [
  {
    slug: 'ponta-negra',
    nome: 'Ponta Negra',
    perfil: 'Orla, turismo e carro alugado.',
    vias: ['Av. Coronel Teixeira', 'Estrada do Turismo'],
    tempoMedio: '20 a 35 min',
    corpo: [
      'Ponta Negra concentra dois tipos de chamado que quase não aparecem no resto da cidade. O primeiro é o turista com carro alugado: pane em veículo que ele não conhece, sem saber onde fica a locadora e frequentemente sem o manual ou a chave de roda. O segundo é o movimento de fim de semana na orla, com o estacionamento cheio e manobra apertada entre veículos.',
      'O acesso principal é pela Av. Coronel Teixeira. Em noite de evento na orla, o trecho próximo à praia congestiona e a prancha precisa de espaço para posicionar. Nesses casos combinamos um ponto de embarque a alguns metros do local, o que costuma ser mais rápido do que insistir na vaga original.',
      'Para carro de locadora, o destino do reboque quase sempre é o pátio da própria locadora, e não a oficina mais próxima. Confirmar isso na ligação evita um segundo deslocamento cobrado.',
    ],
  },
  {
    slug: 'distrito-industrial',
    nome: 'Distrito Industrial',
    perfil: 'Empilhadeira, gerador e máquina pesada.',
    vias: ['Av. Buriti', 'Av. Solimões', 'Av. Torquato Tapajós'],
    tempoMedio: '25 a 40 min',
    corpo: [
      'No Distrito Industrial a maior parte da demanda não é carro: é equipamento. Empilhadeira que parou dentro do galpão, gerador que precisa ir para manutenção, máquina que muda de planta. São operações com regra própria — ponto de içamento definido, distribuição de peso sobre a prancha e amarração conforme norma.',
      'O acesso se dá pelas avenidas Buriti e Solimões, com ligação pela Torquato Tapajós. Caminhão com prancha carregada tem restrição de manobra em alguns pátios internos, então levantamos antes o portão de entrada, o pé-direito e se há necessidade de escolta.',
      'A parte burocrática costuma pesar mais que a técnica. Empresa daqui exige cadastro de fornecedor com CNPJ, nota fiscal e comprovante de seguro sobre a carga antes de autorizar a entrada. Trabalhamos com os três, e o cadastro pode ser feito uma vez e reaproveitado nos chamados seguintes.',
    ],
  },
  {
    slug: 'br-174',
    nome: 'BR-174',
    perfil: 'Rodovia, distância e trecho sem acostamento.',
    vias: ['BR-174', 'Ramal do Pau Rosa'],
    tempoMedio: '40 a 90 min conforme o km',
    corpo: [
      'A BR-174 é o cenário mais crítico da nossa área de atendimento, e por um motivo simples: existem trechos longos sem acostamento útil e sem iluminação. Um veículo parado ali não é só um problema mecânico, é um risco de colisão traseira.',
      'A primeira orientação na ligação é sempre a mesma e vale mais que qualquer prazo: saia do veículo, atravesse a defensa e espere afastado da pista, nunca dentro do carro nem no acostamento estreito. O triângulo vai a distância suficiente para dar tempo de reação a quem vem em velocidade de rodovia.',
      'O tempo de chegada aqui depende do km, e não adianta prometer número fechado. Pedimos o marco quilométrico ou o ponto de referência mais próximo, porque isso muda o trajeto e a estimativa. Sinal de celular oscila em parte do percurso, então registramos um segundo contato logo no início do atendimento.',
    ],
  },
  {
    slug: 'centro',
    nome: 'Centro',
    perfil: 'Via estreita, carga e descarga, trânsito lento.',
    vias: ['Av. Sete de Setembro', 'Av. Eduardo Ribeiro'],
    tempoMedio: '15 a 30 min',
    corpo: [
      'O Centro tem a maior densidade de veículo por metro de via da cidade, e a dificuldade quase nunca é chegar: é posicionar a prancha. Ruas estreitas, carga e descarga do comércio ocupando a faixa e estacionamento em fila dupla reduzem o espaço de manobra a quase nada em horário comercial.',
      'Quando o veículo está em via de comércio ativo, pedimos a referência exata — número e ponto próximo — porque poucos metros mudam completamente a viabilidade da manobra. Em alguns casos é mais rápido deslocar o veículo em ponto morto até uma transversal do que tentar embarcar no local.',
      'Fora do horário comercial o Centro fica entre as áreas de atendimento mais rápidas da cidade, pelo acesso direto via Sete de Setembro e Eduardo Ribeiro.',
    ],
  },
  {
    slug: 'adrianopolis',
    nome: 'Adrianópolis',
    perfil: 'Corredor comercial e concessionárias.',
    vias: ['Av. Djalma Batista', 'Av. Mário Ypiranga'],
    tempoMedio: '15 a 30 min',
    corpo: [
      'Adrianópolis concentra concessionária, oficina autorizada e centro comercial, o que faz do bairro tanto origem quanto destino frequente de reboque. Boa parte dos chamados aqui é de veículo em garantia que precisa chegar a uma autorizada específica, e não à oficina mais próxima.',
      'Djalma Batista e Mário Ypiranga são os eixos de acesso e ambos têm fluxo intenso em horário de pico. Garagem de prédio comercial com pé-direito baixo e rampa curta é a restrição mais comum: em subsolo, muitas vezes o veículo precisa ser trazido até o nível da rua antes do embarque.',
      'Para veículo em garantia, confirmamos o nome da autorizada antes de sair. Entregar no lugar errado significa um segundo reboque e uma discussão de cobrança que ninguém quer ter.',
    ],
  },
  {
    slug: 'cidade-nova',
    nome: 'Cidade Nova',
    perfil: 'Zona Norte, área extensa e residencial.',
    vias: ['Av. Noel Nutels', 'Av. Max Teixeira'],
    tempoMedio: '25 a 45 min',
    corpo: [
      'Cidade Nova é uma das maiores áreas residenciais de Manaus, e a extensão é o fator determinante do tempo de chegada. O nome do bairro sozinho não localiza nada útil — precisamos do conjunto e da referência, porque a diferença entre dois pontos do mesmo bairro pode passar de vinte minutos.',
      'O acesso principal é por Noel Nutels e Max Teixeira. Dentro dos conjuntos, há vias residenciais estreitas com lombada e curva fechada onde a prancha não entra. Nessas situações combinamos um ponto de embarque na via coletora mais próxima.',
      'A demanda aqui é predominantemente de veículo de uso diário: bateria, pane elétrica e problema de partida, com concentração no começo da manhã.',
    ],
  },
  {
    slug: 'flores',
    nome: 'Flores',
    perfil: 'Ligação entre a zona centro-sul e a norte.',
    vias: ['Av. Torquato Tapajós', 'Av. das Flores'],
    tempoMedio: '20 a 35 min',
    corpo: [
      'Flores funciona como área de passagem entre a zona centro-sul e a norte, cortada pela Torquato Tapajós. Boa parte dos chamados não é de morador do bairro, e sim de quem estava em trânsito e parou ali.',
      'A Torquato tem fluxo pesado e trechos onde o acostamento é curto demais para um veículo parado com segurança. Quando o carro ainda anda, a orientação é sair da via principal e aguardar em transversal — o embarque fica mais seguro e mais rápido.',
      'Pela posição central em relação à malha viária, Flores é um dos pontos com melhor previsibilidade de tempo de chegada em horário normal.',
    ],
  },
  {
    slug: 'sao-jose-operario',
    nome: 'São José Operário',
    perfil: 'Zona Leste, alta densidade residencial.',
    vias: ['Av. Autaz Mirim', 'Av. Grande Circular'],
    tempoMedio: '30 a 50 min',
    corpo: [
      'São José Operário está na Zona Leste, atendida pela Autaz Mirim e pela Grande Circular. A densidade residencial é alta e o traçado interno tem muitas vias sem saída, o que torna a referência precisa mais importante aqui do que na média da cidade.',
      'A Grande Circular concentra parte relevante dos chamados de colisão da zona, pelo volume e pela velocidade do tráfego. Em ocorrência com vítima, a prioridade é o atendimento de emergência — o reboque entra depois da liberação, e não antes.',
      'Em horário de pico a Autaz Mirim congestiona no sentido Centro. Nesses períodos informamos a estimativa já considerando o trecho lento, em vez de dar um número otimista que não se sustenta.',
    ],
  },
]

export function bairroPorSlug(slug: string): Bairro | undefined {
  return bairros.find((b) => b.slug === slug)
}
