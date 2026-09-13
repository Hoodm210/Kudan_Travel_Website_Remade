"use client";

import { useState } from "react";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { MapPin, Calendar, Tag } from "lucide-react";

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
    <main className="min-h-screen bg-slate-950 py-20 text-slate-100 font-sans border-t border-slate-900">
      <div className="container-x">
        {/* Header */}
        <div>
          <SectionTitle
            eyebrow="Explore Nepal"
            title="Inbound Nepal Tour Packages"
            light={true}
          />
          <p className="mt-3 max-w-2xl text-base text-slate-300">
            Discover the majestic Himalayas, ancient heritage sites, rich wildlife, and cultural landmarks across Nepal & Bhutan.
          </p>
        </div>

        {/* Dynamic Category Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#D4AF37] text-slate-950 shadow-md scale-105"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
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
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 shadow-xl hover:border-[#D4AF37] hover:shadow-[#D4AF37]/5 transition-all duration-300 overflow-hidden"
            >
              <div>
                {/* Image */}
                <div className="relative h-64 w-full bg-slate-950 overflow-hidden border-b border-slate-800">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />

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

                  <h3 className="mt-2 text-xl font-black text-white group-hover:text-[#D4AF37] transition-colors">
                    {tour.title}
                  </h3>
                </div>
              </div>

              {/* Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold">
                <span className="inline-flex items-center gap-1.5 text-slate-300">
                  <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                  {tour.duration}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-black text-[#D4AF37]">
                  <Tag className="h-3.5 w-3.5 text-[#D4AF37]" />
                  {tour.price}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}