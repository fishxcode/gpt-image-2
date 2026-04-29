import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Wand2, Copy, Maximize2 } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useI18n } from "@/lib/i18n";
import { GALLERY } from "@/lib/gallery-data";
import { getRouteSeo, ogImageFor, SITE } from "@/lib/seo";

const seo = getRouteSeo("/gallery");

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `${seo.zh.title} / ${seo.en.title}` },
      { name: "description", content: `${seo.zh.description} ${seo.en.description}` },
      { property: "og:title", content: seo.zh.title },
      { property: "og:description", content: seo.zh.description },
      { property: "og:url", content: SITE + "/gallery" },
      { property: "og:image", content: ogImageFor("zh") },
      { name: "twitter:title", content: seo.zh.title },
      { name: "twitter:description", content: seo.zh.description },
      { name: "twitter:image", content: ogImageFor("zh") },
    ],
    links: [
      { rel: "canonical", href: SITE + "/gallery" },
      { rel: "alternate", hrefLang: "zh-CN", href: SITE + "/gallery?lang=zh" },
      { rel: "alternate", hrefLang: "en", href: SITE + "/gallery?lang=en" },
      { rel: "alternate", hrefLang: "x-default", href: SITE + "/gallery" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [active, setActive] = useState<string | null>(null);

  const applyPrompt = (prompt: string) => {
    navigate({ to: "/", search: { prompt } as never });
    toast.success(t("prompts.copied"));
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
            <span className="text-gradient">{t("gallery.title")}</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            {t("gallery.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY.map((g) => {
            const c = g[lang];
            return (
              <article
                key={g.id}
                className="glass-panel rounded-2xl overflow-hidden group flex flex-col"
              >
                <Dialog open={active === g.id} onOpenChange={(o) => setActive(o ? g.id : null)}>
                  <DialogTrigger asChild>
                    <button className="relative aspect-[4/3] overflow-hidden bg-background/40">
                      <img
                        src={g.image}
                        alt={c.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-[10px] font-mono-tech uppercase tracking-wider text-foreground/80 inline-flex items-center gap-1">
                          <Maximize2 className="h-3 w-3" /> {t("gallery.viewLarge")}
                        </span>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl p-0 bg-background/90 backdrop-blur border-border/60">
                    <img src={g.image} alt={c.title} className="w-full h-auto rounded-lg" />
                  </DialogContent>
                </Dialog>

                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold leading-snug">{c.title}</h3>
                    <span className="text-[10px] font-mono-tech text-muted-foreground">
                      {g.size} · {g.quality}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-3 flex-1">{c.prompt}</p>
                  <div className="flex gap-2 pt-1">
                    <Button
                      size="sm"
                      onClick={() => applyPrompt(c.prompt)}
                      className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground"
                    >
                      <Wand2 className="h-3.5 w-3.5 mr-1.5" />
                      {t("gallery.useThis")}
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
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
