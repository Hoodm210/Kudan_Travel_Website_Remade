"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { 
  Award, 
  ShieldCheck, 
  BadgeCheck, 
  FileCheck2, 
  Building2, 
  Calendar, 
  Eye, 
  Sparkles, 
  X, 
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Trophy, 
  Medal,
  ArrowLeft,
  LucideIcon 
} from "lucide-react";

interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  year: string;
  category: "government" | "affiliations" | "awards" | "certifications";
  description: string;
  image: string;
  icon: LucideIcon;
  refNo?: string;
}

const ALL_CERTIFICATES: CertificateItem[] = [
  {
    id: 1,
    title: "4 Years of Shared Success",
    issuer: "Aloft by Marriott Kathmandu Thamel",
    year: "2015 - Present",
    category: "awards",
    description: "Official tour operator license authorized by NTB for domestic and international travels.",
    image: "/a.jpeg",
    icon: Trophy,
    refNo: "2015",
  },
  {
    id: 2,
    title: "Appreciation Award 2021",
    issuer: "Aloft by Marriott Kathmandu Thamel",
    year: "2021 - Present",
    category: "awards",
    description: "Certified active member of Nepal's apex travel and tour agency union.",
    image: "/b.jpeg",
    icon: Trophy,
    refNo: "2021",
  },
  {
    id: 3,
    title: "Celebrating Our Partnership",
    issuer: "Buddha Air",
    year: "2015 - Present",
    category: "affiliations",
    description: "Authorized operator for Himalayan expeditions, high-altitude treks, and wilderness safaris.",
    image: "/c.jpeg",
    icon: Trophy,
    refNo: "2015",
  },
  {
    id: 4,
    title: "Certificate Of Appreciation",
    issuer: "Fairfield By Marriot",
    year: "2023",
    category: "certifications",
    description: "Legal company incorporation permit for tourism service operations across Nepal.",
    image: "/d.jpeg",
    icon: FileCheck2,
    refNo: "2023",
  },
  {
    id: 5,
    title: "Certificate Of Appreciation",
    issuer: "IHG HOTELS AND RESORTS",
    year: "2016 - Present",
    category: "certifications",
    description: "Licensed foreign currency clearance facility for international tourists and tour payments.",
    image: "/e.jpeg",
    icon: FileCheck2,
    refNo: "2016",
  },
  {
    id: 6,
    title: "Certificate Of Appreciation",
    issuer: "LANDMARk HOTEL AND RESORTS",
    year: "Annual",
    category: "certifications",
    description: "Full compliance corporate tax auditing and annual legal revenue clearance status.",
    image: "/f.jpeg",
    icon: FileCheck2,
    refNo: "Certified",
  },
  {
    id: 7,
    title: "APPRECIATION AWARD 2019",
    issuer: "LUMBINI BIKASH KOSH",
    year: "2019",
    category: "government",
    description: "Shortlisted among Nepal's premier travel management and custom tour agencies.",
    image: "/g.jpeg",
    icon: Award,
    refNo: "2019",
  },
  {
    id: 8,
    title: "Certificate of Appreciation",
    issuer: "MAHABIR PALCE",
    year: "2024",
    category: "certifications",
    description: "Honored for outstanding customer satisfaction in Himalayan heritage & culture tours.",
    image: "/h.jpeg",
    icon: Award,
    refNo: "2024",
  },
  {
    id: 9,
    title: "Certificate of Appreciation",
    issuer: "FAIRFIELD BY MARRIOTT",
    year: "2024",
    category: "certifications",
    description: "Awarded for Tourist Scorpio and luxury van maintenance, off-road safety, and hygiene.",
    image: "/i.jpeg",
    icon: Award,
    refNo: "2024",
  },
  {
    id: 10,
    title: "Mark of Excellence",
    issuer: "NEPACHIN TOUR OPERATORS ALLIANCE",
    year: "2024",
    category: "government",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "/j.jpeg",
    icon: Award,
    refNo: "2024",
  },
  {
    id: 11,
    title: "Certificate of Appreciation",
    issuer: "PLPL-4 INDO-NEPAL CRICKET TOURNAMENT-2022",
    year: "2022",
    category: "certifications",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "/k.jpeg",
    icon: Award,
    refNo: "2022",
  },
  {
    id: 12,
    title: "Shangrilla Elite Award",
    issuer: "SHANGRI-LA HOTEL & RESORTS",
    year: "2018",
    category: "certifications",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "/l.jpeg",
    icon: Award,
    refNo: "2018",
  },
  {
    id: 13,
    title: "Elite Award",
    issuer: "SHANGRI-LA HOTEL & RESORTS",
    year: "2018",
    category: "awards",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "/m.jpeg",
    icon: Trophy,
    refNo: "2018",
  },
  {
    id: 14,
    title: "Golden Jubilee Award Highest Room Nights in 2016",
    issuer: "SOALTEE CROWNE PLAZA KATHMANDU",
    year: "2016",
    category: "awards",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "/n.jpeg",
    icon: Trophy,
    refNo: "2016",
  },
  {
    id: 15,
    title: "Golden Jubilee Award",
    issuer: "SOALTEE CROWNE PLAZA KATHMANDU",
    year: "2016",
    category: "certifications",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "/o.jpeg",
    icon: Award,
    refNo: "2016",
  },
  {
    id: 16,
    title: "Certificate of Appreciation",
    issuer: "THE SOALTEE KATHMANDU",
    year: "2023",
    category: "awards",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "/p.jpeg",
    icon: Trophy,
    refNo: "2023",
  },
  {
    id: 17,
    title: "Certificate of Appreciation",
    issuer: "THE SOALTEE KATHMANDU AND MARRIOT BONVOY",
    year: "2025",
    category: "government",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "/q.jpeg",
    icon: FileCheck2,
    refNo: "2025",
  },
  {
    id: 18,
    title: "Certificate Priority Agents",
    issuer: "LORDS HOTEL AND RESORTS, Exhilarating Hospitality",
    year: "2025",
    category: "government",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "/r.jpeg",
    icon: FileCheck2,
    refNo: "2025",
  },
  {
    id: 19,
    title: "Certificate of Appreciation",
    issuer: "HYATT CENTRIC",
    year: "2026",
    category: "government",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "/s.jpeg",
    icon: Award,
    refNo: "2026",
  },
  {
    id: 20,
    title: "Certificate of Appreciation",
    issuer: "ALOFT KATHMANDU",
    year: "2025",
    category: "government",
    description: "6 YEARS OF SHARING SUCCESS",
    image: "/t.jpeg",
    icon: Award,
    refNo: "2025",
  },
  {
    id: 21,
    title: "A YEAR OF GRATITUDE & THANKYOU",
    issuer: "MERCURE HOTEL KATHMANDU",
    year: "2026",
    category: "government",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "/u.jpeg",
    icon: Award,
    refNo: "2026",
  },
  {
    id: 22,
    title: "CERTIFICATE OF APPRECIATION",
    issuer: "RADISSON HOTEL KATHMANDU",
    year: "2024",
    category: "government",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "/v.jpeg",
    icon: Award,
    refNo: "2024",
  },
  {
    id: 23,
    title: "Certificate of Appreciation",
    issuer: "IHG, HOLIDAY INN EXPRESS ",
    year: "2023",
    category: "government",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "/w.jpeg",
    icon: Award,
    refNo: "2023",
  },
  {
    id: 24,
    title: "CERTIFICATE OF APPRECIATION",
    issuer: "FAIRFIELD BY MARRIOT KATHMANDU",
    year: "2025",
    category: "government",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "/x.jpeg",
    icon: Award,
    refNo: "2025",
  },
];

export default function Achievements() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  // Smooth Zoom & Pan state
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedCert]);

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

  const filteredCertificates = ALL_CERTIFICATES.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <div className="bg-[#F7F5F0] text-[#172A3A] font-serif selection:bg-[#A44A3F] selection:text-white min-h-screen relative overflow-x-hidden py-8 sm:py-12 lg:py-20">
      
      {/* HEADER SECTION */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mb-12 sm:mb-16">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-sans font-extrabold uppercase tracking-widest text-stone-500 hover:text-[#A44A3F] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="border-b border-stone-200/90 pb-6 mb-8 font-sans">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#A44A3F] flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#A44A3F]" />
            100% Verified Credentials & Milestones
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#172A3A] mt-2">
            Our Official Honors & Awards
          </h1>
          <p className="mt-3 max-w-3xl text-xs sm:text-sm lg:text-base leading-relaxed text-stone-600 font-normal">
            Showcasing our official authorizations, partner hotel recognitions, and industry excellence milestones across South Asia.
          </p>
        </div>

        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-3 font-sans">
          {[
            { number: "24", label: "Official Certificates & Honors", highlight: "24 Industry Milestones" },
            { number: "Partners", label: "Core Hotel & Airline Affiliations", highlight: "Full Sector Approval" },
            { number: "100%", label: "Verified Tourism Compliance", highlight: "Active Operating Status" },
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white border border-stone-200/90 p-4 sm:p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#172A3A]">
                  {stat.number}
                </span>
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-stone-700">
                {stat.label}
              </p>
              <span className="mt-1 block text-[11px] font-medium text-[#A44A3F]">
                {stat.highlight}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FILTER & GALLERY SECTION */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Responsive Flex Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-stone-200/90 font-sans">
          {[
            { label: "All Credentials (24)", value: "all" },
            { label: "Government & NTB", value: "government" },
            { label: "Affiliations", value: "affiliations" },
            { label: "Awards & Honors", value: "awards" },
            { label: "Certifications", value: "certifications" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider sm:tracking-widest transition-all ${
                filter === tab.value
                  ? "bg-[#172A3A] text-white shadow-xs"
                  : "border border-stone-300 bg-white text-stone-700 hover:border-[#A44A3F] hover:text-[#A44A3F]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CERTIFICATE GRID */}
        <div className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 font-sans">
          {filteredCertificates.map((cert) => {
            const Icon = cert.icon;
            return (
              <article
                key={cert.id}
                className="group flex flex-col justify-between bg-white border border-stone-200/90 p-4 shadow-sm hover:border-[#A44A3F] transition-all"
              >
                <div>
                  {/* BORDERLESS IMAGE CONTAINER */}
                  <div className="relative h-56 sm:h-64 w-full bg-stone-100 overflow-hidden flex items-center justify-center p-2">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 select-none"
                    />
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-[2px] flex items-center justify-center">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex items-center gap-2 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-[#172A3A] shadow-md hover:bg-[#A44A3F] hover:text-white transition-colors"
                      >
                        <Eye size={14} /> View Certificate
                      </button>
                    </div>

                    <span className="absolute top-2 right-2 bg-white px-2 py-0.5 text-[10px] font-mono font-extrabold text-[#172A3A] border border-stone-200 shadow-xs">
                      #{cert.id.toString().padStart(2, "0")}
                    </span>

                    {cert.refNo && (
                      <span className="absolute bottom-2 left-2 bg-white/90 border border-stone-200 px-2 py-0.5 text-[10px] font-mono text-stone-700">
                        {cert.refNo}
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#A44A3F] min-w-0">
                        <Icon size={13} className="shrink-0 text-[#A44A3F]" />
                        <span className="truncate">{cert.issuer}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-500 shrink-0">
                        <Calendar size={12} className="text-stone-400" /> {cert.year}
                      </span>
                    </div>

                    <h3 className="mt-2 text-base sm:text-lg font-serif font-bold text-[#172A3A] group-hover:text-[#A44A3F] transition-colors leading-snug">
                      {cert.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-stone-600 font-normal line-clamp-2">
                      {cert.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  <span>Status</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Active & Valid
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE ZOOM & PAN MODAL PORTAL */}
      {mounted && selectedCert && createPortal(
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-sm font-sans"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white border border-stone-200 p-4 sm:p-8 shadow-2xl max-h-[92vh] flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:absolute sm:top-6 sm:right-6 sm:z-20">
              <div className="flex items-center gap-1 border border-stone-300 bg-[#EFECE6] p-1">
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
                onClick={() => setSelectedCert(null)}
                className="inline-flex items-center gap-1.5 border border-stone-300 bg-white px-3 py-1.5 text-xs font-extrabold uppercase text-[#172A3A] hover:bg-[#A44A3F] hover:text-white transition-colors shadow-xs"
              >
                <X size={15} /> Close
              </button>
            </div>

            {/* GPU Accelerated Viewport with Pan & Scroll Zoom */}
            <div 
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={`relative w-full h-[50vh] sm:h-[65vh] bg-stone-100 border border-stone-200 p-2 sm:p-4 flex items-center justify-center overflow-hidden mt-2 sm:mt-0 ${
                scale > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
              }`}
            >
              <img 
                src={selectedCert.image} 
                alt={selectedCert.title} 
                draggable={false}
                style={{ 
                  transform: `translate3d(${position.x}px, ${position.y}px, 0px) scale(${scale})`,
                  transition: isDragging ? "none" : "transform 0.15s cubic-bezier(0.2, 0, 0, 1)",
                  willChange: "transform"
                }}
                className="max-h-full max-w-full object-contain select-none" 
              />
            </div>

            {/* Modal Info Footer */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-stone-200 pt-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#172A3A]">
                    {selectedCert.title}
                  </h3>
                  <span className="border border-stone-300 bg-[#EFECE6] px-2 py-0.5 text-[10px] font-mono font-bold text-[#172A3A]">
                    #{selectedCert.id.toString().padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1 text-xs text-stone-600 font-normal">
                  {selectedCert.issuer} — Issued {selectedCert.year}
                </p>
              </div>

              {selectedCert.refNo && (
                <div className="border border-stone-300 bg-stone-50 px-3 py-1.5 text-xs font-mono text-stone-700">
                  Ref: <span className="text-[#172A3A] font-bold">{selectedCert.refNo}</span>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}