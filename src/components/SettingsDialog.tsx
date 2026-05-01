import { useEffect, useState } from "react";
import { Settings2, Eye, EyeOff, Save, Link2, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  DEFAULT_CONFIG,
  type GenConfig,
  loadConfig,
  saveConfig,
  configFromUrl,
} from "@/lib/config-store";
import { useI18n } from "@/lib/i18n";
import { buildShareUrl } from "@/lib/share-url";

const SIZES = ["1024x1024", "1536x1024", "1024x1536", "2048x2048", "auto"];
const QUALITIES = ["low", "medium", "high", "auto"];
const FORMATS = ["png", "jpeg", "webp"];
const BACKGROUNDS = ["opaque", "transparent", "auto"];

export function SettingsDialog() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [draft, setDraft] = useState<GenConfig>(DEFAULT_CONFIG);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) setDraft(configFromUrl(loadConfig()));
  }, [open]);

  const update = <K extends keyof GenConfig>(k: K, v: GenConfig[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const handleSave = () => {
    saveConfig(draft);
    toast.success(t("toast.saved"));
    setOpen(false);
  };

  const handleReset = () => {
    setDraft(DEFAULT_CONFIG);
    toast.info(t("toast.reset"));
  };

  const handleShare = () => {
    const currentPrompt =
      document.querySelector<HTMLTextAreaElement>('[data-prompt-input="true"]')?.value ?? "";
    const url = buildShareUrl(draft, window.location, currentPrompt);
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success(t("toast.shareCopied"));
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-10 w-10 border-border/60">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl glass-panel border-border/40 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            <span className="text-gradient">{t("settings.title")}</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t("settings.desc")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-2">
          <Section title={t("settings.section.api")}>
            <Field label={t("settings.field.apiUrl")}>
              <Input
                value={draft.apiUrl}
                onChange={(e) => update("apiUrl", e.target.value)}
                placeholder="https://.../v1/images/generations"
              />
            </Field>
            <Field label={t("settings.field.apiKey")}>
              <div className="relative">
                <Input
                  type={showKey ? "text" : "password"}
                  value={draft.apiKey}
                  onChange={(e) => update("apiKey", e.target.value)}
                  placeholder="sk-..."
                  className="pr-10 font-mono-tech"
                />
                <button
                  type="button"
                  onClick={() => setShowKey((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>
          </Section>

          <Section title={t("settings.section.params")}>
            <div className="grid grid-cols-2 gap-3">
              <Field label={t("settings.field.model")}>
                <Input
                  value={draft.model}
                  onChange={(e) => update("model", e.target.value)}
                  className="font-mono-tech"
                />
              </Field>
              <Field label={t("settings.field.n")}>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={draft.n}
                  onChange={(e) => update("n", Math.max(1, Number(e.target.value) || 1))}
                />
              </Field>
              <Field label={t("settings.field.size")}>
                <SelectField
                  value={draft.size}
                  onChange={(v) => update("size", v)}
                  options={SIZES}
                />
              </Field>
              <Field label={t("settings.field.quality")}>
                <SelectField
                  value={draft.quality}
                  onChange={(v) => update("quality", v)}
                  options={QUALITIES}
                />
              </Field>
              <Field label={t("settings.field.responseFormat")}>
                <SelectField
                  value={draft.responseFormat}
                  onChange={(v) => update("responseFormat", v as "b64_json" | "url")}
                  options={["b64_json", "url"]}
                />
              </Field>
              <Field label={t("settings.field.outputFormat")}>
                <SelectField
                  value={draft.outputFormat}
                  onChange={(v) => update("outputFormat", v)}
                  options={FORMATS}
                />
              </Field>
              <Field label={t("settings.field.background")}>
                <SelectField
                  value={draft.background}
                  onChange={(v) => update("background", v)}
                  options={BACKGROUNDS}
                />
              </Field>
            </div>
          </Section>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border/40">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              {t("settings.reset")}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              {copied ? (
                <Check className="h-3.5 w-3.5 mr-1" />
              ) : (
                <Link2 className="h-3.5 w-3.5 mr-1" />
              )}
              {t("settings.share")}
            </Button>
          </div>
          <Button
            onClick={handleSave}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Save className="h-4 w-4 mr-1.5" /> {t("settings.save")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-mono-tech">
          {title}
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-accent/40 to-transparent" />
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground font-mono-tech uppercase tracking-wider">
        {label}
      </Label>
      {children}
    </div>
  );
}

function SelectField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="font-mono-tech">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o} value={o} className="font-mono-tech">
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
