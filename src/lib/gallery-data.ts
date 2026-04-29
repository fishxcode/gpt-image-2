// Sample showcase data for the asset gallery.
// Uses Unsplash images as placeholders — swap with real generations later.
export type GalleryItem = {
  id: string;
  image: string; // public URL
  promptId?: string; // optional link to a prompt in prompts-data
  zh: { title: string; prompt: string };
  en: { title: string; prompt: string };
  size: string;
  quality: "low" | "medium" | "high";
};

export const GALLERY: GalleryItem[] = [
  {
    id: "g-1",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=1024&q=80",
    size: "1536x1024",
    quality: "high",
    zh: { title: "霓虹夜雨", prompt: "未来都市夜景，霓虹倒影，赛博朋克，超广角，蓝紫色调" },
    en: { title: "Neon Rain", prompt: "Futuristic city night, neon reflections, cyberpunk, ultra-wide, blue-purple palette" },
  },
  {
    id: "g-2",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1024&q=80",
    size: "1536x1024",
    quality: "high",
    zh: { title: "山间晨雾", prompt: "宫崎骏风格山间小屋，晨雾，水彩，治愈系" },
    en: { title: "Misty Mountain Cottage", prompt: "Ghibli-style mountain cottage, morning mist, watercolor, cozy" },
  },
  {
    id: "g-3",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1024&q=80",
    size: "1024x1024",
    quality: "medium",
    zh: { title: "未来机甲", prompt: "未来感机甲特写，金属反光，霓虹细节，科技质感，电影级灯光" },
    en: { title: "Future Mech", prompt: "Close-up of futuristic mecha, metallic reflections, neon detail, sci-fi feel, cinematic lighting" },
  },
  {
    id: "g-4",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1024&q=80",
    size: "1536x1024",
    quality: "high",
    zh: { title: "极光山脉", prompt: "夜空中的极光，山脉剪影，星空，超清，自然摄影" },
    en: { title: "Aurora Range", prompt: "Aurora over mountain silhouettes, starry sky, ultra-clear, nature photography" },
  },
  {
    id: "g-5",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1024&q=80",
    size: "1024x1024",
    quality: "medium",
    zh: { title: "极简产品", prompt: "极简主义产品摄影，米白背景，柔光阴影" },
    en: { title: "Minimal Product", prompt: "Minimalist product photo, off-white backdrop, soft shadow" },
  },
  {
    id: "g-6",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1024&q=80",
    size: "1536x1024",
    quality: "high",
    zh: { title: "电路抽象", prompt: "微距电路板特写，蓝色光路，赛博风，超清细节" },
    en: { title: "Circuit Abstract", prompt: "Macro close-up of a circuit board, blue light traces, cyber feel, ultra-detailed" },
  },
];
