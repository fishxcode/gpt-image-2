import { useEffect, useState } from "react";

export type GenConfig = {
  apiUrl: string;
  apiKey: string;
  model: string;
  n: number;
  size: string;
  quality: string;
  responseFormat: "b64_json" | "url";
  background: string;
  outputFormat: string;
};

export const DEFAULT_CONFIG: GenConfig = {
  apiUrl: "https://fishxcode.com/v1/images/generations",
  apiKey: "",
  model: "gpt-image-2",
  n: 1,
  size: "1536x1024",
  quality: "medium",
  responseFormat: "b64_json",
  background: "opaque",
  outputFormat: "png",
};

const STORAGE_KEY = "gpt-image-2-config";

export function loadConfig(): GenConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(cfg: GenConfig) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
  window.dispatchEvent(new CustomEvent("gpt-image-config-changed"));
}

/** Merge URL search params into config (does not persist unless saved). */
export function configFromUrl(base: GenConfig): GenConfig {
  if (typeof window === "undefined") return base;
  const p = new URLSearchParams(window.location.search);
  const next = { ...base };
  const map: Array<[keyof GenConfig, (v: string) => unknown]> = [
    ["apiUrl", (v) => v],
    ["apiKey", (v) => v],
    ["model", (v) => v],
    ["n", (v) => Number(v) || 1],
    ["size", (v) => v],
    ["quality", (v) => v],
    ["responseFormat", (v) => v],
    ["background", (v) => v],
    ["outputFormat", (v) => v],
  ];
  let changed = false;
  for (const [k, parse] of map) {
    const v = p.get(k);
    if (v !== null) {
      (next as Record<string, unknown>)[k as string] = parse(v);
      changed = true;
    }
  }
  return changed ? next : base;
}

export function useConfig() {
  const [config, setConfig] = useState<GenConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    const merged = configFromUrl(loadConfig());
    setConfig(merged);
    const onChange = () => setConfig(loadConfig());
    window.addEventListener("gpt-image-config-changed", onChange);
    return () => window.removeEventListener("gpt-image-config-changed", onChange);
  }, []);

  return config;
}
