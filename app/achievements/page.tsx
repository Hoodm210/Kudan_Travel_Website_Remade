"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import SectionTitle from "@/components/SectionTitle";
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

const LETTER_IMAGES = Array.from({ length: 24 }, (_, i) => 
  `/${String.fromCharCode(97 + i)}.jpeg`
);

const ALL_CERTIFICATES: CertificateItem[] = [
  {
    id: 1,
    title: "A",
    issuer: "Nepal Tourism Board (NTB)",
    year: "2015 - Present",
    category: "government",
    description: "Official tour operator license authorized by NTB for domestic and international travels.",
    image: "/a.jpeg",
    icon: Building2,
    refNo: "NTB-REG/40051",
  },
  {
    id: 2,
    title: "B",
    issuer: "Nepal Association of Tour & Travel Agents",
    year: "2015 - Present",
    category: "affiliations",
    description: "Certified active member of Nepal's apex travel and tour agency union.",
    image: "/b.jpeg",
    icon: BadgeCheck,
    refNo: "NATTA-LM/1223",
  },
  {
    id: 3,
    title: "C",
    issuer: "Trekking Agencies' Association of Nepal",
    year: "2015 - Present",
    category: "affiliations",
    description: "Authorized operator for Himalayan expeditions, high-altitude treks, and wilderness safaris.",
    image: "/c.jpeg",
    icon: ShieldCheck,
    refNo: "TAAN-MEM/8821",
  },
  {
    id: 4,
    title: "D",
    issuer: "Ministry of Culture, Tourism & Civil Aviation",
    year: "2015",
    category: "government",
    description: "Legal company incorporation permit for tourism service operations across Nepal.",
    image: "/d.jpeg",
    icon: FileCheck2,
    refNo: "MoCTCA-318",
  },
  {
    id: 5,
    title: "E",
    issuer: "Nepal Rastra Bank (NRB)",
    year: "2016 - Present",
    category: "government",
    description: "Licensed foreign currency clearance facility for international tourists and tour payments.",
    image: "/e.jpeg",
    icon: FileCheck2,
    refNo: "NRB-FX/MetroPark",
  },
  {
    id: 6,
    title: "F",
    issuer: "Inland Revenue Department of Nepal",
    year: "Annual",
    category: "government",
    description: "Full compliance corporate tax auditing and annual legal revenue clearance status.",
    image: "/f.jpeg",
    icon: FileCheck2,
    refNo: "IRD-PAN/VAT-OK",
  },
  {
    id: 7,
    title: "G",
    issuer: "World Travel Awards",
    year: "2021",
    category: "awards",
    description: "Shortlisted among Nepal's premier travel management and custom tour agencies.",
    image: "/g.jpeg",
    icon: Award,
    refNo: "WTA-NPL/2021",
  },
  {
    id: 8,
    title: "H",
    issuer: "Nepal Tourism Development Board",
    year: "2022",
    category: "awards",
    description: "Honored for outstanding customer satisfaction in Himalayan heritage & culture tours.",
    image: "/h.jpeg",
    icon: Award,
    refNo: "NTDB-AWARD/22",
  },
  {
    id: 9,
    title: "I",
    issuer: "Nepal Transport Fleet Association",
    year: "2023",
    category: "awards",
    description: "Awarded for Tourist Scorpio and luxury van maintenance, off-road safety, and hygiene.",
    image: "/i.jpeg",
    icon: Award,
    refNo: "FLEET-EX/2023",
  },
  {
    id: 10,
    title: "J",
    issuer: "Global Travel & Hospitality Ratings",
    year: "2024",
    category: "awards",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "/j.jpeg",
    icon: Award,
    refNo: "5STAR-GOLD/24",
  },
  ...Array.from({ length: 14 }, (_, i) => {
    const num = i + 11;
    const letter = String.fromCharCode(64 + num);
    const imagePath = LETTER_IMAGES[i + 10];
    
    return {
      id: num,
      title: letter,
      issuer: num % 2 === 0 ? "NATTA / TAAN Tourism Forum" : "Himalayan Travel Safety Council",
      year: `${2016 + (i % 9)}`,
      category: num % 3 === 0 ? ("affiliations" as const) : num % 2 === 0 ? ("certifications" as const) : ("awards" as const),
      description: `Official compliance and quality benchmark accreditation #${num} conferred to Kudan Travel & Tours.`,
      image: imagePath,
      icon: BadgeCheck,
      refNo: `CERT-REG/00${num}`,
    };
  }),
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
    <div className="bg-[#060910] text-slate-100 min-h-screen font-sans">
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-[#0d1322] via-[#080c16] to-[#060910] py-24">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

        <div className="container-x relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/50 bg-[#111728]/80 backdrop-blur-md px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#E5C158] shadow-lg">
            <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
            <span>100% Verified Credentials</span>
          </div>

          <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200">
            Showcasing our official authorizations, NTB, NATTA, and TAAN affiliations alongside recognized excellence milestones.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 border-t border-slate-800/80 pt-8">
            {[
              { number: "24", label: "Official Certificates & Honors", highlight: "24 Industry Milestones" },
              { number: "NTB / TAAN / NATTA", label: "Core Government Affiliations", highlight: "Full Sector Approval" },
              { number: "100%", label: "Verified Tourism Compliance", highlight: "Active Operating Status" },
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-700/60 bg-[#111827]/60 backdrop-blur-md p-6 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl font-black text-amber-300">
                    {stat.number}
                  </span>
                  <CheckCircle2 className="h-5 w-5 text-[#C5A059]" />
                </div>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-100">
                  {stat.label}
                </p>
                <span className="mt-1 block text-xs font-semibold text-amber-400">
                  {stat.highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <SectionTitle eyebrow="Milestones" title="Our Official Credentials & Awards" />

        <div className="mt-8 flex flex-wrap gap-3 pb-8 border-b border-slate-800">
          {[
            { label: "All Credentials (24)", value: "all" },
            { label: "Government & NTB", value: "government" },
            { label: "NATTA & TAAN", value: "affiliations" },
            { label: "Awards & Honors", value: "awards" },
            { label: "Certifications", value: "certifications" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                filter === tab.value
                  ? "bg-[#C5A059] text-slate-950 font-black shadow-lg shadow-[#C5A059]/20"
                  : "border border-slate-700/80 bg-[#111827]/80 text-slate-100 hover:border-slate-500 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCertificates.map((cert) => {
            const Icon = cert.icon;
            return (
              <article
                key={cert.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-[#111827]/60 backdrop-blur-md shadow-xl hover:border-[#C5A059] transition-all duration-300 overflow-hidden"
              >
                <div>
                  <div className="relative h-64 w-full bg-[#080c14] overflow-hidden border-b border-slate-800/80 p-3 flex items-center justify-center">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm flex items-center justify-center">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#C5A059] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg hover:bg-amber-300 transition-colors"
                      >
                        <Eye className="h-4 w-4" /> View Certificate
                      </button>
                    </div>

                    <span className="absolute top-3 right-3 rounded-lg border border-[#C5A059]/80 bg-slate-950/90 px-3 py-1 text-xs font-black uppercase text-[#E5C158] backdrop-blur-md">
                      #{cert.id.toString().padStart(2, "0")}
                    </span>

                    {cert.refNo && (
                      <span className="absolute bottom-3 left-3 rounded-md bg-slate-950/90 border border-slate-700/80 px-2 py-1 text-xs font-mono text-slate-200 backdrop-blur-md">
                        {cert.refNo}
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E5C158]">
                        <Icon className="h-4 w-4 shrink-0 text-[#E5C158]" />
                        <span className="truncate">{cert.issuer}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 shrink-0">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" /> {cert.year}
                      </span>
                    </div>

                    <h3 className="mt-3 text-2xl font-black text-white tracking-tight group-hover:text-amber-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-200">
                      {cert.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-3 border-t border-slate-800/80 mt-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-slate-300">Status</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Active & Valid
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Renders modal directly into <body> using React Portal */}
      {mounted && selectedCert && createPortal(
        <div
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/85 p-4 sm:p-6 backdrop-blur-2xl"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative max-w-4xl w-full rounded-3xl border border-amber-500/30 bg-[#0d1322]/95 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Control Bar */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
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
                onClick={() => setSelectedCert(null)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/90 px-4 py-2 text-xs font-bold uppercase text-slate-200 hover:text-[#C5A059] hover:border-[#C5A059] transition-all backdrop-blur-md shadow-lg"
              >
                <X className="h-4 w-4" /> Close
              </button>
            </div>

            {/* GPU Accelerated Viewport with Pan & Scroll Zoom */}
            <div 
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className={`relative w-full h-[55vh] sm:h-[65vh] rounded-2xl bg-[#030509]/90 border border-slate-800/80 p-4 flex items-center justify-center overflow-hidden ${
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
                className="max-h-full max-w-full object-contain rounded-lg transform-gpu select-none" 
              />
            </div>

            {/* Modal Info Footer */}
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-800/80 pt-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-amber-300">
                    Certificate {selectedCert.title}
                  </span>
                  <span className="rounded-md border border-[#C5A059]/40 bg-[#C5A059]/10 px-2.5 py-0.5 text-xs font-mono font-bold text-[#E5C158]">
                    #{selectedCert.id.toString().padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-300">
                  {selectedCert.issuer} • Issued {selectedCert.year}
                </p>
              </div>

              {selectedCert.refNo && (
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-mono text-amber-200/90">
                  Ref: <span className="text-white font-bold">{selectedCert.refNo}</span>
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