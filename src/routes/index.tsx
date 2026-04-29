import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Loader2, Wand2, AlertCircle, ImageIcon, Zap, ExternalLink, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { ImageCard } from "@/components/ImageCard";
import { useConfig } from "@/lib/config-store";
import { generateImages, type GenerationResult } from "@/lib/image-api";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const PRESETS = {
  zh: [
    "青年才俊，电影级光影，超清细节，真实质感，体积光，4K，cinematic lighting",
    "未来主义城市夜景，霓虹灯倒映在湿润街道，赛博朋克风格，超广角",
    "极简主义产品摄影，柔和阴影，米白色背景，杂志封面级别",
    "宫崎骏风格手绘场景，山间小屋，晨雾，水彩质感，治愈系",
  ],
  en: [
    "A handsome young professional, cinematic lighting, ultra-detailed, realistic, volumetric light, 4K",
    "Futuristic city at night, neon reflecting on wet streets, cyberpunk, ultra-wide",
    "Minimalist product photography, soft shadows, off-white backdrop, magazine cover quality",
    "Studio Ghibli style hand-drawn scene, mountain cottage, morning mist, watercolor, healing vibe",
  ],
};

function HomePage() {
  const config = useConfig();
  const { lang, t } = useI18n();
  const presets = PRESETS[lang];
  const [prompt, setPrompt] = useState(presets[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const configured = !!config.apiKey && !!config.apiUrl;

  // Read ?prompt= from URL on mount (e.g. arriving from /prompts or /gallery)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search).get("prompt");
    if (p && p.trim()) setPrompt(p);
  }, []);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleGenerate = async () => {
    if (!configured) {
      toast.error(t("toast.needKey"));
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const r = await generateImages(config, prompt);
      setResult(r);
      toast.success(t("toast.success", { n: r.images.length, s: (r.durationMs / 1000).toFixed(1) }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <SiteHeader />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-card/40 backdrop-blur mb-5">
            <Zap className="h-3 w-3 text-primary" />
            <span className="text-xs text-muted-foreground font-mono-tech">{t("app.endpoint")}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            {t("hero.title.a")}<span className="text-gradient"> {t("hero.title.b")} </span>
            <br className="md:hidden" />
            {t("hero.title.c")}<span className="text-gradient"> {t("hero.title.d")} </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            {t("hero.desc")}
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-5 md:p-7 glow-primary">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{t("panel.prompt")}</span>
            </div>
            <span className="font-mono-tech text-[10px] text-muted-foreground uppercase tracking-wider">
              {config.model} · {config.size} · n={config.n}
            </span>
          </div>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t("panel.placeholder")}
            className="min-h-[110px] bg-background/40 border-border/60 text-base resize-none focus-visible:ring-primary/60"
          />

          <div className="mt-3 flex flex-wrap gap-1.5">
            {presets.map((p, i) => (
              <button
                key={i}
                onClick={() => setPrompt(p)}
                className="text-[11px] px-2.5 py-1 rounded-full border border-border/60 bg-card/30 hover:bg-card/60 hover:border-primary/40 text-muted-foreground hover:text-foreground transition-colors max-w-full truncate"
              >
                {p.slice(0, 28)}…
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground hidden sm:block">
              {t("panel.chars", { n: prompt.length })}
            </p>
            <Button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              size="lg"
              className="ml-auto bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/30 px-6"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> {t("panel.generating")}</>
              ) : (
                <><Sparkles className="h-4 w-4 mr-2" /> {t("panel.generate")}</>
              )}
            </Button>
          </div>
        </div>

        <div ref={resultsRef} className="mt-10 scroll-mt-20">
          {error && (
            <div className="glass-panel rounded-2xl p-4 border-destructive/40 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-destructive">{t("result.failed")}</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono-tech break-all">{error}</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: config.n }).map((_, i) => (
                <div key={i} className="aspect-square rounded-2xl glass-panel animate-pulse flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-primary/60 animate-spin" />
                </div>
              ))}
            </div>
          )}

          {result && !loading && (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium">{t("result.title")}</h3>
                  <span className="font-mono-tech text-xs text-muted-foreground">
                    {t("result.summary", { n: result.images.length, s: (result.durationMs / 1000).toFixed(2) })}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.images.map((img, i) => (
                  <ImageCard key={i} image={img} index={i} />
                ))}
              </div>
            </>
          )}

          {!loading && !result && !error && (
            <div className="text-center py-14">
              {!configured ? (
                <div className="glass-panel rounded-3xl p-8 max-w-xl mx-auto">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 mb-4">
                    <KeyRound className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t("empty.noKeyTitle")}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{t("empty.noKeyDesc")}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <a
                      href="https://fishxcode.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium text-sm hover:opacity-90 shadow-lg shadow-primary/30 transition-opacity"
                    >
                      {t("empty.goFishx")}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-muted-foreground">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-card/40 border border-border/40 mb-3">
                    <ImageIcon className="h-6 w-6 opacity-50" />
                  </div>
                  <p className="text-sm">{t("empty.firstHint")}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

