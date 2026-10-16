"use client";

import { useState } from "react";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { MapPin, Calendar, Star, ArrowRight, Compass } from "lucide-react";

interface TourItem {
  id: string;
  slug: string;
  category: "cultural" | "trekking" | "wildlife" | "adventure";
  title: string;
  locations: string;
  duration: string;
  price: string;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
}

const INBOUND_TOURS: TourItem[] = [
  {
    id: "ktm-bandipur-pokhara-nagarkot",
    slug: "ktm-bandipur-pokhara-nagarkot",
    category: "cultural",
    title: "Kathmandu, Bandipur & Pokhara Heritage",
    locations: "KATHMANDU • BANDIPUR • POKHARA",
    duration: "7N / 8D",
    price: "NPR 58,000",
    rating: 4.9,
    reviewsCount: 124,
    image: "/pokhara.png",
    badge: "SIGNATURE JOURNEY",
  },
  {
    id: "10-days-nepal-bhutan-tour",
    slug: "10-days-nepal-bhutan-tour",
    category: "cultural",
    title: "Ultimate Nepal & Bhutan Kingdom Tour",
    locations: "KATHMANDU • THIMPHU • PARO",
    duration: "9N / 10D",
    price: "NPR 185,000",
    rating: 4.8,
    reviewsCount: 65,
    image: "/bhutan.png",
    badge: "SPECIAL PACKAGE",
  },
  {
    id: "ebc-trek",
    slug: "ebc-trek",
    category: "trekking",
    title: "Everest Base Camp & Kala Patthar Expedition",
    locations: "LUKLA • NAMCHE • GORAKSHEP • EBC",
    duration: "13N / 14D",
    price: "NPR 115,000",
    rating: 5.0,
    reviewsCount: 98,
    image: "/ebc.png",
    badge: "EXPEDITION",
  },
  {
    id: "annapurna-circuit",
    slug: "annapurna-circuit",
    category: "trekking",
    title: "Annapurna Circuit & Thorong La Pass Trek",
    locations: "BESISAHAR • MANANG • POKHARA",
    duration: "11N / 12D",
    price: "NPR 88,000",
    rating: 4.9,
    reviewsCount: 112,
    image: "/annapurna.png",
    badge: "CLASSIC TREK",
  },
  {
    id: "mustang-overland",
    slug: "mustang-overland",
    category: "trekking",
    title: "Muktinath & Lower Mustang Overland Safari",
    locations: "POKHARA • JOMSOM • MUKTINATH",
    duration: "5N / 6D",
    price: "NPR 45,000",
    rating: 4.9,
    reviewsCount: 88,
    image: "/muktinath.png",
    badge: "OVERLAND",
  },
  {
    id: "chitwan-national-park-safari",
    slug: "chitwan-national-park-safari",
    category: "wildlife",
    title: "Chitwan Wildlife Jungle Safari",
    locations: "CHITWAN NATIONAL PARK • RAPTI RIVER",
    duration: "2N / 3D",
    price: "NPR 28,000",
    rating: 4.8,
    reviewsCount: 76,
    image: "/chitwan.png",
    badge: "WILDLIFE SAFARI",
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
    <main className="min-h-screen bg-[#F7F5F0] text-[#172A3A] font-serif selection:bg-[#A44A3F] selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 border-b border-stone-200/80 bg-[#EFECE6]/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="flex flex-col items-start max-w-2xl">
            
            <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1 text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#A44A3F] border border-stone-200 shadow-xs mb-4">
              <Compass size={13} className="text-[#A44A3F]" />
              <span>Inbound Nepal & Kingdom Expeditions</span>
            </div>

            <SectionTitle
              eyebrow="Curated Journeys"
              title="Inbound Nepal & Bhutan Journeys"
              light={false}
            />
            
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-sans font-normal">
              Experience the ancient stupas of Kathmandu, sacred Himalayan valleys, high-altitude trekking circuits, and wildlife sanctuaries with an accredited local operator.
            </p>

          </div>
        </div>
      </section>

      {/* PACKAGES & FILTER */}
      <section className="relative py-12 bg-[#F7F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 border-b border-stone-200/80 font-sans">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#172A3A] text-white shadow-xs"
                    : "bg-white text-stone-600 hover:text-[#172A3A] border border-stone-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTours.map((tour) => (
              <Link
                key={tour.id}
                href={`/inbound/${tour.slug}`}
                className="group flex flex-col justify-between bg-white border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Flush Borderless Image Header */}
                  <div className="relative h-52 sm:h-56 w-full bg-stone-100 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        // Fallback image if local file isn't present yet
                        e.currentTarget.src = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80";
                      }}
                    />

                    {/* Badge */}
                    {tour.badge && (
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 shadow-xs">
                        <span className="text-[9px] font-sans font-black uppercase tracking-widest text-[#172A3A]">
                          {tour.badge}
                        </span>
                      </div>
                    )}

                    {/* Image Footer Info Overlay */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 flex items-center justify-between text-white font-sans text-[11px] font-semibold">
                      <div className="flex items-center gap-1.2">
                        <Calendar size={13} className="text-amber-400" />
                        <span>{tour.duration}</span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-400">
                        <Star size={12} className="fill-amber-400" />
                        <span className="text-white font-bold">{tour.rating}</span>
                        <span className="text-stone-300 text-[10px] font-normal">({tour.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-1 text-[10px] font-sans font-extrabold uppercase tracking-wider text-[#A44A3F] mb-1">
                      <MapPin size={12} className="shrink-0" />
                      <span className="truncate">{tour.locations}</span>
                    </div>

                    {/* EXACT HEADER STYLING SPECIFIED */}
                    <h3 className="min-h-[3.5rem] font-serif text-xl leading-snug text-[#172A3A] transition group-hover:text-[#A44A3F]">
                      {tour.title}
                    </h3>

                    <div className="mt-4 border-b border-stone-100" />
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 flex items-end justify-between font-sans">
                  <div>
                    <span className="block text-[9px] font-extrabold uppercase tracking-widest text-stone-400">
                      STARTING FROM
                    </span>
                    <span className="text-base font-extrabold text-[#172A3A]">
                      {tour.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-widest text-[#A44A3F] group-hover:translate-x-1 transition-transform">
                    <span>DISCOVER</span>
                    <ArrowRight size={13} />
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