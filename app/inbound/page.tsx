"use client";

import { useState } from "react";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { MapPin, Calendar, Tag, Compass, ArrowRight } from "lucide-react";

interface TourItem {
  id: string;
  slug: string;
  category: "cultural" | "trekking" | "wildlife" | "adventure";
  title: string;
  locations: string;
  duration: string;
  price: string;
  image: string;
  badge?: string;
}

const INBOUND_TOURS: TourItem[] = [
  // --- CULTURAL & HERITAGE TOURS ---
  {
    id: "ktm-bandipur-pokhara-nagarkot",
    slug: "ktm-bandipur-pokhara-nagarkot",
    category: "cultural",
    title: "7N/8D Kathmandu, Bandipur, Pokhara & Nagarkot Heritage",
    locations: "Kathmandu • Bandipur • Pokhara • Nagarkot • Bhaktapur",
    duration: "7N / 8D",
    price: "NPR 58,000",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    badge: "Heritage",
  },
  {
    id: "10-days-nepal-bhutan-tour",
    slug: "10-days-nepal-bhutan-tour",
    category: "cultural",
    title: "10 Days Ultimate Nepal & Bhutan Himalayan Kingdom Tour",
    locations: "Kathmandu • Thimphu • Punakha • Paro • Nagarkot",
    duration: "9N / 10D",
    price: "NPR 185,000",
    image: "https://images.unsplash.com/photo-1585869110973-7280be312084?auto=format&fit=crop&w=800&q=80",
    badge: "Special",
  },
  {
    id: "10-days-nepal-tour",
    slug: "10-days-nepal-tour",
    category: "cultural",
    title: "10 Days Grand Nepal Cultural & Spiritual Circuit",
    locations: "Kathmandu • Bandipur • Pokhara • Lumbini • Nagarkot",
    duration: "9N / 10D",
    price: "NPR 82,000",
    image: "https://images.unsplash.com/photo-1540411608474-4325bbd12869?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
  },
  {
    id: "kathmandu-valley-cultural-tour",
    slug: "kathmandu-valley-cultural-tour",
    category: "cultural",
    title: "Kathmandu Valley Cultural Heritage",
    locations: "Kathmandu • Bhaktapur • Patan",
    duration: "3N / 4D",
    price: "NPR 25,000",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    badge: "Short Tour",
  },

  // --- TREKKING & HIKING ITINERARIES ---
  {
    id: "ebc-trek",
    slug: "ebc-trek",
    category: "trekking",
    title: "14 Days Everest Base Camp & Kala Patthar Expedition",
    locations: "Lukla • Namche Bazaar • Tengboche • Gorakshep • EBC",
    duration: "13N / 14D",
    price: "NPR 115,000",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80",
    badge: "Bucket List",
  },
  {
    id: "annapurna-circuit",
    slug: "annapurna-circuit",
    category: "trekking",
    title: "12 Days Annapurna Circuit & Thorong La Pass Trek",
    locations: "Besisahar • Manang • Thorong La Pass • Muktinath • Pokhara",
    duration: "11N / 12D",
    price: "NPR 88,000",
    image: "https://images.unsplash.com/photo-1585864970145-325863508113?auto=format&fit=crop&w=800&q=80",
    badge: "Adventure",
  },
  {
    id: "annapurna-base-camp-trek",
    slug: "annapurna-base-camp-trek",
    category: "trekking",
    title: "10 Days Annapurna Base Camp & Sanctuary Trek",
    locations: "Pokhara • Ghandruk • Chhomrong • ABC (4,130m)",
    duration: "9N / 10D",
    price: "NPR 65,000",
    image: "https://images.unsplash.com/photo-1585869110973-7280be312084?auto=format&fit=crop&w=800&q=80",
    badge: "Top Trek",
  },
  {
    id: "mustang-overland",
    slug: "mustang-overland",
    category: "trekking",
    title: "6 Days Muktinath & Lower Mustang Overland Safari",
    locations: "Pokhara • Tatopani • Jomsom • Muktinath • Marpha",
    duration: "5N / 6D",
    price: "NPR 45,000",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=80",
    badge: "Overland",
  },

  // --- ADVENTURE & LEISURE ---
  {
    id: "pokhara-leisure-tour",
    slug: "pokhara-leisure-tour",
    category: "adventure",
    title: "Pokhara Lake & Mountain Escape",
    locations: "Pokhara • Sarangkot • Peace Pagoda",
    duration: "4N / 5D",
    price: "NPR 35,000",
    image: "https://images.unsplash.com/photo-1540411608474-4325bbd12869?auto=format&fit=crop&w=800&q=80",
    badge: "Leisure",
  },

  // --- WILDLIFE SAFARI ---
  {
    id: "chitwan-national-park-safari",
    slug: "chitwan-national-park-safari",
    category: "wildlife",
    title: "Chitwan Wildlife Jungle Safari",
    locations: "Chitwan National Park • Rapti River",
    duration: "2N / 3D",
    price: "NPR 28,000",
    image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80",
    badge: "Safari",
  },
];

const TABS = [
  { id: "all", label: "All Packages" },
  { id: "cultural", label: "Cultural & Heritage" },
  { id: "trekking", label: "Trekking & Hiking" },
  { id: "wildlife", label: "Wildlife Safari" },
  { id: "adventure", label: "Adventure & Leisure" },
];

export default function InboundPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredTours =
    activeTab === "all"
      ? INBOUND_TOURS
      : INBOUND_TOURS.filter((tour) => tour.category === activeTab);

  return (
    <main className="min-h-screen bg-[#070A11] text-slate-100 font-sans relative overflow-hidden">
      
      {/* HERO SECTION WITH BOUDDHA / SWAYAMBHU STUPA BACKGROUND & 60% OVERLAYS */}
      <section className="relative py-20 lg:py-28 border-b border-slate-800/80 overflow-hidden">
        {/* Heritage Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 transform scale-100 opacity-75 filter contrast-105 brightness-95 pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2560&q=95')`,
          }}
        />

        {/* 60% Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A11]/60 via-[#070A11]/40 to-[#070A11]/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A11]/60 via-transparent to-[#070A11]/30 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="max-w-3xl">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-950/70 backdrop-blur-md px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/40 mb-6 shadow-xl">
              <Compass size={16} />
              <span>Inbound Nepal & Himalayan Kingdom Expeditions</span>
            </div>

            <SectionTitle
              eyebrow="Explore Authentic Nepal"
              title="Inbound Nepal & Bhutan Tour Packages"
              light={true}
            />
            
            <p className="mt-4 text-sm sm:text-base text-slate-100 leading-relaxed max-w-2xl font-medium drop-shadow-md">
              Discover the iconic stupas of Kathmandu, ancient heritage sites, high-altitude Himalayan trekking circuits, and wildlife sanctuaries with Nepal's premier DMC operator.
            </p>

            {/* Micro Highlights */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-700/50 pt-6 backdrop-blur-md rounded-xl px-4 bg-slate-950/40 border border-slate-800/60 max-w-xl shadow-xl">
              <div>
                <span className="block text-2xl font-black text-white drop-shadow">100%</span>
                <span className="text-xs text-slate-200 font-semibold">Government Registered</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-white drop-shadow">24/7</span>
                <span className="text-xs text-slate-200 font-semibold">On-Ground Support</span>
              </div>
              <div>
                <span className="block text-2xl font-black text-white drop-shadow">Top Rate</span>
                <span className="text-xs text-slate-200 font-semibold">B2B & Retail Tariff</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN PACKAGES GRID SECTION */}
      <section className="relative py-16 bg-[#070A11] z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* Dynamic Category Tabs Switcher */}
          <div className="flex flex-wrap gap-2.5 border-b border-slate-800/80 pb-5">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-[#D4AF37] text-slate-950 shadow-lg scale-105 font-black"
                    : "bg-slate-950/80 text-slate-300 hover:bg-slate-900 hover:text-white border border-slate-800/80 backdrop-blur-md"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tour Cards Grid */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTours.map((tour) => (
              <Link
                key={tour.id}
                href={`/inbound/${tour.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-950/60 backdrop-blur-md shadow-xl hover:border-[#D4AF37]/80 hover:bg-slate-900/90 hover:shadow-[#D4AF37]/5 transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Tour Image */}
                  <div className="relative h-60 w-full bg-slate-950 overflow-hidden border-b border-slate-800/80">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                    {tour.badge && (
                      <span className="absolute top-3 left-3 rounded-md bg-[#D4AF37] px-3 py-1 text-[10px] font-black uppercase text-slate-950 shadow-md">
                        {tour.badge}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37]">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{tour.locations}</span>
                    </div>

                    <h3 className="mt-2.5 text-lg font-black text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {tour.title}
                    </h3>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold">
                  <span className="inline-flex items-center gap-1.5 text-slate-300">
                    <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                    {tour.duration}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-base font-black text-[#D4AF37]">
                      <Tag className="h-3.5 w-3.5 text-[#D4AF37]" />
                      {tour.price}
                    </span>
                    <ArrowRight size={14} className="text-slate-400 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}