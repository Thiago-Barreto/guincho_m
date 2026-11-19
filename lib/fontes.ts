import { Barlow, Barlow_Condensed } from 'next/font/google'

/**
 * Superfamília Barlow, carregada pelo next/font com subset latin.
 * Self-hosted no build: zero request a fonts.googleapis.com em runtime,
 * sem round-trip de DNS no caminho crítico do LCP.
 *
 * display:'swap' — o texto aparece na fonte de fallback e troca depois.
 * Quem está parado no acostamento precisa ler o telefone imediatamente,
 * ainda que na fonte errada por 100ms.
 */
export const corpo = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--fonte-corpo',
})

export const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--fonte-display',
})
