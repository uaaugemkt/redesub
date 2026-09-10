/**
 * Prerender de SEO — roda depois do `vite build`.
 *
 * Um SPA entrega um único index.html para todas as rotas. Robôs de preview de
 * link (WhatsApp, Facebook, Telegram) não executam JavaScript, então enxergam
 * sempre o mesmo <head> e nunca o conteúdo real da página. Este script resolve
 * isso escrevendo um HTML estático por rota — dist/planos/index.html etc. —
 * com título, descrição, canonical, Open Graph e JSON-LD já embutidos.
 *
 * O <body> continua sendo o shell do SPA: o React assume no cliente
 * normalmente. Quem lê o HTML cru (crawlers de preview) recebe os metadados
 * corretos; o Google usa o HTML para descoberta e indexação e renderiza o JS
 * para o conteúdo.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import * as esbuild from "esbuild";
import { loadEnv } from "vite";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;

/**
 * Carrega um módulo TypeScript do src/ sem depender de build separado:
 * o esbuild (já presente como dependência do Vite) empacota em memória e o
 * resultado é importado como data URL. Mantém o catálogo de páginas com uma
 * fonte única — src/config/site.ts — em vez de duplicá-lo aqui.
 */
async function importFromSrc(entry) {
  const result = await esbuild.build({
    entryPoints: [join(ROOT, entry)],
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
    // O código do app pode ler import.meta.env; no Node ele não existe.
    // O define exige um "entity name", então aponta para um global criado
    // pelo banner — assim `import.meta.env.QUALQUER_COISA` vira undefined
    // em vez de estourar.
    define: { "import.meta.env": "globalThis.__VITE_ENV__" },
    banner: { js: "globalThis.__VITE_ENV__ ??= {};" },
  });

  const code = result.outputFiles[0].text;
  return import(
    `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
  );
}

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const tag = (attr, name, content) =>
  `    <meta ${attr}="${name}" content="${escapeHtml(content)}" />`;

/** URL absoluta da rota. Retorna null quando o domínio não foi configurado. */
function absoluteUrl(siteUrl, path) {
  if (!siteUrl) return null;
  return path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
}

function buildSeoBlock({ page, siteUrl, site, jsonLd }) {
  const { OG_IMAGE, SITE_NAME, SITE_LOCALE } = site;
  const canonical = absoluteUrl(siteUrl, page.path);
  const imageUrl = siteUrl ? `${siteUrl}${OG_IMAGE.path}` : null;

  const lines = [
    "<!--seo:start-->",
    `    <title>${escapeHtml(page.title)}</title>`,
    tag("name", "description", page.description),
  ];

  if (canonical) lines.push(`    <link rel="canonical" href="${canonical}" />`);

  lines.push(
    tag("property", "og:type", "website"),
    tag("property", "og:site_name", SITE_NAME),
    tag("property", "og:locale", SITE_LOCALE),
    tag("property", "og:title", page.title),
    tag("property", "og:description", page.description),
  );

  if (canonical) lines.push(tag("property", "og:url", canonical));

  if (imageUrl) {
    lines.push(
      tag("property", "og:image", imageUrl),
      tag("property", "og:image:secure_url", imageUrl),
      tag("property", "og:image:type", OG_IMAGE.type),
      tag("property", "og:image:width", OG_IMAGE.width),
      tag("property", "og:image:height", OG_IMAGE.height),
      tag("property", "og:image:alt", OG_IMAGE.alt),
    );
  }

  lines.push(
    tag("name", "twitter:card", "summary_large_image"),
    tag("name", "twitter:title", page.title),
    tag("name", "twitter:description", page.description),
  );

  if (imageUrl) lines.push(tag("name", "twitter:image", imageUrl));

  if (jsonLd) {
    lines.push(
      '    <script type="application/ld+json">',
      `    ${JSON.stringify(jsonLd)}`,
      "    </script>",
    );
  }

  lines.push("    <!--seo:end-->");
  return lines.join("\n");
}

/** Dados estruturados do provedor — ajuda o Google a entender negócio e local. */
function buildJsonLd({ siteUrl, site, constants }) {
  const { SITE_NAME, SITE_TAGLINE, OG_IMAGE } = site;
  const { ADDRESS, WHATSAPP_NUMBER, INSTAGRAM_PROFILE_URL } = constants;

  const [city, state] = ADDRESS.city.split("/");

  const data = {
    "@context": "https://schema.org",
    "@type": "InternetServiceProvider",
    name: SITE_NAME,
    description: SITE_TAGLINE,
    telephone: `+${WHATSAPP_NUMBER}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: `${ADDRESS.neighborhood}, ${city}`,
      addressRegion: state,
      addressCountry: "BR",
    },
    areaServed: {
      "@type": "Place",
      name: `${ADDRESS.neighborhood}, ${ADDRESS.city}`,
    },
  };

  if (siteUrl) {
    data.url = `${siteUrl}/`;
    data.image = `${siteUrl}${OG_IMAGE.path}`;
    data.logo = `${siteUrl}${OG_IMAGE.path}`;
  }

  const sameAs = [INSTAGRAM_PROFILE_URL].filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;

  return data;
}

function buildSitemap(siteUrl, pages) {
  const urls = pages
    .map((page) => {
      const loc = absoluteUrl(siteUrl, page.path);
      return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function buildRobots(siteUrl) {
  const lines = ["User-agent: *", "Allow: /", "", "Disallow: /404"];
  if (siteUrl) lines.push("", `Sitemap: ${siteUrl}/sitemap.xml`);
  return `${lines.join("\n")}\n`;
}

async function main() {
  // Lê tanto os arquivos .env quanto as variáveis do ambiente de build
  // (é assim que o valor cadastrado no Cloudflare Pages chega aqui).
  const env = loadEnv("production", ROOT, "VITE_");
  const siteUrl = (env.VITE_SITE_URL ?? "").trim().replace(/\/+$/, "");

  const site = await importFromSrc("src/config/site.ts");
  const constants = await importFromSrc("src/lib/constants.ts");

  const shell = await readFile(join(DIST, "index.html"), "utf8");

  if (!SEO_BLOCK.test(shell)) {
    throw new Error(
      "Marcadores <!--seo:start--> / <!--seo:end--> não encontrados em dist/index.html. " +
        "O prerender depende deles para injetar os metadados por rota.",
    );
  }

  const jsonLd = buildJsonLd({ siteUrl, site, constants });
  const pages = site.INDEXABLE_PAGES;

  for (const page of pages) {
    const html = shell.replace(
      SEO_BLOCK,
      buildSeoBlock({ page, siteUrl, site, jsonLd }),
    );

    const target =
      page.path === "/"
        ? join(DIST, "index.html")
        : join(DIST, page.path, "index.html");

    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html, "utf8");
  }

  // /404 existe para o usuário, mas não deve ser indexada nem entrar no sitemap.
  const notFound = shell.replace(
    SEO_BLOCK,
    [
      "<!--seo:start-->",
      `    <title>${escapeHtml(site.PAGE_META.notFound.title)}</title>`,
      tag("name", "robots", "noindex, follow"),
      "    <!--seo:end-->",
    ].join("\n"),
  );
  await mkdir(join(DIST, "404"), { recursive: true });
  await writeFile(join(DIST, "404", "index.html"), notFound, "utf8");

  await writeFile(join(DIST, "robots.txt"), buildRobots(siteUrl), "utf8");

  if (siteUrl) {
    await writeFile(
      join(DIST, "sitemap.xml"),
      buildSitemap(siteUrl, pages),
      "utf8",
    );
  }

  console.log(`prerender: ${pages.length} páginas + /404`);

  if (siteUrl) {
    console.log(`prerender: sitemap.xml e robots.txt para ${siteUrl}`);
  } else {
    console.warn(
      "\n  AVISO: VITE_SITE_URL não está definida.\n" +
        "  Sem ela não há canonical, og:url nem og:image absoluta — e sem og:image\n" +
        "  absoluta o WhatsApp não gera preview. O sitemap.xml também não é gerado.\n" +
        "  Defina VITE_SITE_URL (ex.: https://redesub.com.br) nas variáveis de\n" +
        "  ambiente do Cloudflare Pages e refaça o build.\n",
    );
  }
}

await main();
