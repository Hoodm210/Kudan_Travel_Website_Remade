"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  QrCode,
  Smartphone,
  CreditCard,
  X,
  Copy,
  Check,
} from "lucide-react";

export default function Footer() {
  const [activeModal, setActiveModal] = useState<"fonepay" | "esewa" | "card" | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEsewa = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("9851067097");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <footer className="relative z-10 border-t border-slate-800 bg-slate-900 text-slate-100 shadow-xl">
        {/* Gold Top Highlight Line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

        <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Column */}
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative p-2 rounded-xl bg-white border border-slate-200 shadow-md">
                <img
                  src="/logo.png"
                  alt="Kudan Travel Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <span className="leading-tight">
                <strong className="block text-xl font-black tracking-tight text-white">
                  KUDAN
                </strong>
                <small className="block text-[8px] font-black tracking-[.25em] text-[#D4AF37]">
                  TRAVEL & TOURS
                </small>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-300 font-normal">
              Your trusted travel partner for authentic Nepal experiences, international holidays, trekking, transportation, and customized group journeys.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-slate-300 shadow-sm transition-all duration-300 hover:border-[#D4AF37] hover:bg-slate-700 hover:text-[#D4AF37] active:scale-95"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-300">
              {[
                { name: "Outbound Tours", href: "/outbound-tours" },
                { name: "Inbound Nepal", href: "/inbound" },
                { name: "Vehicles & Transport", href: "/transportation" },
                { name: "Gallery", href: "/gallery" },
                { name: "Achievements", href: "/achievements" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 transition-all duration-200 hover:text-[#D4AF37] hover:translate-x-1"
                  >
                    <ArrowUpRight size={14} className="text-[#D4AF37]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              Contact Us
            </h3>
            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-slate-800 p-2 border border-slate-700 shrink-0 text-[#D4AF37]">
                  <MapPin size={16} />
                </div>
                <p className="leading-snug">Uttar Dhoka, Metro Park Building, Lazimpat / Nagpokhari Marg, Kathmandu, Nepal.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-800 p-2 border border-slate-700 shrink-0 text-[#D4AF37]">
                  <Phone size={16} />
                </div>
                <p className="font-bold text-white">+977-1-4005191 / 4005192</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-800 p-2 border border-slate-700 shrink-0 text-[#D4AF37]">
                  <Mail size={16} />
                </div>
                <p className="text-white font-medium">info@kudantravel.com</p>
              </div>
            </div>
          </div>

          {/* Payment Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#D4AF37]" />
              Secure Payments
            </h3>
            <p className="mt-5 text-xs leading-relaxed text-slate-300">
              Click any payment channel below to access instant QR codes, registered eSewa IDs, or bank invoice options.
            </p>

            {/* Interactive Payment Badges */}
            <div className="mt-5 grid grid-cols-2 gap-2.5 text-center text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveModal("esewa")}
                className="rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-slate-200 shadow-sm transition-all hover:border-[#D4AF37] hover:bg-slate-750 hover:text-white flex items-center justify-center gap-1.5"
              >
                <Smartphone size={14} className="text-[#D4AF37]" />
                <span>eSewa</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal("fonepay")}
                className="rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-slate-200 shadow-sm transition-all hover:border-[#D4AF37] hover:bg-slate-750 hover:text-white flex items-center justify-center gap-1.5"
              >
                <QrCode size={14} className="text-[#D4AF37]" />
                <span>Fonepay</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal("card")}
                className="rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-slate-200 shadow-sm transition-all hover:border-[#D4AF37] hover:bg-slate-750 hover:text-white flex items-center justify-center gap-1.5"
              >
                <CreditCard size={14} className="text-[#D4AF37]" />
                <span>VISA</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal("card")}
                className="rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-slate-200 shadow-sm transition-all hover:border-[#D4AF37] hover:bg-slate-750 hover:text-white flex items-center justify-center gap-1.5"
              >
                <CreditCard size={14} className="text-[#D4AF37]" />
                <span>Mastercard</span>
              </button>
            </div>
          </div>

        </div>

        {/* Sub-Footer Bottom Bar */}
        <div className="border-t border-slate-800 bg-slate-950 py-5">
          <div className="container-x flex flex-col gap-3 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Kudan Travel & Tours Pvt. Ltd. All rights reserved.</span>
            <div className="flex flex-wrap gap-4 font-medium text-slate-400">
              <Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Us</Link>
              <span>•</span>
              <span className="text-slate-300">NATTA Member</span>
              <span>•</span>
              <span className="text-slate-300">TAAN Member</span>
            </div>
          </div>
        </div>
      </footer>

      {/* DYNAMIC PAYMENT MODAL */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl border border-[#D4AF37]/40 bg-slate-900 p-6 shadow-2xl text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-full border border-slate-700 bg-slate-800 p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            {/* Modal Content: Fonepay */}
            {activeModal === "fonepay" && (
              <div className="text-center">
                <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">
                  Fonepay Merchant QR
                </span>
                <h3 className="mt-1 text-xl font-black text-white">Kudan Travel & Tours</h3>
                <p className="mt-1 text-xs text-slate-400">Scan using any Nepalese Mobile Banking app</p>

                <div className="mt-5 flex justify-center rounded-2xl border border-slate-700 bg-white p-4 shadow-inner">
                  <img
                    src="/QR.png"
                    alt="Kudan Travel Fonepay QR Code"
                    className="h-60 w-60 object-contain"
                  />
                </div>
              </div>
            )}

            {/* Modal Content: eSewa */}
            {activeModal === "esewa" && (
              <div className="text-center">
                <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">
                  eSewa Direct Payment
                </span>
                <h3 className="mt-1 text-xl font-black text-white">Kudan Travel & Tours</h3>
                <p className="mt-1 text-xs text-slate-400">Transfer funds directly via eSewa ID or QR</p>

                <div className="mt-5 flex justify-center rounded-2xl border border-slate-700 bg-white p-4 shadow-inner">
                  <img
                    src="/QR.png"
                    alt="Kudan Travel eSewa QR Code"
                    className="h-52 w-52 object-contain"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-950 border border-slate-800 p-3 text-left">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400">eSewa ID</span>
                    <strong className="text-base font-black text-[#D4AF37]">9851067097</strong>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEsewa}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs font-bold text-slate-200 hover:border-[#D4AF37]"
                  >
                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Modal Content: Cards */}
            {activeModal === "card" && (
              <div className="text-center py-2">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
                  <CreditCard size={24} />
                </div>
                <span className="mt-4 block text-xs font-black uppercase tracking-widest text-[#D4AF37]">
                  International Card Payments
                </span>
                <h3 className="mt-1 text-xl font-black text-white">VISA & Mastercard</h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-300">
                  Online card gateway integration is currently being processed. For international deposits, our team generates direct bank invoice payment links upon reservation request.
                </p>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    onClick={() => setActiveModal(null)}
                    className="block w-full rounded-xl bg-[#D4AF37] py-3 text-xs font-black uppercase tracking-wider text-slate-950 hover:bg-amber-300 transition-colors"
                  >
                    Request Invoice via Contact Page
                  </Link>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}