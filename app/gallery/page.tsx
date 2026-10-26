"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, X, MapPin, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, Download } from "lucide-react";

const photos = [
  ["Nepal Himalaya", "ebc.jpeg", "Inbound Nepal"],
  ["Pokhara Lakeside", "pokhara.jpeg", "Inbound Nepal"],
  ["Everest Region", "abc.jpeg", "Inbound Nepal"],
  ["Bangkok & Pattaya", "thailand.jpeg", "International"],
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

  // Keyboard Event Handlers (Left/Right arrows, Escape)
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
    <div className="bg-[#FAF8F5] text-slate-900 font-sans min-h-screen">
      
      {/* HEADER BANNER */}
      <section className="bg-[#0B132B] py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#173B68]/80 border border-[#C5A059]/40 text-[#E4C58B] text-xs font-semibold tracking-widest uppercase mb-4 shadow-sm">
            <Sparkles size={13} />
            <span>Travel Stories & Moments</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light tracking-tight text-white">
            Visual <span className="italic font-normal text-[#E4C58B]">Gallery</span>
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300 font-light text-sm sm:text-base leading-relaxed">
            A curated glimpse into the majestic landscapes, cultural heritage, and international journeys we design.
          </p>
        </div>
      </section>

      {/* GALLERY CONTENT SECTION */}
      <section className="container mx-auto px-6 lg:px-12 max-w-7xl py-16">
        
        {/* Interactive Filter Buttons */}
        <div className="mb-12 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-6 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#0B132B] text-white shadow-md"
                  : "bg-white border border-slate-300 text-slate-700 hover:border-[#C5A059]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Image Grid */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {filteredPhotos.map(([name, src, category], i) => (
            <figure
              key={src}
              onClick={() => openLightbox(i)}
              className="group mb-6 break-inside-avoid overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] cursor-pointer transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={src}
                  alt={name}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    i % 4 === 0 ? "h-[420px]" : "h-[300px]"
                  }`}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-3 rounded-full bg-white/90 text-[#0B132B] shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                    <ZoomIn size={18} />
                  </span>
                </div>
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B132B]/80 backdrop-blur-md text-[10px] font-bold tracking-widest text-amber-300 uppercase">
                  {category}
                </span>
              </div>
              <figcaption className="bg-white p-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-serif font-medium text-[#0B132B]">{name}</h3>
                  <p className="text-xs text-slate-400 font-light mt-0.5 flex items-center gap-1">
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
          className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden select-none"
          onClick={() => setCurrentIndex(null)} // Backdrop click closes viewer
          onWheel={handleWheel}
        >
          {/* Top Title Info */}
          <div className="absolute top-6 left-6 z-[99999] text-white pointer-events-none">
            <h2 className="text-lg font-serif font-medium">{activePhoto[0]}</h2>
            <p className="text-xs text-slate-400">
              {activePhoto[2]} • Photo {currentIndex! + 1} of {filteredPhotos.length}
            </p>
          </div>

          {/* Left / Right Swipe Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            className="absolute left-6 z-[99999] p-4 rounded-full bg-black/70 hover:bg-white/20 text-white transition-colors backdrop-blur-sm cursor-pointer border border-white/10"
            title="Previous Photo (Left Arrow)"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            className="absolute right-6 z-[99999] p-4 rounded-full bg-black/70 hover:bg-white/20 text-white transition-colors backdrop-blur-sm cursor-pointer border border-white/10"
            title="Next Photo (Right Arrow)"
          >
            <ChevronRight size={32} />
          </button>

          {/* Borderless Image Container */}
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
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
                transition: isDragging ? "none" : "transform 0.1s ease-out",
              }}
              className="max-h-[75vh] max-w-[75vh] sm:max-w-[75vw] object-contain pointer-events-none select-none"
            />
          </div>

          {/* Bottom Toolbox Bar (Includes Save Image and Close Button side-by-side) */}
          <div
            className="absolute bottom-6 z-[99999] flex items-center gap-3 px-6 py-3 rounded-full bg-black/85 backdrop-blur-md border border-white/20 shadow-2xl pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.25, 5))}
              className="p-2.5 rounded-full hover:bg-white/25 text-white transition-colors flex items-center gap-1 text-xs cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
              className="p-2.5 rounded-full hover:bg-white/25 text-white transition-colors flex items-center gap-1 text-xs cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={resetView}
              className="p-2.5 rounded-full hover:bg-white/25 text-white transition-colors flex items-center gap-1 text-xs cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw size={18} />
            </button>
            
            <div className="h-4 w-px bg-white/20 mx-1" />

            {/* Save Image Button */}
            <a
              href={activePhoto[1]}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-4 py-2 rounded-full hover:bg-white/25 text-white transition-colors flex items-center gap-2 text-xs font-semibold cursor-pointer"
              title="Download Image"
            >
              <Download size={18} />
              <span>Save Image</span>
            </a>

            {/* Close Button placed directly beside Save Image */}
            <button
              onClick={() => setCurrentIndex(null)}
              className="px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
              title="Close viewer (Esc)"
            >
              <X size={18} />
              <span>Close</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}