export type Pergunta = { pergunta: string; resposta: string }

/**
 * Fonte única do FAQ: alimenta o acordeão nativo (<details>/<summary>, 0 JS)
 * e o JSON-LD FAQPage. Os dois precisam bater — schema que descreve conteúdo
 * ausente da página é violação de diretriz de dados estruturados.
 */
export const faq: Pergunta[] = [
  {
    pergunta: 'Vocês atendem 24 horas, inclusive fim de semana e feriado?',
    resposta:
      'Sim. O telefone e o WhatsApp funcionam 24 horas, todos os dias do ano. Fora do horário comercial o atendimento é o mesmo — não há plantão reduzido nem fila de espera diferente.',
  },
  {
    pergunta: 'Quanto tempo leva para o guincho chegar?',
    resposta:
      'Depende de onde você está. Na área central e nos bairros da zona centro-sul, entre 15 e 35 minutos. Na zona norte e leste, entre 25 e 50. Na BR-174 depende do quilômetro e pode passar de uma hora. Damos a estimativa real na ligação, considerando o trânsito do momento.',
  },
  {
    pergunta: 'Como o preço é calculado?',
    resposta:
      'Por distância entre o ponto de origem e o destino, mais o tipo de veículo ou equipamento. O valor é informado e fechado na ligação, antes do deslocamento. Não cobramos taxa adicional por horário noturno, fim de semana ou feriado.',
  },
  {
    pergunta: 'Meu carro é automático. Pode ser rebocado?',
    resposta:
      'Sim, e é justamente por isso que usamos plataforma. O carro sobe inteiro sobre o assoalho, com as quatro rodas fora do chão. Reboque parcial, com um eixo girando, é o que danifica câmbio automático e tração integral.',
  },
  {
    pergunta: 'O que eu faço enquanto espero na rodovia?',
    resposta:
      'Saia do veículo, atravesse a defensa e aguarde afastado da pista — nunca dentro do carro nem em acostamento estreito. Ligue o pisca-alerta e coloque o triângulo a uma distância que dê tempo de reação a quem vem em velocidade de rodovia. Essa orientação vale mais do que qualquer prazo de chegada.',
  },
  {
    pergunta: 'Vocês transportam empilhadeira e equipamento industrial?',
    resposta:
      'Sim. Atendemos o Distrito Industrial e a região metropolitana com prancha de capacidade compatível e amarração conforme norma. Emitimos nota fiscal e temos CNPJ e seguro sobre a carga, que costumam ser exigidos no cadastro de fornecedor da indústria.',
  },
  {
    pergunta: 'Atendem acionamento de seguradora?',
    resposta:
      'Atendemos tanto o particular quanto o acionamento via seguradora. Se o guincho for pela apólice, tenha o número em mãos ao ligar — isso reduz o tempo de autorização.',
  },
  {
    pergunta: 'Como acompanho o guincho a caminho?',
    resposta:
      'Ao abrir o atendimento você recebe um código e um link. Pela página de acompanhamento dá para ver a posição do guincho, o tempo estimado e o nome e telefone do motorista, com o horário da última atualização sempre visível.',
  },
]
