"use client";

import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import InquiryForm from "@/components/InquiryForm";
import { 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard, 
  QrCode, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  LucideIcon,
  X,
  Smartphone
} from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}

export default function Contact() {
  const [activeQrModal, setActiveQrModal] = useState<"fonepay" | "esewa" | null>(null);

  return (
    <div className="bg-[#060910] text-slate-100 min-h-screen font-sans">
      {/* ---------------------------------------------------- */}
      {/* HERO SECTION                                         */}
      {/* ---------------------------------------------------- */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-[#0d1322] via-[#080c16] to-[#060910] py-24">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

        <div className="container-x relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/50 bg-[#111827] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#E5C158] shadow-md">
            <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
            <span>Let's Plan It</span>
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Contact <span className="bg-gradient-to-r from-[#F5D880] via-[#C5A059] to-[#A07D32] bg-clip-text text-transparent">Kudan</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200">
            Need help planning your trip or booking a tour? Our team is ready to assist you. A destination, rough dates, and group size are enough to start.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* MAIN CONTENT: DETAILS + FORM                         */}
      {/* ---------------------------------------------------- */}
      <section className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          
          {/* LEFT SIDEBAR: Contact Details & Live Standard Google Map */}
          <aside className="space-y-5">
            
            {/* Office Location */}
            <InfoCard icon={MapPin} title="Office Location">
              <p className="text-xs font-semibold text-slate-200 leading-relaxed">
                Uttar Dhoka, Metro Park Building, Lazimpat / Nagpokhari Marg, Kathmandu, Nepal.
              </p>
            </InfoCard>

            {/* Phone Lines */}
            <InfoCard icon={Phone} title="Phones">
              <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-semibold text-slate-200">
                <a href="tel:+977014005191" className="hover:text-amber-300 transition-colors">+977-01-4005191</a>
                <a href="tel:+977014005192" className="hover:text-amber-300 transition-colors">+977-01-4005192</a>
                <a href="tel:+977014005193" className="hover:text-amber-300 transition-colors">+977-01-4005193</a>
                <a href="tel:+977014005194" className="hover:text-amber-300 transition-colors">+977-01-4005194</a>
                <a href="tel:+977014005195" className="hover:text-amber-300 transition-colors">+977-01-4005195</a>
              </div>
            </InfoCard>

            {/* Email Departments */}
            <InfoCard icon={Mail} title="Email Contacts">
              <div className="mt-2 space-y-3 text-xs">
                <div>
                  <span className="block font-bold uppercase tracking-wider text-[#E5C158] text-[10px]">General & Executive</span>
                  <div className="mt-0.5 space-x-2 text-slate-200">
                    <a href="mailto:info@kudantravel.com" className="hover:text-amber-300">aatma_sl@hotmail.com</a>
                     <span>•</span>
                    <a href="mailto:md@kudantravel.com" className="hover:text-amber-300">md@kudantravel.com</a>
                  </div>
                </div>

                <div>
                  <span className="block font-bold uppercase tracking-wider text-[#E5C158] text-[10px]">Regional Desks</span>
                  <div className="mt-0.5 space-x-2 text-slate-200">
                    <a href="mailto:asia@kudantravel.com" className="hover:text-amber-300">asia@kudantravel.com</a>
                    <span>•</span>
                    <a href="mailto:japan@kudantravel.com" className="hover:text-amber-300">japan@kudantravel.com</a>
                    <span>•</span>
                    <a href="mailto:krishna@kudantravel.com" className="hover:text-amber-300">krishna@kudantravel.com</a>
                  </div>
                </div>

                <div>
                  <span className="block font-bold uppercase tracking-wider text-[#E5C158] text-[10px]">Reservations & Inquiries</span>
                  <div className="mt-0.5 space-x-2 text-slate-200">
                    <a href="mailto:kamal@kudantravel.com" className="hover:text-amber-300">kamal@kudantravel.com</a>
                    <span>•</span>
                    <a href="mailto:naisha@kudantravel.com" className="hover:text-amber-300">naisha@kudantravel.com</a>
                     <span>•</span>
                    <a href="mailto:info@kudantravel.com" className="hover:text-amber-300">info@kudantravel.com</a>
                    
                  </div>
                </div>

                <div>
                  <span className="block font-bold uppercase tracking-wider text-[#E5C158] text-[10px]">Accounts & Finance</span>
                  <div className="mt-0.5 space-x-2 text-slate-200">
                    <a href="mailto:accounts@kudantravel.com" className="hover:text-amber-300">accounts@kudantravel.com</a>
                    <span>•</span>
                    <a href="mailto:finance@kudantravel.com" className="hover:text-amber-300">finance@kudantravel.com</a>
                    <span>•</span>
                    <a href="mailto:dipen@kudantravel.com" className="hover:text-amber-300">dipen@kudantravel.com</a>
                  </div>
                </div>
              </div>
            </InfoCard>

            {/* FULL-COLOR GOOGLE MAP EMBED */}
            <div className="overflow-hidden rounded-2xl border border-slate-700/80 bg-[#111827] p-2 shadow-xl">
              <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-800">
                <iframe
                  title="Kudan Travel Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.062402128913!2d85.31758537624911!3d27.715344324460593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb191d84a7e781%3A0xb1fb6310df666ffb!2sMetro%20Park%20Building%2C%20Nagpokhari%20Marg%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </div>

              {/* Direct Link Button below map */}
              <div className="p-3 text-center">
                <a
                  href="https://maps.app.goo.gl/izX9MkeMYv57WBs6A"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Kudan Travel location in Google Maps (opens in new tab)"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#C5A059] px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-950 hover:bg-amber-300 transition-colors shadow-md"
                >
                  <span>Open Full Screen in Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

          </aside>

          {/* RIGHT SIDE: INQUIRY FORM */}
          <div className="rounded-2xl border border-slate-700/80 bg-[#111827] p-6 sm:p-9 shadow-xl">
            <SectionTitle
              eyebrow="Quick Inquiry"
              title="Build My Itinerary"
              copy="Your details stay with our travel team and will be connected directly to our reservation desk."
            />
            <div className="mt-8">
              <InquiryForm />
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* PAYMENT OPTIONS                                      */}
      {/* ---------------------------------------------------- */}
      <section className="border-t border-slate-800 bg-[#080c16] py-20">
        <div className="container-x">
          <SectionTitle
            eyebrow="Payments"
            title="Secure Payment Options"
            copy="Official payment handles for instant tour reservations and deposits."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            
            {/* FONEPAY / QR CARD */}
            <div className="rounded-2xl border border-slate-700/80 bg-[#111827] p-7 shadow-xl hover:border-[#C5A059] transition-all flex flex-col justify-between">
              <div>
                <div className="inline-flex rounded-xl border border-[#C5A059] bg-[#060910] p-3 text-[#E5C158]">
                  <QrCode className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-black text-white">Fonepay / Dynamic QR</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-200">
                  Instant Nepalese bank transfer via direct QR scan. Accepts all mobile banking apps.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveQrModal("fonepay")}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/40 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#E5C158] hover:bg-[#C5A059] hover:text-slate-950 transition-all"
                >
                  <QrCode className="h-4 w-4" />
                  <span>View Official QR Code</span>
                </button>
              </div>
            </div>

            {/* ESEWA WALLET CARD */}
            <div className="rounded-2xl border border-slate-700/80 bg-[#111827] p-7 shadow-xl hover:border-[#C5A059] transition-all flex flex-col justify-between">
              <div>
                <div className="inline-flex rounded-xl border border-[#C5A059] bg-[#060910] p-3 text-[#E5C158]">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-black text-white">eSewa Wallet</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-200">
                  Direct digital wallet transfers to official Kudan Travel account.
                </p>
                <div className="mt-4 rounded-xl bg-[#060910] border border-slate-800 p-3">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#E5C158]">Registered eSewa ID</span>
                  <span className="mt-0.5 block text-lg font-black tracking-wider text-white">9851067097</span>
                  <span className="text-[11px] font-medium text-slate-400">Account: Kudan Travel & Tours</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveQrModal("esewa")}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:border-[#C5A059] hover:text-white transition-all"
                >
                  <QrCode className="h-4 w-4" />
                  <span>Scan QR Code</span>
                </button>
              </div>
            </div>

            {/* VISA / MASTERCARD CARD */}
            <div className="rounded-2xl border border-slate-700/80 bg-[#111827] p-7 shadow-xl hover:border-[#C5A059] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="inline-flex rounded-xl border border-[#C5A059] bg-[#060910] p-3 text-[#E5C158]">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#E5C158]">
                    Integration Pending
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black text-white">Visa / Mastercard</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-200">
                  Secure international credit/debit card gateway. Direct online processing integration is currently under development.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-[#C5A059]" />
                  <span>Bank invoice links issued via email upon request</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* INTERACTIVE QR CODE MODAL                            */}
      {/* ---------------------------------------------------- */}
      {activeQrModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveQrModal(null)}
        >
          <div 
            className="relative w-full max-w-sm rounded-3xl border border-[#C5A059]/40 bg-[#111827] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveQrModal(null)}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-full border border-slate-700 bg-slate-900 p-2 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-widest text-[#E5C158]">
                {activeQrModal === "fonepay" ? "Fonepay Merchant QR" : "eSewa Direct Payment"}
              </span>
              <h3 className="mt-1 text-xl font-black text-white">Kudan Travel & Tours</h3>
              <p className="mt-1 text-xs text-slate-400">Scan using your mobile banking or eSewa app</p>

              <div className="mt-6 flex justify-center rounded-2xl border border-slate-700 bg-white p-4 shadow-inner">
                <img
                  src="/QR.png"
                  alt="Kudan Travel Payment QR Code"
                  className="h-64 w-64 object-contain"
                />
              </div>

              {activeQrModal === "esewa" && (
                <div className="mt-4 rounded-xl bg-[#060910] border border-slate-800 p-3 text-center">
                  <span className="text-xs text-slate-400">eSewa Mobile Number</span>
                  <p className="text-base font-black text-[#E5C158]">9851067097</p>
                </div>
              )}

              <button
                type="button"
                onClick={() => setActiveQrModal(null)}
                className="mt-6 w-full rounded-xl bg-[#C5A059] py-3 text-xs font-black uppercase tracking-wider text-slate-950 hover:bg-amber-300 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ icon: Icon, title, children }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-slate-700/80 bg-[#111827] p-5 shadow-xl hover:border-[#C5A059] transition-all">
      <div className="flex gap-4">
        <div className="rounded-xl border border-[#C5A059] bg-[#060910] p-3 text-[#E5C158] shrink-0 h-fit">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-bold text-white">{title}</h3>
          <div className="mt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}