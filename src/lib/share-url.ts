import type { GenConfig } from "@/lib/config-store";

export function buildShareUrl(config: GenConfig, location: Location, prompt?: string) {
  const params = new URLSearchParams();

  (Object.keys(config) as Array<keyof GenConfig>).forEach((key) => {
    params.set(key, String(config[key]));
  });

  const cleanPrompt = prompt?.trim();
  if (cleanPrompt) {
    params.set("prompt", cleanPrompt);
  }

  return `${location.origin}${location.pathname}?${params.toString()}`;
}

export function buildPromptShareUrl(location: Location, prompt: string) {
  const params = new URLSearchParams();
  const cleanPrompt = prompt.trim();

  if (cleanPrompt) {
    params.set("prompt", cleanPrompt);
  }

  return `${location.origin}/?${params.toString()}`;
}
