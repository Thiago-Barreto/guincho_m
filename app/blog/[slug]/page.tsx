import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { posts, postPorSlug } from '@/lib/blog'
import { site } from '@/lib/site'
import { JsonLdMigalhas } from '@/components/seo/JsonLd'

/**
 * SERVER COMPONENT · ISR com revalidate de 3600s.
 *
 * Diferente das outras rotas: aqui NÃO usamos dynamicParams = false. O blog
 * é o único lugar onde publicar sem rebuild tem valor — corrigir um texto ou
 * subir um post não deveria exigir deploy. O custo é uma revalidação por
 * hora, o que para conteúdo editorial é irrelevante.
 */
export const revalidate = 3600

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = postPorSlug(slug)

  if (!post) return {}

  return {
    title: post.titulo,
    description: post.resumo,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.titulo,
      description: post.resumo,
      publishedTime: post.publicadoEm,
      modifiedTime: post.atualizadoEm,
      url: `${site.url}/blog/${post.slug}`,
    },
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = postPorSlug(slug)

  if (!post) notFound()

  return (
    <>
      <article className="wrap py-14">
        <nav aria-label="Trilha de navegação" className="text-sm text-texto-fraco">
          <Link href="/" className="hover:text-farol">
            Início
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{post.titulo}</span>
        </nav>

        <h1 className="text-d2 mt-4 font-bold uppercase">{post.titulo}</h1>

        <p className="mt-3 text-sm text-texto-fraco">
          Publicado em{' '}
          <time dateTime={post.publicadoEm}>
            {new Date(post.publicadoEm).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        </p>

        <div className="medida mt-8 space-y-4 text-lg">
          {post.corpo.map((paragrafo, i) => (
            <p key={i}>{paragrafo}</p>
          ))}
        </div>
      </article>

      <JsonLdMigalhas
        itens={[
          { nome: 'Início', url: site.url },
          { nome: post.titulo, url: `${site.url}/blog/${post.slug}` },
        ]}
      />
    </>
  )
}
