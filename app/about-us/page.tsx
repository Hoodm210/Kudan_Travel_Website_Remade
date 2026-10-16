"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
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
    <div className="bg-[#F7F5F0] text-[#172A3A] font-serif selection:bg-[#A44A3F] selection:text-white min-h-screen relative overflow-x-hidden py-12 lg:py-20">
      
      {/* HERO SECTION WITH BORDERLESS BANNER */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mb-16">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-stone-200 shadow-md">
          <img
            src="/landscape-hero.jpg" 
            alt="Scenic Mountain Landscape"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 font-sans">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#A44A3F] bg-white px-3 py-1 shadow-xs">
              <Mountain size={12} />
              EXTRAORDINARY JOURNEYS ACROSS SOUTH ASIA
            </span>
            <h1 className="mt-3 text-2xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Explore Beyond. <br className="hidden sm:inline" /> Guided by Experts.
            </h1>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 sm:p-8 shadow-sm font-sans">
          <p className="text-stone-600 leading-relaxed text-sm sm:text-base font-normal">
            Kudan Travel & Tours Pvt. Ltd. delivers breathtaking alpine expeditions, cultural heritage tours, and seamless ground logistics across Nepal and beyond.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-wider text-[#A44A3F]">
            <div className="flex items-center gap-2 bg-[#EFECE6] px-3.5 py-2">
              <MapPin size={14} className="text-[#A44A3F]" />
              <span>Himalayan Expeditions</span>
            </div>
            <div className="flex items-center gap-2 bg-[#EFECE6] px-3.5 py-2">
              <Globe size={14} className="text-[#A44A3F]" />
              <span>International Group Tours</span>
            </div>
            <div className="flex items-center gap-2 bg-[#EFECE6] px-3.5 py-2">
              <Users size={14} className="text-[#A44A3F]" />
              <span>Dedicated Local Specialists</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PILLARS SECTION */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl mb-16">
        <div className="border-b border-stone-200/90 pb-4 mb-8">
          <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#A44A3F]">
            OUR VALUES
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#172A3A]">What Drives Kudan Travel</h2>
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
                className={`group cursor-pointer bg-white p-6 transition-all duration-300 flex flex-col justify-between shadow-sm font-sans ${
                  isSelected 
                    ? "ring-2 ring-[#A44A3F]" 
                    : "hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex bg-[#EFECE6] p-2.5 text-[#A44A3F]">
                      <Compass className="h-6 w-6 text-[#A44A3F]" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#A44A3F] flex items-center gap-1">
                      {isSelected ? "Collapse" : "Explore"} &rarr;
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-[#172A3A] group-hover:text-[#A44A3F] transition-colors">{pillar.title}</h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-600">{pillar.shortDesc}</p>
                </div>

                {isSelected && (
                  <div className="mt-6 pt-6 border-t border-stone-100 space-y-4">
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic bg-[#EFECE6] p-3">
                      &quot;{pillar.fullDesc}&quot;
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#A44A3F]">Key Highlights</h4>
                      {pillar.keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 font-medium">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
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
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="border-b border-stone-200/90 pb-4 mb-8">
          <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#A44A3F]">
            OUR TEAM
          </span>
          <h2 className="text-2xl font-serif font-bold text-[#172A3A]">Meet the Team Behind the Journey</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 font-sans">
          {teamMembers.map((member) => {
            const [cardImgSrc, setCardImgSrc] = useState(member.image || "");

            return (
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
                className="group cursor-pointer flex flex-col justify-between bg-white p-5 shadow-sm hover:shadow-md transition-all relative"
              >
                <div>
                  {/* BORDERLESS FLUSH IMAGE CONTAINER */}
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                    {member.image && !imgError[member.id] ? (
                      <img
                        src={cardImgSrc}
                        alt={member.name}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        onError={() => {
                          handleImageError(member.id);
                          setCardImgSrc("https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80");
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-2xl font-extrabold text-[#172A3A]">
                        {member.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}

                    <div className="absolute top-2 right-2 flex items-center gap-1.5">
                      <div className="bg-white/90 p-1.5 text-xs text-[#A44A3F] shadow-xs group-hover:bg-[#172A3A] group-hover:text-white transition-colors">
                        <Eye size={13} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-base font-serif font-bold text-[#172A3A] group-hover:text-[#A44A3F] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#A44A3F] mt-0.5">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-bold text-[#172A3A] flex items-center justify-between">
                  <span>View Profile & Contact</span>
                  <span>&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE TEAM MEMBER ZOOM & PROFILE MODAL */}
      {mounted && viewMember && createPortal(
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-sm overflow-y-auto font-sans"
          onClick={() => setViewMember(null)}
        >
          <div 
            className="relative max-w-4xl w-full my-auto bg-white p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Controls */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-[#A44A3F]" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#172A3A]">
                  Staff Profile & Photo Viewer
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-[#EFECE6] p-1">
                  <button
                    onClick={handleZoomIn}
                    title="Zoom In"
                    className="p-1 text-[#172A3A] hover:text-[#A44A3F] transition-colors"
                  >
                    <ZoomIn size={15} />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    title="Zoom Out"
                    className="p-1 text-[#172A3A] hover:text-[#A44A3F] transition-colors"
                  >
                    <ZoomOut size={15} />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    title="Reset Zoom"
                    className="p-1 text-[#172A3A] hover:text-[#A44A3F] transition-colors"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <span className="px-2 text-[10px] font-mono font-bold text-[#172A3A] border-l border-stone-300">
                    {Math.round(scale * 100)}%
                  </span>
                </div>

                <button
                  onClick={() => setViewMember(null)}
                  className="inline-flex items-center p-1.5 bg-white text-[#172A3A] hover:bg-[#A44A3F] hover:text-white transition-colors shadow-xs"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Split Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left Column: BORDERLESS Interactive Zoom Canvas */}
              <div className="lg:col-span-7 flex flex-col">
                <div 
                  onWheel={handleWheel}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className={`relative w-full h-[38vh] sm:h-[45vh] bg-stone-100 p-2 flex items-center justify-center overflow-hidden ${
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
                      className="max-h-full max-w-full object-contain select-none" 
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-stone-400 gap-2">
                      <span className="text-4xl font-black text-[#172A3A]">
                        {viewMember.name.substring(0, 2).toUpperCase()}
                      </span>
                      <span className="text-xs uppercase font-mono tracking-widest text-stone-400">No Image Preview</span>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-center text-stone-500 mt-2 font-mono">
                  Scroll or drag to zoom photo
                </p>
              </div>

              {/* Right Column: Member Details */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <div>
                    <span className="inline-block bg-[#EFECE6] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#A44A3F]">
                      {viewMember.role}
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-[#172A3A] mt-2">
                      {viewMember.name}
                    </h2>
                  </div>

                  {viewMember.experienceYears && (
                    <div className="inline-flex items-center gap-1.5 bg-stone-50 px-2.5 py-1 text-xs font-bold text-stone-700">
                      <ShieldCheck size={14} className="text-[#A44A3F]" />
                      <span>{viewMember.experienceYears}+ Years Industry Experience</span>
                    </div>
                  )}

                  {/* Direct Contact Links */}
                  <div className="space-y-2 pt-1">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#A44A3F]">Direct Contact</h4>
                    
                    <div className="flex items-center gap-3 bg-[#EFECE6] p-2.5">
                      <Mail size={14} className="text-[#A44A3F] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[9px] font-extrabold uppercase text-stone-500">Email</p>
                        <a href={`mailto:${viewMember.email}`} className="text-xs font-bold text-[#172A3A] hover:text-[#A44A3F] truncate block">
                          {viewMember.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-[#EFECE6] p-2.5">
                      <Phone size={14} className="text-[#A44A3F] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[9px] font-extrabold uppercase text-stone-500">Phone</p>
                        <a href={`tel:${viewMember.phone}`} className="text-xs font-bold text-[#172A3A] hover:text-[#A44A3F] block">
                          {viewMember.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Overview Text */}
                  <div>
                    <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[#A44A3F] mb-1">Overview & Role</h4>
                    <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3">
                      {viewMember.overview}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setViewMember(null)}
                  className="w-full py-2.5 bg-[#172A3A] hover:bg-[#A44A3F] text-white font-extrabold uppercase tracking-widest text-xs transition-colors"
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