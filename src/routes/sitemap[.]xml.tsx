import { createFileRoute } from "@tanstack/react-router";
import { SITE, ROUTES_SEO } from "@/lib/seo";

const lastmod = new Date().toISOString().slice(0, 10);

function buildXml() {
  const langs: Array<{ lang: string; param: string }> = [
    { lang: "zh-CN", param: "zh" },
    { lang: "en", param: "en" },
  ];
  // Each route × each language is a distinct indexable URL.
  const urlEntries = ROUTES_SEO.flatMap((r) =>
    langs.map(({ lang, param }) => {
      const loc = `${SITE}${r.path}${r.path === "/" ? "" : ""}?lang=${param}`;
      const alts = langs
        .map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l.lang}" href="${SITE}${r.path}?lang=${l.param}" />`
        )
        .join("\n");
      const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${r.path}" />`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${r.path === "/" ? "1.0" : "0.8"}</priority>
${alts}
${xDefault}
  </url>`;
    })
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join("\n")}
</urlset>`;
}

const handler = () =>
  new Response(buildXml(), {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });

// Both /sitemap.xml and /api/sitemap.xml work — declare the second as a re-export pattern.
export const Route = createFileRoute("/sitemap.xml")({
  server: { handlers: { GET: handler } },
});
