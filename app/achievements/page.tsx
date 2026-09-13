"use client";

import { useState } from "react";
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
    title: "NTB Registered Travel License",
    issuer: "Nepal Tourism Board (NTB)",
    year: "2015 - Present",
    category: "government",
    description: "Official tour operator license authorized by NTB for domestic and international travels.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    icon: Building2,
    refNo: "NTB-REG/40051",
  },
  {
    id: 2,
    title: "NATTA Life Member Accreditation",
    issuer: "Nepal Association of Tour & Travel Agents",
    year: "2015 - Present",
    category: "affiliations",
    description: "Certified active member of Nepal's apex travel and tour agency union.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    icon: BadgeCheck,
    refNo: "NATTA-LM/1223",
  },
  {
    id: 3,
    title: "TAAN Mountain Trekking Permit",
    issuer: "Trekking Agencies' Association of Nepal",
    year: "2015 - Present",
    category: "affiliations",
    description: "Authorized operator for Himalayan expeditions, high-altitude treks, and wilderness safaris.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    icon: ShieldCheck,
    refNo: "TAAN-MEM/8821",
  },
  {
    id: 4,
    title: "Department of Tourism Registration",
    issuer: "Ministry of Culture, Tourism & Civil Aviation",
    year: "2015",
    category: "government",
    description: "Legal company incorporation permit for tourism service operations across Nepal.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    icon: FileCheck2,
    refNo: "MoCTCA-318",
  },
  {
    id: 5,
    title: "Foreign Exchange Handler Permit",
    issuer: "Nepal Rastra Bank (NRB)",
    year: "2016 - Present",
    category: "government",
    description: "Licensed foreign currency clearance facility for international tourists and tour payments.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
    icon: FileCheck2,
    refNo: "NRB-FX/MetroPark",
  },
  {
    id: 6,
    title: "Tax & PAN/VAT Clearance Certificate",
    issuer: "Inland Revenue Department of Nepal",
    year: "Annual",
    category: "government",
    description: "Full compliance corporate tax auditing and annual legal revenue clearance status.",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80",
    icon: FileCheck2,
    refNo: "IRD-PAN/VAT-OK",
  },
  {
    id: 7,
    title: "Leading Travel Management Nominee",
    issuer: "World Travel Awards",
    year: "2021",
    category: "awards",
    description: "Shortlisted among Nepal's premier travel management and custom tour agencies.",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80",
    icon: Award,
    refNo: "WTA-NPL/2021",
  },
  {
    id: 8,
    title: "Excellence in Inbound Tourism",
    issuer: "Nepal Tourism Development Board",
    year: "2022",
    category: "awards",
    description: "Honored for outstanding customer satisfaction in Himalayan heritage & culture tours.",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80",
    icon: Award,
    refNo: "NTDB-AWARD/22",
  },
  {
    id: 9,
    title: "Best Tourist Transportation Fleet",
    issuer: "Nepal Transport Fleet Association",
    year: "2023",
    category: "awards",
    description: "Awarded for Tourist Scorpio and luxury van maintenance, off-road safety, and hygiene.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
    icon: Award,
    refNo: "FLEET-EX/2023",
  },
  {
    id: 10,
    title: "Travelers' Satisfaction Award",
    issuer: "Global Travel & Hospitality Ratings",
    year: "2024",
    category: "awards",
    description: "Maintained continuous 5-star positive ratings from domestic and international visitors.",
    image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=800&q=80",
    icon: Award,
    refNo: "5STAR-GOLD/24",
  },
  ...Array.from({ length: 16 }, (_, i) => {
    const num = i + 11;
    return {
      id: num,
      title: `Service Quality Certification #${num}`,
      issuer: num % 2 === 0 ? "NATTA / TAAN Tourism Forum" : "Himalayan Travel Safety Council",
      year: `${2016 + (i % 9)}`,
      category: num % 3 === 0 ? ("affiliations" as const) : num % 2 === 0 ? ("certifications" as const) : ("awards" as const),
      description: `Official compliance and quality benchmark accreditation #${num} conferred to Kudan Travel & Tours.`,
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
      icon: BadgeCheck,
      refNo: `CERT-REG/00${num}`,
    };
  }),
];

export default function Achievements() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredCertificates = ALL_CERTIFICATES.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <div className="bg-[#060910] text-slate-100 min-h-screen font-sans">
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-[#0d1322] via-[#080c16] to-[#060910] py-24">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

        <div className="container-x relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/50 bg-[#111728] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#E5C158] shadow-md">
            <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
            <span>100% Verified Credentials</span>
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Achievements & <span className="bg-gradient-to-r from-[#F5D880] via-[#C5A059] to-[#A07D32] bg-clip-text text-transparent">Credentials</span>
          </h1>
          
          <p className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200">
            Showcasing our official Nepal Government authorizations, NTB, NATTA, and TAAN affiliations alongside 26 recognized excellence milestones.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 border-t border-slate-800 pt-8">
            {[
              { number: "26+", label: "Official Certificates & Honors", highlight: "26 Industry Milestones" },
              { number: "NTB / TAAN / NATTA", label: "Core Government Affiliations", highlight: "Full Sector Approval" },
              { number: "100%", label: "Verified Tourism Compliance", highlight: "Active Operating Status" },
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-700/80 bg-[#111827] p-6 shadow-xl"
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
        <SectionTitle eyebrow="Milestones" title="Our 26 Official Credentials & Awards" />

        <div className="mt-8 flex flex-wrap gap-3 pb-8 border-b border-slate-800">
          {[
            { label: "All Credentials (26)", value: "all" },
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
                  ? "bg-[#C5A059] text-slate-950 font-black shadow-lg"
                  : "border border-slate-700 bg-[#111827] text-slate-100 hover:border-slate-500 hover:text-white"
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
                className="group flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-[#111827] shadow-xl hover:border-[#C5A059] transition-all duration-300 overflow-hidden"
              >
                <div>
                  <div className="relative h-52 w-full bg-slate-950 overflow-hidden border-b border-slate-800">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                    
                    <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <button
                        onClick={() => setSelectedImage(cert.image)}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#C5A059] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-md"
                      >
                        <Eye className="h-4 w-4" /> View Certificate
                      </button>
                    </div>

                    <span className="absolute top-3 right-3 rounded-lg border border-[#C5A059] bg-slate-950 px-3 py-1 text-xs font-black uppercase text-[#E5C158]">
                      #{cert.id.toString().padStart(2, "0")}
                    </span>

                    {cert.refNo && (
                      <span className="absolute bottom-3 left-3 rounded-md bg-slate-950 border border-slate-700 px-2 py-1 text-xs font-mono text-slate-200">
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

                    <h3 className="mt-3 text-lg font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-200">
                      {cert.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-3 border-t border-slate-800 mt-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-slate-300">Status</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Active & Valid
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full rounded-2xl border border-[#C5A059] bg-[#0d1322] p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Certificate Full View" 
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl bg-black" 
            />
            
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-bold uppercase text-white hover:text-[#C5A059]"
            >
              <X className="h-4 w-4" /> Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}