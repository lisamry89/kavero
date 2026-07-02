"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Zap } from "lucide-react";
import { FeedItem } from "@/lib/types";

const AUTO_DISMISS_MS = 5000;

export function StoryViewer({
  item,
  onClose,
}: {
  item: FeedItem;
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] mx-auto flex w-full max-w-md flex-col bg-black">
      <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2 p-4">
        <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full bg-white"
            style={{ animation: `story-progress ${AUTO_DISMISS_MS}ms linear forwards` }}
          />
        </div>
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/40"
        >
          <X className="h-4 w-4 text-white" strokeWidth={1.5} />
        </button>
      </div>

      <style>{`
        @keyframes story-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>

      <div className="relative flex-1">
        {item.mediaUrl ? (
          <Image src={item.mediaUrl} alt={item.title} fill className="object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 bg-neutral-950 px-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900">
              <Zap className="h-6 w-6 text-white" strokeWidth={1.5} />
            </div>
            <p className="font-serif text-2xl text-white">{item.title}</p>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-white/10 px-5 py-4 backdrop-blur-md">
          <p className="text-sm font-light text-white/95">
            {item.title} par {item.author}{" "}
            <span className="text-white/60">• {item.time}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
