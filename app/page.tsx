"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Globe2,
  Handshake,
  MapPin,
  Mountain,
  ShieldCheck,
  Star,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

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

/* =========================================================
   INBOUND TOURS
========================================================= */

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
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85",
    badge: "Signature Journey",
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
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=85",
    badge: "Himalayan Adventure",
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
      "https://images.unsplash.com/photo-1585869110973-7280be312084?auto=format&fit=crop&w=1200&q=85",
    badge: "Cultural Discovery",
  },
];

/* =========================================================
   OUTBOUND TOURS
========================================================= */

const OUTBOUND_TOURS: Tour[] = [
  {
    id: "thailand-express",
    slug: "thailand-express",
    title: "Essential Thailand: Bangkok & Pattaya",
    locations: "Bangkok • Pattaya • Coral Island",
    duration: "4N / 5D",
    price: "NPR 65,000",
    rating: 4.7,
    reviewsCount: 210,
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=85",
    badge: "Popular Escape",
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
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85",
    badge: "Luxury Escape",
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
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85",
    badge: "Island Retreat",
  },
];

/* =========================================================
   TESTIMONIALS
   Verify customer permission and review authenticity
   before publishing these publicly.
========================================================= */

const REVIEWS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    country: "United Kingdom",
    role: "International Group Leader",
    comment:
      "The entire journey was impeccably organized. From airport pickups to our trekking logistics, every detail was handled with professional care.",
    rating: 5,
    package: "Ghorepani Poon Hill Trek",
  },
  {
    id: 2,
    name: "Dr. Rajesh Sharma",
    country: "Nepal",
    role: "Corporate Travel Director",
    comment:
      "Outstanding corporate service. Their outbound booking management for Thailand and Dubai made travel arrangements much easier for our organization.",
    rating: 5,
    package: "Essential Thailand Package",
  },
  {
    id: 3,
    name: "Michael & Elena Vance",
    country: "Australia",
    role: "Himalayan Expedition Travellers",
    comment:
      "Warm hospitality, knowledgeable guides, and thoughtful travel coordination made our Himalayan adventure memorable.",
    rating: 5,
    package: "Everest Base Camp Trek",
  },
];

/* =========================================================
   INDUSTRY LINKS
========================================================= */

const ACCREDITATIONS = [
  {
    href: "https://natta.org.np/",
    src: "/natta.png",
    title: "NATTA",
    desc: "Nepal Association of Tour & Travel Agents",
  },
  {
    href: "https://www.taan.org.np/",
    src: "/taan.png",
    title: "TAAN",
    desc: "Trekking Agencies' Association of Nepal",
  },
  {
    href: "https://ntb.gov.np/",
    src: "/ntb.png",
    title: "Nepal Tourism Board",
    desc: "Official Nepal tourism resource",
  },
];

/* =========================================================
   MAIN LANDING PAGE COMPONENT
========================================================= */

export default function LuxuryLandingSection() {
  const [activeTab, setActiveTab] = useState<"inbound" | "outbound">(
    "inbound"
  );

  const currentTours =
    activeTab === "inbound" ? INBOUND_TOURS : OUTBOUND_TOURS;

  const getTourHref = (tour: Tour) => {
    if (tour.path) return tour.path;

    const isOutbound = OUTBOUND_TOURS.some(
      (item) => item.id === tour.id
    );

    return isOutbound
      ? `/outbound-tours/${tour.slug}`
      : `/inbound/${tour.slug}`;
  };

  const categoryHref =
    activeTab === "inbound" ? "/inbound" : "/outbound-tours";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="overflow-hidden bg-[#F8F6F0] font-sans text-[#172A3A]">

      {/* ===================================================
          1. HERO — NEPAL HERITAGE & HIMALAYAN LANDSCAPES
      =================================================== */}

      <section className="relative isolate flex min-h-[600px] items-center overflow-hidden bg-[#102B3A] sm:min-h-[660px] lg:min-h-[730px]">

        <img
          src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2200&q=90"
          alt="Mountain landscape representing the beauty of Nepal"
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071923]/95 via-[#0B202C]/75 to-[#102B3A]/15" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071923]/75 via-transparent to-black/10" />

        <div className="mx-auto flex w-full max-w-[1320px] items-center px-5 py-20 sm:px-8 lg:px-14">

          <div className="max-w-3xl text-white">

            <div className="mb-7 inline-flex items-center gap-3 border-l-2 border-[#D4B477] pl-4">
              <Mountain
                size={19}
                className="text-[#E3C58F]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F0D9AC] sm:text-xs">
                Discover Nepal with Kudan
              </span>
            </div>

            <h1 className="max-w-3xl font-serif text-5xl font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-[76px]">
              More than a
              <br />
              destination.
              <br />

              <span className="italic text-[#E3C58F]">
                A feeling that stays.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
              Discover the soul of Nepal through Himalayan adventures,
              ancient heritage, extraordinary hospitality, and journeys
              thoughtfully arranged by people who know the destination.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/inbound"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#D4B477] px-7 py-4 text-xs font-bold uppercase tracking-[0.13em] text-[#152A35] transition hover:bg-[#E7CC99]"
              >
                Explore Nepal
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/contact-us"
                className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/50 bg-white/5 px-7 py-4 text-xs font-bold uppercase tracking-[0.13em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[#172A3A]"
              >
                Plan Your Journey
                <ChevronRight size={16} />
              </Link>

            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/20 pt-6 text-xs text-white/80 sm:mt-14">

              <span className="flex items-center gap-2">
                <Mountain size={16} className="text-[#E3C58F]" />
                Himalayan Experiences
              </span>

              <span className="flex items-center gap-2">
                <Globe2 size={16} className="text-[#E3C58F]" />
                Worldwide Travel
              </span>

              <span className="flex items-center gap-2">
                <Handshake size={16} className="text-[#E3C58F]" />
                B2B Travel Solutions
              </span>

            </div>

          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 hidden h-24 w-24 border-l border-t border-white/20 lg:block" />

      </section>

      {/* ===================================================
          2. INTRODUCTION STRIP
      =================================================== */}

      <section className="border-b border-[#E6DFD2] bg-[#FCFAF6]">

        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-6 px-5 py-8 sm:grid-cols-3 sm:px-8 lg:px-14">

          {[
            {
              number: "01",
              title: "Made for discovery",
              desc: "Culture, nature, adventure and authentic local experiences.",
            },
            {
              number: "02",
              title: "Thoughtfully arranged",
              desc: "Travel planning with attention to the details that matter.",
            },
            {
              number: "03",
              title: "Built on partnership",
              desc: "Ground handling and travel support for international partners.",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="flex gap-4 sm:px-3"
            >
              <span className="font-serif text-2xl italic text-[#A44A3F]">
                {item.number}
              </span>

              <div>
                <h2 className="text-sm font-semibold text-[#172A3A]">
                  {item.title}
                </h2>

                <p className="mt-1 max-w-xs text-xs leading-5 text-[#74766F]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ===================================================
          3. FEATURED TOUR PACKAGES
      =================================================== */}

      <section
        id="featured-tours"
        className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-28"
      >

        <div className="mb-10 flex flex-col gap-7 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">

          <div className="max-w-2xl">

            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-9 bg-[#A44A3F]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A44A3F]">
                Journeys Worth Taking
              </span>
            </div>

            <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-[#172A3A] sm:text-5xl">
              Find your next
              <span className="italic text-[#A44A3F]">
                {" "}great escape.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#74766F]">
              From the timeless beauty of Nepal to memorable international
              holidays, explore travel experiences designed around the
              places you want to discover.
            </p>

          </div>

          <div
            className="inline-flex w-full max-w-full self-start border border-[#DED7CA] bg-white p-1 sm:w-auto lg:self-end"
            role="group"
            aria-label="Choose tour category"
          >

            <button
              type="button"
              aria-pressed={activeTab === "inbound"}
              onClick={() => setActiveTab("inbound")}
              className={`flex-1 px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition sm:flex-none sm:px-6 ${
                activeTab === "inbound"
                  ? "bg-[#173747] text-white"
                  : "text-[#6C716F] hover:bg-[#F5F1E9]"
              }`}
            >
              Nepal Tours
            </button>

            <button
              type="button"
              aria-pressed={activeTab === "outbound"}
              onClick={() => setActiveTab("outbound")}
              className={`flex-1 px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition sm:flex-none sm:px-6 ${
                activeTab === "outbound"
                  ? "bg-[#173747] text-white"
                  : "text-[#6C716F] hover:bg-[#F5F1E9]"
              }`}
            >
              International
            </button>

          </div>

        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">

          {currentTours.map((tour) => (
            <Link
              key={tour.id}
              href={getTourHref(tour)}
              className="group flex min-w-0 flex-col overflow-hidden border border-[#E6DFD2] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#D4B477] hover:shadow-[0_18px_50px_rgba(23,42,58,0.10)]"
            >

              <div className="relative aspect-[5/4] overflow-hidden bg-[#E8E3D8]">

                <img
                  src={tour.image}
                  alt={tour.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

                <span className="absolute left-4 top-4 bg-[#FCFAF6] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#173747]">
                  {tour.badge || "Featured Journey"}
                </span>

                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-white">
                  <CalendarDays
                    size={14}
                    className="text-[#E3C58F]"
                  />
                  <span>{tour.duration}</span>
                </div>

                <span className="absolute bottom-4 right-4 flex items-center gap-1.5 text-xs text-white">
                  <Star
                    size={13}
                    className="fill-[#E3C58F] text-[#E3C58F]"
                  />

                  {tour.rating}

                  <span className="text-white/75">
                    ({tour.reviewsCount})
                  </span>
                </span>

                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-black/20 text-white opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                  <ArrowRight size={16} />
                </span>

              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">

                <div className="mb-3 flex items-start gap-2 text-[10px] font-semibold uppercase leading-5 tracking-[0.09em] text-[#A44A3F]">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{tour.locations}</span>
                </div>

                <h3 className="min-h-[3.5rem] font-serif text-xl leading-snug text-[#172A3A] transition group-hover:text-[#A44A3F]">
                  {tour.title}
                </h3>

                <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#EEE9E0] pt-5 mt-6">

                  <div>
                    <span className="block text-[9px] font-semibold uppercase tracking-[0.16em] text-[#898A82]">
                      Starting From
                    </span>

                    <span className="mt-1 block text-lg font-semibold text-[#173747]">
                      {tour.price}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-2 pb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#A44A3F]">
                    Discover

                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>

                </div>

              </div>

            </Link>
          ))}

        </div>

        <div className="mt-10 flex justify-center">

          <Link
            href={categoryHref}
            className="inline-flex items-center justify-center gap-3 border border-[#173747] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-[#173747] transition hover:bg-[#173747] hover:text-white"
          >
            View All{" "}
            {activeTab === "inbound"
              ? "Nepal Tours"
              : "International Tours"}

            <ArrowRight size={15} />
          </Link>

        </div>

      </section>

      {/* ===================================================
          4. B2B PARTNERSHIP
      =================================================== */}

      <section className="relative overflow-hidden bg-[#153443] text-white">

        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border border-white/[0.08]" />

        <div className="pointer-events-none absolute -right-8 -top-12 h-56 w-56 rounded-full border border-white/[0.08]" />

        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16 lg:px-14 lg:py-24">

          <div className="relative">

            <div className="mb-5 flex items-center gap-3">
              <Handshake
                size={20}
                className="text-[#E3C58F]"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E3C58F]">
                For the Travel Trade
              </span>
            </div>

            <h2 className="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
              Your trusted partner

              <span className="italic text-[#E3C58F]">
                {" "}on the ground.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/75">
              Partner with Kudan Travel & Tours for Nepal ground handling,
              tailor-made itineraries, tour operations, transport coordination,
              and travel support for your clients.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">

              {[
                "Tailor-made itineraries",
                "Ground handling in Nepal",
                "Tour and transport coordination",
                "Dedicated trade support",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-white/90"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-[#E3C58F]"
                  />

                  {item}
                </div>
              ))}

            </div>

            <Link
              href="/b2b-partner"
              className="mt-9 inline-flex items-center gap-3 bg-[#D4B477] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#172A3A] transition hover:bg-[#E7CC99]"
            >
              Explore B2B Partnership
              <ArrowRight size={16} />
            </Link>

          </div>

          <div className="relative border border-white/15 bg-white/[0.04] p-7 sm:p-9">

            <div className="mb-6 flex h-12 w-12 items-center justify-center border border-[#D4B477]/40 bg-[#D4B477]/10 text-[#E3C58F]">
              <ShieldCheck size={25} />
            </div>

            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#E3C58F]">
              Our Approach
            </p>

            <h3 className="mt-3 font-serif text-2xl leading-snug">
              Every journey deserves thoughtful coordination.
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/65">
              We bring destination knowledge, operational planning, and
              partner coordination together to help create smoother
              experiences for travellers and travel businesses.
            </p>

            <div className="mt-7 border-t border-white/15 pt-5">

              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#E3C58F] transition hover:text-white"
              >
                Discuss Your Requirements
                <ArrowRight size={15} />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          5. MEMBERSHIPS & INDUSTRY LINKS
      =================================================== */}

      <section className="border-b border-[#E6DFD2] bg-[#FCFAF6]">

        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-14 lg:py-20">

          <div className="mx-auto mb-10 max-w-xl text-center">

            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#A44A3F]">
              Industry Connections
            </span>

            <h2 className="mt-3 font-serif text-3xl text-[#172A3A] sm:text-4xl">
              Connected to Nepal's Tourism Industry
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#74766F]">
              Explore organizations and tourism resources relevant to
              Nepal's travel sector.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            {ACCREDITATIONS.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-w-0 items-center gap-4 border border-[#E6DFD2] bg-white p-5 transition hover:border-[#D4B477] hover:shadow-sm sm:flex-col sm:items-center sm:p-7 sm:text-center"
              >

                <div className="flex h-16 w-20 shrink-0 items-center justify-center">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="max-h-14 max-w-full object-contain"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1 sm:flex-none">

                  <h3 className="text-sm font-semibold text-[#173747]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#74766F]">
                    {item.desc}
                  </p>

                </div>

                <ExternalLink
                  size={15}
                  className="shrink-0 text-[#A44A3F] transition group-hover:translate-x-0.5 sm:mt-1"
                />

              </a>
            ))}

          </div>

        </div>

      </section>

      {/* ===================================================
          6. TESTIMONIALS
      =================================================== */}

      <section className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-24 lg:px-14">

        <div className="mb-10 max-w-2xl">

          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-9 bg-[#A44A3F]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#A44A3F]">
              Traveller Experiences
            </span>
          </div>

          <h2 className="font-serif text-4xl leading-tight text-[#172A3A] sm:text-5xl">
            The journey is better

            <br className="hidden sm:block" />

            <span className="italic text-[#A44A3F]">
              {" "}when it feels personal.
            </span>
          </h2>

        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {REVIEWS.map((review) => (
            <article
              key={review.id}
              className="flex min-w-0 flex-col border border-[#E6DFD2] bg-white p-6 sm:p-7"
            >

              <div
                className="flex items-center gap-1 text-[#B48A45]"
                aria-label={`${review.rating} out of 5 stars`}
              >
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star
                    key={index}
                    size={13}
                    className="fill-current"
                  />
                ))}
              </div>

              <blockquote className="mt-6 flex-1 font-serif text-lg leading-7 text-[#344650]">
                “{review.comment}”
              </blockquote>

              <div className="mt-7 border-t border-[#EEE9E0] pt-5">

                <h3 className="text-sm font-semibold text-[#173747]">
                  {review.name}
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#74766F]">
                  {review.role} · {review.country}
                </p>

                <p className="mt-4 text-[10px] font-semibold uppercase leading-5 tracking-[0.08em] text-[#A44A3F]">
                  {review.package}
                </p>

              </div>

            </article>
          ))}

        </div>

      </section>

      {/* ===================================================
          7. FINAL CALL TO ACTION
      =================================================== */}

      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-14">

        <div className="relative mx-auto max-w-[1320px] overflow-hidden bg-[#EDE5D5] px-6 py-12 sm:px-12 sm:py-14 lg:px-16">

          <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-[#173747]/10" />

          <div className="pointer-events-none absolute -right-2 -top-8 h-48 w-48 rounded-full border border-[#173747]/10" />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

            <div className="max-w-2xl">

              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A44A3F]">
                Your Next Chapter Begins Here
              </span>

              <h2 className="mt-3 font-serif text-3xl leading-tight text-[#172A3A] sm:text-4xl">
                Let's make your next journey memorable.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#626B68]">
                Tell us where you want to go. We'll help you plan the way.
              </p>

            </div>

            <Link
              href="/contact-us"
              className="inline-flex shrink-0 items-center justify-center gap-3 self-start bg-[#173747] px-7 py-4 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#A44A3F] md:self-center"
            >
              Start Planning
              <ArrowRight size={16} />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}