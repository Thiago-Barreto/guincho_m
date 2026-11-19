import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

/**
 * O disallow de /rastreamento/ é a terceira camada de defesa, junto com o
 * metadata.robots da rota e o X-Robots-Tag do next.config.ts.
 *
 * Ele sozinho NÃO bastaria: robots.txt impede o rastreamento, não a
 * indexação — uma URL bloqueada aqui mas linkada de fora ainda pode
 * aparecer no índice sem descrição. Por isso as três camadas coexistem.
 *
 * /api/ também sai: não há nada ali para um crawler.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/rastreamento/', '/api/'],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
