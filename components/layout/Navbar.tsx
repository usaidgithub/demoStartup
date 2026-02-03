"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-semibold tracking-wide">
          Rigzer
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <Link href="#demo" className="hover:text-white transition">
            Demo
          </Link>
          <Link href="#about" className="hover:text-white transition">
            About
          </Link>
          <Link href="#grants" className="hover:text-white transition">
            Grants
          </Link>
        </div>

        {/* CTA */}
        <Link
          href="#contact"
          className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white hover:text-black transition"
        >
          Request Grant
        </Link>

      </nav>
    </header>
  );
}
