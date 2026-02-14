"use client";

import { useEffect, useRef, useState } from "react";
import VideoModal from "@/components/ui/VideoModal";

const videos = [
  {
    id: 1,
    title: "Product Walkthrough",
    src: "https://d2hc16lzmcm380.cloudfront.net/models/raw/5dfb298a-a83a-4632-9984-2836eb4178cc-Screen%20Recording%202025-12-21%20175503.mp4",
  },
  {
    id: 2,
    title: "Partizan",
    src: "https://d2hc16lzmcm380.cloudfront.net/media/videos/IMG_5667.MP4",
    startAt: 113,
  },
  {
    id: 3,
    title: "Deep Snow Delivery",
    src: "https://d2hc16lzmcm380.cloudfront.net/media/videos/Video%20Project%209.mp4",
  },
  {
    id: 4,
    title: "9 Child Street",
    src: "https://d2hc16lzmcm380.cloudfront.net/media/videos/9%20%20(1).mp4",
  },

  // Placeholder Cards
  { id: 5, title: "Empty", src: null },
  { id: 6, title: "Empty", src: null },
  { id: 7, title: "Empty", src: null },
  { id: 8, title: "Empty", src: null },
];

export default function DemoShowcase() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  // ✅ Autoplay only real videos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            const start = Number(video.dataset.start) || 0;

            if (start > 0 && video.currentTime < start) {
              video.currentTime = start;
            }

            video.play().catch(() => {});
          } else {
            video.pause();
            const start = Number(video.dataset.start) || 0;
            video.currentTime = start;
          }
        });
      },
      { threshold: 0.6 }
    );

    // ✅ Observe only actual videos
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="demo" className="bg-black py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* --- Header Text --- */}
          <div className="relative h-0 overflow-visible z-10">
            <h2
              className="absolute -top-12 md:-top-20 left-11
              text-4xl sm:text-5xl md:text-7xl lg:text-8xl
              whitespace-nowrap w-full
              font-bold tracking-tighter uppercase
              bg-gradient-to-t from-white/10 via-white/70 to-white
              bg-clip-text text-transparent pointer-events-none"
            >
              Out March ‘26
            </h2>
          </div>

          {/* --- Grid Layout --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-end">
            {/* ===============================
                FIRST 2 VIDEOS
            =============================== */}
            {videos.slice(0, 2).map((video, index) => {
              const isEmpty = !video.src;

              return (
                <div
                  key={video.id}
                  className="group relative overflow-hidden rounded-2xl
                  border border-white/10 bg-black hover:border-white/30 transition"
                  onClick={() => {
                    if (!isEmpty) setActiveVideo(video.src);
                  }}
                  onMouseEnter={() => setHoveredTitle(video.title)}
                  onMouseLeave={() => setHoveredTitle(null)}
                >
                  <div className="relative aspect-video w-full">
                    {/* Badge */}
                    <div
                      className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full
                      bg-white/10 backdrop-blur-md border border-white/20
                      text-xs text-white font-medium tracking-wide"
                    >
                      Full Bootup
                    </div>

                    {/* ✅ Video OR Fallback */}
                    {isEmpty ? (
                      <>
                        <div className="absolute inset-0 bg-black/50" />
                        <img
                          src="/fallback.jpg"
                          alt="Coming Soon"
                          className="absolute inset-0 m-auto h-[50%] w-[50%]
                          object-contain opacity-80"
                        />
                      </>
                    ) : (
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current[index] = el;
                        }}
                        className="absolute inset-0 h-full w-full object-cover
                        transition-transform duration-500 group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        preload="auto"
                        data-start={video.startAt ?? 0}
                        onCanPlay={(e) => {
                          const vid = e.currentTarget;
                          const startTime = video.startAt ?? 0;

                          if (startTime > 0 && vid.currentTime < startTime) {
                            vid.currentTime = startTime;
                          }
                        }}
                      >
                        <source src={video.src} type="video/mp4" />
                      </video>
                    )}

                    {/* Gradient Hover Overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t
                      from-black/70 via-transparent opacity-0
                      group-hover:opacity-100 transition"
                    />
                  </div>
                </div>
              );
            })}

            {/* ===============================
                TEXT CARD (Row 1 Right)
            =============================== */}
            <div className="lg:col-start-3 lg:row-start-1 flex self-end">
              <div className="w-full rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-8 shadow-lg">
                <p className="text-white leading-relaxed text-base">
                  Welcome,
                  <br />
                  <br />
                  Scroll your feed — tap a post. Instantly, you&apos;re immersed.
                  A game level materializes. A 3D asset reveals itself in full
                  detail as you examine materials and geometry.
                  <br />
                  <br />
                  <span className="text-blue-400 font-medium italic">
                    No downloads. No delays. Pure cloud.
                  </span>
                </p>
              </div>
            </div>

            {/* ===============================
                REMAINING VIDEOS
            =============================== */}
            {videos.slice(2).map((video, index) => {
              const isEmpty = !video.src;

              return (
                <div
                  key={video.id}
                  className="group relative overflow-hidden rounded-2xl
                  border border-white/10 bg-black hover:border-white/30 transition"
                  onClick={() => {
                    if (!isEmpty) setActiveVideo(video.src);
                  }}
                  onMouseEnter={() => setHoveredTitle(video.title)}
                  onMouseLeave={() => setHoveredTitle(null)}
                >
                  <div className="relative aspect-video w-full">
                    {/* ✅ Video OR Fallback */}
                    {isEmpty ? (
                      <>
                        <div className="absolute inset-0 bg-black/50" />
                        <img
                          src="/fallback.jpg"
                          alt="Coming Soon"
                          className="absolute inset-0 m-auto h-[60%] w-[60%]
                          object-contain opacity-80"
                        />
                      </>
                    ) : (
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current[index + 2] = el;
                        }}
                        className="absolute inset-0 h-full w-full object-cover
                        transition-transform duration-500 group-hover:scale-105"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      >
                        <source src={video.src} type="video/mp4" />
                      </video>
                    )}

                    {/* Gradient Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hover Title Notification */}
        <div
          className={`fixed bottom-8 left-1/2 z-[90] -translate-x-1/2 px-4 py-2 rounded-full
          text-white
          ${
            hoveredTitle
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {hoveredTitle}
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
