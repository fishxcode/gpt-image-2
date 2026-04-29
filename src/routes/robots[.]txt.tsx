import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/seo";

const body = `# robots.txt for GPT-Image-2 Tools
User-agent: *
Allow: /
Disallow: /api/

# Search-engine crawlers (explicit)
User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /

Sitemap: ${SITE}/sitemap.xml
Sitemap: ${SITE}/api/sitemap.xml
`;

const handler = () =>
  new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });

export const Route = createFileRoute("/robots.txt")({
  server: { handlers: { GET: handler } },
});
