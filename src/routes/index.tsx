import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Loader2, Wand2, AlertCircle, ImageIcon, Zap, ExternalLink, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SettingsDialog } from "@/components/SettingsDialog";
import { ImageCard } from "@/components/ImageCard";
import { useConfig } from "@/lib/config-store";
import { generateImages, type GenerationResult } from "@/lib/image-api";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const PRESET_PROMPTS = [
  "青年才俊，电影级光影，超清细节，真实质感，体积光，4K，cinematic lighting",
  "未来主义城市夜景，霓虹灯倒映在湿润街道，赛博朋克风格，超广角",
  "极简主义产品摄影，柔和阴影，米白色背景，杂志封面级别",
  "宫崎骏风格手绘场景，山间小屋，晨雾，水彩质感，治愈系",
];

function HomePage() {
  const config = useConfig();
  const [prompt, setPrompt] = useState(PRESET_PROMPTS[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const configured = !!config.apiKey && !!config.apiUrl;

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleGenerate = async () => {
    if (!configured) {
      toast.error("请先在设置中配置 API Key");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const r = await generateImages(config, prompt);
      setResult(r);
      toast.success(`生成完成 · ${r.images.length} 张 · ${(r.durationMs / 1000).toFixed(1)}s`);
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

      {/* Header */}
      <header className="relative z-10 border-b border-border/40 backdrop-blur-xl bg-background/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary blur-xl opacity-50" />
              <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="h-4.5 w-4.5 text-primary-foreground" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-base font-semibold leading-tight">GPT-Image-2 Tools</h1>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono-tech">
                Image Generation Playground
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://fishxcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent/20 hover:border-accent/60 transition-colors text-xs font-medium"
            >
              <KeyRound className="h-3 w-3" />
              获取 API Key
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
            <StatusPill ok={configured} />
            <SettingsDialog />
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10 md:py-16">
        {/* Hero */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-card/40 backdrop-blur mb-5">
            <Zap className="h-3 w-3 text-primary" />
            <span className="text-xs text-muted-foreground font-mono-tech">/v1/images/generations</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            把<span className="text-gradient"> 文字 </span>
            <br className="md:hidden" />
            变成<span className="text-gradient"> 图像 </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            连接你自己的 gpt-image-2 端点，调用、解析、下载。所有配置都保存在浏览器本地。
          </p>
        </div>

        {/* Prompt panel */}
        <div className="glass-panel rounded-3xl p-5 md:p-7 glow-primary">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Wand2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Prompt</span>
            </div>
            <span className="font-mono-tech text-[10px] text-muted-foreground uppercase tracking-wider">
              {config.model} · {config.size} · n={config.n}
            </span>
          </div>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="描述你想要生成的图像..."
            className="min-h-[110px] bg-background/40 border-border/60 text-base resize-none focus-visible:ring-primary/60"
          />

          <div className="mt-3 flex flex-wrap gap-1.5">
            {PRESET_PROMPTS.map((p, i) => (
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
              {prompt.length} 字符
            </p>
            <Button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              size="lg"
              className="ml-auto bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/30 px-6"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> 生成中…</>
              ) : (
                <><Sparkles className="h-4 w-4 mr-2" /> 生成图像</>
              )}
            </Button>
          </div>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="mt-10 scroll-mt-20">
          {error && (
            <div className="glass-panel rounded-2xl p-4 border-destructive/40 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-destructive">请求失败</p>
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
                  <h3 className="text-sm font-medium">生成结果</h3>
                  <span className="font-mono-tech text-xs text-muted-foreground">
                    {result.images.length} 张 · {(result.durationMs / 1000).toFixed(2)}s
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
            <div className="text-center py-16 text-muted-foreground">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-card/40 border border-border/40 mb-3">
                <ImageIcon className="h-6 w-6 opacity-50" />
              </div>
              <p className="text-sm">输入 prompt 开始你的第一次生成</p>
            </div>
          )}
        </div>
      </main>

      <footer className="relative z-10 border-t border-border/30 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-5 text-center text-xs text-muted-foreground font-mono-tech">
          GPT-IMAGE-2 · CLIENT-SIDE TOOL · YOUR KEY NEVER LEAVES THE BROWSER
        </div>
      </footer>
    </div>
  );
}

function StatusPill({ ok }: { ok: boolean }) {
  return (
    <div className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono-tech uppercase tracking-wider ${
      ok ? "border-primary/40 bg-primary/10 text-primary" : "border-destructive/40 bg-destructive/10 text-destructive"
    }`}>
      <span className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-primary" : "bg-destructive"} animate-pulse`} />
      {ok ? "Connected" : "Not Configured"}
    </div>
  );
}
