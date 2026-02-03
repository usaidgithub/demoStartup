"use client";

import { X } from "lucide-react";

type VideoModalProps = {
  src: string | null;
  onClose: () => void;
};

export default function VideoModal({ src, onClose }: VideoModalProps) {
  if (!src) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-[101] rounded-full border border-white/20 p-2 hover:bg-white hover:text-black transition cursor-pointer"
      >
        <X size={20} />
      </button>

      {/* Video */}
      <div className="flex h-full w-full items-center justify-center px-6">
        <video
          src={src}
          className="max-h-full max-w-full rounded-xl"
          controls
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
}
