import { Link, useLocation } from "@tanstack/react-router";
import { Sparkles, KeyRound, ExternalLink } from "lucide-react";
import { LangSwitch } from "@/components/LangSwitch";
import { SettingsDialog } from "@/components/SettingsDialog";
import { useI18n } from "@/lib/i18n";
import { useConfig } from "@/lib/config-store";

export function SiteHeader() {
  const { t } = useI18n();
  const config = useConfig();
  const configured = !!config.apiKey && !!config.apiUrl;
  const { pathname } = useLocation();

  const navItems: Array<{ to: "/" | "/prompts" | "/gallery"; key: "nav.home" | "nav.prompts" | "nav.gallery" }> = [
    { to: "/", key: "nav.home" },
    { to: "/prompts", key: "nav.prompts" },
    { to: "/gallery", key: "nav.gallery" },
  ];

  return (
    <header className="relative z-10 border-b border-border/40 backdrop-blur-xl bg-background/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <div className="absolute inset-0 bg-primary blur-xl opacity-50" />
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base font-semibold leading-tight">{t("app.name")}</h1>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono-tech">
              {t("app.tagline")}
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-2">
          {navItems.map((it) => {
            const active = pathname === it.to;
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                  active
                    ? "bg-primary/15 text-primary border border-primary/40"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/40 border border-transparent"
                }`}
              >
                {t(it.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://fishxcode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent hover:bg-accent/20 hover:border-accent/60 transition-colors text-xs font-medium"
          >
            <KeyRound className="h-3 w-3" />
            {t("nav.getKey")}
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
          <StatusPill ok={configured} okLabel={t("status.connected")} offLabel={t("status.notConfigured")} />
          <LangSwitch />
          <SettingsDialog />
        </div>
      </div>

      {/* mobile nav */}
      <nav className="md:hidden border-t border-border/30 px-4 py-2 flex gap-1 overflow-x-auto">
        {navItems.map((it) => {
          const active = pathname === it.to;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                active
                  ? "bg-primary/15 text-primary border border-primary/40"
                  : "text-muted-foreground hover:text-foreground bg-card/40 border border-border/40"
              }`}
            >
              {t(it.key)}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

function StatusPill({ ok, okLabel, offLabel }: { ok: boolean; okLabel: string; offLabel: string }) {
  return (
    <div
      className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono-tech uppercase tracking-wider ${
        ok ? "border-primary/40 bg-primary/10 text-primary" : "border-destructive/40 bg-destructive/10 text-destructive"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-primary" : "bg-destructive"} animate-pulse`} />
      {ok ? okLabel : offLabel}
    </div>
  );
}

export function SiteFooter() {
  const { t, lang } = useI18n();
  return (
    <footer className="relative z-10 border-t border-border/30 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-[10px] text-muted-foreground font-mono-tech uppercase tracking-wider text-center sm:text-left">
          {t("footer.notice")}
        </div>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <a
            href={`/api/rss.xml?lang=${lang}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono-tech"
          >
            RSS
          </a>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono-tech"
          >
            Sitemap
          </a>
          <a
            href="https://fishxcode.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>{t("footer.poweredBy")}</span>
            <span className="font-mono-tech font-semibold text-gradient">fishxcode.com</span>
            <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100" />
          </a>
        </div>
      </div>
    </footer>
  );
}
