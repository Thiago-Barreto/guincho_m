import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { FaixaConfianca } from '@/components/home/FaixaConfianca'
import { Rastreamento } from '@/components/home/Rastreamento'
import { GradeServicos } from '@/components/home/CardServico'
import { ComoFunciona } from '@/components/home/ComoFunciona'
import { GradeBairros } from '@/components/home/GradeBairros'
import { Galeria } from '@/components/home/Galeria'
import { Avaliacoes } from '@/components/home/Avaliacoes'
import { FAQ } from '@/components/home/FAQ'
import { JsonLdFaq } from '@/components/seo/JsonLd'
import { faq } from '@/lib/faq'
import { site } from '@/lib/site'

/**
 * SERVER COMPONENT · SSG.
 *
 * Estática no build. O único dado que envelhece são as avaliações, e elas
 * revalidam sozinhas a cada 24h dentro do próprio componente Avaliacoes —
 * a página inteira não precisa de revalidate por causa disso.
 *
 * ORDEM DAS SEÇÕES: definida por quem está no acostamento, não por quem
 * está admirando o site. Telefone primeiro; institucional por último.
 */
export const metadata: Metadata = {
  title: 'Guincho 24 Horas em Manaus | Reboque e Transporte de Máquinas',
  description: `Guincho 24 horas em Manaus. Ligue ${site.telefone}. Remoção de carros, utilitários e vans, e transporte de máquinas e equipamentos industriais. Atendimento em toda a cidade e região.`,
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
    <>
      <Hero />
      <FaixaConfianca />
      <Rastreamento />
      <GradeServicos />
      <ComoFunciona />
      <GradeBairros />
      <Galeria />
      <Avaliacoes />
      <FAQ />

      <JsonLdFaq perguntas={faq} />
    </>
  )
}
