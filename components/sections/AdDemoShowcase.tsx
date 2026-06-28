"use client";

import { useEffect, useRef, useState } from "react";
import VideoModal from "@/components/ui/VideoModal";

// Mock Data representing your Ad campaign components
const ads = [
  {
    id: 1,
    title: "Main Campaign Promo",
    src: "https://d2hc16lzmcm380.cloudfront.net/media/videos/demos/Screen_Recording_184437.mp4",
  },
  {
    id: 2,
    title: "Interactive Ad Demo",
    src: "https://d2hc16lzmcm380.cloudfront.net/media/videos/demos/Recording_225520.mp4",
  },
];

export default function AdDemoShowcase() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  // Intersection Observer for handling Autoplay dynamically
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;

          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
            video.currentTime = 0; // Reset video to the beginning when out of view
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="ad-demo" className="bg-black py-24">
        <div className="mx-auto max-w-7xl px-6">

          {/* --- Grid Layout --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-end">
            {ads.map((ad, index) => {
              const isEmpty = !ad.src;

              // Setup elements to render
              const elements = [];
              
              // ===============================================
              // VIDEO / FALLBACK CARDS
              // ===============================================
              elements.push(
                <div
                  key={ad.id}
                  className="group relative overflow-hidden rounded-2xl
                  border border-white/10 bg-black hover:border-white/30 transition cursor-pointer"
                  onClick={() => {
                    if (!isEmpty) setActiveVideo(ad.src);
                  }}
                  onMouseEnter={() => setHoveredTitle(ad.title)}
                  onMouseLeave={() => setHoveredTitle(null)}
                >
                  <div className="relative aspect-video w-full">
                    {/* Badge displayed only on top row elements for aesthetic balance */}
                    {index < 2 && (
                      <div
                        className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full
                        bg-white/10 backdrop-blur-md border border-white/20
                        text-xs text-white font-medium tracking-wide"
                      >
                        Live Preview
                      </div>
                    )}

                    {isEmpty ? (
                      <>
                        <div className="absolute inset-0 bg-black/50" />
                        <img
                          src="/fallback.jpg"
                          alt="Coming Soon"
                          className={`absolute inset-0 m-auto object-contain opacity-80 ${
                            index < 2 ? "h-[50%] w-[50%]" : "h-[60%] w-[60%]"
                          }`}
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
                        preload={index < 2 ? "auto" : "metadata"}
                      >
                        <source src={ad.src} type="video/mp4" />
                      </video>
                    )}

                    {/* Gradient Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </div>
              );

              return elements;
            })}
          </div>
        </div>

        {/* Hover Title Notification */}
        <div
          className={`fixed bottom-8 left-1/2 z-[90] -translate-x-1/2 px-4 py-2 rounded-full
          text-white bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300
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