import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

const SITE = "https://render-glow-works.lovable.app";
const TITLE = "GPT-Image-2 Tools — 在线图像生成 / Online Image Playground";
const DESC =
  "在线调用 gpt-image-2 接口生成与解析图像，支持自定义 API、参数、多语言（中/英）与可分享链接。Online playground for the gpt-image-2 image-generation endpoint with custom API, params, i18n and shareable links.";
const OG_IMAGE = `${SITE}/og.png`;

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "GPT-Image-2 Tools",
  url: SITE,
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  description: DESC,
  inLanguage: ["zh-CN", "en"],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  creator: { "@type": "Organization", name: "fishxcode.com", url: "https://fishxcode.com" },
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "gpt-image-2, image generation, AI image, fishxcode, OpenAI image, 图像生成, 文生图" },
      { name: "author", content: "fishxcode.com" },
      { name: "robots", content: "index,follow" },
      { name: "theme-color", content: "#0b0f1a" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "GPT-Image-2 Tools" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: SITE },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "zh_CN" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: SITE + "/" },
      { rel: "alternate", hrefLang: "zh-CN", href: SITE + "/?lang=zh" },
      { rel: "alternate", hrefLang: "en", href: SITE + "/?lang=en" },
      { rel: "alternate", hrefLang: "x-default", href: SITE + "/" },
      { rel: "alternate", type: "application/rss+xml", title: "GPT-Image-2 Tools RSS", href: SITE + "/api/rss.xml" },
      { rel: "sitemap", type: "application/xml", href: SITE + "/api/sitemap.xml" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(JSON_LD) },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster theme="dark" position="top-center" richColors />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
