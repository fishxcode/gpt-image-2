export type PromptCategory = "portrait" | "scene" | "product" | "art" | "design" | "anime";

export type PromptItem = {
  id: string;
  category: PromptCategory;
  zh: { title: string; prompt: string; tags: string[] };
  en: { title: string; prompt: string; tags: string[] };
  recommendedSize?: string;
};

export const CATEGORY_LABELS: Record<PromptCategory, { zh: string; en: string }> = {
  portrait: { zh: "人像", en: "Portrait" },
  scene: { zh: "场景", en: "Scene" },
  product: { zh: "产品", en: "Product" },
  art: { zh: "艺术", en: "Art" },
  design: { zh: "设计", en: "Design" },
  anime: { zh: "动漫", en: "Anime" },
};

export const PROMPTS: PromptItem[] = [
  {
    id: "p-portrait-cinematic",
    category: "portrait",
    recommendedSize: "1024x1536",
    zh: {
      title: "电影感人像",
      prompt:
        "电影级人像摄影，35mm 定焦，柔和侧光，清晰瞳孔反光，皮肤纹理真实，浅景深，背景虚化，杂志封面级别，超清细节，富士胶片质感",
      tags: ["人像", "电影", "胶片"],
    },
    en: {
      title: "Cinematic Portrait",
      prompt:
        "Cinematic portrait photography, 35mm prime lens, soft side lighting, sharp catchlight in eyes, realistic skin texture, shallow depth of field, blurred background, magazine cover quality, ultra-detailed, Fujifilm tone",
      tags: ["portrait", "cinematic", "film"],
    },
  },
  {
    id: "p-scene-cyberpunk",
    category: "scene",
    recommendedSize: "1536x1024",
    zh: {
      title: "赛博朋克夜景",
      prompt:
        "未来主义城市夜景，霓虹灯倒映在湿润街道，全息广告牌，蒸汽弥漫，雨夜，赛博朋克风格，超广角，高对比度，蓝紫色调",
      tags: ["赛博朋克", "夜景", "城市"],
    },
    en: {
      title: "Cyberpunk Night City",
      prompt:
        "Futuristic city at night, neon reflections on wet streets, holographic billboards, drifting steam, rainy night, cyberpunk, ultra-wide, high contrast, blue-purple palette",
      tags: ["cyberpunk", "night", "city"],
    },
  },
  {
    id: "p-product-minimal",
    category: "product",
    recommendedSize: "1024x1024",
    zh: {
      title: "极简产品摄影",
      prompt:
        "极简主义产品摄影，柔和漫射光，米白色无缝背景，自然投影，居中构图，杂志广告级别，4K，超清材质",
      tags: ["产品", "极简", "摄影"],
    },
    en: {
      title: "Minimal Product Shot",
      prompt:
        "Minimalist product photography, soft diffused light, off-white seamless backdrop, natural shadow, centered composition, ad-magazine quality, 4K, ultra-detailed materials",
      tags: ["product", "minimal", "studio"],
    },
  },
  {
    id: "p-art-ghibli",
    category: "anime",
    recommendedSize: "1536x1024",
    zh: {
      title: "宫崎骏风格场景",
      prompt:
        "宫崎骏风格手绘场景，山间小屋，晨雾缭绕，水彩质感，柔和暖色调，治愈系，远处有飞鸟",
      tags: ["宫崎骏", "动漫", "治愈"],
    },
    en: {
      title: "Studio Ghibli Scene",
      prompt:
        "Studio Ghibli style hand-drawn scene, mountain cottage, swirling morning mist, watercolor texture, warm soft palette, healing vibe, birds in the distance",
      tags: ["ghibli", "anime", "cozy"],
    },
  },
  {
    id: "p-art-oil",
    category: "art",
    recommendedSize: "1024x1024",
    zh: {
      title: "古典油画肖像",
      prompt:
        "伦勃朗式古典油画肖像，深色背景，单一光源，细腻笔触，富有质感的服饰，金色光影，博物馆藏品风格",
      tags: ["油画", "古典", "肖像"],
    },
    en: {
      title: "Classical Oil Portrait",
      prompt:
        "Rembrandt-style classical oil portrait, dark background, single light source, fine brushwork, richly textured garments, golden light, museum-piece quality",
      tags: ["oil", "classical", "portrait"],
    },
  },
  {
    id: "p-design-poster",
    category: "design",
    recommendedSize: "1024x1536",
    zh: {
      title: "瑞士派海报设计",
      prompt:
        "瑞士国际主义平面设计海报，无衬线大字标题，强烈网格构图，红黑双色，几何图形，留白充足，印刷质感",
      tags: ["海报", "排版", "瑞士派"],
    },
    en: {
      title: "Swiss Style Poster",
      prompt:
        "Swiss International Style graphic design poster, bold sans-serif headline, strict grid composition, red and black duotone, geometric shapes, generous whitespace, print texture",
      tags: ["poster", "typography", "swiss"],
    },
  },
  {
    id: "p-scene-isometric",
    category: "design",
    recommendedSize: "1024x1024",
    zh: {
      title: "等距像素小屋",
      prompt:
        "等距 isometric 视角的可爱小屋，柔和粉彩配色，干净矢量风格，3D 渲染，柔光阴影，玩具质感",
      tags: ["isometric", "矢量", "可爱"],
    },
    en: {
      title: "Isometric Cute House",
      prompt:
        "Isometric view of a cute tiny house, soft pastel palette, clean vector style, 3D render, soft shadows, toy-like feel",
      tags: ["isometric", "vector", "cute"],
    },
  },
  {
    id: "p-product-skincare",
    category: "product",
    recommendedSize: "1024x1536",
    zh: {
      title: "护肤品广告大片",
      prompt:
        "高端护肤品广告大片，玻璃瓶身有水珠，背景渐变珊瑚色，柔光打亮，反光精细，奢华质感，4K 超清",
      tags: ["护肤", "广告", "高端"],
    },
    en: {
      title: "Skincare Ad Hero",
      prompt:
        "High-end skincare ad hero shot, glass bottle with water droplets, gradient coral background, soft key light, refined highlights, luxurious feel, 4K ultra-clear",
      tags: ["skincare", "ad", "luxury"],
    },
  },
];
