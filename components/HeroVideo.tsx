"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-paper-raised">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero-video-2.mp4"
        poster="/videos/hero-video-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}