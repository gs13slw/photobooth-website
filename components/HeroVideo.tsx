"use client";

export default function HeroVideo() {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-paper-raised">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero-video.mp4"
        poster="/videos/hero-video-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
}
