# RN Guincho — Portal de socorro rodoviário

Next.js 15 (App Router) + Tailwind CSS v4 + TypeScript.
Implementação da **Fase 2 — Fundação Next.js** do documento `instructions.html`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
```

---

## Regras que não se negociam

Cada uma existe por um motivo registrado no documento de planejamento.
Alterá-las sem reler o motivo tende a reintroduzir o problema original.

### 1. Contraste do Giratório

`#FF9500` sobre branco dá ~2,2:1 e **reprova em AA**. Ele nunca é cor de texto
sobre fundo claro. É sempre preenchimento, com texto Noite do Rio por cima
(~8,7:1). **Botão âmbar, letra escura.**

Sobre fundo escuro (`bg-noite`, `bg-asfalto`) o âmbar como texto passa e é
usado à vontade. A única exceção sobre fundo claro está em `Avaliacoes.tsx`:
estrelas `aria-hidden`, totalmente redundantes com a nota em texto ao lado.

### 2. `/rastreamento` — três camadas de defesa

Localização é dado pessoal sob a LGPD. A rota está fora do índice por três
mecanismos independentes, e nenhum deles sozinho basta:

| Camada | Arquivo | Cobre |
|---|---|---|
| `metadata.robots` | `app/rastreamento/[id]/page.tsx` | o que renderiza |
| `X-Robots-Tag` + `no-store` | `next.config.ts` | o que o crawler busca antes do HTML |
| ausência no sitemap | `app/sitemap.ts` | o que é oferecido ativamente |

`robots.txt` impede rastreamento, **não** indexação — uma URL bloqueada lá mas
linkada de fora ainda pode aparecer no índice. Por isso as três coexistem.

**IDs precisam ser não sequenciais.** Com `/rastreamento/1`, `/2`, `/3`,
qualquer pessoa itera e assiste à localização de clientes reais. Use nanoid ou
UUID, com expiração ao encerrar o atendimento. `idValido()` em
`lib/rastreamento.ts` já rejeita o formato sequencial.

### 3. Bairros: de 8 a 12, nunca mais

Gerar dezenas de páginas que só trocam o nome do bairro é o padrão que o
Google descreve como **doorway page**, e o risco é ação manual, não perda de
posição. `dynamicParams = false` garante que só existam os bairros escritos à
mão em `lib/bairros.ts`.

Se você não consegue escrever ~300 palavras genuínas sobre um bairro, ele não
merece página.

### 4. Forma dos botões: placa de sinalização

Chanfro em 45° (canto superior esquerdo e inferior direito) + fita refletiva
na base. Vem do mesmo lugar que a paleta — o veículo de socorro — e é o que
separa o site do resto do mercado, que usa os mesmos cantos arredondados de
template. Tudo em `clip-path` e `linear-gradient`: **zero bytes de JS ou
imagem**.

Três armadilhas já encontradas e resolvidas (não reintroduza):

- **`clip-path` recorta `box-shadow` e `outline`.** Um anel de foco no próprio
  `.btn` fica invisível e quem navega por teclado perde a indicação por
  completo. O anel é desenhado por `::before` com `inset` box-shadow, dentro
  da área recortada. Verificado no navegador.
- **Fita com listras `transparent` vaza o fundo da página** e o chanfro corta
  as pontas, virando serrilhado. As listras são `color-mix` sobre
  `background-color: inherit`.
- **Fita abaixo de 8px de altura** transforma cada listra diagonal em
  triângulo, e a base lê como dente de serra.

Botão secundário: `.btn-contorno` (o contorno é `inset box-shadow`, porque
uma `border` comum seria cortada pelo chanfro). Campos de texto que ficam ao
lado de um botão usam `.campo`, com o chanfro espelhado para o par ler como
peça única.

### 5. Sem emoji como marcador

Leitores de tela os anunciam de forma desconexa no meio da frase, e eles pesam
contra a percepção de profissionalismo no público industrial. Use
`components/ui/Icones.tsx` — SVG inline, `aria-hidden`, zero JS.

---

## Server / Client

**Server Component é o padrão. `"use client"` é exceção justificada, sempre na
folha da árvore.** Quatro componentes clientes no site inteiro — é isso que
mantém o INP baixo nas páginas que o Google mede.

| Componente | Justificativa |
|---|---|
| `BotaoWhatsAppComLocal` | `navigator.geolocation`; degrada para link comum se negado |
| `CampoCodigo` | estado do input + navegação; funciona sem JS via `<form action method=get>` |
| `MapaRastreamento` / `MapaCanvas` | mapa interativo; `dynamic(ssr:false)`, só em `/rastreamento/[id]` |
| `MenuMobile` | **não implementado** — a navegação cabe em CSS hoje |

Todo o resto é servidor, incluindo `Header`, `Footer`, `BarraEmergencia`,
`FAQ` (`<details>` nativo), `Galeria` (CSS `scroll-snap`) e `Avaliacoes`
(fetch no servidor, cache 24h).

### Decisões de peso

- **Mapa:** MapLibre GL JS (~40KB) em vez da Google Maps JS API (200KB+ e
  cobrança por carregamento). Import dinâmico numa rota `noindex`, então o
  peso nunca toca o LCP de nenhuma página indexada.
- **Tempo real:** polling de 10s. Função serverless não sustenta conexão longa,
  e um guincho no trânsito de Manaus não se move rápido o suficiente para
  justificar 60 atualizações por minuto. Se o volume crescer, troque o
  `setInterval` em `MapaCanvas.tsx` por Supabase Realtime ou Pusher.
- **Galeria:** `scroll-snap` em CSS elimina o bundle do carrossel e a fonte
  mais provável de CLS.

---

## Rotas

| Rota | Renderização | Indexação |
|---|---|---|
| `/` | SSG (avaliações por ISR 24h) | index |
| `/servicos`, `/servicos/[servico]` | SSG · `dynamicParams=false` | index |
| `/guincho/[bairro]` | SSG estrito · `dynamicParams=false` | index |
| `/frota` | SSG | index |
| `/blog/[slug]` | ISR 3600s | index |
| `/rastreamento/[id]` | `force-dynamic` | **noindex, nofollow** |
| `/api/posicao` | dinâmica | — |

Formato de bairro: **Opção A** (`/guincho/ponta-negra`). A Opção B
(`/guincho-ponta-negra` na raiz) foi descartada — o ganho de SEO é
praticamente zero e a raiz viraria espaço compartilhado, com cada rota nova
precisando ser conferida contra a lista de slugs.

`sitemap.ts` é gerado das **mesmas fontes** que geram as rotas
(`lib/servicos.ts`, `lib/bairros.ts`, `lib/blog.ts`) — adicionar um bairro
atualiza rota, sitemap, grade da Home e rodapé de uma vez.

---

## Pendências antes do go-live

**Bloqueadores:**

- [ ] `POST /api/posicao` exige `MOTORISTA_TOKEN` — sem ele, qualquer um posta
      coordenadas em qualquer atendimento
- [ ] NAP real em `lib/site.ts` (endereço, CNPJ, fundação) — **idêntico** ao do
      Perfil da Empresa; divergência custa ranking local
- [ ] Persistência do rastreamento (`buscarAtendimento` é stub)
- [ ] Geração de IDs com nanoid/UUID + expiração ao encerrar

**Conteúdo:**

- [ ] Fotos reais da frota (`lib/frota.ts` → campo `foto`). Banco de imagens
      destrói a confiança que a seção existe para criar
- [ ] `public/mapa-cobertura.webp`
- [ ] Integração real das avaliações (`AVALIACOES_ENDPOINT`)

**Fora do escopo desta fase, mas no do projeto:** a coleta de avaliações
(Fase 4). O TOP 1 para "guincho perto de mim" é decidido pelo pacote local —
volume e recência de avaliações — e não pelo site. Um portal impecável com 12
avaliações perde para um concorrente de site ruim com 90. O mecanismo de
solicitação pós-atendimento é feature do escopo, não marketing paralelo.

---

## Estrutura

```
app/
├── layout.tsx              fontes, JSON-LD Organization, barra fixa
├── page.tsx                Home — ordem do wireframe
├── sitemap.ts · robots.ts · opengraph-image.tsx · not-found.tsx
├── servicos/[servico]/ · guincho/[bairro]/ · frota/ · blog/[slug]/
├── rastreamento/[id]/      force-dynamic · noindex
└── api/posicao/route.ts

components/
├── layout/       Header, Footer, BarraEmergencia          (servidor)
├── home/         Hero, FAQ, Galeria, Avaliacoes, …        (servidor)
├── rastreamento/ PainelRastreamento (servidor) + MapaCanvas (cliente)
├── seo/          JsonLd — LocalBusiness, Service, FAQPage, Breadcrumb
└── ui/           Icones (servidor), BotaoWhatsAppComLocal (cliente)

lib/              site · servicos · bairros · faq · frota · blog · rastreamento
```
