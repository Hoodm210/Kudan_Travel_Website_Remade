"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Compass,
  Globe2,
  MapPin,
  Calendar,
  Star,
  ArrowRight,
  Quote,
  CheckCircle2,
  ExternalLink,
  Handshake,
  Briefcase,
} from "lucide-react";

export interface Tour {
  id: string;
  slug: string;
  title: string;
  locations: string;
  duration: string;
  price: string;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  path?: string;
}

const INBOUND_TOURS: Tour[] = [
  {
    id: "ktm-bandipur-pokhara-nagarkot",
    slug: "ktm-bandipur-pokhara-nagarkot",
    title: "Kathmandu, Bandipur & Pokhara Heritage",
    locations: "Kathmandu • Bandipur • Pokhara",
    duration: "7N / 8D",
    price: "NPR 58,000",
    rating: 4.9,
    reviewsCount: 124,
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=90",
    badge: "Best Seller",
  },
  {
    id: "ebc-trek",
    slug: "ebc-trek",
    title: "Everest Base Camp & Kala Patthar Expedition",
    locations: "Lukla • Namche • Gorakshep • EBC",
    duration: "13N / 14D",
    price: "NPR 115,000",
    rating: 5.0,
    reviewsCount: 98,
    image:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=90",
    badge: "Trekking",
  },
  {
    id: "10-days-nepal-bhutan-tour",
    slug: "10-days-nepal-bhutan-tour",
    title: "Nepal & Bhutan Kingdom Journey",
    locations: "Kathmandu • Thimphu • Paro",
    duration: "9N / 10D",
    price: "NPR 185,000",
    rating: 4.8,
    reviewsCount: 65,
    image:
      "https://images.unsplash.com/photo-1585869110973-7280be312084?auto=format&fit=crop&w=1200&q=90",
    badge: "Special",
  },
];

const OUTBOUND_TOURS: Tour[] = [
  {
    id: "thailand-express",
    slug: "thailand-express",
    title: "Essential Thailand (Bangkok & Pattaya)",
    locations: "Bangkok • Pattaya • Coral Island",
    duration: "4N / 5D",
    price: "NPR 65,000",
    rating: 4.7,
    reviewsCount: 210,
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=90",
    badge: "Best Seller",
  },
  {
    id: "dubai-desert-safari",
    slug: "dubai-desert-safari",
    title: "Dubai Glitz & Desert Safari",
    locations: "Dubai • Abu Dhabi • Desert Camp",
    duration: "5N / 6D",
    price: "NPR 110,000",
    rating: 4.9,
    reviewsCount: 180,
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=90",
    badge: "Trending",
  },
  {
    id: "bali-tropical-escape",
    slug: "bali-tropical-escape",
    title: "Bali Island & Culture Getaway",
    locations: "Ubud • Kuta • Nusa Penida",
    duration: "5N / 6D",
    price: "NPR 85,000",
    rating: 4.9,
    reviewsCount: 142,
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=90",
    badge: "Island",
  },
];

const REVIEWS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    country: "United Kingdom",
    role: "International Group Leader",
    comment:
      "The entire journey was impeccably organized. From airport pickups to our trekking logistics, every detail was handled with highest professional standard.",
    rating: 5,
    package: "Ghorepani Poon Hill Trek",
  },
  {
    id: 2,
    name: "Dr. Rajesh Sharma",
    country: "Nepal",
    role: "Corporate Travel Director",
    comment:
      "Outstanding corporate service. Their outbound booking management for Thailand and Dubai spared our organization all administrative hassle.",
    rating: 5,
    package: "Essential Thailand Package",
  },
  {
    id: 3,
    name: "Michael & Elena Vance",
    country: "Australia",
    role: "Himalayan Expedition Guests",
    comment:
      "Warm hospitality, highly skilled guides, and transparent pricing. You can immediately notice their institutional experience.",
    rating: 5,
    package: "Everest Base Camp Trek",
  },
];

export default function CorporateLandingSection() {
  const [activeTab, setActiveTab] = useState<"inbound" | "outbound">("inbound");
  const currentTours = activeTab === "inbound" ? INBOUND_TOURS : OUTBOUND_TOURS;

  // Resolves routes accurately based on your exact file directory structure
  const getTourHref = (tour: Tour) => {
    if (tour.path) return tour.path;
    const isOutbound = OUTBOUND_TOURS.some((t) => t.id === tour.id);
    return isOutbound ? `/outbound-tours/${tour.slug}` : `/inbound/${tour.slug}`;
  };

  const getCategoryOverviewHref = () => {
    return activeTab === "inbound" ? "/inbound" : "/outbound-tours";
  };

  return (
    <div className="bg-[#070A11] text-slate-100 font-sans selection:bg-[#D4AF37] selection:text-slate-950">
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-slate-800/80 py-24 lg:py-36 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85 filter contrast-105 brightness-110"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=2560&q=95')`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#070A11]/45 via-[#070A11]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A11]/50 via-transparent to-[#070A11]/20" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/60 backdrop-blur-md px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/40 mb-6 shadow-2xl">
                <Building2 size={16} />
                <span>Premier B2B Partner & Top Travel Operator</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-lg">
                Nepal's Premier <span className="text-[#D4AF37]">B2B & Inbound</span> Tour Operator.
              </h1>

              <p className="mt-5 text-sm sm:text-base text-slate-100 leading-relaxed max-w-2xl drop-shadow-md font-medium">
                We are a top-tier DMC and leading seller for inbound Himalayan expeditions and international outbound tours in Nepal. Partnering with global travel agencies and corporate leaders, we provide ground handling, wholesale group rates, and customized itineraries.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-700/50 pt-6 backdrop-blur-sm rounded-xl px-2 bg-slate-950/30">
                <div>
                  <span className="block text-3xl font-black text-white drop-shadow">14+</span>
                  <span className="text-xs text-slate-200 font-semibold">Years Experience</span>
                </div>
                <div>
                  <span className="block text-3xl font-black text-white drop-shadow">500+</span>
                  <span className="text-xs text-slate-200 font-semibold">B2B Agency Partners</span>
                </div>
                <div>
                  <span className="block text-3xl font-black text-white drop-shadow">100%</span>
                  <span className="text-xs text-slate-200 font-semibold">Licensed Operations</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950/60 rounded-3xl border border-slate-700/60 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="text-[#D4AF37]" size={20} />
                <span>Why Travel Partners & Clients Choose Us</span>
              </h3>

              <div className="space-y-4 text-xs text-slate-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold text-sm">Best-Selling Itineraries</strong>
                    Proven, top-rated Nepal trekking and international outbound packages for maximum traveler satisfaction.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold text-sm">B2B Ground Handling & Contracting</strong>
                    Exclusive wholesale agent rates, transparent cost structures, and white-label ground support.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold text-sm">24/7 Dedicated Operations</strong>
                    Personalized advisory, seamless visa processing, and end-to-end ground coordination.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 rounded-2xl border border-[#D4AF37]/40 bg-gradient-to-r from-slate-950/60 via-slate-900/60 to-slate-950/60 p-6 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                <Handshake size={24} />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                  Travel Trade & Travel Agencies
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Looking for a Reliable B2B Inbound Partner in Nepal?
                </h3>
                <p className="text-xs text-slate-200 mt-1">
                  We offer competitive agent tariffs, white-label ground execution, and fast response times for international agencies and group leaders.
                </p>
              </div>
            </div>

            <Link
              href="/b2b-partner"
              className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-slate-950 hover:bg-[#c3a030] font-bold text-xs transition-all shadow-lg hover:scale-105 shrink-0 flex items-center gap-2"
            >
              <Briefcase size={15} />
              <span>Partner With Us (B2B Rates)</span>
            </Link>
          </div>

          {/* ACCREDITATIONS */}
          <div className="mt-16 pt-12 border-t border-slate-700/50">
            <div className="text-center mb-8">
              <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">
                Official Accreditations
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1 drop-shadow">
                Recognized & Certified by Leading Tourism Bodies
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              <a
                href="https://natta.org.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-2xl border border-slate-700/60 bg-slate-950/60 backdrop-blur-md hover:border-[#D4AF37]/80 transition-all p-6 flex flex-col items-center justify-center text-center group shadow-xl hover:bg-slate-900/80 cursor-pointer"
              >
                <ExternalLink size={14} className="absolute top-4 right-4 text-slate-400 group-hover:text-[#D4AF37] transition-colors" />
                <div className="h-24 w-full flex items-center justify-center p-2">
                  <img
                    src="/natta.png"
                    alt="NATTA Logo"
                    className="max-h-50 max-w-[200px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <div className="hidden flex-col items-center">
                    <span className="text-2xl font-black text-white tracking-widest">NATTA</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800/80 w-full">
                  <strong className="text-xs font-bold text-slate-200 block group-hover:text-[#D4AF37] transition-colors">NATTA Member</strong>
                  <span className="text-[11px] text-slate-300">Nepal Association of Tour & Travel Agents</span>
                </div>
              </a>

              <a
                href="https://www.taan.org.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-2xl border border-slate-700/60 bg-slate-950/60 backdrop-blur-md hover:border-[#D4AF37]/80 transition-all p-6 flex flex-col items-center justify-center text-center group shadow-xl hover:bg-slate-900/80 cursor-pointer"
              >
                <ExternalLink size={14} className="absolute top-4 right-4 text-slate-400 group-hover:text-[#D4AF37] transition-colors" />
                <div className="h-24 w-full flex items-center justify-center p-2">
                  <img
                    src="/taan.png"
                    alt="TAAN Logo"
                    className="max-h-50 max-w-[200px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <div className="hidden flex-col items-center">
                    <span className="text-2xl font-black text-white tracking-widest">TAAN</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800/80 w-full">
                  <strong className="text-xs font-bold text-slate-200 block group-hover:text-[#D4AF37] transition-colors">TAAN Executive Member</strong>
                  <span className="text-[11px] text-slate-300">Trekking Agencies' Association of Nepal</span>
                </div>
              </a>

              <a
                href="https://ntb.gov.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-2xl border border-slate-700/60 bg-slate-950/60 backdrop-blur-md hover:border-[#D4AF37]/80 transition-all p-6 flex flex-col items-center justify-center text-center group shadow-xl hover:bg-slate-900/80 cursor-pointer"
              >
                <ExternalLink size={14} className="absolute top-4 right-4 text-slate-400 group-hover:text-[#D4AF37] transition-colors" />
                <div className="h-30 w-full flex items-center justify-center p-2">
                  <img
                    src="/ntb.png"
                    alt="Nepal Tourism Board Logo"
                    className="max-h-100 max-w-[100px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                  <div className="hidden flex-col items-center">
                    <span className="text-2xl font-black text-white tracking-widest">NTB</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-800/80 w-full">
                  <strong className="text-xs font-bold text-slate-200 block group-hover:text-[#D4AF37] transition-colors">NTB Licensed Operator</strong>
                  <span className="text-[11px] text-slate-300">Government of Nepal Tourism Board</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PACKAGES SHOWCASE */}
      <section className="relative py-20 border-b border-slate-800/80 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-800/80 pb-5">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37]">
                Best Seller & Trending Packages
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Featured Tour Packages
              </h2>
            </div>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
              <button
                onClick={() => setActiveTab("inbound")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "inbound"
                    ? "bg-[#D4AF37] text-slate-950 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Compass size={14} />
                <span>Inbound Nepal</span>
              </button>
              <button
                onClick={() => setActiveTab("outbound")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "outbound"
                    ? "bg-[#D4AF37] text-slate-950 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Globe2 size={14} />
                <span>Outbound International</span>
              </button>
            </div>
          </div>

          <div className="space-y-3.5">
            {currentTours.map((tour) => (
              <Link
                key={tour.id}
                href={getTourHref(tour)}
                className="group flex flex-col md:flex-row items-stretch rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-3 hover:border-[#D4AF37]/50 transition-all duration-200 hover:bg-slate-900/90 shadow-md gap-4"
              >
                <div className="relative h-40 md:h-24 md:w-40 shrink-0 rounded-xl overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {tour.badge && (
                    <span className="absolute top-2 left-2 rounded-md bg-slate-950/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-[#D4AF37] border border-slate-700/50">
                      {tour.badge}
                    </span>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 mb-1">
                    <span className="flex items-center gap-1 text-[#D4AF37] font-bold">
                      <MapPin size={12} />
                      <span className="truncate">{tour.locations}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 shrink-0">
                      <Calendar size={12} />
                      {tour.duration}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors truncate">
                    {tour.title}
                  </h3>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-slate-800/80 pt-3 md:pt-0 md:pl-6 shrink-0 gap-2">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span>{tour.rating}</span>
                    <span className="text-[10px] text-slate-500 font-normal">({tour.reviewsCount})</span>
                  </div>

                  <div className="flex items-center md:flex-col md:items-end gap-2 md:gap-0">
                    <span className="text-[10px] text-slate-500 uppercase font-bold hidden md:block">Starting From</span>
                    <span className="text-base font-black text-[#D4AF37]">{tour.price}</span>
                  </div>

                  <div className="text-xs font-bold text-slate-300 group-hover:text-white flex items-center gap-1 transition-colors">
                    <span>View Itinerary</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href={getCategoryOverviewHref()}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:underline"
            >
              <span>Explore All {activeTab === "inbound" ? "Inbound Nepal" : "Outbound"} Packages</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. REVIEWS & TESTIMONIALS */}
      <section className="relative py-24 bg-slate-950 overflow-hidden border-b border-slate-800/80">
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center pointer-events-none filter brightness-110 contrast-110"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2560&q=95')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A11] via-[#070A11]/20 to-[#070A11]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400" />
              ))}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white drop-shadow">
              Trusted by Travel Agents & Guests
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium">
              Read authentic feedback from individual travelers, families, and international agency partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="rounded-2xl border border-slate-700/60 bg-slate-950/65 backdrop-blur-md p-6 flex flex-col justify-between relative shadow-2xl"
              >
                <Quote size={28} className="text-[#D4AF37]/30 absolute top-4 right-4" />

                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed italic font-medium">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <strong className="block text-sm font-bold text-white">{rev.name}</strong>
                  <span className="text-[11px] text-slate-400 block">{rev.role} • {rev.country}</span>
                  <span className="mt-2 inline-block rounded-md bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-[#D4AF37] border border-slate-700/50">
                    Booked: {rev.package}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}