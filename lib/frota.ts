export type Veiculo = {
  id: string
  nome: string
  capacidade: string
  aplicacao: string
  /**
   * Foto real do veículo. Foto de banco de imagens destrói exatamente a
   * confiança que esta seção existe para construir — o comprador industrial
   * reconhece um caminhão genérico de catálogo.
   */
  foto?: { src: string; alt: string; width: number; height: number }
}

export const frota: Veiculo[] = [
  {
    id: 'plataforma-leve',
    nome: 'Plataforma leve',
    capacidade: 'até 3.500 kg',
    aplicacao: 'Carros de passeio, SUVs e picapes leves. Assoalho hidráulico com guincho de arraste.',
  },
  {
    id: 'plataforma-media',
    nome: 'Plataforma média',
    capacidade: 'até 8.000 kg',
    aplicacao: 'Vans, furgões e utilitários carregados. Comprimento de assoalho estendido.',
  },
  {
    id: 'prancha-industrial',
    nome: 'Prancha industrial',
    capacidade: 'até 15.000 kg',
    aplicacao:
      'Empilhadeiras, geradores e equipamento industrial. Rampas de acesso e amarração conforme norma.',
  },
]
