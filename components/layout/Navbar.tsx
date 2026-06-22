"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ContactIcon, X, Radio, Layers } from "lucide-react";

interface NavbarProps {
  currentView: "feed" | "ads";
  onViewChange: (view: "feed" | "ads") => void;
}

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-2xl shadow-lg shadow-black/30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">

        {/* Left Logo (Forces back to Feed) */}
        <button
          onClick={() => {
            onViewChange("feed");
            setIsOpen(false);
          }}
          className="flex items-center gap-3 transition-opacity hover:opacity-90 group text-left bg-transparent border-none outline-none cursor-pointer"
        >
          <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 2000 2000"
            className="w-6 h-6 sm:w-7 sm:h-7 transition-transform group-hover:scale-105"
            style={{ color: "#62D4AE" }}
          >
            <polygon fill="currentColor" points="417.3 988.73 660.71 1159.38 582.7 1465.46 417.3 1270 417.3 988.73" />
            <polygon fill="currentColor" points="1207.23 1449.13 416.67 899.71 416.67 294.88 721.66 611.73 688.92 825.94 970.62 939.22 1207.23 1449.13" />
            <polygon fill="currentColor" points="774.54 561.1 538.38 294.88 1276.93 294.88 1517.14 538.72 774.54 561.1" />
            <polygon fill="currentColor" points="1583.33 1705.12 1339.11 1539.17 1079.33 968.63 1281.62 1042.59 1583.33 1705.12" />
            <polygon fill="currentColor" points="794.12 626.74 1557.81 835.92 1396.78 1190.85 1380.34 988.73 771.95 772.43 794.12 626.74" />
            <polygon fill="currentColor" points="1536.13 617.09 1549.57 751.25 1079.33 624.25 1536.13 617.09" />
          </svg>
          <span className="text-sm sm:text-base font-semibold tracking-[0.12em] uppercase text-white/90">
            Rigzer
          </span>
        </button>

        {/* Center: Main Nav Links */}
        <div className="hidden sm:flex items-center gap-8 text-sm">
          {/* Feed Tab */}
          <button
            onClick={() => onViewChange("feed")}
            className={`flex items-center gap-2 font-medium tracking-wide transition-all outline-none border-none bg-transparent cursor-pointer ${
              currentView === "feed"
                ? "text-[#62D4AE] drop-shadow-[0_0_10px_rgba(98,212,174,0.4)]"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Radio size={16} className={currentView === "feed" ? "animate-pulse" : ""} />
            <span>Feed</span>
          </button>

          {/* Ads Tab */}
          <button
            onClick={() => onViewChange("ads")}
            className={`flex items-center gap-2 font-medium tracking-wide transition-all outline-none border-none bg-transparent cursor-pointer ${
              currentView === "ads"
                ? "text-[#62D4AE] drop-shadow-[0_0_10px_rgba(98,212,174,0.4)]"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Layers size={16} />
            <span>Ads</span>
          </button>
        </div>

        {/* Right: Contact Email */}
        <div className="hidden sm:flex items-center text-sm">
          <a href="mailto:adamya@rigzer.com" className="flex items-center gap-2 text-white/70 hover:text-white transition">
            <Mail size={16} />
            <span>adamya@rigzer.com</span>
          </a>
        </div>

        {/* Mobile Burger Trigger */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 transition-colors bg-transparent border-none outline-none"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X size={24} /> : <ContactIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="sm:hidden bg-black/95 border-t border-white/10 p-5 flex flex-col gap-5 animate-in slide-in-from-top duration-200">
          {/* Mobile Feed */}
          <button
            onClick={() => {
              onViewChange("feed");
              setIsOpen(false);
            }}
            className={`flex items-center gap-3 text-sm font-medium text-left border-none bg-transparent ${
              currentView === "feed" ? "text-[#62D4AE]" : "text-white/80"
            }`}
          >
            <Radio size={20} />
            <span>Feed</span>
          </button>

          {/* Mobile Ads */}
          <button
            onClick={() => {
              onViewChange("ads");
              setIsOpen(false);
            }}
            className={`flex items-center gap-3 text-sm font-medium text-left border-none bg-transparent ${
              currentView === "ads" ? "text-[#62D4AE]" : "text-white/80"
            }`}
          >
            <Layers size={20} />
            <span>Ads</span>
          </button>

          <hr className="border-white/10 my-1" />

          {/* Mobile Mail */}
          <a
            href="mailto:adamya@rigzer.com"
            className="flex items-center gap-3 text-white/80 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <Mail size={20} />
            <span className="text-sm font-medium">adamya@rigzer.com</span>
          </a>
        </div>
      )}
    </header>
  );
}