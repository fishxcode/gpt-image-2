// Sample showcase data for the asset gallery.
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
    id: "g-boyfriend-perspective",
    image: "/Boyfriend.jpg",
    promptId: "p-portrait-boyfriend-perspective",
    size: "1024x1536",
    quality: "high",
    zh: {
      title: "男友视角抓拍",
      prompt:
        "Boyfriend's perspective: Girlfriend is drunk, cosplay of Boa Hancock, he cups her face in one hand, a beautiful Korean girl, the camera angle is from top to bottom, her eyes are hazy but full of love, messy hair, the room is dimly lit, amateurish iPhone shot.",
    },
    en: {
      title: "Boyfriend Perspective Snapshot",
      prompt:
        "Boyfriend's perspective: Girlfriend is drunk, cosplay of Boa Hancock, he cups her face in one hand, a beautiful Korean girl, the camera angle is from top to bottom, her eyes are hazy but full of love, messy hair, the room is dimly lit, amateurish iPhone shot.",
    },
  },
  {
    id: "g-subway-street",
    image: "/subway.jpg",
    promptId: "p-portrait-subway-street",
    size: "1024x1536",
    quality: "high",
    zh: {
      title: "地铁街拍人像",
      prompt:
        "一张抓拍风格的照片，一位年轻亚洲女性坐在地铁车厢内，不锈钢座椅上，穿着米色紧身短袖上衣和灰色短裙，长直黑发，自然妆容，佩戴耳机，手里拿着手机正在使用，头微微抬起看向镜头，表情略带冷淡和警觉。棕色皮质单肩包放在腿上。地铁内部环境，红色扶杆，车厢门和广告牌背景，现代城市公共交通场景。从隐蔽角度拍摄，左侧有前景遮挡，类似街拍视角，画面略微倾斜。室内柔和冷光，真实光影，浅景深，边缘轻微虚化和运动模糊。街拍摄影，纪实风格，电影感，高度写实，50mm镜头，f1.8，自然色彩。",
    },
    en: {
      title: "Subway Street Portrait",
      prompt:
        "A candid street-photography style photo of a young Asian woman sitting on a stainless-steel subway seat, wearing a beige fitted short-sleeve top and gray mini skirt, long straight black hair, natural makeup, headphones, holding and using a phone, head slightly raised toward the camera, expression cool and alert. A brown leather shoulder bag rests on her lap. Subway interior, red handrails, train doors and ad posters in the background, modern urban public transit. Shot from an obscured angle with foreground blocking on the left, street snapshot perspective, slightly tilted frame. Soft cool indoor light, realistic shadows, shallow depth of field, subtle edge blur and motion blur, documentary street photography, cinematic, highly realistic, 50mm lens, f1.8, natural colors.",
    },
  },
  {
    id: "g-1",
    image:
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=1024&q=80",
    size: "1536x1024",
    quality: "high",
    zh: { title: "霓虹夜雨", prompt: "未来都市夜景，霓虹倒影，赛博朋克，超广角，蓝紫色调" },
    en: {
      title: "Neon Rain",
      prompt: "Futuristic city night, neon reflections, cyberpunk, ultra-wide, blue-purple palette",
    },
  },
  {
    id: "g-2",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1024&q=80",
    size: "1536x1024",
    quality: "high",
    zh: { title: "山间晨雾", prompt: "宫崎骏风格山间小屋，晨雾，水彩，治愈系" },
    en: {
      title: "Misty Mountain Cottage",
      prompt: "Ghibli-style mountain cottage, morning mist, watercolor, cozy",
    },
  },
  {
    id: "g-3",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1024&q=80",
    size: "1024x1024",
    quality: "medium",
    zh: { title: "未来机甲", prompt: "未来感机甲特写，金属反光，霓虹细节，科技质感，电影级灯光" },
    en: {
      title: "Future Mech",
      prompt:
        "Close-up of futuristic mecha, metallic reflections, neon detail, sci-fi feel, cinematic lighting",
    },
  },
  {
    id: "g-4",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1024&q=80",
    size: "1536x1024",
    quality: "high",
    zh: { title: "极光山脉", prompt: "夜空中的极光，山脉剪影，星空，超清，自然摄影" },
    en: {
      title: "Aurora Range",
      prompt: "Aurora over mountain silhouettes, starry sky, ultra-clear, nature photography",
    },
  },
  {
    id: "g-5",
    image:
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1024&q=80",
    size: "1024x1024",
    quality: "medium",
    zh: { title: "极简产品", prompt: "极简主义产品摄影，米白背景，柔光阴影" },
    en: {
      title: "Minimal Product",
      prompt: "Minimalist product photo, off-white backdrop, soft shadow",
    },
  },
  {
    id: "g-6",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1024&q=80",
    size: "1536x1024",
    quality: "high",
    zh: { title: "电路抽象", prompt: "微距电路板特写，蓝色光路，赛博风，超清细节" },
    en: {
      title: "Circuit Abstract",
      prompt: "Macro close-up of a circuit board, blue light traces, cyber feel, ultra-detailed",
    },
  },
];
