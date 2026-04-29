import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Copy, Wand2, Search } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { PROMPTS, CATEGORY_LABELS, type PromptCategory } from "@/lib/prompts-data";
import { getRouteSeo, ogImageFor, SITE } from "@/lib/seo";

const seo = getRouteSeo("/prompts");

export const Route = createFileRoute("/prompts")({
  head: () => ({
    meta: [
      { title: `${seo.zh.title} / ${seo.en.title}` },
      { name: "description", content: `${seo.zh.description} ${seo.en.description}` },
      { property: "og:title", content: seo.zh.title },
      { property: "og:description", content: seo.zh.description },
      { property: "og:url", content: SITE + "/prompts" },
      { property: "og:image", content: ogImageFor("zh") },
      { name: "twitter:title", content: seo.zh.title },
      { name: "twitter:description", content: seo.zh.description },
      { name: "twitter:image", content: ogImageFor("zh") },
    ],
    links: [
      { rel: "canonical", href: SITE + "/prompts" },
      { rel: "alternate", hrefLang: "zh-CN", href: SITE + "/prompts?lang=zh" },
      { rel: "alternate", hrefLang: "en", href: SITE + "/prompts?lang=en" },
      { rel: "alternate", hrefLang: "x-default", href: SITE + "/prompts" },
    ],
  }),
  component: PromptsPage,
});

const ALL_CATS: (PromptCategory | "all")[] = [
  "all",
  "portrait",
  "scene",
  "product",
  "art",
  "design",
  "anime",
];

function PromptsPage() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [cat, setCat] = useState<PromptCategory | "all">("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const lc = q.trim().toLowerCase();
    return PROMPTS.filter((p) => (cat === "all" ? true : p.category === cat)).filter((p) => {
      if (!lc) return true;
      const c = p[lang];
      return (
        c.title.toLowerCase().includes(lc) ||
        c.prompt.toLowerCase().includes(lc) ||
        c.tags.some((tag) => tag.toLowerCase().includes(lc))
      );
    });
  }, [cat, q, lang]);

  const applyPrompt = (prompt: string) => {
    navigate({ to: "/", search: { prompt } as never });
  };
  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(t("prompts.copied"));
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <SiteHeader />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            <span className="text-gradient">{t("prompts.title")}</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            {t("prompts.desc")}
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("prompts.searchPlaceholder")}
              className="pl-9 bg-background/40 border-border/60"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ALL_CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  cat === c
                    ? "bg-primary/15 text-primary border-primary/40"
                    : "bg-card/30 text-muted-foreground hover:text-foreground border-border/60"
                }`}
              >
                {c === "all" ? t("prompts.allCats") : CATEGORY_LABELS[c][lang]}
              </button>
            ))}
          </div>
        </div>

        {list.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-16">{t("common.empty")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((p) => {
              const c = p[lang];
              return (
                <article
                  key={p.id}
                  className="glass-panel rounded-2xl p-5 flex flex-col gap-3 hover:glow-primary transition-shadow"
                >
                  <header className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-base leading-snug">{c.title}</h3>
                    <span className="text-[10px] uppercase font-mono-tech px-2 py-0.5 rounded-full border border-accent/40 bg-accent/10 text-accent">
                      {CATEGORY_LABELS[p.category][lang]}
                    </span>
                  </header>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
                    {c.prompt}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-card/60 border border-border/40 text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-auto pt-2">
                    <Button
                      size="sm"
                      onClick={() => applyPrompt(c.prompt)}
                      className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground"
                    >
                      <Wand2 className="h-3.5 w-3.5 mr-1.5" />
                      {t("prompts.use")}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copy(c.prompt)}
                      className="border-border/60"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
