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
        title: "AI Engine Demo",
        src: "https://d2hc16lzmcm380.cloudfront.net/media/videos/IMG_5667.MP4",
    },
    {
        id: 3,
        title: "User Flow Demo",
        src: "https://d2hc16lzmcm380.cloudfront.net/media/videos/Video%20Project%209.mp4"
    },
    {
        id: 4,
        title: "Real-world Use Case",
        src: "https://d2hc16lzmcm380.cloudfront.net/media/videos/9%20%20(1).mp4"
    },
    { id: 5, title: "Admin Dashboard", src: "https://your-cdn/video5.mp4" },
    { id: 6, title: "Security & Privacy", src: "https://your-cdn/video6.mp4" },
    { id: 7, title: "Mobile Experience", src: "https://your-cdn/video7.mp4" },
    { id: 8, title: "Scalability Demo", src: "https://your-cdn/video8.mp4" },
];

export default function DemoShowcase() {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target as HTMLVideoElement;
                    if (entry.isIntersecting) {
                        video.play().catch(() => { });
                    } else {
                        video.pause();
                        video.currentTime = 0;
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
            <section id="demo" className="bg-black py-24">
                <div className="mx-auto max-w-7xl px-6">
                    {/* Main Grid System:
                        - 3 columns on Desktop (lg)
                        - 2 columns on Tablet (md)
                        - 1 column on Mobile
                    */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* First 2 Videos (Row 1) */}
                        {videos.slice(0, 2).map((video, index) => (
                            <div
                                key={video.id}
                                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black hover:border-white/30 transition"
                                onClick={() => setActiveVideo(video.src)}
                                onMouseEnter={() => setHoveredTitle(video.title)}
                                onMouseLeave={() => setHoveredTitle(null)}
                            >
                                <div className="relative aspect-video w-full">
                                    <video
                                        ref={(el) => { if (el) videoRefs.current[index] = el; }}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        muted loop playsInline preload="metadata"
                                    >
                                        <source src={video.src} type="video/mp4" />
                                    </video>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition" />
                                </div>
                            </div>
                        ))}

                        {/* The About Card:
                            - Placed in the 3rd column of the first row.
                            - 'lg:row-span-2' makes it span two rows high (Vertical Rectangle).
                        */}
                        <div className="lg:row-span-2 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-10 shadow-lg flex flex-col justify-center">
                            <p className="text-white leading-relaxed text-base">
                                Welcome,

                                Scroll your feed — tap a post. Instantly, you're immersed.
                                A game level materializes. A cool mechanic unfolds.
                                A 3D asset reveals itself in full detail as you examine materials and geometry.
                                Tech prototypes await your testing and exploration.
                                <br />
                                <br />
                                No downloads. No delays. Pure cloud.
                                <br />
                                <br />
                                From games to art, mechanics, and innovative concepts —
                                this is where discovery transforms into real-time experience, within the familiar social media environment.
                            </p>
                        </div>

                        {/* Remaining Videos (Will wrap under the first two and the card) */}
                        {videos.slice(2).map((video, index) => (
                            <div
                                key={video.id}
                                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black hover:border-white/30 transition"
                                onClick={() => setActiveVideo(video.src)}
                                onMouseEnter={() => setHoveredTitle(video.title)}
                                onMouseLeave={() => setHoveredTitle(null)}
                            >
                                <div className="relative aspect-video w-full">
                                    <video
                                        ref={(el) => { if (el) videoRefs.current[index + 2] = el; }}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        muted loop playsInline preload="metadata"
                                    >
                                        <source src={video.src} type="video/mp4" />
                                    </video>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Global Hover Title Display */}
                <div
                    className={`fixed bottom-8 left-1/2 z-[90] -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm text-white 
                    transition-all duration-300
                    ${hoveredTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
                >
                    {hoveredTitle}
                </div>
            </section>

            {/* Fullscreen Modal */}
            <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
        </>
    );
}