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
        src: "https://d2hc16lzmcm380.cloudfront.net/media/videos/5347cba2-e5a4-4a49-b995-c9f6ddeac212-demo1.mp4",
    },
    { id: 3, title: "User Flow Demo", src: "https://your-cdn/video3.mp4" },
    { id: 4, title: "Real-world Use Case", src: "https://your-cdn/video4.mp4" },
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
                    {/* Grid (2 per row) */}
                    {/* Grid Layout */}
                    <div className="grid gap-10 lg:grid-cols-3">

                        {/* Left Side: Videos (2-column grid) */}
                        <div className="lg:col-span-2 grid gap-10 md:grid-cols-2">
                            {videos.map((video, index) => (
                                <div
                                    key={video.id}
                                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black hover:border-white/30 transition"
                                    onClick={() => setActiveVideo(video.src)}
                                    onMouseEnter={() => setHoveredTitle(video.title)}
                                    onMouseLeave={() => setHoveredTitle(null)}
                                >
                                    {/* Aspect Ratio Video Box */}
                                    <div className="relative aspect-video w-full">
                                        <video
                                            ref={(el) => {
                                                if (el !== null) {
                                                    videoRefs.current[index] = el;
                                                }
                                            }}
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                        >
                                            <source src={video.src} type="video/mp4" />
                                        </video>
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                                </div>
                            ))}
                        </div>

                        {/* Right Side: About Card (ONLY ONCE) */}
                        <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-10 shadow-lg h-fit sticky top-28">
                            <p className="text-white/70 leading-relaxed text-base">
                                A social-media-style platform enabling instant access to cloud-streamed
                                game and software demos without downloads.
                                <br />
                                <br />
                                The platform combines short-form content discovery with interactive,
                                hands-on demos powered by cloud GPU streaming.
                            </p>
                        </div>

                    </div>

                </div>
                {/* Global Hover Title Display */}
                <div
                className={`fixed bottom-8 left-1/2 z-[90] -translate-x-1/2 text-sm text-white 
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
