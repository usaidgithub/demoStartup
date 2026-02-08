"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Twitter, ContactIcon, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-2xl shadow-lg shadow-black/30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
        
        {/* Left Logo */}
        <Link
          href="/"
          className="text-lg sm:text-xl font-semibold tracking-wide text-white"
        >
          Rigzer
        </Link>

        {/* Desktop View: Original Links */}
        <div className="hidden sm:flex items-center gap-6 text-sm text-white/70">
          <a href="mailto:adamya@rigzer.com" className="flex items-center gap-2 hover:text-white transition">
            <Mail size={16} />
            <span>adamya@rigzer.com</span>
          </a>
          <a href="https://x.com/FedoraNoir" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition">
            <Twitter size={16} />
            <span>@FedoraNoir</span>
          </a>
        </div>

        {/* Mobile View: Contact Toggle Icon */}
        <div className="sm:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 transition-colors"
            aria-label="Toggle Contact Info"
          >
            {isOpen ? <X size={24} /> : <ContactIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="sm:hidden bg-black/90 border-t border-white/10 p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          <a 
            href="mailto:adamya@rigzer.com" 
            className="flex items-center gap-3 text-white/80 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <Mail size={20} />
            <span className="text-sm font-medium">adamya@rigzer.com</span>
          </a>
          <a 
            href="https://x.com/FedoraNoir" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 text-white/80 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <Twitter size={20} />
            <span className="text-sm font-medium">@FedoraNoir</span>
          </a>
        </div>
      )}
    </header>
  );
}