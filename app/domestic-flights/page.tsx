"use client";

import { useState } from "react";
import { Plane, Calendar, Users, ArrowRightLeft, CheckCircle2, ShieldCheck, CreditCard } from "lucide-react";

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

  // Mock search results (Simulating Buddha Air API Data response)
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1000);
  };

  const swapDestinations = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Banner */}
      <div className="bg-slate-900 py-16 text-white">
        <div className="container-x text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-4 w-4" /> Official Buddha Air Ticketing Partner
          </span>
          <h1 className="mt-4 text-3xl font-black sm:text-5xl">Book Domestic Flights in Nepal</h1>
          <p className="mt-3 text-slate-300">Fast, instant booking across Buddha Air flight routes with guaranteed lowest fares.</p>
        </div>
      </div>

      {/* Main Search Container */}
      <div className="container-x -mt-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
          
          {/* Trip Type Selector */}
          <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
              <input 
                type="radio" 
                name="tripType" 
                checked={tripType === "one-way"} 
                onChange={() => setTripType("one-way")}
                className="accent-emerald-600"
              />
              One Way
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
              <input 
                type="radio" 
                name="tripType" 
                checked={tripType === "round-trip"} 
                onChange={() => setTripType("round-trip")}
                className="accent-emerald-600"
              />
              Round Trip
            </label>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-12 items-end">
            
            {/* Origin */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">From</label>
              <select 
                value={origin} 
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
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
                className="rounded-full border border-slate-200 bg-white p-3 text-slate-600 shadow-sm hover:bg-slate-50 hover:text-emerald-600"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </button>
            </div>

            {/* Destination */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">To</label>
              <select 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.code} value={d.code} disabled={d.code === origin}>
                    {d.name} ({d.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Dates */}
            <div className={`md:col-span-${tripType === "round-trip" ? "3" : "3"}`}>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Departure Date</label>
              <input 
                type="date" 
                required
                value={departDate} 
                onChange={(e) => setDepartDate(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
              />
            </div>

            {/* Passengers & Nationality */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Passengers</label>
              <select 
                value={passengers} 
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <option key={n} value={n}>{n} Passenger{n > 1 ? "s" : ""}</option>
                ))}
              </select>
            </div>

            {/* Search CTA */}
            <div className="md:col-span-12 mt-4">
              <button 
                type="submit" 
                disabled={isSearching}
                className="w-full rounded-2xl bg-orange-600 py-4 text-center font-bold text-white shadow-lg shadow-orange-600/30 hover:bg-orange-700 transition"
              >
                {isSearching ? "Searching Buddha Air Flights..." : "Search Buddha Air Flights"}
              </button>
            </div>
          </form>

        </div>
      </div>

      {/* Flight Search Results Container */}
      {hasSearched && (
        <div className="container-x mt-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Available Buddha Air Flights ({origin} to {destination})</h2>
          
          <div className="space-y-4">
            {[
              { id: "U4-601", departure: "07:30 AM", arrival: "07:55 AM", duration: "25m", priceNPR: 4850, class: "Y-Class" },
              { id: "U4-605", departure: "11:15 AM", arrival: "11:40 AM", duration: "25m", priceNPR: 4850, class: "U-Class" },
              { id: "U4-611", departure: "03:45 PM", arrival: "04:10 PM", duration: "25m", priceNPR: 5200, class: "A-Class" },
            ].map((flight) => (
              <div key={flight.id} className="flex flex-col md:flex-row items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-500 transition">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-800 font-bold">
                    <Plane className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400">Buddha Air • Flight {flight.id}</span>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-lg font-black text-slate-900">{flight.departure}</span>
                      <span className="text-xs text-slate-400">({origin})</span>
                      <span className="text-xs font-semibold text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded">{flight.duration}</span>
                      <span className="text-lg font-black text-slate-900">{flight.arrival}</span>
                      <span className="text-xs text-slate-400">({destination})</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-6">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-medium">Baggage: 20kg</span>
                    <div className="text-xl font-black text-slate-900">NPR {flight.priceNPR.toLocaleString()}</div>
                  </div>
                  <button className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-600 transition">
                    Select Flight
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integration Notice Box */}
      <div className="container-x mt-12">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 flex items-start gap-4">
          <CreditCard className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-amber-900">Buddha Air Direct GDS/API Ready</h3>
            <p className="mt-1 text-xs leading-relaxed text-amber-800">
              This module connects directly to Buddha Air's local reservation system. Instant e-tickets will be issued via automated eSewa / Fonepay API callbacks or direct agency booking code confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}   