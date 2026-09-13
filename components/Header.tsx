"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Compass } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Inbound Nepal", href: "/inbound" },
  { name: "Domestic Flights", href: "/domestic-flights" },
  { name: "Outbound Tours", href: "/outbound-tours" }, // Updated href to match folder path
  { name: "Transport", href: "/transportation" },
  { name: "Gallery", href: "/gallery" },
  { name: "Achievements", href: "/achievements" },
  { name: "About", href: "/about-us" },
  { name: "Contact", href: "/contact-us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top Utility Bar - Dark Gold Accent Bar */}
      <div className="relative z-50 hidden border-b border-amber-900/20 bg-[#0f172a] text-white sm:block">
        <div className="container-x flex h-9 items-center justify-between text-[11px] font-semibold tracking-wider uppercase">
          <span className="flex items-center gap-2 text-slate-300">
            <span className="inline-block h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
            Trusted Nepal Travel Partner • Inbound • Outbound • Transport
          </span>
          <a
            href="tel:+97714005191"
            className="group flex items-center gap-2 rounded-full bg-slate-900 px-3 py-0.5 border border-amber-500/30 text-slate-200 transition-all duration-300 hover:border-[#D4AF37]"
          >
            <Phone size={11} className="text-[#D4AF37]" />
            <span className="tracking-widest font-bold text-amber-100">+977-1-4005191 / 4005192 / 4005193</span>
          </a>
        </div>
      </div>

      {/* Main Header - Clean Premium Light Glass */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="container-x flex h-[80px] items-center justify-between">
          
          {/* Logo Container */}
          <Link 
            href="/" 
            className="group flex items-center py-2 transition-transform duration-300 hover:scale-[1.02]" 
            onClick={() => setOpen(false)}
          >
            <img
              src="/logo.png"
              alt="Kudan Travel & Tours Logo"
              className="h-14 w-auto max-h-[60px] object-contain sm:h-16" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 xl:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-[13px] font-bold text-slate-700 transition-all duration-200 hover:text-[#B8860B] hover:bg-amber-50/50"
              >
                {l.name}
              </Link>
            ))}

            {/* Premium CTA Button */}
            <Link 
              href="/contact-us" 
              className="ml-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-500 to-[#B8860B] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-md transition-all duration-300 hover:shadow-lg hover:brightness-105 active:scale-95"
            >
              <Compass className="h-4 w-4 stroke-[2.5]" />
              <span>Book a Trip</span>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            aria-label="Open menu"
            className="rounded-xl border border-slate-300 bg-slate-50 p-2 text-slate-800 shadow-sm xl:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6 text-amber-600" /> : <Menu className="h-6 w-6 text-slate-800" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {open && (
          <div className="border-t border-slate-200 bg-white px-6 pb-6 pt-4 xl:hidden shadow-xl">
            <nav className="container-x flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-bold text-slate-800 hover:bg-amber-50 hover:text-amber-700"
                >
                  {l.name}
                </Link>
              ))}
              <Link
                href="/contact-us"
                onClick={() => setOpen(false)}
                className="mt-3 text-center rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] py-3 text-sm font-black uppercase tracking-wider text-slate-950 shadow-md"
              >
                Book a Trip
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}