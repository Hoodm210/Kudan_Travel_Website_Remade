"use client";

import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { MapPin, Calendar, Star, ArrowRight, Globe2 } from "lucide-react";

interface TourItem {
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
}

const INDIA_TOURS: TourItem[] = [
  {
    id: "golden-triangle",
    slug: "golden-triangle-delhi-agra-jaipur",
    title: "Classic Golden Triangle Tour",
    locations: "DELHI • AGRA • JAIPUR",
    duration: "5N / 6D",
    price: "NPR ",
    rating: 4.9,
    reviewsCount: 165,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800",
    badge: "HERITAGE",
  },
  {
    id: "kashi-pilgrimage",
    slug: "kashi-gaya-prayagraj-pilgrimage",
    title: "Kashi Vishwanath, Gaya & Ayodhya Yatra",
    locations: "VARANASI • PRAYAGRAJ • AYODHYA • GAYA",
    duration: "6N / 7D",
    price: "NPR",
    rating: 4.8,
    reviewsCount: 240,
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800",
    badge: "PILGRIMAGE",
  },
  {
    id: "darjeeling-gangtok",
    slug: "darjeeling-gangtok-himalayan-escape",
    title: "Darjeeling & Sikkim Scenic Escape",
    locations: "MIRIK • DARJEELING • GANGTOK",
    duration: "4N / 5D",
    price: "NPR",
    rating: 4.8,
    reviewsCount: 190,
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
    badge: "HIMALAYAN ESCAPE",
  },
  {
    id: "char-dham",
    slug: "char-dham-uttarakhand-yatra",
    title: "Sacred Char Dham Yatra (Uttarakhand)",
    locations: "HARIDWAR • KEDARNATH • BADRINATH",
    duration: "11N / 12D",
    price: "NPR",
    rating: 5.0,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
    badge: "SPIRITUAL YATRA",
  },
  {
    id: "goa-beach",
    slug: "goa-beach-bliss",
    title: "Goa Coastal Breeze & Heritage",
    locations: "NORTH GOA • SOUTH GOA • OLD GOA",
    duration: "4N / 5D",
    price: "NPR ",
    rating: 4.7,
    reviewsCount: 145,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800",
    badge: "BEACH & HERITAGE",
  },
  {
    id: "kerala-backwaters",
    slug: "kerala-backwaters-munnar",
    title: "Enchanting Kerala: Backwaters & Munnar Hills",
    locations: "COCHIN • MUNNAR • ALLEPPEY",
    duration: "5N / 6D",
    price: "NPR",
    rating: 4.9,
    reviewsCount: 125,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800",
    badge: "NATURE & SPA",
  },
];

export default function IndiaToursPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#172A3A] font-serif selection:bg-[#A44A3F] selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 border-b border-stone-200/80 bg-[#EFECE6]/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="flex flex-col items-start max-w-2xl">
            
            <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1 text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#A44A3F] border border-stone-200 shadow-xs mb-4">
              <Globe2 size={13} className="text-[#A44A3F]" />
              <span>India Tour Packages from Nepal</span>
            </div>

            <SectionTitle
              eyebrow="Discover India"
              title="Cultural Heritage & Pilgrimage Escapes"
              light={false}
            />
            
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-sans font-normal">
              Seamless travel packages for Nepalese travelers. From royal palaces and spiritual yatras to scenic hill stations and coastal retreats—arranged completely with transport and hotel bookings.
            </p>

          </div>
        </div>
      </section>

      {/* PACKAGES GRID */}
      <section className="relative py-12 bg-[#F7F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* Tour Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INDIA_TOURS.map((tour) => (
              <Link
                key={tour.id}
                href={`/India/${tour.slug}`}
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
                        e.currentTarget.src = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";
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

                    {/* Image Overlay */}
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

                    {/* Exact Title Style Match */}
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