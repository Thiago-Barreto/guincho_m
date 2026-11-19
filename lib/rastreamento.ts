/**
 * Tipos e regras do rastreamento.
 *
 * LGPD: localização é dado pessoal. As regras deste arquivo não são
 * preferências de produto, são requisitos de privacidade.
 */
export type Posicao = {
  lat: number
  lng: number
  /** ISO 8601. Base do cálculo de "última atualização há N min". */
  atualizadoEm: string
}

export type Atendimento = {
  id: string
  status: 'a-caminho' | 'no-local' | 'em-transporte' | 'concluido'
  posicao: Posicao | null
  motorista: { nome: string; telefone: string }
  tempoEstimadoMin: number | null
  destino: string
}

/**
 * Limite de envelhecimento da posição, em minutos.
 *
 * O sistema depende do celular do motorista transmitindo GPS. Se ele
 * esquecer de ativar, ficar sem bateria ou perder sinal — comum nas vias
 * periféricas e nas rodovias de acesso — o cliente vê um ícone parado no
 * mapa e conclui que foi abandonado. O diferencial vira reclamação.
 *
 * Passando deste limite, a tela ESCONDE o mapa e dá lugar ao contato direto
 * com o motorista. Melhor admitir que a posição envelheceu do que exibir
 * uma mentira que parece precisa.
 */
export const LIMITE_POSICAO_MIN = 5

export function minutosDesde(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 60_000)
}

export function posicaoConfiavel(posicao: Posicao | null): boolean {
  if (!posicao) return false
  return minutosDesde(posicao.atualizadoEm) <= LIMITE_POSICAO_MIN
}

/**
 * Os IDs precisam ser NÃO SEQUENCIAIS.
 *
 * Com /rastreamento/1, /2, /3, qualquer pessoa itera e assiste à localização
 * de clientes reais. Isso não é bug de software, é incidente de privacidade.
 *
 * Use nanoid ou UUID na criação do atendimento, e expire o registro ao
 * encerrar o serviço — o link não pode continuar válido depois da entrega.
 */
export function idValido(id: string): boolean {
  return /^[A-Za-z0-9_-]{6,32}$/.test(id)
}

/** TODO: substituir pela consulta real ao banco. */
export async function buscarAtendimento(id: string): Promise<Atendimento | null> {
  if (!idValido(id)) return null
  return null
}
