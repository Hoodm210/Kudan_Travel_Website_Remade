"use client";

import { useState } from "react";
import Link from "next/link";
import SectionTitle from "@/components/SectionTitle";
import { Users, Fuel, ShieldCheck, ArrowRight } from "lucide-react";

interface VehicleItem {
  id: string;
  slug: string;
  category: "luxury" | "family" | "group" | "airport";
  title: string;
  vehicleType: string;
  capacity: string;
  price: string;
  image: string;
  features: string[];
  badge?: string;
}

const VEHICLES: VehicleItem[] = [
  {
    id: "sedan-rental",
    slug: "private-car-rental-kathmandu",
    category: "luxury",
    title: "Private Car & Sedan Rental",
    vehicleType: "Toyota Sedan / Swift Dzire",
    capacity: "3 - 4 Passengers",
    price: "NPR 4,500 / Day",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    features: ["AC & Heating", "Professional Driver", "Fuel Included"],
    badge: "Most Popular",
  },
  {
    id: "suv-rental",
    slug: "4x4-scorpio-jeep-rental",
    category: "family",
    title: "4x4 Scorpio SUV & Jeep Rental",
    vehicleType: "Mahindra Scorpio / Prado",
    capacity: "6 - 7 Passengers",
    price: "NPR 8,500 / Day",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    features: ["Off-road Ready", "High Ground Clearance", "Luggage Carrier"],
    badge: "Trekking Ready",
  },
  {
    id: "hiace-van",
    slug: "toyota-hiace-van-rental",
    category: "group",
    title: "Toyota HiAce Tourist Van",
    vehicleType: "Toyota HiAce High Roof",
    capacity: "14 Passengers",
    price: "NPR 12,000 / Day",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
    features: ["Reclining Seats", "Dual AC", "Spacious Boot"],
  },
  {
    id: "airport-transfer",
    slug: "tribhuvan-airport-private-transfer",
    category: "airport",
    title: "Airport Transfer (TIA Kathmandu)",
    vehicleType: "Private AC Vehicle",
    capacity: "1 - 14 Passengers",
    price: "NPR 1,500 / Trip",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    features: ["Meet & Greet", "Flight Tracking", "Zero Wait Fee"],
  },
];

const TABS = [
  { id: "all", label: "All Fleet & Services" },
  { id: "luxury", label: "Cars & Sedans" },
  { id: "family", label: "4x4 SUVs & Offroad" },
  { id: "group", label: "Tourist Vans & Buses" },
  { id: "airport", label: "Airport Pickups" },
];

export default function TransportationPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredVehicles =
    activeTab === "all"
      ? VEHICLES
      : VEHICLES.filter((item) => item.category === activeTab);

  return (
    <main className="min-h-screen bg-slate-950 py-20 text-slate-100 font-sans border-t border-slate-900">
      <div className="container-x">
        {/* Header Section */}
        <div>
          <SectionTitle
            eyebrow="Reliable Travel Fleet"
            title="Vehicle Rental & Transport Services"
            light={true}
          />
          <p className="mt-3 max-w-2xl text-base text-slate-300">
            Book well-maintained private cars, 4x4 off-road SUVs, luxury tourist vans, and buses with licensed experienced drivers across Nepal.
          </p>
        </div>

        {/* Dynamic Category Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#D4AF37] text-slate-950 shadow-md scale-105"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Vehicle Cards Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredVehicles.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/transportation/${vehicle.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 shadow-xl hover:border-[#D4AF37] hover:shadow-[#D4AF37]/5 transition-all duration-300 overflow-hidden"
            >
              <div>
                {/* Image & Badge Overlay */}
                <div className="relative h-64 w-full bg-slate-950 overflow-hidden border-b border-slate-800">
                  <img
                    src={vehicle.image}
                    alt={vehicle.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />

                  {vehicle.badge && (
                    <span className="absolute top-3 left-3 rounded-md bg-[#D4AF37] px-3 py-1 text-[10px] font-black uppercase text-slate-950 shadow-md">
                      {vehicle.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4AF37]">
                    <Users className="h-3.5 w-3.5 shrink-0" />
                    <span>{vehicle.capacity}</span>
                  </div>

                  <h3 className="mt-2 text-xl font-black text-white group-hover:text-[#D4AF37] transition-colors">
                    {vehicle.title}
                  </h3>

                  {/* Feature Bullets */}
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {vehicle.features.map((feat, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-slate-800/80 border border-slate-700/50 px-2 py-1 text-[10px] font-semibold text-slate-300"
                      >
                        {feat}
                      </span>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400 font-medium">{vehicle.vehicleType}</span>
                <span className="text-sm font-black text-[#D4AF37]">{vehicle.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}