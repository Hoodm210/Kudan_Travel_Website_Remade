"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Compass,
  ChevronDown,
  Globe2,
  Plane,
  Car,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Brochure", href: "/brochure" },
  { name: "Gallery", href: "/gallery" },
  { name: "Achievements", href: "/achievements" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact Us", href: "/contact-us" },
];

const services = [
  {
    name: "Nepal",
    description: "Himalayan journeys & cultural heritage",
    href: "/inbound",
    icon: Globe2,
    accent: "text-[#A92332] bg-[#A92332]/[0.07] border-[#A92332]/15",
  },
    
  {
    name: "Bhutan",
    description: "Discover destinations around the world",
    href: "/Bhutan",
    icon: Compass,
    accent: "text-[#173B68] bg-[#173B68]/[0.07] border-[#173B68]/15",
  },
   {
    name: "India",
    description: "Discover destinations around the world",
    href: "/India",
    icon: Compass,
    accent: "text-[#173B68] bg-[#173B68]/[0.07] border-[#173B68]/15",
  },
  {
    name: "Domestic Flights",
    description: "Mountain flights & flight bookings",
    href: "/domestic-flights",
    icon: Plane,
    accent: "text-[#9B6B22] bg-[#B88A3B]/[0.09] border-[#B88A3B]/20",
  },
  {
    name: "Transport Services",
    description: "Private transfers, 4WD & tourist coaches",
    href: "/transportation",
    icon: Car,
    accent: "text-[#38564A] bg-[#38564A]/[0.07] border-[#38564A]/15",
  },
];

function HimalayanDivider() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 76"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[54px] w-full opacity-[0.13]"
      fill="none"
    >
      <path d="M0 65 78 42 121 52 183 16 231 47 278 34 324 56 397 12 455 45 512 31 567 53 633 20 683 44 739 9 795 47 846 28 902 54 962 16 1014 42 1070 25 1125 51 1190 18 1245 44 1308 28 1371 48 1440 23V76H0Z" fill="#B88A3B" />
      <path d="m0 68 98-13 71-24 59 25 74-15 57 16 72-29 48 20 76-13 66 19 66-31 63 27 68-14 64 15 70-28 66 19 65-9 76 19 66-25 67 20 74-17 64 13 65-18" stroke="#173B68" strokeWidth="1.2" />
      <path d="m183 16 18 17 13-3 17 14M397 12l17 18 17-4 24 19M739 9l19 24 14-5 23 19M962 16l18 17 16-5 18 14M1190 18l16 16 18-4 21 14" stroke="#173B68" strokeWidth="1.2" />
    </svg>
  );
}

function HeritageMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 56 56" fill="none" className="h-9 w-9 shrink-0">
      <path d="M28 3 32.5 14.5 45 10.5 41 23 53 28 41 32.5 45 45 32.5 41 28 53 23 41 10.5 45 14.5 32.5 3 28 14.5 23 10.5 10.5 23 14.5Z" stroke="#B88A3B" strokeWidth="1" />
      <circle cx="28" cy="28" r="15" stroke="#A92332" strokeWidth="1" />
      <path d="M13 34 22 23 28 29 34 18 44 34" stroke="#173B68" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 38h20" stroke="#B88A3B" strokeWidth="1" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href) ?? false;
  };

  const isServiceActive = services.some((service) => pathname?.startsWith(service.href));

  return (
    <>
      {/* Slim contact strip with a restrained Nepal-flag colour detail */}
      <div className="relative z-[60] hidden overflow-hidden bg-[#101D32] text-white sm:block">
        <div className="absolute inset-y-0 left-0 flex w-1.5 flex-col">
          <span className="h-1/2 bg-[#B32636]" />
          <span className="h-1/2 bg-[#173B68]" />
        </div>
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-5 pl-7 text-[11px] tracking-wide lg:px-8 lg:pl-9">
          <div className="flex items-center gap-2.5 text-white/75">
            <MapPin size={12} className="text-[#D7B16D]" />
            <span>Kathmandu, Nepal</span>
            <span className="text-white/25">|</span>
            <span className="font-serif italic text-[#E4C58B]">Namaste & welcome</span>
            <span className="hidden md:inline text-white/55">— journeys shaped by the spirit of the Himalayas</span>
          </div>
          <a
            href="tel:+97714005191"
            className="flex items-center gap-2 font-semibold text-white/85 transition-colors hover:text-[#E4C58B]"
          >
            <Phone size={12} className="text-[#D7B16D]" />
            +977-1-4005191 / 4005192 / 4005193
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-[#D9C9A8]/60 bg-[#FFFEFB]/[0.97] shadow-[0_5px_24px_rgba(16,29,50,0.06)] backdrop-blur-xl">
        {/* Thin tricolour ribbon, inspired by Nepal's flag without reproducing it literally */}
        <div className="absolute inset-x-0 top-0 flex h-[3px]">
          <span className="w-[17%] bg-[#B32636]" />
          <span className="w-[20%] bg-gradient-to-r from-[#B88A3B]/70 via-[#E9D6A7] to-[#B88A3B]/70" />
          <span className="w-[10%] bg-[#173B68]" />
        </div>

        <div className="relative mx-auto flex min-h-[86px] max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:min-h-[100px] lg:px-8">
          <HimalayanDivider />

          {/* Brand block */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group relative z-10 flex min-w-0 items-center gap-2.5 focus:outline-none"
            aria-label="Kudan Travel and Tours home"
          >
            <div className="relative flex h-[58px] w-[66px] shrink-0 items-center justify-center p-1 sm:h-[66px] sm:w-[110px]">
              <img src="/logo.png" alt="Kudan Travel & Tours logo" className="h-full w-full object-contain" />
            </div>

            <div className="relative min-w-0 border-l border-[#D8C49B] pl-3.5 sm:pl-4">
              <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                <span className="font-serif text-[21px] font-bold leading-none tracking-[0.035em] text-[#0c25b0] transition-colors group-hover:text-[#A92332] sm:text-[25px] lg:text-[29px]">
                  KUDAN
                </span>
                <span className="font-serif text-[21px] font-bold leading-none tracking-tight text-[#101D32] sm:text-[25px] lg:text-[29px]">
                  TRAVEL
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-px w-5 bg-[#B88A3B]" />
                <span className="text-[8px] font-bold uppercase tracking-[0.17em] text-[#536071] sm:text-[9px] lg:text-[10px]">
                  & Tours Pvt. Ltd.
                </span>
                <span className="hidden text-[9px] text-[#A17B3E] lg:inline">•</span>
                <span className="hidden font-serif text-[10px] italic text-[#8B6A36] lg:inline">Nepal, naturally</span>
              </div>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main navigation" className="relative z-20 hidden items-center gap-0.5 xl:flex">
            <Link
              href="/"
              className={`relative px-3 py-3 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                isActive("/")
                  ? "text-[#A92332]"
                  : "text-[#29384D] hover:text-[#A92332]"
              }`}
            >
              {isActive("/") && <span className="absolute inset-x-3 bottom-1 h-px bg-[#B88A3B]" />}
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((value) => !value)}
                className={`flex items-center gap-1.5 px-3 py-3 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${
                  servicesOpen || isServiceActive ? "text-[#A92332]" : "text-[#29384D] hover:text-[#A92332]"
                }`}
              >
                Services
                <ChevronDown size={13} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              {servicesOpen && (
                <div className="absolute right-0 top-full w-[330px] pt-3">
                  <div className="overflow-hidden rounded-sm border border-[#E5D8BE] bg-[#FFFEFB] p-2 shadow-[0_18px_45px_rgba(16,29,50,0.16)]">
                    <div className="relative overflow-hidden border-b border-[#E8DEC9] px-3 pb-3 pt-2">
                      <div className="absolute inset-0 opacity-[0.10]">
                        <svg viewBox="0 0 320 70" className="h-full w-full" preserveAspectRatio="none">
                          <path d="M0 60 45 35 70 48 110 12 145 43 183 20 220 47 260 15 320 42V70H0Z" fill="#B88A3B" />
                        </svg>
                      </div>
                      <div className="relative flex items-center justify-between">
                        <div>
                          <p className="font-serif text-lg text-[#101D32]">Explore Nepal & beyond</p>
                          <p className="mt-0.5 text-[10px] tracking-wide text-[#6B7280]">Journeys thoughtfully arranged</p>
                        </div>
                        <HeritageMark />
                      </div>
                    </div>
                    <div className="grid gap-1 p-1">
                      {services.map((service) => {
                        const Icon = service.icon;
                        const active = pathname?.startsWith(service.href);
                        return (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => setServicesOpen(false)}
                            className={`group flex items-center gap-3 px-3 py-3 transition-colors hover:bg-[#F7F1E5] ${active ? "bg-[#F7F1E5]" : ""}`}
                          >
                            <span className={`flex h-9 w-9 shrink-0 items-center justify-center border ${service.accent}`}>
                              <Icon size={16} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-xs font-bold text-[#18283F]">{service.name}</span>
                              <span className="mt-1 block text-[10px] text-[#687386]">{service.description}</span>
                            </span>
                            <ArrowUpRight size={14} className="text-[#B88A3B] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-3 text-[11px] font-bold uppercase tracking-[0.10em] transition-colors ${
                  isActive(link.href) ? "text-[#A92332]" : "text-[#29384D] hover:text-[#A92332]"
                }`}
              >
                {isActive(link.href) && <span className="absolute inset-x-3 bottom-1 h-px bg-[#B88A3B]" />}
                {link.name}
              </Link>
            ))}

            <Link
              href="/contact-us"
              className="ml-3 inline-flex items-center gap-2 border border-[#101D32] bg-[#101D32] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-all hover:border-[#A92332] hover:bg-[#A92332]"
            >
              <Compass size={14} className="text-[#E4C58B]" />
              Plan a Trip
            </Link>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            className="relative z-20 flex h-10 w-10 shrink-0 items-center justify-center border border-[#D8C49B] bg-white text-[#101D32] transition-colors hover:border-[#A92332] hover:text-[#A92332] xl:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Tiny prayer-flag-inspired colour markers along the bottom edge */}
        <div aria-hidden="true" className="flex h-[3px] w-full opacity-70">
          <span className="w-1/5 bg-[#173B68]" />
          <span className="w-1/5 bg-[#B32636]" />
          <span className="w-1/5 bg-[#B88A3B]" />
          <span className="w-1/5 bg-[#38564A]" />
          <span className="w-1/5 bg-[#7C8798]" />
        </div>

        {/* Mobile navigation */}
        {open && (
          <div className="relative z-30 border-t border-[#E5D8BE] bg-[#FFFEFB] px-5 pb-6 pt-4 shadow-[0_18px_35px_rgba(16,29,50,0.13)] xl:hidden">
            <div className="mb-4 flex items-center gap-3 border-b border-[#E8DEC9] pb-4">
              <HeritageMark />
              <div>
                <p className="font-serif text-base text-[#101D32]">Namaste, welcome to Nepal</p>
                <p className="mt-1 text-[10px] tracking-wide text-[#687386]">Discover a journey beyond the ordinary</p>
              </div>
            </div>
            <nav aria-label="Mobile navigation" className="flex flex-col">
              <Link href="/" onClick={() => setOpen(false)} className={`border-b border-[#EEE6D8] py-3 text-sm font-semibold ${isActive("/") ? "text-[#A92332]" : "text-[#25344A]"}`}>Home</Link>
              <p className="pb-1 pt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9B6B22]">Travel services</p>
              {services.map((service) => (
                <Link key={service.href} href={service.href} onClick={() => setOpen(false)} className={`border-b border-[#EEE6D8] py-3 pl-2 text-sm font-medium ${pathname?.startsWith(service.href) ? "text-[#A92332]" : "text-[#25344A]"}`}>
                  {service.name}
                  <span className="mt-1 block text-[10px] font-normal text-[#7B8492]">{service.description}</span>
                </Link>
              ))}
              <p className="pb-1 pt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9B6B22]">Company</p>
              {navLinks.slice(1).map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={`border-b border-[#EEE6D8] py-3 text-sm font-medium ${isActive(link.href) ? "text-[#A92332]" : "text-[#25344A]"}`}>
                  {link.name}
                </Link>
              ))}
              <Link href="/contact-us" onClick={() => setOpen(false)} className="mt-5 flex items-center justify-center gap-2 bg-[#101D32] px-4 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#A92332]">
                <Compass size={15} className="text-[#E4C58B]" />
                Plan a Trip
              </Link>
            </nav>
            <a href="tel:+97714005191" className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#536071]">
              <Phone size={13} className="text-[#A92332]" />
              +977-1-4005191
            </a>
          </div>
        )}
      </header>
    </>
  );
}