import { useEffect, useState, useCallback } from "react";

export type Lang = "zh" | "en";
export const LANGS: Lang[] = ["zh", "en"];
const STORAGE_KEY = "gpt-image-2-lang";

const dict = {
  zh: {
    "app.name": "GPT-Image-2 Tools",
    "app.tagline": "Image Generation Playground",
    "app.endpoint": "/v1/images/generations",
    "nav.getKey": "获取 API Key",
    "status.connected": "已连接",
    "status.notConfigured": "未配置",
    "hero.title.a": "把",
    "hero.title.b": "文字",
    "hero.title.c": "变成",
    "hero.title.d": "图像",
    "hero.desc": "连接你自己的 gpt-image-2 端点，调用、解析、下载。所有配置都保存在浏览器本地。",
    "panel.prompt": "Prompt",
    "panel.placeholder": "描述你想要生成的图像...",
    "panel.chars": "{n} 字符",
    "panel.generate": "生成图像",
    "panel.generating": "生成中…",
    "result.title": "生成结果",
    "result.summary": "{n} 张 · {s}s",
    "result.failed": "请求失败",
    "empty.noKeyTitle": "还没有 API Key？",
    "empty.noKeyDesc": "本工具兼容 fishxcode.com 的 gpt-image-2 接口，前往获取 Key 后填入设置即可开始生成。",
    "empty.goFishx": "前往 fishxcode.com",
    "empty.firstHint": "输入 prompt 开始你的第一次生成",
    "footer.notice": "客户端工具 · 你的 Key 永远不会离开浏览器",
    "footer.poweredBy": "API powered by",
    "toast.needKey": "请先在设置中配置 API Key",
    "toast.success": "生成完成 · {n} 张 · {s}s",
    "toast.saved": "配置已保存",
    "toast.reset": "已恢复默认配置",
    "toast.shareCopied": "分享链接已复制",
    "settings.title": "配置中心",
    "settings.desc": "API 端点、密钥与生成参数。配置保存在本地，可通过 URL 参数覆盖。",
    "settings.section.api": "接口配置",
    "settings.section.params": "生成参数",
    "settings.field.apiUrl": "API 地址",
    "settings.field.apiKey": "API Key",
    "settings.field.model": "模型",
    "settings.field.n": "数量 n",
    "settings.field.size": "尺寸 size",
    "settings.field.quality": "质量 quality",
    "settings.field.responseFormat": "响应格式",
    "settings.field.outputFormat": "输出格式",
    "settings.field.background": "背景",
    "settings.reset": "恢复默认",
    "settings.share": "生成分享链接",
    "settings.save": "保存配置",
    "lang.label": "语言",
  },
  en: {
    "app.name": "GPT-Image-2 Tools",
    "app.tagline": "Image Generation Playground",
    "app.endpoint": "/v1/images/generations",
    "nav.getKey": "Get API Key",
    "status.connected": "Connected",
    "status.notConfigured": "Not Configured",
    "hero.title.a": "Turn",
    "hero.title.b": "words",
    "hero.title.c": "into",
    "hero.title.d": "images",
    "hero.desc": "Connect your own gpt-image-2 endpoint to call, parse, and download. All settings stay in your browser.",
    "panel.prompt": "Prompt",
    "panel.placeholder": "Describe the image you want to generate...",
    "panel.chars": "{n} chars",
    "panel.generate": "Generate",
    "panel.generating": "Generating…",
    "result.title": "Results",
    "result.summary": "{n} images · {s}s",
    "result.failed": "Request failed",
    "empty.noKeyTitle": "No API Key yet?",
    "empty.noKeyDesc": "This tool is compatible with the gpt-image-2 endpoint on fishxcode.com. Grab a key and paste it into Settings to start.",
    "empty.goFishx": "Go to fishxcode.com",
    "empty.firstHint": "Enter a prompt to run your first generation",
    "footer.notice": "CLIENT-SIDE TOOL · YOUR KEY NEVER LEAVES THE BROWSER",
    "footer.poweredBy": "API powered by",
    "toast.needKey": "Please configure your API Key in Settings first",
    "toast.success": "Done · {n} images · {s}s",
    "toast.saved": "Settings saved",
    "toast.reset": "Restored to defaults",
    "toast.shareCopied": "Share link copied",
    "settings.title": "Settings",
    "settings.desc": "API endpoint, key and generation parameters. Stored locally; can be overridden via URL params.",
    "settings.section.api": "API",
    "settings.section.params": "Parameters",
    "settings.field.apiUrl": "API URL",
    "settings.field.apiKey": "API Key",
    "settings.field.model": "Model",
    "settings.field.n": "Count n",
    "settings.field.size": "Size",
    "settings.field.quality": "Quality",
    "settings.field.responseFormat": "Response format",
    "settings.field.outputFormat": "Output format",
    "settings.field.background": "Background",
    "settings.reset": "Reset",
    "settings.share": "Copy share link",
    "settings.save": "Save",
    "lang.label": "Language",
  },
} as const;

export type TKey = keyof (typeof dict)["zh"];

function detectInitial(): Lang {
  if (typeof window === "undefined") return "zh";
  const url = new URLSearchParams(window.location.search).get("lang");
  if (url === "zh" || url === "en") return url;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "zh" || stored === "en") return stored;
  const nav = navigator.language.toLowerCase();
  return nav.startsWith("zh") ? "zh" : "en";
}

export function getLang(): Lang {
  return detectInitial();
}

export function setLang(l: Lang) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, l);
  window.dispatchEvent(new CustomEvent("gpt-image-lang-changed", { detail: l }));
}

function format(s: string, vars?: Record<string, string | number>) {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

export function useI18n() {
  const [lang, setLangState] = useState<Lang>("zh");

  useEffect(() => {
    setLangState(detectInitial());
    const onChange = (e: Event) => {
      const l = (e as CustomEvent).detail as Lang | undefined;
      setLangState(l ?? detectInitial());
    };
    window.addEventListener("gpt-image-lang-changed", onChange);
    return () => window.removeEventListener("gpt-image-lang-changed", onChange);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    }
  }, [lang]);

  const t = useCallback(
    (k: TKey, vars?: Record<string, string | number>) => format(dict[lang][k] ?? k, vars),
    [lang]
  );

  const change = useCallback((l: Lang) => {
    setLang(l);
    setLangState(l);
  }, []);

  return { lang, t, setLang: change };
}
