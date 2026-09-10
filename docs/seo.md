# SEO e preview de compartilhamento

## O problema que este setup resolve

O site é um SPA: o Vite gera **um** `index.html` e o React monta todas as rotas
no navegador. Isso cria dois problemas distintos.

**Preview de link (WhatsApp, Facebook, Telegram).** Esses robôs baixam o HTML e
leem o `<head>`. Eles **não executam JavaScript**. Então metadados injetados no
cliente — como os do hook `usePageMeta` — são invisíveis para eles: qualquer
link compartilhado mostraria sempre o título da home, sem descrição e sem
imagem.

**Indexação no Google.** O Google até renderiza JavaScript, mas descobrir e
indexar todas as rotas de um SPA sem sitemap, sem canonical e com um único
título para o site inteiro é lento e parcial.

## Como funciona

O build roda `scripts/prerender.mjs` depois do `vite build`. Ele escreve **um
HTML estático por rota** — `dist/planos/index.html`, `dist/sobre/index.html`,
etc. — cada um com seu próprio `<title>`, `description`, `canonical`, Open Graph,
Twitter Card e JSON-LD já embutidos no HTML cru.

O `<body>` continua sendo o shell do SPA. Quem lê o HTML sem executar JS
(crawlers de preview) recebe os metadados certos; o navegador carrega o React e
a página funciona como antes.

O catálogo de páginas tem **fonte única**: `INDEXABLE_PAGES` em
`src/config/site.ts`. O script lê esse arquivo TypeScript direto (empacotado em
memória pelo esbuild), então adicionar uma rota nova ao array já a inclui no
prerender e no sitemap.

O script também gera `robots.txt` e `sitemap.xml`, e marca `/404` como
`noindex`.

## O passo que falta: `VITE_SITE_URL`

Open Graph exige **URLs absolutas**. Sem o domínio não há canonical, `og:url`
nem `og:image` — e sem `og:image` o WhatsApp não gera preview nenhum.

Cadastre no **Cloudflare Pages → Settings → Environment variables** (escopo de
build) e refaça o deploy:

```
VITE_SITE_URL=https://seu-dominio.com.br
```

Sem https e sem barra no final. O build avisa em letras garrafais quando a
variável está ausente, mas **não falha** — o site continua publicando, só sem
preview.

## Imagem de compartilhamento

`public/og-image.jpg` — 1200×630, ~44 KB.

Dois requisitos que não são negociáveis: precisa ser **JPEG ou PNG** (o robô do
WhatsApp não renderiza WebP, e todas as outras imagens do projeto são WebP) e
precisa ficar **abaixo de ~300 KB**, senão o WhatsApp desiste de baixar.

Para regerar a partir do logo:

```bash
bash scripts/generate-og-image.sh
```

Usa `sharp` via `npx` — nenhuma dependência é adicionada ao projeto.

## Rotas e redirecionamentos

`public/_redirects` cuida do roteamento no Cloudflare Pages:

- `/contato` e `/suporte` viram **301 no edge**, em vez de redirecionamento por
  JavaScript. O Google consolida o link equity no destino em vez de indexar
  duas URLs para o mesmo conteúdo.
- `/*  /index.html  200` é o fallback do SPA. Os arquivos estáticos têm
  prioridade, então as páginas pré-renderizadas são servidas antes de a regra
  valer.

## Como verificar

Depois do deploy:

- **WhatsApp**: mande o link para si mesmo. O preview é cacheado — para forçar
  atualização, use o [Sharing Debugger do
  Facebook](https://developers.facebook.com/tools/debug/), que compartilha o
  cache com o WhatsApp.
- **Google**: `site:seu-dominio.com.br` mostra o que já está indexado. Envie o
  `sitemap.xml` no Search Console para acelerar a descoberta.
- **Localmente**, um servidor estático simples reproduz o comportamento do
  Pages melhor que o `vite preview` (que tem fallback de SPA e devolve a home
  para tudo):

  ```bash
  npm run build && npx serve dist
  ```

## Limite conhecido

O prerender preenche o `<head>`, não o `<body>`. O conteúdo das páginas
continua dependendo de o Google renderizar o JavaScript — o que ele faz, mas
com atraso e orçamento limitado.

Se a indexação do conteúdo continuar insuficiente depois deste setup, o próximo
passo seria pré-renderizar o corpo também (SSG com `react-dom/server`). Isso é
bem mais invasivo: exige tratar os componentes que só funcionam no navegador,
com destaque para o mapa em `CoverageInfrastructureMap` (react-leaflet acessa
`window` na importação).
