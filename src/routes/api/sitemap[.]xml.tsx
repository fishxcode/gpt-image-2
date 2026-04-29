import { createFileRoute } from "@tanstack/react-router";

const SITE = "https://render-glow-works.lovable.app";

export const Route = createFileRoute("/api/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          { loc: `${SITE}/`, hreflang: [{ lang: "zh-CN", href: `${SITE}/?lang=zh` }, { lang: "en", href: `${SITE}/?lang=en` }] },
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${u.hreflang.map((h) => `    <xhtml:link rel="alternate" hreflang="${h.lang}" href="${h.href}" />`).join("\n")}
  </url>`
  )
  .join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
