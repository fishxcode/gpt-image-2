import { createFileRoute } from "@tanstack/react-router";

const SITE = "https://render-glow-works.lovable.app";

export const Route = createFileRoute("/api/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        const body = `User-agent: *
Allow: /

Sitemap: ${SITE}/api/sitemap.xml
`;
        return new Response(body, {
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
