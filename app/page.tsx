"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import DemoShowcase from "@/components/sections/DemoShowcase";
import AdDemoShowcase from "@/components/sections/AdDemoShowcase";

export default function HomePage() {
  // Set default view to "feed" so it loads instantly
  const [view, setView] = useState<"feed" | "ads">("feed");

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#62D4AE]/30">
      {/* Navbar with Feed and Ads toggle */}
      <Navbar currentView={view} onViewChange={setView} />

      <main>
        {view === "feed" ? (
          <DemoShowcase />
        ) : (
          <AdDemoShowcase />
        )}
      </main>
      <footer className="w-full py-6 mt-auto flex justify-center items-center">
        <span className="text-white/40 text-xs font-light tracking-wider antialiased">
          &copy; {new Date().getFullYear()} Rigzer
        </span>
      </footer>
    </div>
  );
}