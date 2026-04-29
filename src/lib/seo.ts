// Centralized SEO config — change SITE here once.
export const SITE = "https://fishxcode-gpt-image-2.lovable.app";

// Owner-provided search-engine verification tokens (optional).
// Replace with real values once issued from Google Search Console / Bing Webmaster Tools.
export const VERIFICATION = {
  google: "REPLACE_WITH_GOOGLE_VERIFICATION_TOKEN",
  bing: "REPLACE_WITH_BING_VERIFICATION_TOKEN",
};

export type RouteSeo = {
  path: string; // canonical path (no trailing slash except "/")
  zh: { title: string; description: string };
  en: { title: string; description: string };
};

export const ROUTES_SEO: RouteSeo[] = [
  {
    path: "/",
    zh: {
      title: "GPT-Image-2 在线 AI 图像生成工具站",
      description:
        "GPT-Image-2 Tools 是面向 gpt-image-2 图像生成接口的在线 Playground，支持自定义 API Key、本地保存配置、多语言界面、Prompt 广场与示例素材复用。",
    },
    en: {
      title: "GPT-Image-2 Online AI Image Generation Tools",
      description:
        "GPT-Image-2 Tools is an online playground for the gpt-image-2 image generation endpoint, with custom API keys, local settings, bilingual UI, prompt plaza, and reusable gallery examples.",
    },
  },
  {
    path: "/prompts",
    zh: {
      title: "GPT-Image-2 Prompt 广场 · AI 图像提示词精选",
      description:
        "精选适用于 GPT-Image-2 的 AI 图像生成提示词，覆盖人像、产品、场景、艺术、设计与动漫风格，可一键复制到 Playground 复用。",
    },
    en: {
      title: "GPT-Image-2 Prompt Plaza · Curated AI Image Prompts",
      description:
        "Curated AI image prompts for GPT-Image-2 across portrait, product, scene, art, design, and anime styles. Copy any prompt into the Playground in one click.",
    },
  },
  {
    path: "/gallery",
    zh: {
      title: "GPT-Image-2 素材广场 · 示例图像与可复用 Prompt",
      description:
        "浏览 GPT-Image-2 图像生成示例素材，查看对应 Prompt、尺寸与质量参数，并快速复用到在线 Playground 继续创作。",
    },
    en: {
      title: "GPT-Image-2 Asset Gallery · Examples and Reusable Prompts",
      description:
        "Browse GPT-Image-2 image generation examples, inspect their prompts, size, and quality settings, then reuse them in the online Playground for new creations.",
    },
  },
];

export function getRouteSeo(path: string): RouteSeo {
  return ROUTES_SEO.find((r) => r.path === path) ?? ROUTES_SEO[0];
}

export function ogImageFor(lang: "zh" | "en") {
  return `${SITE}/og-${lang}.png`;
}
