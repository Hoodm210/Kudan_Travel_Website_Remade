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

const OUTBOUND_TOURS: TourItem[] = [
  {
    id: "bali",
    slug: "bali-tropical-escape",
    title: "Bali Island & Cultural Sanctuary Getaway",
    locations: "UBUD • KUTA • NUSA PENIDA",
    duration: "5N / 6D",
    price: "NPR 85,000",
    rating: 4.9,
    reviewsCount: 142,
    image: "/bali.png",
    badge: "ISLAND ESCAPE",
  },
  {
    id: "thailand-essential",
    slug: "thailand-express",
    title: "Essential Thailand & Coral Island Escape",
    locations: "BANGKOK • PATTAYA • CORAL ISLAND",
    duration: "4N / 5D",
    price: "NPR 55,000",
    rating: 4.8,
    reviewsCount: 210,
    image: "/thailand.png",
    badge: "BESTSELLER",
  },
  {
    id: "thailand-grand",
    slug: "thailand-grand-escape",
    title: "Grand Thailand & Phuket Tropical Explorer",
    locations: "BANGKOK • PHUKET • PATTAYA",
    duration: "5N / 6D",
    price: "NPR 68,000",
    rating: 4.9,
    reviewsCount: 175,
    image: "/thailand.png",
    badge: "GRAND TOUR",
  },
  {
    id: "singapore",
    slug: "singapore-city-escape",
    title: "Singapore City & Sentosa Island Explorer",
    locations: "SINGAPORE • SENTOSA • MARINA BAY",
    duration: "5N / 6D",
    price: "NPR 115,000",
    rating: 4.8,
    reviewsCount: 130,
    image: "/singapore.png",
    badge: "CITY SAFARI",
  },
  {
    id: "malaysia",
    slug: "malaysia-genting-tour",
    title: "Malaysia Highland & Culture Discovery",
    locations: "KUALA LUMPUR • GENTING • MALACCA",
    duration: "5N / 6D",
    price: "NPR 65,000",
    rating: 4.7,
    reviewsCount: 115,
    image: "/malaysia.png",
    badge: "POPULAR",
  },
  {
    id: "japan",
    slug: "japan-cherry-blossom-tour",
    title: "Japan Golden Route & Heritage Circuit",
    locations: "TOKYO • KYOTO • OSAKA • MT. FUJI",
    duration: "5N / 6D",
    price: "NPR 225,000",
    rating: 5.0,
    reviewsCount: 88,
    image: "/japan.png",
    badge: "PREMIUM",
  },
  {
    id: "switzerland-italy",
    slug: "switzerland-italy-grand-tour",
    title: "Swiss Alps & Italian Heritage Panorama",
    locations: "ZURICH • LUCERNE • MILAN • VENICE",
    duration: "6N / 7D",
    price: "NPR 285,000",
    rating: 5.0,
    reviewsCount: 64,
    image: "/switzerland-italy.png",
    badge: "EUROPE SPECIAL",
  },
  {
    id: "laos",
    slug: "laos-heritage-trail",
    title: "Laos Heritage & Luang Prabang Explorer",
    locations: "LUANG PRABANG • VIENTIANE • VANG VIENG",
    duration: "5N / 6D",
    price: "NPR 78,000",
    rating: 4.7,
    reviewsCount: 42,
    image: "/laos.png",
    badge: "CULTURAL TRAIL",
  },
  {
    id: "vietnam",
    slug: "vietnam-halong-bay-tour",
    title: "Vietnam Scenic Heritage & Halong Cruise",
    locations: "HANOI • HALONG BAY • NINH BINH",
    duration: "4N / 5D",
    price: "NPR 62,000",
    rating: 4.9,
    reviewsCount: 156,
    image: "/vietnam.png",
    badge: "TRENDING",
  },
  {
    id: "dubai",
    slug: "dubai-desert-safari",
    title: "Dubai Glitz & Desert Safari Expedition",
    locations: "DUBAI • ABU DHABI • DESERT CAMP",
    duration: "4N / 5D",
    price: "NPR 95,000",
    rating: 4.9,
    reviewsCount: 180,
    image: "/dubai.png",
    badge: "DESERT SAFARI",
  },
  {
    id: "maldives",
    slug: "maldives-luxury-escape",
    title: "Maldives Luxury Atoll & Beach Haven",
    locations: "MALE • MALE ATOLL • PRIVATE RESORT",
    duration: "3N / 4D",
    price: "NPR 110,000",
    rating: 5.0,
    reviewsCount: 92,
    image: "/maldives.png",
    badge: "LUXURY BEACH",
  },
];

export default function OutboundToursPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#172A3A] font-serif selection:bg-[#A44A3F] selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 border-b border-stone-200/80 bg-[#EFECE6]/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          <div className="flex flex-col items-start max-w-2xl">
            
            <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1 text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#A44A3F] border border-stone-200 shadow-xs mb-4">
              <Globe2 size={13} className="text-[#A44A3F]" />
              <span>International Outbound Holidays</span>
            </div>

            <SectionTitle
              eyebrow="Popular Outbound Escapes"
              title="Handpicked International Holidays"
              light={false}
            />
            
            <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed font-sans font-normal">
              Handpicked international holidays with flights, premium hotel stays, visa guidance, and local experiences arranged seamlessly around you.
            </p>

          </div>
        </div>
      </section>

      {/* PACKAGES GRID */}
      <section className="relative py-12 bg-[#F7F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* Tour Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OUTBOUND_TOURS.map((tour) => (
              <Link
                key={tour.id}
                href={`/outbound-tours/${tour.slug}`}
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
                        e.currentTarget.src = "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80";
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