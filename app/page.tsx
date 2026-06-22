"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar"; 
import DemoShowcase from "@/components/sections/DemoShowcase";

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
          /* ===================================================
              ADS SECTION CONTENT
             =================================================== */
          <section id="ads" className="bg-black py-24 min-h-[calc(100vh-76px)] flex items-center justify-center">
            <div className="mx-auto max-w-7xl px-6 text-center">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-t from-white/20 to-white">
                Ads Manager
              </h2>
              <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed">
                Your high-conversion ad units and tracking configurations go right here.
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}