"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, MapPin, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Download, Eye } from "lucide-react";

const photos = [
  ["Nepal Himalaya", "ebc.jpeg", "Inbound Nepal"],
  ["Nepal Himalayan Ridge", "ebc.jpeg", "Inbound Nepal"],
  ["Pokhara Lakeside", "pokhara.jpeg", "Inbound Nepal"],
  ["Everest Region", "abc.jpeg", "Inbound Nepal"],
  ["Bangkok & Pattaya", "thailand.jpeg", "International"],
  ["Bangkok City View", "thailand.jpeg", "International"],
  ["Pattaya Coastal Bliss", "thailand.jpeg", "International"],
  ["Dubai Desert Safari", "dubai.jpeg", "International"],
  ["Bali Getaway", "bali.jpg", "International"],
  ["Singapore Cityscape", "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=90", "International"],
  ["Nepalese Culture & Art", "kathmandu.jpeg", "Inbound Nepal"],
  ["Himalayan Mountain Road", "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?auto=format&fit=crop&w=1400&q=90", "Transport & Fleet"],
  ["Chitwan National Park", "https://images.unsplash.com/photo-1535338454770-8be927b5a00b?auto=format&fit=crop&w=1400&q=90", "Inbound Nepal"],
  ["Ha Long Bay Cruise", "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=90", "International"],
  ["Annapurna Circuit Trail", "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1400&q=90", "Inbound Nepal"]
];

const categories = ["All Photos", "Inbound Nepal", "International", "Transport & Fleet"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All Photos");
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Viewer states
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const filteredPhotos = photos.filter(([_, __, category]) => {
    if (activeCategory === "All Photos") return true;
    return category === activeCategory;
  });

  const activePhoto = currentIndex !== null ? filteredPhotos[currentIndex] : null;

  const resetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    resetView();
  };

  const nextPhoto = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % filteredPhotos.length);
    resetView();
  };

  const prevPhoto = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    resetView();
  };

  // Keyboard Event Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === "ArrowRight") {
        nextPhoto();
      } else if (e.key === "ArrowLeft") {
        prevPhoto();
      } else if (e.key === "Escape") {
        setCurrentIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, filteredPhotos.length]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 0.15 : -0.15;
    setZoom((prev) => Math.min(Math.max(prev + zoomFactor, 0.5), 5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-[#FAF8F5] text-[#0B132B] font-sans min-h-screen">
      
      {/* HERO HEADER */}
      <section className="bg-[#0B132B] pt-24 pb-20 text-white relative overflow-hidden border-b border-[#C5A059]/20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#173B68]/90 border border-[#C5A059]/40 text-[#E4C58B] text-xs font-semibold tracking-widest uppercase mb-5 shadow-sm">
            <Sparkles size={13} />
            <span>Visual Journeys & Moments</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light tracking-tight text-white">
            Our Travel <span className="italic font-normal text-[#E4C58B]">Gallery</span>
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300 font-light text-sm sm:text-base leading-relaxed">
            Explore breathtaking landscapes, pristine Himalayan peaks, vibrant international cities, and our comfortable fleet captured across our journeys.
          </p>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="container mx-auto px-6 lg:px-12 max-w-7xl py-16">
        
        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-6 py-2.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#0B132B] text-white shadow-lg shadow-[#0B132B]/10 scale-105"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-[#C5A059] hover:text-[#0B132B]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {filteredPhotos.map(([name, src, category], i) => (
            <figure
              key={`${src}-${i}`}
              onClick={() => openLightbox(i)}
              className="group mb-6 break-inside-avoid overflow-hidden rounded-2xl bg-white border border-slate-200/70 shadow-sm cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5"
            >
              <div className="relative overflow-hidden bg-slate-100">
                <img
                  src={src}
                  alt={name}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    i % 3 === 0 ? "h-[380px]" : i % 2 === 0 ? "h-[300px]" : "h-[340px]"
                  }`}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80";
                  }}
                />
                
                {/* Overlay Hover Effect */}
                <div className="absolute inset-0 bg-[#0B132B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="p-3.5 rounded-full bg-white text-[#0B132B] shadow-2xl transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                    <Eye size={16} className="text-[#C5A059]" />
                    <span>View</span>
                  </span>
                </div>

                {/* Category Badge */}
                <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold tracking-widest text-[#E4C58B] uppercase border border-white/10">
                  {category}
                </span>
              </div>

              <figcaption className="bg-white p-4.5 flex items-center justify-between border-t border-slate-100">
                <div>
                  <h3 className="text-sm font-serif font-semibold text-[#0B132B]">{name}</h3>
                  <p className="text-[11px] text-slate-400 font-light mt-0.5 flex items-center gap-1">
                    <MapPin size={11} className="text-[#C5A059]" /> Kudan Travel Collection
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX VIEWER */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden select-none"
          onClick={() => setCurrentIndex(null)}
          onWheel={handleWheel}
        >
          {/* Top Title Info */}
          <div className="absolute top-6 left-6 z-[99999] text-white pointer-events-none">
            <h2 className="text-lg font-serif font-medium text-white">{activePhoto[0]}</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              <span className="text-[#E4C58B] font-semibold">{activePhoto[2]}</span> • Photo {currentIndex! + 1} of {filteredPhotos.length}
            </p>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            className="absolute left-4 sm:left-8 z-[99999] p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-md cursor-pointer border border-white/15 shadow-lg"
            title="Previous Photo (Left Arrow)"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            className="absolute right-4 sm:right-8 z-[99999] p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-md cursor-pointer border border-white/15 shadow-lg"
            title="Next Photo (Right Arrow)"
          >
            <ChevronRight size={28} />
          </button>

          {/* Draggable & Zoomable Image Canvas */}
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing px-4"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <img
              src={activePhoto[1]}
              alt={activePhoto[0]}
              draggable={false}
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                transition: isDragging ? "none" : "transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              className="max-h-[75vh] max-w-[85vw] object-contain pointer-events-none select-none rounded-lg shadow-2xl"
            />
          </div>

          {/* Bottom Interactive Toolbar */}
          <div
            className="absolute bottom-6 z-[99999] flex items-center gap-2 sm:gap-3 px-5 py-2.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-white/15 shadow-2xl pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.25, 5))}
              className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
              className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={resetView}
              className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw size={18} />
            </button>
            
            <div className="h-4 w-px bg-white/20 mx-1" />

            <a
              href={activePhoto[1]}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-3.5 py-1.5 rounded-full hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
              title="Download Image"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Save</span>
            </a>

            <button
              onClick={() => setCurrentIndex(null)}
              className="px-4 py-1.5 rounded-full bg-[#A92332] hover:bg-[#8f1b27] text-white transition-colors flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
              title="Close viewer (Esc)"
            >
              <X size={16} />
              <span>Close</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}