"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import type { PageFlip } from "page-flip";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

type PDFFlipBookProps = {
  pdfUrl?: string;
};

const PRELOAD_BEHIND = 2;
const PRELOAD_AHEAD = 5;
const RENDER_WIDTH_PX = 1400; // sharpness of each rendered PDF page
const ZOOM_MIN = 0.6;
const ZOOM_MAX = 1.6;
const AUTOPLAY_MS = 3500;

export default function PDFFlipBook({ pdfUrl = "/brochure.pdf" }: PDFFlipBookProps) {
  const stageRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<PageFlip | null>(null);

  // PDF + render cache (kept outside React so re-inits never lose rendered pages)
  const pdfRef = useRef<any>(null);
  const cacheRef = useRef<Map<number, string>>(new Map());
  const imgsRef = useRef<HTMLImageElement[]>([]);
  const queueRef = useRef<number[]>([]);
  const busyRef = useRef(false);
  const indexRef = useRef(0);
  const wheelLockRef = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const soundOnRef = useRef(false);

  const [numPages, setNumPages] = useState(0);
  const [ratio, setRatio] = useState(1.414); // height / width of one PDF page (read from the real PDF)
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [dims, setDims] = useState({ w: 0, h: 0, spread: true });
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false); // set to true to enable page-turn sound by default
  const [autoplay, setAutoplay] = useState(false);
  const [pageInput, setPageInput] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  soundOnRef.current = soundOn;

  /* Paper "swish" sound generated with WebAudio (no audio file needed) */
  const playFlip = useCallback(() => {
    if (!soundOnRef.current) return;
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = (audioRef.current ??= new AC());
      if (ctx.state === "suspended") ctx.resume();
      const len = Math.floor(ctx.sampleRate * 0.35);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const f = ctx.createBiquadFilter();
      f.type = "bandpass";
      f.frequency.value = 2200;
      f.Q.value = 0.7;
      const g = ctx.createGain();
      g.gain.value = 0.25;
      src.connect(f); f.connect(g); g.connect(ctx.destination);
      src.start();
    } catch {}
  }, []);

  /* ---------- 1. Load the PDF ---------- */
  useEffect(() => {
    let cancelled = false;
    let doc: any;
    cacheRef.current.clear();
    (async () => {
      try {
        doc = await pdfjs.getDocument({ url: pdfUrl }).promise;
        if (cancelled) return;
        pdfRef.current = doc;
        const first = await doc.getPage(1);
        const vp = first.getViewport({ scale: 1 });
        setRatio(vp.height / vp.width);
        setNumPages(doc.numPages);
      } catch {
        if (!cancelled) setError(`Could not load ${pdfUrl}. Check that the file is in /public.`);
      }
    })();
    return () => {
      cancelled = true;
      try { doc?.destroy(); } catch {}
    };
  }, [pdfUrl]);

  /* ---------- 2. Compute page size from the screen + PDF ratio + zoom ---------- */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const calc = () => {
      const availW = window.innerWidth - 40;
      const availH = window.innerHeight - 48 - 40; // toolbar + padding
      const spread = window.innerWidth >= 768;
      let h = availH;
      let w = h / ratio;
      const maxW = spread ? availW / 2 : availW;
      if (w > maxW) { w = maxW; h = w * ratio; }
      w = Math.floor(w * zoom);
      h = Math.floor(h * zoom);
      setDims((d) => (d.w === w && d.h === h && d.spread === spread ? d : { w, h, spread }));
    };
    calc();
    const onResize = () => { clearTimeout(t); t = setTimeout(calc, 150); };
    window.addEventListener("resize", onResize);
    return () => { clearTimeout(t); window.removeEventListener("resize", onResize); };
  }, [ratio, zoom]);

  /* ---------- 3. Lazy page rendering ---------- */
  const pump = useCallback(async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    while (queueRef.current.length) {
      const n = queueRef.current.shift()!;
      if (cacheRef.current.has(n) || !pdfRef.current) continue;
      try {
        const page = await pdfRef.current.getPage(n);
        const base = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: Math.min(RENDER_WIDTH_PX / base.width, 3) });
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: canvas.getContext("2d")!, viewport, canvas } as any).promise;
        const url = canvas.toDataURL("image/jpeg", 0.9);
        cacheRef.current.set(n, url);
        const img = imgsRef.current[n - 1];
        if (img) {
          img.src = url;
          img.parentElement?.classList.remove("loading");
        }
        page.cleanup();
      } catch {}
    }
    busyRef.current = false;
  }, []);

  const ensureAround = useCallback(
    (idx: number) => {
      for (let i = idx - PRELOAD_BEHIND; i <= idx + PRELOAD_AHEAD; i++) {
        const n = i + 1;
        if (i >= 0 && i < numPages && !cacheRef.current.has(n) && !queueRef.current.includes(n)) {
          queueRef.current.push(n);
        }
      }
      pump();
    },
    [numPages, pump]
  );

  /* ---------- 4. Build the flipbook ---------- */
  useEffect(() => {
    if (!numPages || !dims.w || !bookRef.current) return;
    let cancelled = false;
    let pf: PageFlip | null = null;

    (async () => {
      const { PageFlip } = await import("page-flip");
      if (cancelled || !bookRef.current) return;

      const host = bookRef.current;
      host.innerHTML = "";
      imgsRef.current = [];

      const pages: HTMLElement[] = [];
      for (let i = 0; i < numPages; i++) {
        const sheet = document.createElement("div");
        sheet.className = "page-sheet" + (cacheRef.current.has(i + 1) ? "" : " loading");
        // Only the front and back cover are rigid. Inner pages are SOFT so they curl like real paper.
        if (i === 0 || i === numPages - 1) sheet.setAttribute("data-density", "hard");

        const img = document.createElement("img");
        img.draggable = false;
        img.alt = `Page ${i + 1}`;
        const cached = cacheRef.current.get(i + 1);
        if (cached) img.src = cached;
        imgsRef.current.push(img);
        sheet.appendChild(img);

        // Spine shading: odd index = left page (spine on its right), even index = right page (spine on its left)
        const shade = document.createElement("div");
        shade.className = i % 2 === 1 ? "spine-shade spine-right" : "spine-shade spine-left";
        sheet.appendChild(shade);

        host.appendChild(sheet);
        pages.push(sheet);
      }

      pf = new PageFlip(host, {
        width: dims.w,
        height: dims.h,
        size: "fixed",
        minWidth: 200,
        maxWidth: 2000,
        minHeight: 200,
        maxHeight: 2000,
        showCover: true, // page 1 alone, then 2-3, 4-5, ... like a real book
        usePortrait: true, // single page automatically on narrow screens
        drawShadow: true,
        maxShadowOpacity: 0.6,
        flippingTime: 900,
        mobileScrollSupport: false,
        useMouseEvents: true,
        showPageCorners: true,
        swipeDistance: 30,
        startPage: 0,
      });

      pf.loadFromHTML(pages);
      flipRef.current = pf;

      if (indexRef.current > 0) pf.turnToPage(indexRef.current); // keep position after resize/zoom
      pf.on("changeState", (e: any) => {
        if (e.data === "flipping") playFlip();
      });
      pf.on("flip", (e: any) => {
        indexRef.current = e.data as number;
        setCurrentIndex(e.data as number);
        ensureAround(e.data as number);
      });
      ensureAround(indexRef.current);
    })();

    return () => {
      cancelled = true;
      try { pf?.destroy(); } catch {}
      flipRef.current = null;
    };
  }, [numPages, dims.w, dims.h, dims.spread, ensureAround, playFlip]);

  /* ---------- 5. Mouse wheel + keyboard ---------- */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey) {
        // Ctrl + wheel (or trackpad pinch) = zoom
        setZoom((z) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, +(z - Math.sign(e.deltaY) * 0.1).toFixed(2))));
        return;
      }
      if (wheelLockRef.current || Math.abs(e.deltaY) < 8) return;
      wheelLockRef.current = true;
      if (e.deltaY > 0) flipRef.current?.flipNext();
      else flipRef.current?.flipPrev();
      setTimeout(() => (wheelLockRef.current = false), 700);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown") flipRef.current?.flipNext();
      if (e.key === "ArrowLeft" || e.key === "PageUp") flipRef.current?.flipPrev();
      if (e.key === "Home") flipRef.current?.flip(0);
      if (e.key === "End") flipRef.current?.flip(flipRef.current.getPageCount() - 1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  /* ---------- Autoplay + close menu on outside click ---------- */
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      const before = indexRef.current;
      flipRef.current?.flipNext();
      setTimeout(() => {
        if (indexRef.current === before) setAutoplay(false); // reached the end
      }, 1400);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplay]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  /* ---------- Actions ---------- */
  const nextPage = () => flipRef.current?.flipNext();
  const previousPage = () => flipRef.current?.flipPrev();
  const goToPage = (page: number) => {
    flipRef.current?.flip(page - 1);
    setShowThumbnails(false);
  };
  const zoomIn = () => setZoom((z) => Math.min(+(z + 0.15).toFixed(2), ZOOM_MAX));
  const zoomOut = () => setZoom((z) => Math.max(+(z - 0.15).toFixed(2), ZOOM_MIN));
  const resetZoom = () => setZoom(1);
  const goFirst = () => flipRef.current?.flip(0);
  const goLast = () => flipRef.current?.flip(numPages - 1);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };
  const submitJump = (e: React.FormEvent) => {
    e.preventDefault();
    const n = parseInt(pageInput, 10);
    if (!isNaN(n) && n >= 1 && n <= numPages) flipRef.current?.flip(n - 1);
    setPageInput("");
    (document.activeElement as HTMLElement | null)?.blur();
  };
  const printPdf = () => {
    setMenuOpen(false);
    const f = document.createElement("iframe");
    f.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
    f.src = pdfUrl;
    f.onload = () => {
      try { f.contentWindow?.focus(); f.contentWindow?.print(); }
      catch { window.open(pdfUrl, "_blank"); }
      setTimeout(() => f.remove(), 60000);
    };
    document.body.appendChild(f);
  };
  const shareLink = async () => {
    setMenuOpen(false);
    const url = window.location.href;
    try {
      if (navigator.share) { await navigator.share({ title: document.title || "Brochure", url }); return; }
      await navigator.clipboard.writeText(url);
      showToast("Link copied");
    } catch {}
  };
  const toggleFullscreen = () => {
    const elem = document.getElementById("catalog-viewport");
    if (!elem) return;
    if (!document.fullscreenElement) elem.requestFullscreen().catch(() => {});
    else document.exitFullscreen().catch(() => {});
  };

  const loading = !numPages && !error;

  return (
    <main id="catalog-viewport" className="reader-screen">
      <section className="book-stage" ref={stageRef}>
        <button onClick={previousPage} className="nav-arrow left-arrow" disabled={currentIndex <= 0} aria-label="Previous">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={nextPage}
          className="nav-arrow right-arrow"
          disabled={numPages > 0 && currentIndex >= numPages - 1}
          aria-label="Next"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {loading && (
          <div className="status-box">
            <div className="spinner-ring" />
            <p>Loading catalog...</p>
          </div>
        )}
        {error && <div className="status-box"><p>{error}</p></div>}

        {/* React never renders children inside this div; page-flip owns it */}
        <div
          ref={bookRef}
          className="book-html-container"
          style={{ width: dims.spread ? dims.w * 2 : dims.w, height: dims.h, visibility: numPages ? "visible" : "hidden" }}
        />

        {showThumbnails && (
          <div className="thumbnail-drawer">
            <div className="thumbnail-grid">
              {Array.from({ length: numPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i + 1)}
                  className={`thumb-card ${currentIndex === i || (dims.spread && i > 0 && currentIndex === i - 1) ? "active" : ""}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <footer className="reader-toolbar">
        <button onClick={() => setShowThumbnails((p) => !p)} className={`toolbar-btn ${showThumbnails ? "active" : ""}`} title="All pages">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
          </svg>
        </button>
        <span className="toolbar-separator hide-sm" />

        <button onClick={goFirst} className="toolbar-btn hide-sm" title="First page (Home)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" />
          </svg>
        </button>
        <form className="page-jump" onSubmit={submitJump}>
          <input
            value={pageInput}
            onChange={(e) => setPageInput(e.target.value.replace(/\D/g, ""))}
            placeholder={String(currentIndex + 1)}
            inputMode="numeric"
            aria-label="Go to page"
          />
          <span>/ {numPages || "-"}</span>
        </form>
        <button onClick={goLast} className="toolbar-btn hide-sm" title="Last page (End)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" />
          </svg>
        </button>

        <span className="toolbar-separator" />

        <button onClick={zoomOut} className="toolbar-btn" title="Zoom out" disabled={zoom <= ZOOM_MIN}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>
        <button onClick={resetZoom} className="zoom-pct hide-sm" title="Reset zoom">{Math.round(zoom * 100)}%</button>
        <button onClick={zoomIn} className="toolbar-btn" title="Zoom in" disabled={zoom >= ZOOM_MAX}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </button>

        <span className="toolbar-separator hide-sm" />

        <button onClick={() => setSoundOn((v) => !v)} className={`toolbar-btn hide-sm ${soundOn ? "active" : ""}`} title={soundOn ? "Sound on" : "Sound off"}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            {soundOn ? <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /> : <><line x1="22" y1="9" x2="16" y2="15" /><line x1="16" y1="9" x2="22" y2="15" /></>}
          </svg>
        </button>
        <button onClick={() => setAutoplay((v) => !v)} className={`toolbar-btn hide-sm ${autoplay ? "active" : ""}`} title={autoplay ? "Stop auto-play" : "Auto-play"}>
          {autoplay ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="7 4 20 12 7 20 7 4" /></svg>
          )}
        </button>

        <span className="toolbar-separator" />

        {/* Download / print / share menu */}
        <div className="menu-wrap" ref={menuRef}>
          <button onClick={() => setMenuOpen((v) => !v)} className={`toolbar-btn ${menuOpen ? "active" : ""}`} title="Download, print & share" aria-haspopup="menu" aria-expanded={menuOpen}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
          {menuOpen && (
            <div className="menu" role="menu">
              <a href={pdfUrl} download="Brochure.pdf" role="menuitem" onClick={() => setMenuOpen(false)}>Download PDF</a>
              <button role="menuitem" onClick={printPdf}>Print</button>
              <button role="menuitem" onClick={shareLink}>Share link</button>
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" role="menuitem" onClick={() => setMenuOpen(false)}>Open PDF in new tab</a>
            </div>
          )}
        </div>

        <button onClick={toggleFullscreen} className="toolbar-btn" title="Fullscreen">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>
      </footer>

      <style jsx global>{`
        html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; background: #7d8894; }

        .reader-screen {
          width: 100vw; height: 100vh; display: flex; flex-direction: column;
          background: linear-gradient(135deg, #abb5be 0%, #6e7985 100%);
          position: relative; overflow: hidden;
        }
        .book-stage { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        .book-html-container { position: relative; }

        .page-sheet { background: #fff; overflow: hidden; position: relative; }
        .page-sheet img { width: 100%; height: 100%; display: block; object-fit: fill; user-select: none; -webkit-user-drag: none; pointer-events: none; }
        .page-sheet.loading { background: #f1f1f1 linear-gradient(90deg, #f1f1f1, #e6e6e6, #f1f1f1); background-size: 200% 100%; animation: shimmer 1.2s infinite; }
        @keyframes shimmer { to { background-position: -200% 0; } }

        /* soft shading near the spine makes the paper look curved */
        .spine-shade { position: absolute; top: 0; bottom: 0; width: 14%; pointer-events: none; z-index: 5; }
        .spine-left  { left: 0;  background: linear-gradient(to right, rgba(0,0,0,0.22), rgba(0,0,0,0.06) 45%, transparent); }
        .spine-right { right: 0; background: linear-gradient(to left,  rgba(0,0,0,0.22), rgba(0,0,0,0.06) 45%, transparent); }

        .nav-arrow {
          position: absolute; top: 50%; transform: translateY(-50%); z-index: 100;
          background: transparent; border: none; color: rgba(255,255,255,0.75); cursor: pointer; padding: 20px; transition: all 0.2s;
        }
        .nav-arrow:hover:not(:disabled) { color: #fff; transform: translateY(-50%) scale(1.2); }
        .nav-arrow:disabled { opacity: 0.2; cursor: default; }
        .left-arrow { left: 10px; }
        .right-arrow { right: 10px; }

        .reader-toolbar {
          height: 48px; background: rgba(26,32,39,0.92); display: flex; align-items: center;
          justify-content: center; gap: 16px; z-index: 100; flex-shrink: 0;
        }
        .toolbar-btn {
          background: transparent; border: none; color: rgba(255,255,255,0.75); width: 36px; height: 36px;
          border-radius: 6px; display: flex; align-items: center; justify-content: center; cursor: pointer;
        }
        .toolbar-btn:hover, .toolbar-btn.active { color: #fff; background: rgba(255,255,255,0.15); }
        .toolbar-separator { width: 1px; height: 18px; background: rgba(255,255,255,0.2); }
        .page-label { color: #fff; font: 13px system-ui, sans-serif; min-width: 84px; text-align: center; }

        .toolbar-btn:disabled { opacity: 0.3; cursor: default; }
        .page-jump { display: flex; align-items: center; gap: 6px; color: rgba(255,255,255,0.75); font: 13px system-ui, sans-serif; margin: 0; }
        .page-jump input {
          width: 46px; height: 28px; text-align: center; border-radius: 6px; color: #fff;
          background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); font: inherit; outline: none;
        }
        .page-jump input:focus { border-color: #60a5fa; }
        .page-jump input::placeholder { color: rgba(255,255,255,0.8); }
        .zoom-pct { background: transparent; border: none; color: #fff; font: 13px system-ui, sans-serif; min-width: 44px; cursor: pointer; }
        .menu-wrap { position: relative; }
        .menu {
          position: absolute; bottom: 44px; right: -40px; min-width: 190px; padding: 6px; border-radius: 10px;
          background: rgba(18,22,28,0.97); box-shadow: 0 10px 30px rgba(0,0,0,0.4); display: flex; flex-direction: column; z-index: 200;
        }
        .menu a, .menu button {
          color: #fff; text-decoration: none; background: transparent; border: none; text-align: left; cursor: pointer;
          padding: 10px 12px; border-radius: 6px; font: 14px system-ui, sans-serif;
        }
        .menu a:hover, .menu button:hover { background: rgba(255,255,255,0.14); }
        .toast {
          position: fixed; bottom: 64px; left: 50%; transform: translateX(-50%); z-index: 300;
          background: rgba(18,22,28,0.95); color: #fff; padding: 10px 18px; border-radius: 999px; font: 14px system-ui, sans-serif;
        }
        @media (max-width: 640px) {
          .hide-sm { display: none !important; }
          .reader-toolbar { gap: 10px; }
        }

        .thumbnail-drawer {
          position: absolute; bottom: 10px; max-width: 90vw; max-height: 40vh; overflow: auto;
          background: rgba(18,22,28,0.95); border-radius: 8px; padding: 10px; z-index: 120;
        }
        .thumbnail-grid { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
        .thumb-card { width: 38px; height: 50px; background: #333a42; border: 1px solid rgba(255,255,255,0.2); color: #fff; cursor: pointer; }
        .thumb-card.active { border-color: #2563eb; background: #2563eb; }

        .status-box { position: absolute; display: flex; flex-direction: column; align-items: center; color: #fff; gap: 12px; text-align: center; padding: 20px; }
        .spinner-ring { width: 32px; height: 32px; border: 3px solid rgba(255,255,255,0.2); border-top-color: #fff; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
