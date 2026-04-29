import type { GenConfig } from "./config-store";

export type ImageItem = {
  src: string; // data url or remote url
  b64?: string;
  mime: string;
};

export type GenerationResult = {
  images: ImageItem[];
  raw: unknown;
  durationMs: number;
};

export async function generateImages(config: GenConfig, prompt: string): Promise<GenerationResult> {
  if (!config.apiUrl) throw new Error("API URL 未配置");
  if (!config.apiKey) throw new Error("API Key 未配置");
  if (!prompt.trim()) throw new Error("Prompt 不能为空");

  const body: Record<string, unknown> = {
    prompt,
    model: config.model,
    n: config.n,
    response_format: config.responseFormat,
  };
  if (config.size) body.size = config.size;
  if (config.quality) body.quality = config.quality;
  if (config.background) body.background = config.background;
  if (config.outputFormat) body.output_format = config.outputFormat;

  const start = performance.now();
  const res = await fetch(config.apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify(body),
  });
  const durationMs = performance.now() - start;

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`请求失败 ${res.status}: ${text || res.statusText}`);
  }

  const json = (await res.json()) as {
    data?: Array<{ b64_json?: string; url?: string }>;
    output_format?: string;
  };
  const mime = `image/${json.output_format || config.outputFormat || "png"}`;

  const images: ImageItem[] = (json.data || []).map((d) => {
    if (d.b64_json) {
      return { src: `data:${mime};base64,${d.b64_json}`, b64: d.b64_json, mime };
    }
    return { src: d.url || "", mime };
  });

  return { images, raw: json, durationMs };
}
