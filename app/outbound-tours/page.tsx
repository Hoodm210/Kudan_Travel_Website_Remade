import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { MapPin, Calendar, Tag } from "lucide-react";

interface TourItem {
  id: string;
  slug: string;
  title: string;
  locations: string;
  duration: string;
  price: string;
  image: string;
  badge?: string;
}

const OUTBOUND_TOURS: TourItem[] = [
  {
    id: "thailand",
    slug: "thailand",
    title: "Thailand Escape",
    locations: "Bangkok • Phuket • Pattaya",
    duration: "4N / 5D",
    price: "NPR 55,000",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
  },
  {
    id: "dubai",
    slug: "dubai",
    title: "Dubai & UAE Adventure",
    locations: "Dubai • Desert Safari",
    duration: "5N / 6D",
    price: "NPR 95,000",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
  },
  {
    id: "bali",
    slug: "bali",
    title: "Bali Discovery",
    locations: "Ubud • Nusa Penida",
    duration: "4N / 5D",
    price: "NPR 75,000",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "singapore",
    slug: "singapore",
    title: "Singapore & Malaysia",
    locations: "Singapore • Genting",
    duration: "6N / 7D",
    price: "NPR 115,000",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
  },
];

export default function OutboundToursPage() {
  return (
    <main className="min-h-screen bg-slate-950 py-20 text-slate-100 font-sans border-t border-slate-900">
      <div className="container-x">
        {/* Page Title */}
        <div>
          <SectionTitle
            eyebrow="Popular Outbound Escapes"
            title="Handpicked International Holidays"
            light={true}
          />
          <p className="mt-3 max-w-2xl text-base text-slate-300">
            Handpicked international holidays with flights, hotels, visa guidance, and local experiences arranged around you.
          </p>
        </div>

        {/* Tour Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OUTBOUND_TOURS.map((tour) => (
            <Link
              key={tour.id}
              href={`/outbound-tours/${tour.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 shadow-xl hover:border-[#D4AF37] hover:shadow-[#D4AF37]/5 transition-all duration-300 overflow-hidden"
            >
              <div>
                {/* Image & Badge Overlay */}
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

                {/* Card Body */}
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

              {/* Card Footer */}
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