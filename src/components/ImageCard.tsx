import { Download, Maximize2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { ImageItem } from "@/lib/image-api";

export function ImageCard({ image, index }: { image: ImageItem; index: number }) {
  const [open, setOpen] = useState(false);

  const download = () => {
    const a = document.createElement("a");
    a.href = image.src;
    const ext = image.mime.split("/")[1] || "png";
    a.download = `gpt-image-2-${Date.now()}-${index}.${ext}`;
    a.click();
  };

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl glass-panel">
        <div className="relative aspect-square bg-black/30">
          <img
            src={image.src}
            alt={`generated-${index}`}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="font-mono-tech text-xs text-white/80">
              #{String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setOpen(true)}
                className="p-2 rounded-lg bg-white/10 backdrop-blur hover:bg-white/20 text-white"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={download}
                className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90"
              >
                <Download className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-2 bg-background/95 border-border/40">
          <img
            src={image.src}
            alt={`preview-${index}`}
            className="max-h-[90vh] w-auto mx-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
