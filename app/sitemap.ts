import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { servicos } from '@/lib/servicos'
import { bairros } from '@/lib/bairros'
import { posts } from '@/lib/blog'

/**
 * Gerado das MESMAS fontes de dados que geram as rotas.
 *
 * É por isso que servicos.ts e bairros.ts existem como módulos e não como
 * pastas soltas: adicionar um bairro atualiza a rota, o sitemap, a grade da
 * Home e o rodapé de uma vez. Sitemap mantido à mão sai de sincronia na
 * primeira semana e passa a oferecer 404 ao crawler.
 *
 * /rastreamento/[id] está DELIBERADAMENTE fora: é noindex e carrega dado
 * pessoal. Nunca ofereça ao crawler uma URL que você não quer indexada.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date()

  return [
    { url: site.url, lastModified: agora, changeFrequency: 'weekly', priority: 1 },
    {
      url: `${site.url}/servicos`,
      lastModified: agora,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${site.url}/frota`,
      lastModified: agora,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...servicos.map((s) => ({
      url: `${site.url}/servicos/${s.slug}`,
      lastModified: agora,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...bairros.map((b) => ({
      url: `${site.url}/guincho/${b.slug}`,
      lastModified: agora,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.atualizadoEm),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ]
}
