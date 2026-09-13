"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import * as THREE from "three";
import { 
  Users, 
  X, 
  Mail, 
  Phone, 
  ChevronRight, 
  ShieldCheck, 
  UserCheck, 
  CheckCircle2,
  Sparkles,
  Plane,
  Compass,
  Navigation,
  Globe
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

// 3D Aeroplane Scene Component with Mouse Tracking & Scroll Interaction
function Aeroplane3DCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // BUILD 3D AEROPLANE PROCEDURALLY
    const planeGroup = new THREE.Group();

    // Fuselage (Body)
    const bodyGeo = new THREE.ConeGeometry(0.6, 4.2, 16);
    bodyGeo.rotateX(Math.PI / 2);
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xC5A059,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x1f1605
    });
    const body = new THREE.Mesh(bodyGeo, goldMaterial);
    planeGroup.add(body);

    // Main Wings
    const wingGeo = new THREE.BoxGeometry(5.2, 0.05, 0.9);
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a233a,
      metalness: 0.5,
      roughness: 0.3
    });
    const mainWings = new THREE.Mesh(wingGeo, darkMaterial);
    mainWings.position.set(0, 0, 0.3);
    planeGroup.add(mainWings);

    // Tail Wing (Horizontal Stabilizer)
    const tailWingGeo = new THREE.BoxGeometry(2.0, 0.04, 0.5);
    const tailWings = new THREE.Mesh(tailWingGeo, darkMaterial);
    tailWings.position.set(0, 0, -1.6);
    planeGroup.add(tailWings);

    // Vertical Fin (Rudder)
    const finGeo = new THREE.BoxGeometry(0.04, 0.8, 0.6);
    const fin = new THREE.Mesh(finGeo, goldMaterial);
    fin.position.set(0, 0.4, -1.6);
    planeGroup.add(fin);

    // Jet Engines
    const engineGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.8, 12);
    engineGeo.rotateX(Math.PI / 2);
    const leftEngine = new THREE.Mesh(engineGeo, goldMaterial);
    leftEngine.position.set(-1.2, -0.2, 0.4);
    const rightEngine = new THREE.Mesh(engineGeo, goldMaterial);
    rightEngine.position.set(1.2, -0.2, 0.4);
    planeGroup.add(leftEngine);
    planeGroup.add(rightEngine);

    scene.add(planeGroup);

    // Flight Path Rings (Air Currents)
    const ringGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const ringGeo = new THREE.TorusGeometry(2.2 + i * 0.8, 0.015, 8, 48);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xE5C158,
        transparent: true,
        opacity: 0.15 - i * 0.02
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 3;
      ring.position.z = -i * 1.5;
      ringGroup.add(ring);
    }
    scene.add(ringGroup);

    // Floating Altitude Particle Clouds
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 150;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 16;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xE5C158,
      transparent: true,
      opacity: 0.5
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xF5D880, 2);
    sunLight.position.set(5, 8, 5);
    scene.add(sunLight);

    // MOUSE & SCROLL INTERACTION STATE
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Mouse Pitch & Yaw Response
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Banking/Rolling mechanics based on movement speed
      planeGroup.rotation.z = -targetX * 0.6; // Bank angle
      planeGroup.rotation.x = targetY * 0.4 + Math.sin(elapsedTime * 2) * 0.05; // Pitch angle + gentle turbulence
      planeGroup.rotation.y = targetX * 0.5; // Yaw angle

      // Floating Flight Elevation based on Page Scroll Position
      planeGroup.position.x = targetX * 2.5;
      planeGroup.position.y = targetY * 1.5 + Math.sin(elapsedTime * 1.8) * 0.2 - (scrollY * 0.001);
      planeGroup.position.z = Math.cos(elapsedTime * 1.5) * 0.3;

      // Rotate Air Current Rings
      ringGroup.rotation.z += 0.002;
      particles.rotation.y -= 0.001;

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      bodyGeo.dispose();
      wingGeo.dispose();
      tailWingGeo.dispose();
      finGeo.dispose();
      engineGeo.dispose();
      goldMaterial.dispose();
      darkMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
      <div ref={mountRef} className="w-full h-full opacity-60 sm:opacity-90" />
    </div>
  );
}

const teamMembers: TeamMember[] = [
  {
    id: "hari-parajuli",
    name: "Hari Parajuli",
    role: "Managing Director",
    image: "/hari.png",
    languages: ["English", "Nepali"],
    phone: "+977 9851000001",
    email: "hari@kudantravel.com",
    experienceYears: 15,
    overview: "Hari brings over 15 years of tourism management experience, leading Kudan Travel with a vision of high-standard hospitality, strategic partner network development, and tailored destination packages across Nepal and South Asia."
  },
  {
    id: "kamal-paudyal",
    name: "Kamal Paudyal",
    role: "Operations Manager",
    image: "/kamal.jpeg",
    languages: ["English", "Nepali"],
    phone: "+977 9851000002",
    email: "kamal@kudantravel.com",
    experienceYears: 10,
    overview: "Kamal handles end-to-end trip execution, overseeing daily logistics, trekking permits, high-altitude safety protocols, and regional ground coordination for seamless customer experiences."
  },
  {
    id: "ramesh-bhandari",
    name: "Ramesh Bhandari",
    role: "Account Manager",
    image: "/ramesh.jpeg",
    languages: ["English", "Nepali"],
    phone: "+977 9851000003",
    email: "ramesh@kudantravel.com",
    experienceYears: 8,
    overview: "Ramesh manages Kudan's financial pipelines, corporate billing, vendor settlements, and secure online booking transactions."
  },
  {
    id: "rana-jung-thapa-chhetri",
    name: "Rana Jung Thapa Chhetri",
    role: "Relationship Manager",
    image: "/ranajung.jpeg",
    languages: ["English", "Nepali"],
    phone: "+977 9851000004",
    email: "ranajung@kudantravel.com",
    experienceYears: 9,
    overview: "Rana builds long-term agency partnerships and ensures high traveler satisfaction through dedicated client communication and account management."
  },
  {
    id: "milan-khadgi",
    name: "Milan Khadgi",
    role: "Transport Manager",
    image: "/milan.jpeg",
    languages: ["English", "Nepali"],
    phone: "+977 9851000005",
    email: "milan@kudantravel.com",
    experienceYears: 11,
    overview: "Milan directs vehicle fleet maintenance, airport transfers, luxury private rentals, and driver dispatch across top tourist routes."
  },
  {
    id: "binod-maharjan",
    name: "Binod Maharjan",
    role: "Japanese Assistance Lead",
    image: "/binod.jpeg",
    languages: ["Japanese", "English", "Nepali"],
    phone: "+977 9851000006",
    email: "binod@kudantravel.com",
    experienceYears: 12,
    overview: "Binod is a dedicated Japanese-speaking support specialist catering to outbound tours, translation services, and tailored itineraries for Japanese travelers."
  },
  {
    id: "dipendra-khadka",
    name: "Dipendra Khadka",
    role: "Accountant",
    image: "/dipendra.jpeg",
    languages: ["English", "Nepali"],
    phone: "+977 9851000007",
    email: "dipendra@kudantravel.com",
    experienceYears: 6,
    overview: "Dipendra leads financial reporting, audit compliance, partner reconciliations, and daily accounting operations."
  },
  {
    id: "krishna-mukhiya",
    name: "Krishna Mukhiya",
    role: "IT & Digital Officer",
    image: "/krishna.jpeg",
    languages: ["English", "Nepali"],
    phone: "+977 9851000008",
    email: "krishna@kudantravel.com",
    experienceYears: 5,
    overview: "Krishna oversees Kudan's digital booking platforms, IT infrastructure, web applications, and automated guest communication channels."
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
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activePillar, setActivePillar] = useState<Pillar | null>(null);

  return (
    <div className="bg-[#060910] text-slate-100 min-h-screen font-sans relative overflow-x-hidden">
      
      {/* 3D AEROPLANE SCENE OVERLAY */}
      <Aeroplane3DCanvas />

      {/* HERO SECTION */}
      <section className="relative min-h-[600px] overflow-hidden border-b border-slate-800 bg-gradient-to-b from-[#0d1322] via-[#080c16] to-[#060910] py-28 flex items-center z-20">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/50 bg-[#111827]/80 backdrop-blur-md px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#E5C158] shadow-md">
            <Plane className="h-4 w-4 text-amber-300 animate-pulse" />
            <span>Interactive 3D Flight Experience</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Local expertise. <br className="hidden sm:inline" />
            Global reach.{" "}
            <span className="bg-gradient-to-r from-[#F5D880] via-[#C5A059] to-[#A07D32] bg-clip-text text-transparent">
              Elevated Journeys.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-200 bg-[#060910]/60 backdrop-blur-md p-5 rounded-xl border border-slate-800/80 shadow-2xl">
            Move your cursor across the screen to control the flight trajectory. Kudan Travel & Tours Pvt. Ltd. connects global travelers to authentic regional destinations across Nepal and South Asia.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-wider text-[#E5C158]">
            <div className="flex items-center gap-2 bg-[#111827]/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-800">
              <Navigation className="h-4 w-4 text-[#C5A059]" />
              <span>Interactive Navigation</span>
            </div>
            <div className="flex items-center gap-2 bg-[#111827]/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-800">
              <Globe className="h-4 w-4 text-[#C5A059]" />
              <span>Worldwide Tours</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PILLARS SECTION */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158]">Our Flight Path</span>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">What Drives Kudan Travel</h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">Click any card below to explore our operational pillars.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {corePillars.map((pillar) => {
            const isSelected = activePillar?.id === pillar.id;

            return (
              <div
                key={pillar.id}
                onClick={() => setActivePillar(isSelected ? null : pillar)}
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
                      "{pillar.fullDesc}"
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
            <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158]">Flight Crew</span>
            <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Meet the Team Behind the Journey</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">Click on any staff card to open direct contacts and profile bios.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, i) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="group cursor-pointer flex flex-col justify-between rounded-2xl border border-slate-700/80 bg-[#111827]/80 p-6 shadow-xl hover:border-[#C5A059] hover:bg-[#151e33] transition-all transform hover:-translate-y-2 hover:shadow-2xl backdrop-blur-md"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden rounded-xl border-2 border-slate-800 bg-[#060910] shadow-2xl group-hover:border-[#C5A059] transition-all">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : null}
                    
                    <div className="absolute top-3 right-3 rounded-full bg-[#060910]/80 backdrop-blur-md p-2 text-xs text-[#E5C158] border border-[#C5A059]/40 shadow-lg">
                      <Users className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                      {member.name}
                    </h3>
                    <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-[#C5A059] transition-colors" />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#E5C158] mt-0.5">
                    {member.role}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs font-semibold text-amber-300/90 group-hover:underline flex items-center justify-between">
                  <span>View Full Profile</span>
                  <span>&rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDE-OVER SIDE DRAWER */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="absolute inset-0" 
            onClick={() => setSelectedMember(null)} 
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#0d1322] border-l border-[#C5A059]/50 flex flex-col shadow-2xl relative">
              
              {/* Header */}
              <div className="p-5 bg-[#080c16] border-b border-slate-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-[#C5A059]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#E5C158]">
                    Staff Profile Details
                  </span>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="rounded-full bg-slate-800 p-2 text-slate-300 hover:bg-[#C5A059] hover:text-black transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                <div className="text-center space-y-3">
                  <div className="relative h-44 w-44 mx-auto rounded-2xl overflow-hidden border-2 border-[#C5A059] bg-[#060910] shadow-2xl">
                    {selectedMember.image ? (
                      <Image
                        src={selectedMember.image}
                        alt={selectedMember.name}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-4xl font-black text-[#E5C158]">
                        {selectedMember.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="inline-block rounded-md bg-[#C5A059]/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#E5C158] border border-[#C5A059]/30">
                      {selectedMember.role}
                    </span>
                    <h2 className="text-2xl font-black text-white mt-2">
                      {selectedMember.name}
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    {selectedMember.experienceYears && (
                      <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#C5A059]/10 px-2.5 py-1 text-xs font-medium text-amber-300 border border-[#C5A059]/30">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#C5A059]" />
                        <span>{selectedMember.experienceYears}+ Years Exp.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5C158]">Direct Contact</h4>
                  
                  <div className="flex items-center gap-3 rounded-xl bg-[#111827] p-3.5 border border-slate-800">
                    <Mail className="h-5 w-5 text-[#C5A059] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase text-slate-400">Email Address</p>
                      <a href={`mailto:${selectedMember.email}`} className="text-xs font-bold text-[#E5C158] hover:underline truncate block">
                        {selectedMember.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl bg-[#111827] p-3.5 border border-slate-800">
                    <Phone className="h-5 w-5 text-[#C5A059] shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase text-slate-400">Phone Line</p>
                      <a href={`tel:${selectedMember.phone}`} className="text-xs font-bold text-slate-200 hover:text-[#E5C158] block">
                        {selectedMember.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Overview */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5C158] mb-2">Overview & Role</h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-300 bg-[#111827]/80 p-4 rounded-xl border border-slate-800">
                    {selectedMember.overview}
                  </p>
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 bg-[#080c16] border-t border-slate-800 shrink-0">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="w-full py-3 rounded-xl bg-[#C5A059] text-black font-bold uppercase tracking-wider text-xs hover:bg-amber-400 transition-colors"
                >
                  Close Profile
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
} 