"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Globe2,
  Users,
  Clock3,
  Star,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import TripCard from "@/components/TripCard";

const outbound = [
  {
    title: "Thailand Escape",
    place: "Bangkok • Phuket • Pattaya",
    days: "4N / 5D",
    price: "From NPR 49,900",
    href: "/outbound-tours",
  },
  {
    title: "Dubai & UAE",
    place: "Dubai • Desert Safari",
    days: "5N / 6D",
    price: "From NPR 69,900",
    href: "/outbound-tours",
  },
  {
    title: "Bali Discovery",
    place: "Ubud • Nusa Penida",
    days: "4N / 5D",
    price: "From NPR 55,900",
    href: "/outbound-tours",
  },
  {
    title: "Singapore & Malaysia",
    place: "Singapore • Genting",
    days: "6N / 7D",
    price: "From NPR 79,900",
    href: "/outbound-tours",
  },
];

const inbound = [
  {
    title: "Everest Base Camp",
    place: "Khumbu, Nepal",
    days: "14 Days",
    price: "Custom quote",
    tag: "Signature",
    href: "/inbound/annapurna-base-camp-trek",
  },
  {
    title: "Classic Nepal Highlights",
    place: "Kathmandu • Pokhara • Chitwan",
    days: "7 Days",
    price: "Custom quote",
    href: "/inbound/kathmandu-valley-cultural-tour",
  },
  {
    title: "Muktinath & Mustang",
    place: "Jomsom • Muktinath • Marpha",
    days: "6 Days",
    price: "Custom quote",
    href: "/inbound/pokhara-leisure-tour",
  },
];

const testimonials = [
  {
    quote:
      "Kudan handled our Nepal group from airport pickup to the last hotel. The communication was clear, the vehicles were dependable, and every small change was handled quickly.",
    author: "Sarah & Mark Jenkins",
    role: "International Group Travelers",
  },
  {
    quote:
      "The private Scorpio rental for our Annapurna trip was immaculate. Driver was punctual and navigated mountain passes with extreme care.",
    author: "Rohan Shrestha",
    role: "Corporate Outing Lead",
  },
  {
    quote:
      "Seamless Thailand package for our family. Visas, flights, and hotel transfers were zero hassle. Truly reliable team in Kathmandu.",
    author: "Priya Sharma",
    role: "Family Holiday Traveler",
  },
];

export default function Home() {
  const router = useRouter();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Quick Search Form State
  const [destination, setDestination] = useState("inbound");
  const [tripType, setTripType] = useState("all");

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination === "outbound") {
      router.push("/outbound-tours");
    } else if (destination === "transport") {
      router.push("/transportation");
    } else {
      router.push("/inbound");
    }
  };

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="hero-bg relative min-h-[720px] overflow-hidden text-white bg-slate-950">
        <div className="container-x relative flex min-h-[720px] items-center py-20 pb-36 lg:pb-32">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-amber-500/30 bg-slate-900/80 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#D4AF37] backdrop-blur-md">
              Nepal • Asia • Worldwide
            </span>
            <h1 className="mt-6 text-5xl font-black leading-[.98] tracking-tight sm:text-7xl lg:text-[82px]">
              Travel farther.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-300 to-amber-500">
                Feel more.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200">
              Thoughtfully designed journeys across Nepal and the world — from Himalayan treks to unforgettable family holidays and seamless group travel.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/inbound"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#B8860B] px-7 py-3.5 text-sm font-black uppercase tracking-wider text-slate-950 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Explore Nepal</span>
                <ArrowRight size={17} className="stroke-[2.5]" />
              </Link>
              <Link
                href="/outbound-tours"
                className="rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition-all duration-300 hover:bg-white/20 active:scale-95"
              >
                Explore Outbound
              </Link>
            </div>
          </div>
        </div>

        {/* HERO QUICK SEARCH BAR */}
        <div className="absolute bottom-7 left-1/2 hidden w-[min(1120px,calc(100%-40px))] -translate-x-1/2 lg:block z-20">
          <form
            onSubmit={handleQuickSearch}
            className="grid grid-cols-[1fr_1fr_1fr_auto] items-center rounded-3xl border border-white/20 bg-slate-900/90 p-3 backdrop-blur-2xl text-white shadow-2xl"
          >
            <div className="px-6 py-2 border-r border-white/15">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Category
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="mt-1 block w-full bg-transparent text-sm font-bold text-white focus:outline-none cursor-pointer"
              >
                <option value="inbound" className="bg-slate-900 text-white">Inbound Nepal</option>
                <option value="outbound" className="bg-slate-900 text-white">Outbound Holidays</option>
                <option value="transport" className="bg-slate-900 text-white">Fleet & Transport</option>
              </select>
            </div>

            <div className="px-6 py-2 border-r border-white/15">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Trip Preference
              </label>
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="mt-1 block w-full bg-transparent text-sm font-bold text-white focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-slate-900 text-white">All Trip Types</option>
                <option value="cultural" className="bg-slate-900 text-white">Cultural Heritage</option>
                <option value="trekking" className="bg-slate-900 text-white">High Altitude Trekking</option>
                <option value="leisure" className="bg-slate-900 text-white">Family Leisure</option>
              </select>
            </div>

            <div className="px-6 py-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                Services
              </label>
              <span className="mt-1 block text-sm font-bold text-slate-300">
                Tailored Itineraries
              </span>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] px-6 py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-md hover:brightness-110 transition-all"
            >
              <Search size={16} />
              <span>Find Packages</span>
            </button>
          </form>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="container-x grid grid-cols-2 gap-5 md:grid-cols-4">
          <Stat icon={<Users />} value="10,000+" label="Happy Travelers" />
          <Stat icon={<Clock3 />} value="15+ Years" label="Experience" />
          <Stat icon={<Globe2 />} value="25+" label="Destinations" />
          <Stat icon={<ShieldCheck />} value="100%" label="Custom Itineraries" />
        </div>
      </section>

      {/* 3. OUTBOUND TOURS */}
      <section className="bg-slate-950 py-20 border-b border-slate-900">
        <div className="container-x">
          <SectionTitle
            light={true}
            eyebrow="Go beyond ordinary"
            title="Popular outbound escapes"
            copy="Handpicked international holidays with flights, hotels, visa guidance and local experiences arranged around you."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {outbound.map((x) => (
              <TripCard key={x.title} {...x} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. INBOUND NEPAL */}
      <section className="bg-slate-50 py-20 border-b border-slate-200/80">
        <div className="container-x">
          <SectionTitle
            light={false}
            eyebrow="Made in Nepal"
            title="Discover the Himalayas"
            copy="From iconic treks to culturally rich road journeys, experience Nepal with local expertise and dependable logistics."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {inbound.map((x) => (
              <TripCard key={x.title} {...x} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY KUDAN */}
      <section className="bg-slate-950 py-20 border-b border-slate-900">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            
            {/* Left Column Text Content */}
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">
                Why Kudan
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                One team for the whole journey.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                We combine destination knowledge, transparent planning and on-ground operations so your trip feels effortless before, during and after departure.
              </p>

              {/* Checkmark List */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Personalized itineraries",
                  "Visa & documentation support",
                  "Private vehicles & transfers",
                  "24/7 trip assistance",
                  "B2B group & FIT handling",
                  "Reliable local partners",
                ].map((t) => (
                  <div key={t} className="flex items-center gap-3 text-sm font-bold text-slate-100">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 shrink-0">
                      <Check size={15} className="stroke-[3]" />
                    </span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column Image Banner */}
            <div className="relative min-h-[440px] overflow-hidden rounded-[2.5rem] border border-amber-500/20 bg-slate-900 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
                alt="Nepal Himalayan Landscape"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="relative flex h-full min-h-[440px] flex-col justify-end p-8 text-white">
                <span className="text-xs font-black uppercase tracking-[.25em] text-[#D4AF37] drop-shadow">
                  Local knowledge. Global journeys.
                </span>
                <h3 className="mt-2 text-3xl font-black text-white drop-shadow-md">
                  Your Nepal story starts here.
                </h3>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="bg-slate-900 py-20 text-white border-b border-slate-800">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[.22em] text-[#D4AF37]">What travelers say</p>
            <h2 className="mt-3 text-4xl font-black text-white">Good trips become great memories.</h2>
            
            {/* Slider Controls */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={prevTestimonial}
                aria-label="Previous Testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextTestimonial}
                aria-label="Next Testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-slate-700 bg-slate-800 text-slate-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-700/80 bg-slate-800/80 p-8 shadow-xl min-h-[220px] flex flex-col justify-between">
            <div>
              <div className="flex gap-1 text-[#D4AF37]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="mt-6 text-lg sm:text-xl leading-8 text-slate-200 italic">
                “{testimonials[activeTestimonial].quote}”
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/60">
              <p className="text-sm font-bold text-[#D4AF37]">
                — {testimonials[activeTestimonial].author}
              </p>
              <span className="text-xs text-slate-400">
                {testimonials[activeTestimonial].role}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="container-x py-20">
        <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl sm:p-12">
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">
                Plan Your Next Journey
              </span>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Tell us where you want to go.
              </h2>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">
                Share a few details and our travel team will shape the right itinerary for you.
              </p>
            </div>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#B8860B] px-8 py-4 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
            >
              <span>Start Planning</span>
              <ArrowRight size={16} className="stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#B8860B]">{icon}</span>
      <div>
        <b className="block text-xl font-black text-slate-900">{value}</b>
        <span className="text-xs font-bold text-slate-500">{label}</span>
      </div>
    </div>
  );
}