"use client";

import { useState } from "react";
import { Plane, ArrowRightLeft, ShieldCheck, CreditCard, Sparkles, ChevronRight } from "lucide-react";

// Popular Buddha Air Destinations in Nepal
const DESTINATIONS = [
  { code: "KTM", name: "Kathmandu (TIA)" },
  { code: "PKR", name: "Pokhara (International)" },
  { code: "BWA", name: "Bhairahawa (Lumbini)" },
  { code: "BDP", name: "Bhadrapur (Jhapa)" },
  { code: "BIR", name: "Biratnagar" },
  { code: "NPJ", name: "Nepalgunj" },
  { code: "KEI", name: "Simara" },
  { code: "JKR", name: "Janakpur" },
  { code: "BHR", name: "Bharatpur (Chitwan)" },
  { code: "TMI", name: "Tumlingtar" },
];

export default function DomesticFlightsPage() {
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [origin, setOrigin] = useState("KTM");
  const [destination, setDestination] = useState("PKR");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [nationality, setNationality] = useState("Nepali");

  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [flights, setFlights] = useState<any[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setHasSearched(false);

    // Simulated API response with flight payloads
    setTimeout(() => {
      setFlights([
        { id: "U4-601", departure: "07:30 AM", arrival: "07:55 AM", duration: "25m", priceNPR: 4850, class: "Y-Class", freeBaggage: "20kg" },
        { id: "U4-605", departure: "11:15 AM", arrival: "11:40 AM", duration: "25m", priceNPR: 4850, class: "U-Class", freeBaggage: "20kg" },
        { id: "U4-611", departure: "03:45 PM", arrival: "04:10 PM", duration: "25m", priceNPR: 5200, class: "A-Class", freeBaggage: "20kg" },
      ]);
      setIsSearching(false);
      setHasSearched(true);
    }, 1000);
  };

  const swapDestinations = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 text-slate-800 font-sans relative overflow-hidden pb-24">
      {/* Light Ambient Glowing Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-amber-200/40 via-sky-200/50 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-200/40 blur-3xl pointer-events-none rounded-full" />

      {/* Hero / Header Section */}
      <div className="relative pt-16 pb-20 border-b border-slate-200/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl text-center relative z-10">
          
          {/* Metallic Gold Badge */}
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 backdrop-blur-md px-4 py-1.5 text-xs font-black uppercase tracking-wider text-amber-800 border border-amber-400/40 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-amber-600" /> Official Buddha Air Ticketing Partner
          </span>

          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl text-slate-900 drop-shadow-sm">
            Book Domestic Flights in Nepal
          </h1>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base font-semibold">
            Fast, instant reservation across Buddha Air routes with guaranteed lowest fares & dynamic seating.
          </p>
        </div>
      </div>

      {/* Light Glassmorphic Search Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl -mt-10 relative z-20">
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white via-slate-200 to-slate-300/80 shadow-2xl shadow-slate-200/80">
          <div className="rounded-[23px] bg-white/75 backdrop-blur-xl p-6 sm:p-8 border border-white/60">

            {/* Trip Type Selector */}
            <div className="flex items-center gap-6 pb-6 border-b border-slate-200/80">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-black uppercase tracking-wider text-slate-700 hover:text-amber-600 transition">
                <input
                  type="radio"
                  name="tripType"
                  checked={tripType === "one-way"}
                  onChange={() => setTripType("one-way")}
                  className="accent-amber-500 h-4 w-4"
                />
                One Way
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-black uppercase tracking-wider text-slate-700 hover:text-amber-600 transition">
                <input
                  type="radio"
                  name="tripType"
                  checked={tripType === "round-trip"}
                  onChange={() => setTripType("round-trip")}
                  className="accent-amber-500 h-4 w-4"
                />
                Round Trip
              </label>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-12 items-end">
              
              {/* Origin */}
              <div className="md:col-span-3">
                <label className="block text-[11px] font-black uppercase tracking-widest text-amber-700 mb-2">From</label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200/90 bg-white/90 p-3.5 text-sm font-bold text-slate-900 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none backdrop-blur-md appearance-none"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.code} value={d.code} disabled={d.code === destination}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="md:col-span-1 flex justify-center pb-1">
                <button
                  type="button"
                  onClick={swapDestinations}
                  className="rounded-full border border-slate-200 bg-gradient-to-b from-white to-slate-100 p-3 text-slate-600 shadow-md hover:border-amber-400 hover:text-amber-600 hover:scale-105 transition-all duration-200"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </button>
              </div>

              {/* Destination */}
              <div className="md:col-span-3">
                <label className="block text-[11px] font-black uppercase tracking-widest text-amber-700 mb-2">To</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200/90 bg-white/90 p-3.5 text-sm font-bold text-slate-900 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none backdrop-blur-md appearance-none"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.code} value={d.code} disabled={d.code === origin}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Departure Date */}
              <div className="md:col-span-3">
                <label className="block text-[11px] font-black uppercase tracking-widest text-amber-700 mb-2">Departure Date</label>
                <input
                  type="date"
                  required
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200/90 bg-white/90 p-3.5 text-sm font-bold text-slate-900 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none backdrop-blur-md"
                />
              </div>

              {/* Passengers */}
              <div className="md:col-span-2">
                <label className="block text-[11px] font-black uppercase tracking-widest text-amber-700 mb-2">Passengers</label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-200/90 bg-white/90 p-3.5 text-sm font-bold text-slate-900 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none backdrop-blur-md appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <option key={n} value={n}>
                      {n} Passenger{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Metallic Gold Primary Button */}
              <div className="md:col-span-12 mt-4">
                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 p-[1px] shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition duration-300 group"
                >
                  <div className="w-full rounded-[15px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-4 flex items-center justify-center gap-2 font-black uppercase tracking-wider text-amber-400 group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-amber-500 group-hover:text-slate-950 transition-all duration-300">
                    <Sparkles className="h-4 w-4" />
                    <span>{isSearching ? "Querying Buddha Air Systems..." : "Search Buddha Air Flights"}</span>
                  </div>
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

      {/* Flight Search Results Container */}
      {hasSearched && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mt-12">
          <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            Available Flights <span className="text-xs font-bold text-amber-800 uppercase tracking-wider px-3 py-1 rounded-full border border-amber-300 bg-amber-50/80 backdrop-blur-md">{origin} to {destination}</span>
          </h2>

          <div className="space-y-4">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="group relative rounded-2xl border border-white/80 bg-white/70 backdrop-blur-xl p-6 shadow-xl shadow-slate-200/60 hover:border-amber-400/70 hover:bg-white/90 transition duration-300 flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-300/60 bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 shadow-sm group-hover:scale-105 transition-transform">
                    <Plane className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-500">Buddha Air</span>
                      <span className="text-[10px] font-bold text-amber-800 border border-amber-200 px-2 py-0.5 rounded bg-amber-50">Flight {flight.id}</span>
                      <span className="text-[10px] font-bold text-slate-600 border border-slate-200 px-2 py-0.5 rounded bg-slate-50">{flight.class}</span>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="text-left">
                        <span className="text-xl font-black text-slate-900">{flight.departure}</span>
                        <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">{origin}</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-amber-800 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">{flight.duration}</span>
                        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-slate-300 to-transparent my-1" />
                        <span className="text-[9px] text-slate-400 uppercase font-medium">Direct</span>
                      </div>

                      <div className="text-left">
                        <span className="text-xl font-black text-slate-900">{flight.arrival}</span>
                        <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">{destination}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-slate-200/80 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Baggage: {flight.freeBaggage}</span>
                    <div className="text-2xl font-black text-slate-900">
                      NPR {flight.priceNPR.toLocaleString()}
                    </div>
                  </div>

                  <button className="rounded-xl border border-amber-300 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-6 py-3 text-xs font-black uppercase tracking-wider text-slate-950 shadow-md shadow-amber-500/20 hover:brightness-105 transition flex items-center gap-1.5">
                    <span>Select Flight</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integration Notice Box */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mt-12">
        <div className="rounded-2xl border border-white/80 bg-white/60 backdrop-blur-xl p-6 flex items-start gap-4 shadow-xl shadow-slate-200/50">
          <CreditCard className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Buddha Air Direct GDS / API Ready</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 font-medium">
              This module connects directly to Buddha Air's local reservation system. Instant e-tickets will be issued via automated eSewa / Fonepay API callbacks or direct agency booking code confirmation.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}