"use client";

import { useEffect, useRef, useState } from "react";
import VideoModal from "@/components/ui/VideoModal";
import { Youtube, Twitter, MessageSquare, ExternalLink } from "lucide-react";

// Full data structure with credits included
const videos = [
    {
        id: 1,
        title: "Product Walkthrough",
        src: "https://d2hc16lzmcm380.cloudfront.net/models/raw/5dfb298a-a83a-4632-9984-2836eb4178cc-Screen%20Recording%202025-12-21%20175503.mp4",
        credits: {
            game: "Partizon",
            youtube: "https://www.youtube.com/@tsitski",
            x: "https://x.com/tsitskidev",
            discord: "https://discord.com/invite/rPv4JSuhNR",
        },
    },
    {
        id: 2,
        title: "AI Engine Demo",
        src: "https://d2hc16lzmcm380.cloudfront.net/media/videos/IMG_5667.MP4",
        credits: {
            game: "AI Engine",
            youtube: "https://youtube.com",
            x: "https://x.com",
            discord: "https://discord.com",
        },
    },
    {
        id: 3,
        title: "User Flow Demo",
        src: "https://d2hc16lzmcm380.cloudfront.net/media/videos/Video%20Project%209.mp4",
        credits: {
            game: "Flow State",
            youtube: "https://youtube.com",
            x: "https://x.com",
            discord: "https://discord.com",
        },
    },
    {
        id: 4,
        title: "Real-world Use Case",
        src: "https://d2hc16lzmcm380.cloudfront.net/media/videos/9%20%20(1).mp4",
        credits: {
            game: "World Sim",
            youtube: "https://youtube.com",
            x: "https://x.com",
            discord: "https://discord.com",
        },
    },
    { id: 5, title: "Admin Dashboard", src: "https://your-cdn/video5.mp4", credits: { game: "Dashboard Pro", youtube: "#", x: "#", discord: "#" } },
    { id: 6, title: "Security & Privacy", src: "https://your-cdn/video6.mp4", credits: { game: "SecureNet", youtube: "#", x: "#", discord: "#" } },
    { id: 7, title: "Mobile Experience", src: "https://your-cdn/video7.mp4", credits: { game: "Mobile Go", youtube: "#", x: "#", discord: "#" } },
    { id: 8, title: "Scalability Demo", src: "https://your-cdn/video8.mp4", credits: { game: "ScaleUp", youtube: "#", x: "#", discord: "#" } },
];

export default function DemoShowcase() {
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

    const [activeVideo, setActiveVideo] = useState<string | null>(null);
    const [hoveredVideo, setHoveredVideo] = useState<any | null>(null);

    // --- Hover Logic Helpers ---
    const clearTimer = () => {
        if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };

    const handleMouseEnter = (video: any) => {
        clearTimer();
        setHoveredVideo(video);
    };

    const handleMouseLeave = () => {
        // 300ms grace period to move mouse from video to the credit card
        closeTimerRef.current = setTimeout(() => {
            setHoveredVideo(null);
        }, 300);
    };

    // --- Intersection Observer for Auto-play ---
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

        return () => {
            observer.disconnect();
            clearTimer();
        };
    }, []);

    return (
        <>
            <section id="demo" className="bg-black py-24 relative">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-end">

                        {/* 1. First Two Videos */}
                        {videos.slice(0, 2).map((video, index) => (
                            <div
                                key={video.id}
                                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black hover:border-white/30 transition"
                                onClick={() => setActiveVideo(video.src)}
                                onMouseEnter={() => handleMouseEnter(video)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="relative aspect-video w-full">
                                    <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white font-medium">
                                        Full Bootup Here
                                    </div>
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

                        <div className="lg:col-start-3 lg:row-start-1 flex self-end">
                            <div className="w-full rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-8 shadow-lg">
                                <div className="flex flex-col gap-4">
                                    <p className="text-white leading-relaxed text-base">
                                        Welcome,
                                        <br />
                                        <br />
                                        Scroll your feed — tap a post. Instantly, you&apos;re immersed.
                                        A game level materializes. A 3D asset reveals itself in full detail as you examine materials and geometry.
                                        Tech prototypes await your testing and exploration.
                                        <br />
                                        <br />
                                        <span className="text-blue-400 font-medium italic">
                                            No downloads. No delays. Pure cloud.
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 3. The rest of the videos */}
                        {videos.slice(2).map((video, index) => (
                            <div
                                key={video.id}
                                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black hover:border-white/30 transition"
                                onClick={() => setActiveVideo(video.src)}
                                onMouseEnter={() => handleMouseEnter(video)}
                                onMouseLeave={handleMouseLeave}
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

                {/* 4. Floating Credits Card (The Persistent UI) */}
                <div
                    onMouseEnter={clearTimer}
                    onMouseLeave={handleMouseLeave}
                    className={`fixed bottom-8 left-1/2 z-[100] -translate-x-1/2 w-[320px] 
            bg-black/90 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-2xl
            transition-all duration-300 ease-out
            ${hoveredVideo ? "opacity-100 translate-y-0 visible scale-100" : "opacity-0 translate-y-6 invisible scale-95 pointer-events-none"}`}
                >
                    {hoveredVideo && (
                        <div className="flex flex-col gap-4">
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">Credits</p>
                                <p className="text-white font-medium text-sm">
                                    Game Name: <span className="text-blue-400">{hoveredVideo.credits?.game}</span>
                                </p>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                <div className="flex gap-6">
                                    <a href={hoveredVideo.credits?.youtube} target="_blank" rel="noopener noreferrer"
                                        className="text-white/50 hover:text-red-500 transition-colors" title="Youtube">
                                        <Youtube size={20} />
                                    </a>
                                    <a href={hoveredVideo.credits?.x} target="_blank" rel="noopener noreferrer"
                                        className="text-white/50 hover:text-blue-400 transition-colors" title="Twitter / X">
                                        <Twitter size={20} />
                                    </a>
                                    <a href={hoveredVideo.credits?.discord} target="_blank" rel="noopener noreferrer"
                                        className="text-white/50 hover:text-indigo-400 transition-colors" title="Discord">
                                        <MessageSquare size={20} />
                                    </a>
                                </div>

                                <button className="group flex items-center gap-1 text-[10px] text-white/30 hover:text-white transition-colors">
                                    Details <ExternalLink size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
        </>
    );
}