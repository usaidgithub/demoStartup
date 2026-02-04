"use client";

import Link from "next/link";
import { Mail, Twitter } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-2xl shadow-lg shadow-black/30 border-b border-white/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Left Logo */}
        <Link
          href="/"
          className="text-xl font-semibold tracking-wide text-white"
        >
          Rigzer
        </Link>

        {/* Right Info Section */}
        <div className="flex items-center gap-6 text-sm text-white/70">

          {/* Email */}
          <a
            href="mailto:adamya@rigzer.com"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <Mail size={16} />
            adamya@rigzer.com
          </a>

          {/* X Account */}
          <a
            href="https://x.com/FedoraNoir"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <Twitter size={16} />
            @FedoraNoir
          </a>
        </div>
      </nav>
    </header>
  );
}
