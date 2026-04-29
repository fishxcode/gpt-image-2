import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/seo";

type Lang = "zh" | "en";

const META: Record<Lang, { title: string; desc: string; lang: string }> = {
  zh: {
    title: "GPT-Image-2 工具站 · 更新动态",
    desc: "GPT-Image-2 工具站的产品更新与新增 prompt / 素材精选。",
    lang: "zh-CN",
  },
  en: {
    title: "GPT-Image-2 Tools · Updates",
    desc: "Product updates, new prompts and curated assets from the GPT-Image-2 Tools playground.",
    lang: "en",
  },
};

type Item = {
  guid: string;
  link: string;
  date: string;
  zh: { title: string; desc: string };
  en: { title: string; desc: string };
};

const items: Item[] = [
  {
    guid: `${SITE}/#release-1`,
    link: `${SITE}/`,
    date: new Date("2026-04-01").toUTCString(),
    zh: { title: "GPT-Image-2 工具站 上线", desc: "在线调用 gpt-image-2 接口，支持自定义端点、参数与分享链接。" },
    en: { title: "GPT-Image-2 Tools launched", desc: "Online playground for gpt-image-2 with custom endpoint, params and shareable links." },
  },
  {
    guid: `${SITE}/#release-i18n`,
    link: `${SITE}/`,
    date: new Date("2026-04-29").toUTCString(),
    zh: { title: "支持中英多语言与本地持久化", desc: "新增中文 / English 切换，配置与语言均持久化到本地存储，并可通过 URL 参数携带。" },
    en: { title: "Bilingual support and persistence", desc: "Added Chinese / English switching. Settings and language persist in localStorage and can be carried via URL params." },
  },
  {
    guid: `${SITE}/prompts#release`,
    link: `${SITE}/prompts`,
    date: new Date("2026-04-29").toUTCString(),
    zh: { title: "新增提示词广场 / Prompt Plaza", desc: "精选高质量 gpt-image-2 prompt，按分类浏览，一键复用到 Playground。" },
    en: { title: "New: Prompt Plaza", desc: "Curated high-quality prompts for gpt-image-2 by category, with one-click reuse in the Playground." },
  },
  {
    guid: `${SITE}/gallery#release`,
    link: `${SITE}/gallery`,
    date: new Date("2026-04-29").toUTCString(),
    zh: { title: "新增素材广场 / Asset Gallery", desc: "示例图像 + 背后的 prompt 与参数，一键复用生成。" },
    en: { title: "New: Asset Gallery", desc: "Showcase images with their underlying prompts and parameters; reuse in one click." },
  },
];

export const Route = createFileRoute("/api/rss.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const url = new URL(request.url);
        const langParam = url.searchParams.get("lang");
        const lang: Lang = langParam === "en" ? "en" : "zh";
        const m = META[lang];
        const altLang: Lang = lang === "zh" ? "en" : "zh";

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <channel>
    <title>${m.title}</title>
    <link>${SITE}/?lang=${lang}</link>
    <atom:link href="${SITE}/api/rss.xml?lang=${lang}" rel="self" type="application/rss+xml" />
    <atom:link href="${SITE}/api/rss.xml?lang=${altLang}" rel="alternate" type="application/rss+xml" hreflang="${altLang === "zh" ? "zh-CN" : "en"}" title="${META[altLang].title}" />
    <description>${m.desc}</description>
    <language>${m.lang}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items
  .map((i) => {
    const cur = i[lang];
    const alt = i[altLang];
    const altHref = `${i.link}?lang=${altLang}`;
    return `    <item>
      <title><![CDATA[${cur.title}]]></title>
      <link>${i.link}?lang=${lang}</link>
      <guid isPermaLink="false">${i.guid}-${lang}</guid>
      <pubDate>${i.date}</pubDate>
      <description><![CDATA[${cur.desc}]]></description>
      <xhtml:link rel="alternate" hreflang="${altLang === "zh" ? "zh-CN" : "en"}" href="${altHref}" title="${alt.title}" />
    </item>`;
  })
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
