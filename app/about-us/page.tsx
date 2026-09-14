"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { 
  Users, 
  X, 
  Mail, 
  Phone, 
  ShieldCheck, 
  UserCheck, 
  CheckCircle2,
  Compass,
  Globe,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  Mountain,
  MapPin
} from "lucide-react";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  languages: string[];
  phone: string;
  email: string;
  experienceYears?: number;
  overview: string;
}

interface Pillar {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  keyPoints: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: "hari-parajuli",
    name: "Hari Parajuli",
    role: "Managing Director",
    image: "/hari.png",
    languages: ["English", "Nepali"],
    phone: "+977 9851121207",
    email: "Md@kudantravel.com",
    experienceYears: 15,
    overview: "Hari leads Kudan Travel with strategic leadership, driving business development, regional partnerships, and high-standard travel operations."
  },
  {
    id: "neha-shrestha",
    name: "Neha Shrestha",
    role: "General Manager",
    image: "/neha.jpg",
    languages: ["English", "Nepali"],
    phone: "+977 9851247722",
    email: "aatma_sl@hotmail.com",
    experienceYears: 15,
    overview: "Neha manages core travel operations, overseeing group itineraries, reservation workflows, and guest hospitality services."
  },
  {
    id: "milan-khadgi",
    name: "Milan Khadgi",
    role: "Transport Manager",
    image: "/milan.jpg",
    languages: ["English", "Nepali"],
    phone: "+977 9851024080",
    email: "milan@kudantravel.com",
    experienceYears: 15,
    overview: "Milan directs overall vehicle logistics, driver scheduling, luxury tourist transport, and airport transfer services."
  },
  {
    id: "binod-maharjan",
    name: "Binod Maharjan",
    role: "Japanese Assistance Lead",
    image: "/binod.jpg",
    languages: ["Japanese", "English", "Nepali"],
    phone: "+977 9841069248",
    email: "binod@kudantravel.com",
    experienceYears: 12,
    overview: "Binod specializes in Japanese client relations, providing custom itinerary planning, translation, and dedicated guest assistance."
  },
  {
    id: "ramesh-bhandari",
    name: "Ramesh Bhandari",
    role: "Account Manager",
    image: "/ramesh.jpg",
    languages: ["English", "Nepali"],
    phone: "+977 9851067097",
    email: "accounts@kudantravel.com",
    experienceYears: 14,
    overview: "Ramesh handles corporate account accounts, billing administration, partner settlement tracking, and financial reconciliation."
  },
  {
    id: "kamal-paudyal",
    name: "Kamal Paudyal",
    role: "Operations Manager",
    image: "/kamal.jpg",
    languages: ["English", "Nepali"],
    phone: "+977 9851000006",
    email: "kamal@kudantravel.com",
    experienceYears: 14,
    overview: "Kamal coordinates ground execution for trekking and tour packages, overseeing logistics permits and field safety."
  },
  {
    id: "rana-jung-thapa",
    name: "Rana Jung Thapa",
    role: "Relationship Manager",
    image: "/rana.jpg",
    languages: ["English", "Nepali"],
    phone: "+977 9851130158",
    email: "info@kudantravel.com",
    experienceYears: 14,
    overview: "Rana manages long-term client relations, agency partnerships, and pre-departure consultation services."
  },
  {
    id: "dipendra-khadka",
    name: "Dipendra Khadka",
    role: "Senior Accountant",
    image: "/dipendra.jpg",
    languages: ["English", "Nepali"],
    phone: "+977 9841908320",
    email: "dipendra@kudantravel.com",
    experienceYears: 13,
    overview: "Dipendra oversees internal audits, general ledger accounts, tax compliance, and vendor financial transactions."
  },
  {
    id: "krishna-prasad-mukhiya",
    name: "Krishna Prasad Mukhiya",
    role: "Accountant & IT Officer",
    image: "/krishna.jpg",
    languages: ["English", "Nepali"],
    phone: "+977 9851196584",
    email: "krishna@kudantravel.com",
    experienceYears: 12,
    overview: "Krishna leads financial tracking, daily ledger operations, digital platform updates, and IT infrastructure management."
  },
  {
    id: "naisha-khadgi",
    name: "Naisha Khadgi",
    role: "Operations Assistant",
    image: "/naisha.jpg",
    languages: ["English", "Nepali"],
    phone: "+977 9840030878",
    email: "naisha@kudantravel.com",
    experienceYears: 4,
    overview: "Naisha supports daily office administration, tour reservations, hotel bookings, and customer coordination."
  },
  {
    id: "rasul-maharjan",
    name: "Rasul Maharjan",
    role: "Jr. Accountant",
    image: "/rasul.jpg",
    languages: ["English", "Nepali"],
    phone: "+977 9709020750",
    email: "rasul@kudantravel.com",
    experienceYears: 3,
    overview: "Rasul manages invoicing records, receipt processing, payment collection entries, and financial documentation."
  },
  {
    id: "adikshya-maharjan",
    name: "Adikshya Maharjan",
    role: "Front Desk Officer",
    image: "/adikshya.jpg",
    languages: ["English", "Nepali"],
    phone: "+977 9841396764",
    email: "info@kudantravel.com",
    experienceYears: 3,
    overview: "Adikshya manages front desk reception, handles incoming calls, and assists walk-in clients with preliminary inquiries."
  },
  {
    id: "sushant-bista",
    name: "Sushant Bista",
    role: "Client Interaction Officer",
    image: "/sushant.jpg",
    languages: ["English", "Nepali"],
    phone: "+977 9840337383",
    email: "info@kudantravel.com",
    experienceYears: 2,
    overview: "Sushant acts as the key contact point for incoming tourists, facilitating tour briefings, feedback, and special requests."
  },
  {
    id: "lekhnath-dhungel",
    name: "Lekhnath Dhungel",
    role: "Senior Fleet Driver",
    image: "/lekhnath.jpg",
    languages: ["Nepali"],
    phone: "+977 9851000014",
    email: "transport@kudantravel.com",
    experienceYears: 2,
    overview: "Lekhnath provides safe and reliable long-distance driving services for tourist groups and private overland travel."
  },
  {
    id: "dinesh-manandhar",
    name: "Dinesh Manandhar",
    role: "Transport Operator",
    image: "/dinesh.jpg",
    languages: ["Nepali"],
    phone: "+977 9851000015",
    email: "transport@kudantravel.com",
    experienceYears: 9,
    overview: "Dinesh manages vehicle readiness, route navigation, and local ground transport operations for incoming guests."
  }
];

const corePillars: Pillar[] = [
  {
    id: "vision",
    title: "Our Vision",
    shortDesc: "Make travel feel easier, more personal, and more meaningful through transparent service and curated journeys.",
    fullDesc: "We envision becoming South Asia's premier personalized travel partner by seamlessly combining digital convenience with warm, authentic local guidance.",
    keyPoints: [
      "Sustainable & eco-conscious tour curation",
      "Seamless digital booking & transparent pricing",
      "Empowering local mountain communities and guides"
    ]
  },
  {
    id: "mission",
    title: "Our Mission",
    shortDesc: "Deliver well-planned itineraries backed by dedicated local experts, ethical operations, and 24/7 client support.",
    fullDesc: "Our mission is to take the hassle out of travel planning. We design itineraries that reflect real local expertise and adhere strictly to safety, comfort, and reliability standards.",
    keyPoints: [
      "Certified local guides & high-altitude safety protocols",
      "Customized group & individual travel packages",
      "24/7 real-time on-ground support"
    ]
  },
  {
    id: "promise",
    title: "Our Promise",
    shortDesc: "Be reachable, responsible, and practical at every stage of your trip—from pre-booking inquiry to safe return.",
    fullDesc: "We promise clear communication, honest guidance, and direct human help at all times. When you travel with Kudan, you are supported by dedicated professionals every step of the way.",
    keyPoints: [
      "No hidden fees or unexpected surcharges",
      "Prompt emergency response and flexible re-routing",
      "Dedicated point of contact for every booking"
    ]
  }
];

export default function About() {
  const [viewMember, setViewMember] = useState<TeamMember | null>(null);
  const [activePillar, setActivePillar] = useState<Pillar | null>(null);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState<boolean>(false);

  // Smooth Zoom & Pan State
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (viewMember) {
      document.body.style.overflow = "hidden";
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      document.body.style.overflow = "auto";
    }
  }, [viewMember]);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.4, 4));
  const handleZoomOut = () => {
    setScale((prev) => {
      const nextScale = Math.max(prev - 0.4, 1);
      if (nextScale === 1) setPosition({ x: 0, y: 0 });
      return nextScale;
    });
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.25 : -0.25;
    setScale((prev) => {
      const nextScale = Math.min(Math.max(prev + zoomDelta, 1), 4);
      if (nextScale === 1) setPosition({ x: 0, y: 0 });
      return nextScale;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || scale <= 1) return;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleImageError = (id: string) => {
    setImgError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="bg-[#060910] text-slate-100 min-h-screen font-sans relative overflow-x-hidden">
      
      {/* HERO SECTION WITH LANDSCAPE BACKGROUND */}
      <section className="relative min-h-[640px] overflow-hidden border-b border-slate-800 py-28 flex items-center">
        {/* Landscape Overlay Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/landscape-hero.jpg" 
            alt="Scenic Mountain Landscape"
            fill
            priority
            className="object-cover object-center opacity-35 filter brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060910] via-[#060910]/70 to-[#0d1322]/85" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/50 bg-[#111827]/90 backdrop-blur-md px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#E5C158] shadow-md">
            <Mountain className="h-4 w-4 text-amber-300" />
            <span>Extraordinary Journeys Across South Asia</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Explore Beyond. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#F5D880] via-[#C5A059] to-[#A07D32] bg-clip-text text-transparent">
              Guided by Experts.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200 bg-[#060910]/80 backdrop-blur-md p-5 rounded-xl border border-slate-800/80 shadow-2xl">
            Kudan Travel & Tours Pvt. Ltd. delivers breathtaking alpine expeditions, cultural heritage tours, and seamless logistics across Nepal and beyond.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider text-[#E5C158]">
            <div className="flex items-center gap-2 bg-[#111827]/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-800">
              <MapPin className="h-4 w-4 text-[#C5A059]" />
              <span>Himalayan Expeditions</span>
            </div>
            <div className="flex items-center gap-2 bg-[#111827]/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-800">
              <Globe className="h-4 w-4 text-[#C5A059]" />
              <span>International Group Tours</span>
            </div>
            <div className="flex items-center gap-2 bg-[#111827]/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-800">
              <Users className="h-4 w-4 text-[#C5A059]" />
              <span>Dedicated Local Specialists</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PILLARS SECTION */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158]">Our Values</span>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">What Drives Kudan Travel</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">Click any card below to explore our operational pillars.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {corePillars.map((pillar) => {
            const isSelected = activePillar?.id === pillar.id;

            return (
              <div
                key={pillar.id}
                role="button"
                tabIndex={0}
                onClick={() => setActivePillar(isSelected ? null : pillar)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActivePillar(isSelected ? null : pillar);
                  }
                }}
                className={`group cursor-pointer rounded-2xl border p-8 shadow-2xl transition-all duration-300 flex flex-col justify-between backdrop-blur-md ${
                  isSelected 
                    ? "border-[#C5A059] bg-[#151e33]/90 ring-1 ring-[#C5A059]" 
                    : "border-slate-700/80 bg-[#111827]/80 hover:border-[#C5A059]/80 hover:bg-[#151e33]/90"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex rounded-xl border border-[#C5A059] bg-[#060910] p-3 text-amber-300 group-hover:scale-110 transition-transform">
                      <Compass className="h-7 w-7 text-[#E5C158]" />
                    </div>
                    <span className="text-xs font-semibold text-[#E5C158] opacity-80 group-hover:opacity-100 flex items-center gap-1">
                      {isSelected ? "Collapse" : "Explore"} &rarr;
                    </span>
                  </div>
                  
                  <h3 className="mt-5 text-2xl font-black text-white group-hover:text-[#E5C158] transition-colors">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{pillar.shortDesc}</p>
                </div>

                {isSelected && (
                  <div className="mt-6 pt-6 border-t border-slate-700/80 animate-fadeIn space-y-4">
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic bg-[#060910]/70 p-3 rounded-lg border border-slate-800">
                      &quot;{pillar.fullDesc}&quot;
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5C158]">Key Highlights</h4>
                      {pillar.keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="border-t border-slate-800 bg-[#080c16]/90 backdrop-blur-sm py-20 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158]">OUR TEAM</span>
            <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Meet the Team Behind the Journey</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">Click any card to open the interactive photo viewer & full profile.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                role="button"
                tabIndex={0}
                onClick={() => setViewMember(member)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setViewMember(member);
                  }
                }}
                className="group cursor-pointer flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-[#111827]/80 p-6 shadow-xl hover:border-[#C5A059] hover:bg-[#151e33] transition-all transform hover:-translate-y-2 hover:shadow-2xl backdrop-blur-md relative"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden rounded-xl border-2 border-slate-800 bg-[#060910] shadow-2xl group-hover:border-[#C5A059] transition-all">
                    {member.image && !imgError[member.id] ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                        onError={() => handleImageError(member.id)}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-3xl font-black text-[#E5C158]">
                        {member.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <div className="rounded-full bg-[#060910]/80 backdrop-blur-md p-2 text-xs text-[#E5C158] border border-[#C5A059]/40 shadow-lg group-hover:bg-[#C5A059] group-hover:text-black transition-colors">
                        <Eye className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                      {member.name}
                    </h3>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#E5C158] mt-0.5">
                    {member.role}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-semibold text-amber-300/90 flex items-center justify-between">
                  <span>Open Zoom Viewer & Profile</span>
                  <span>&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECT COMBINED ZOOM & DETAIL PORTAL MODAL */}
      {mounted && viewMember && createPortal(
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/90 p-3 sm:p-6 backdrop-blur-2xl overflow-y-auto"
          onClick={() => setViewMember(null)}
        >
          <div 
            className="relative max-w-5xl w-full my-auto rounded-3xl border border-[#C5A059]/40 bg-[#0d1322]/95 p-5 sm:p-8 shadow-[0_0_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Controls */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-[#C5A059]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158]">
                  Staff Profile & Interactive Viewer
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="flex items-center gap-1 rounded-xl border border-slate-700/80 bg-slate-900/90 p-1 backdrop-blur-md shadow-lg">
                  <button
                    onClick={handleZoomIn}
                    title="Zoom In"
                    className="rounded-lg p-1.5 text-slate-200 hover:text-amber-300 hover:bg-slate-800 transition-colors"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    title="Zoom Out"
                    className="rounded-lg p-1.5 text-slate-200 hover:text-amber-300 hover:bg-slate-800 transition-colors"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    title="Reset Zoom"
                    className="rounded-lg p-1.5 text-slate-200 hover:text-amber-300 hover:bg-slate-800 transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-2 text-[11px] font-mono font-semibold text-amber-300 border-l border-slate-700/60">
                    {Math.round(scale * 100)}%
                  </span>
                </div>

                <button
                  onClick={() => setViewMember(null)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3 py-2 text-xs font-bold uppercase text-slate-200 hover:text-[#C5A059] hover:border-[#C5A059] transition-all backdrop-blur-md shadow-lg"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Split Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: Interactive Zoom Canvas */}
              <div className="lg:col-span-7 flex flex-col">
                <div 
                  onWheel={handleWheel}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className={`relative w-full h-[40vh] sm:h-[48vh] rounded-2xl bg-[#030509]/90 border border-slate-800 p-2 flex items-center justify-center overflow-hidden ${
                    scale > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
                  }`}
                >
                  {viewMember.image && !imgError[viewMember.id] ? (
                    <img 
                      src={viewMember.image} 
                      alt={viewMember.name} 
                      draggable={false}
                      style={{ 
                        transform: `translate3d(${position.x}px, ${position.y}px, 0px) scale(${scale})`,
                        transition: isDragging ? "none" : "transform 0.15s cubic-bezier(0.2, 0, 0, 1)",
                        willChange: "transform"
                      }}
                      className="max-h-full max-w-full object-contain rounded-lg transform-gpu select-none" 
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                      <span className="text-5xl font-black text-[#E5C158]">
                        {viewMember.name.substring(0, 2).toUpperCase()}
                      </span>
                      <span className="text-xs uppercase font-mono tracking-widest text-slate-500">No Image Preview Available</span>
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-center text-slate-500 mt-2 font-mono">
                  Scroll or drag to zoom and navigate image
                </p>
              </div>

              {/* Right Column: Member Details */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div>
                    <span className="inline-block rounded-md bg-[#C5A059]/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#E5C158] border border-[#C5A059]/30">
                      {viewMember.role}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                      {viewMember.name}
                    </h2>
                  </div>

                  {viewMember.experienceYears && (
                    <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#C5A059]/10 px-3 py-1.5 text-xs font-medium text-amber-300 border border-[#C5A059]/30">
                      <ShieldCheck className="h-4 w-4 text-[#C5A059]" />
                      <span>{viewMember.experienceYears}+ Years Industry Experience</span>
                    </div>
                  )}

                  {/* Direct Contact Links */}
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5C158]">Direct Contact</h4>
                    
                    <div className="flex items-center gap-3 rounded-xl bg-[#111827] p-3 border border-slate-800">
                      <Mail className="h-4 w-4 text-[#C5A059] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase text-slate-400">Email</p>
                        <a href={`mailto:${viewMember.email}`} className="text-xs font-bold text-[#E5C158] hover:underline truncate block">
                          {viewMember.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl bg-[#111827] p-3 border border-slate-800">
                      <Phone className="h-4 w-4 text-[#C5A059] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase text-slate-400">Phone</p>
                        <a href={`tel:${viewMember.phone}`} className="text-xs font-bold text-slate-200 hover:text-[#E5C158] block">
                          {viewMember.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Overview Text */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5C158] mb-1.5">Overview & Role</h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-300 bg-[#111827]/80 p-3.5 rounded-xl border border-slate-800">
                      {viewMember.overview}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setViewMember(null)}
                  className="w-full py-3 rounded-xl bg-[#C5A059] text-black font-bold uppercase tracking-wider text-xs hover:bg-amber-400 transition-colors mt-2"
                >
                  Close Viewer
                </button>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}