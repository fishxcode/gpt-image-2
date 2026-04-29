import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SITE, getRouteSeo, ogImageFor, VERIFICATION } from "@/lib/seo";

import appCss from "../styles.css?url";

const home = getRouteSeo("/");
const TITLE = `${home.zh.title} / ${home.en.title}`;
const DESC = `${home.zh.description} ${home.en.description}`;

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "GPT-Image-2 Tools",
  url: SITE,
  applicationCategory: "DesignApplication",
  operatingSystem: "Web",
  description: home.en.description,
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
  head: () => {
    const meta: Array<Record<string, string>> = [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "gpt-image-2, GPT-Image-2 Tools, AI image generation, text to image, image playground, prompt plaza, reusable prompts, fishxcode, AI 图像生成, 文生图, 图像生成工具, Prompt 广场, 素材广场",
      },
      { name: "author", content: "fishxcode.com" },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { name: "theme-color", content: "#0b0f1a" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "GPT-Image-2 Tools" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: SITE + "/" },
      { property: "og:image", content: ogImageFor("zh") },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "zh_CN" },
      { property: "og:locale:alternate", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: ogImageFor("zh") },
    ];
    if (VERIFICATION.google && !VERIFICATION.google.startsWith("REPLACE_")) {
      meta.push({ name: "google-site-verification", content: VERIFICATION.google });
    }
    if (VERIFICATION.bing && !VERIFICATION.bing.startsWith("REPLACE_")) {
      meta.push({ name: "msvalidate.01", content: VERIFICATION.bing });
    }
    return {
      meta,
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "canonical", href: SITE + "/" },
        { rel: "alternate", hrefLang: "zh-CN", href: SITE + "/?lang=zh" },
        { rel: "alternate", hrefLang: "en", href: SITE + "/?lang=en" },
        { rel: "alternate", hrefLang: "x-default", href: SITE + "/" },
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "GPT-Image-2 Tools RSS (zh)",
          href: SITE + "/api/rss.xml?lang=zh",
        },
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "GPT-Image-2 Tools RSS (en)",
          href: SITE + "/api/rss.xml?lang=en",
        },
        { rel: "sitemap", type: "application/xml", href: SITE + "/sitemap.xml" },
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(JSON_LD) }],
    };
  },
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
