/**
 * NAP (Nome, Endereço, Telefone) é a fonte única de verdade da identidade local.
 * Consistência NAP entre site, Perfil da Empresa no Google e diretórios é o que
 * sustenta o ranking no pacote local. Qualquer divergência aqui custa posição.
 *
 * Os campos marcados com TODO precisam dos dados reais antes do go-live.
 */
export const site = {
  nome: 'RN Guincho',
  nomeLegal: 'RN Guincho Manaus',
  descricao:
    'Guincho 24 horas em Manaus. Remoção de carros, utilitários e vans, e transporte de máquinas e equipamentos industriais.',

  // O telefone é o produto. Duas formas: a de exibição e a do href tel:.
  telefone: '92 99397-6644',
  telefoneHref: '+5592993976644',
  whatsapp: '5592993976644',

  endereco: {
    // TODO: endereço real, idêntico ao cadastrado no Perfil da Empresa.
    rua: 'Av. Exemplo, 000',
    bairro: 'Distrito Industrial',
    cidade: 'Manaus',
    estado: 'AM',
    cep: '69075-000',
    pais: 'BR',
  },

  geo: { lat: -3.10719, lng: -60.0261 },

  cnpj: '00.000.000/0001-00', // TODO
  fundacao: '2015', // TODO

  // TODO: alimentar pelo Perfil da Empresa (ISR 24h) em vez de valor fixo.
  avaliacoes: { nota: 4.9, total: 87 },

  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.rnguincho.com.br',
} as const

export const enderecoLinhaUnica = `${site.endereco.rua} — ${site.endereco.bairro}, ${site.endereco.cidade}/${site.endereco.estado} — CEP ${site.endereco.cep}`

/** Mensagem padrão do WhatsApp, sem localização. O componente cliente enriquece. */
export function linkWhatsApp(mensagem?: string): string {
  const texto = mensagem ?? 'Olá! Preciso de um guincho em Manaus.'
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`
}
