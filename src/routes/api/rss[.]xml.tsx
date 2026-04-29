import { createFileRoute } from "@tanstack/react-router";

const SITE = "https://render-glow-works.lovable.app";

const items = [
  {
    title: "GPT-Image-2 Tools 上线 · Launched",
    link: `${SITE}/`,
    guid: `${SITE}/#release-1`,
    date: new Date("2026-04-01").toUTCString(),
    desc: "在线调用 gpt-image-2 接口，支持自定义端点、参数与分享链接。Online playground for the gpt-image-2 endpoint with custom params and shareable links.",
  },
  {
    title: "支持多语言与持久化 · i18n + Persistence",
    link: `${SITE}/?lang=en`,
    guid: `${SITE}/#release-i18n`,
    date: new Date("2026-04-29").toUTCString(),
    desc: "新增中文 / English 切换，配置与语言均持久化到本地存储，并可通过 URL 参数携带。",
  },
];

export const Route = createFileRoute("/api/rss.xml")({
  server: {
    handlers: {
      GET: () => {
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GPT-Image-2 Tools</title>
    <link>${SITE}/</link>
    <atom:link href="${SITE}/api/rss.xml" rel="self" type="application/rss+xml" />
    <description>Updates from the GPT-Image-2 Tools playground.</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items
  .map(
    (i) => `    <item>
      <title><![CDATA[${i.title}]]></title>
      <link>${i.link}</link>
      <guid isPermaLink="false">${i.guid}</guid>
      <pubDate>${i.date}</pubDate>
      <description><![CDATA[${i.desc}]]></description>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
