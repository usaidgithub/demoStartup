"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-2xl shadow-lg shadow-black/30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-wide text-white">
          Rigzer
        </Link>

      </nav>
    </header>
  );
}
