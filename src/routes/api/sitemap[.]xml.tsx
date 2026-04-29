import { createFileRoute } from "@tanstack/react-router";
import { SITE, ROUTES_SEO } from "@/lib/seo";

const lastmod = new Date().toISOString().slice(0, 10);

export const Route = createFileRoute("/api/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const langs = [
          { lang: "zh-CN", param: "zh" },
          { lang: "en", param: "en" },
        ];
        const urls = ROUTES_SEO.flatMap((r) =>
          langs.map(({ lang, param }) => {
            const loc = `${SITE}${r.path}?lang=${param}`;
            const alts = langs
              .map(
                (l) =>
                  `    <xhtml:link rel="alternate" hreflang="${l.lang}" href="${SITE}${r.path}?lang=${l.param}" />`,
              )
              .join("\n");
            return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${r.path === "/" ? "1.0" : "0.8"}</priority>
${alts}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${r.path}" />
  </url>`;
          }),
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
