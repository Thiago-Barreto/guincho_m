import type { Metadata, Viewport } from 'next'
import './globals.css'
import { corpo, display } from '@/lib/fontes'
import { site } from '@/lib/site'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BarraEmergencia } from '@/components/layout/BarraEmergencia'
import { JsonLdNegocio } from '@/components/seo/JsonLd'

/**
 * SERVER COMPONENT (padrão do App Router). Nenhum "use client" na árvore
 * de layout — Header, Footer e BarraEmergencia são todos servidor.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Guincho 24 Horas em Manaus | ${site.nome}`,
    template: `%s | ${site.nome}`,
  },
  description: site.descricao,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
    siteName: site.nome,
    title: `Guincho 24 Horas em Manaus | ${site.nome}`,
    description: site.descricao,
    // A imagem vem do app/opengraph-image.tsx, gerada no build.
    // Isso resolve o placeholder quebrado do site atual.
  },
  twitter: {
    card: 'summary_large_image',
    title: `Guincho 24 Horas em Manaus | ${site.nome}`,
    description: site.descricao,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: '#0E1A24',
  // Sem maximumScale nem userScalable:false — bloquear zoom quebra a
  // acessibilidade de quem precisa ampliar para ler o telefone.
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${corpo.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-giratorio focus:px-4 focus:py-3 focus:text-noite"
        >
          Pular para o conteúdo
        </a>

        <BarraEmergencia />
        <Header />

        <main id="conteudo" className="flex-1">
          {children}
        </main>

        <div className="chevron" aria-hidden="true" />
        <Footer />

        <JsonLdNegocio />
      </body>
    </html>
  )
}
