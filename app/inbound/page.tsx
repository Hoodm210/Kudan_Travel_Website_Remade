"use client";

import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { MapPin, Calendar, Star, ArrowRight, Globe2 } from "lucide-react";

interface InboundTourItem {
  id: string;
  slug: string;
  title: string;
  locations: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
}

const INBOUND_TOURS: InboundTourItem[] = [
  {
    id: "ktm-bandipur-pokhara-nagarkot",
    slug: "ktm-bandipur-pokhara-nagarkot",
    title: "Kathmandu, Bandipur, Pokhara & Nagarkot Heritage",
    locations: "KATHMANDU • BANDIPUR • POKHARA • NAGARKOT",
    duration: "7N / 8D",
    rating: 4.9,
    reviewsCount: 142,
    image: "/pokhara.jpeg",
    badge: "HERITAGE & HILLS",
  },
  {
    id: "10-days-nepal-bhutan-tour",
    slug: "10-days-nepal-bhutan-tour",
    title: "Ultimate Nepal & Bhutan Himalayan Kingdom Tour",
    locations: "KATHMANDU • THIMPHU • PUNAKHA • PARO",
    duration: "9N / 10D",
    rating: 5.0,
    reviewsCount: 96,
    image: "/bhutan.jpeg",
    badge: "CROSS-BORDER",
  },
  {
    id: "10-days-nepal-tour",
    slug: "10-days-nepal-tour",
    title: "Grand Nepal Cultural & Spiritual Circuit",
    locations: "KATHMANDU • BANDIPUR • POKHARA • LUMBINI",
    duration: "9N / 10D",
    rating: 4.9,
    reviewsCount: 118,
    image: "/pokhara.jpeg",
    badge: "CULTURAL CIRCUIT",
  },
  {
    id: "kathmandu-valley-cultural-tour",
    slug: "kathmandu-valley-cultural-tour",
    title: "Kathmandu Valley Cultural Heritage",
    locations: "KATHMANDU • BHAKTAPUR • PATAN",
    duration: "3N / 4D",
    rating: 4.8,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800",
    badge: "UNESCO HERITAGE",
  },
  {
    id: "ebc-trek",
    slug: "ebc-trek",
    title: "Everest Base Camp & Kala Patthar Expedition",
    locations: "LUKLA • NAMCHE • GORAKSHEP • EBC",
    duration: "13N / 14D",
    rating: 5.0,
    reviewsCount: 210,
    image: "/ebc.jpeg",
    badge: "HIMALAYAN TREK",
  },
  {
    id: "annapurna-circuit",
    slug: "annapurna-circuit",
    title: "Annapurna Circuit & Thorong La Pass Trek",
    locations: "BESISAHAR • MANANG • THORONG LA • MUKTINATH",
    duration: "11N / 12D",
    rating: 4.9,
    reviewsCount: 155,
    image: "/abc.jpeg",
    badge: "HIGH PASS TREK",
  },
  {
    id: "annapurna-base-camp-trek",
    slug: "annapurna-base-camp-trek",
    title: "Annapurna Base Camp & Sanctuary Trek",
    locations: "POKHARA • GHANDRUK • ABC (4,130m)",
    duration: "9N / 10D",
    rating: 4.9,
    reviewsCount: 165,
    image: "/abc.jpeg",
    badge: "SANCTUARY TREK",
  },
  {
    id: "mustang-overland",
    slug: "mustang-overland",
    title: "Muktinath & Lower Mustang Overland Safari",
    locations: "POKHARA • TATOPANI • JOMSOM • MUKTINATH",
    duration: "5N / 6D",
    rating: 4.8,
    reviewsCount: 110,
    image: "/muktinath.jpeg",
    badge: "4WD SAFARI",
  },
  {
    id: "pokhara-leisure-tour",
    slug: "pokhara-leisure-tour",
    title: "Pokhara Lake & Mountain Escape",
    locations: "POKHARA • SARANGKOT • PEACE PAGODA",
    duration: "4N / 5D",
    rating: 4.9,
    reviewsCount: 130,
    image: "/pokhara.jpeg",
    badge: "LAKE & LEISURE",
  },
  {
    id: "chitwan-national-park-safari",
    slug: "chitwan-national-park-safari",
    title: "Chitwan Wildlife Jungle Safari",
    locations: "CHITWAN NATIONAL PARK • RAPTI RIVER",
    duration: "2N / 3D",
    rating: 4.8,
    reviewsCount: 145,
    image: "/chitwan.jpeg",
    badge: "WILDLIFE SAFARI",
  },
];

export default function InboundToursPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#172A3A] font-serif selection:bg-[#A44A3F] selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 border-b border-stone-200/80 bg-[#EFECE6]/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="flex flex-col items-start max-w-2xl">
            
            <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1 text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#A44A3F] border border-stone-200 shadow-xs mb-4">
              <Globe2 size={13} className="text-[#A44A3F]" />
              <span>Inbound Nepal & Himalayan Journeys</span>
            </div>

            <SectionTitle
              eyebrow="Experience Nepal"
              title="Heritage, Treks & Cultural Escapes"
              light={false}
            />
            
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-sans font-normal">
              Carefully curated inbound experiences across Nepal—from UNESCO World Heritage sites and mountain lake escapes to high-altitude Himalayan trekking and jungle safaris.
            </p>

          </div>
        </div>
      </section>

      {/* PACKAGES GRID */}
      <section className="relative py-12 bg-[#F7F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* Tour Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INBOUND_TOURS.map((tour) => (
              <Link
                key={tour.id}
                href={`/inbound/${tour.slug}`}
                className="group flex flex-col justify-between bg-white border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Image Header */}
                  <div className="relative h-52 sm:h-56 w-full bg-stone-100 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80";
                      }}
                    />

                    {/* Category Badge */}
                    {tour.badge && (
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 shadow-xs">
                        <span className="text-[9px] font-sans font-black uppercase tracking-widest text-[#172A3A]">
                          {tour.badge}
                        </span>
                      </div>
                    )}

                    {/* Duration & Rating Bar */}
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

                    <h3 className="min-h-[3.5rem] font-serif text-xl leading-snug text-[#172A3A] transition group-hover:text-[#A44A3F]">
                      {tour.title}
                    </h3>

                    <div className="mt-4 border-b border-stone-100" />
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 flex items-center justify-between font-sans">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-stone-500">
                    Private Tour
                  </span>

                  <div className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-widest text-[#A44A3F] group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE ITINERARY</span>
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