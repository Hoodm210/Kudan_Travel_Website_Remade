"use client";

import React, { useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  ShieldCheck,
  Fuel,
  CheckCircle2,
  Send,
  Check,
  Plus,
  Minus,
  Calendar,
  Clock,
} from "lucide-react";

interface VehicleDetails {
  title: string;
  vehicleType: string;
  capacity: string;
  price: string;
  image: string;
  description: string;
  inclusions: string[];
}

const VEHICLES_DATA: Record<string, VehicleDetails> = {
  "private-car-rental-kathmandu": {
    title: "Private Car & Sedan Rental",
    vehicleType: "Toyota Sedan / Swift Dzire",
    capacity: "3 - 4 Passengers",
    price: "NPR 4,500 / Day",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    description:
      "Comfortable air-conditioned private car rentals with trained local drivers for Kathmandu city tours, Nagarkot trips, and short inter-city routes.",
    inclusions: [
      "Fuel & Parking Fees Included",
      "Experienced Local Driver",
      "Clean & Sanitized Interior",
      "Air Conditioning & Music System",
    ],
  },
  "4x4-scorpio-jeep-rental": {
    title: "4x4 Scorpio SUV & Jeep Rental",
    vehicleType: "Mahindra Scorpio / Toyota Prado",
    capacity: "6 - 7 Passengers",
    price: "NPR 8,500 / Day",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    description:
      "Rugged 4WD off-road vehicles built for long-distance highway routes, rough mountain terrains, Muktinath, Besisahar, and trekking starting points.",
    inclusions: [
      "All-Wheel Drive (4WD) Capability",
      "Roof Rack Luggage Carrier",
      "Hill-Driving Expert Driver",
      "Highway Taxes & Tolls Paid",
    ],
  },
  "toyota-hiace-van-rental": {
    title: "Toyota HiAce Tourist Van",
    vehicleType: "Toyota HiAce High Roof",
    capacity: "14 Passengers",
    price: "NPR 12,000 / Day",
    image:
      "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    description:
      "Ideal choice for group travel, family holidays, and long trips to Pokhara, Chitwan, or Lumbini. Superior comfort with spacious seating.",
    inclusions: [
      "High Roof with Ample Headroom",
      "Dual Air Conditioning",
      "Dedicated Luggage Boot",
      "Professional Uniformed Driver",
    ],
  },
  "tribhuvan-airport-private-transfer": {
    title: "Airport Transfer (TIA Kathmandu)",
    vehicleType: "Private AC Car / Van",
    capacity: "1 - 14 Passengers",
    price: "NPR 1,500 / Trip For Cars",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    description:
      "Stress-free airport pickup and drop services at Tribhuvan International Airport (TIA) with personalized signboards and flight monitoring.",
    inclusions: [
      "Airport Entrance Fees Included",
      "Welcome Name Board at Terminal",
      "24/7 Flight Delay Tracking",
      "Luggage Assistance",
    ],
  },
};

const COUNTRIES = [
  "Nepal", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia",
  "Cameroon", "Canada", "Chile", "China", "Colombia", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia", "Ethiopia", "Fiji",
  "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Guinea", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
  "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
  "Mali", "Malta", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
  "Myanmar", "Namibia", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
  "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
  "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan",
  "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Trinidad and Tobago",
  "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function TransportationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const vehicle = VEHICLES_DATA[slug];

  const [travelersCount, setTravelersCount] = useState<number>(2);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "Nepal",
    travelDestination: "Kathmandu",
    arrivalDate: "",
    arrivalTime: "",
    departureDate: "",
    serviceRequired: "Transportation Rental",
    travelStyle: "",
    approximateBudget: "",
    additionalInfo: "",
  });

  const [submitted, setSubmitted] = useState(false);

  if (!vehicle) {
    notFound();
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleIncrementTravelers = () => {
    if (travelersCount < 50) {
      setTravelersCount((prev) => prev + 1);
    }
  };

  const handleDecrementTravelers = () => {
    if (travelersCount > 1) {
      setTravelersCount((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Back Link */}
        <Link
          href="/transportation"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Fleet List</span>
        </Link>

        {/* Hero Banner */}
        <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
          <img
            src={vehicle.image}
            alt={vehicle.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#D4AF37] bg-slate-900/80 px-3 py-1 rounded-full border border-[#D4AF37]/30 backdrop-blur">
              <Users size={13} />
              {vehicle.capacity}
            </span>
            <h1 className="mt-3 text-3xl sm:text-5xl font-black text-white">
              {vehicle.title}
            </h1>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">
                Vehicle Overview
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {vehicle.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                What's Included
              </h3>
              <ul className="grid gap-3">
                {vehicle.inclusions.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm text-slate-200"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-[#D4AF37] shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#D4AF37]/30 bg-slate-900 p-6 shadow-xl h-fit">
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Rate Standard
              </span>
              <p className="text-3xl font-black text-[#D4AF37] mt-1">
                {vehicle.price}
              </p>

              <div className="mt-6 border-t border-b border-slate-800 py-4 text-xs font-bold text-slate-300 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#D4AF37]" />
                  <span>Model: {vehicle.vehicleType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fuel size={16} className="text-[#D4AF37]" />
                  <span>Driver & Fuel Costs Covered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ENQUIRY FORM SECTION */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-10 shadow-2xl space-y-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37] block">
              ENQUIRY
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
              Tell us about your journey
            </h2>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-6 text-center space-y-2">
              <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400 mb-1">
                <Check size={24} />
              </div>
              <h3 className="text-lg font-bold text-white">
                Enquiry Submitted Successfully!
              </h3>
              <p className="text-xs text-slate-300">
                Thank you for reaching out. Our transport team will contact you shortly with availability and a customized quote.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                {/* WhatsApp / Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    WhatsApp / Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+977 9800000000"
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
                  />
                </div>

                {/* Country Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Country
                  </label>
                  <select
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors cursor-pointer"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Travel Destination */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Travel Destination
                  </label>
                  <select
                    name="travelDestination"
                    value={formData.travelDestination}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Kathmandu">Kathmandu</option>
                    <option value="Pokhara">Pokhara</option>
                    <option value="Chitwan">Chitwan</option>
                    <option value="Lumbini">Lumbini</option>
                    <option value="Nagarkot">Nagarkot</option>
                    <option value="Muktinath / Mustang">Muktinath / Mustang</option>
                    <option value="Other">Other Inter-city Route</option>
                  </select>
                </div>

                {/* Service Required */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Service Required
                  </label>
                  <select
                    name="serviceRequired"
                    value={formData.serviceRequired}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Transportation Rental">
                      Transportation Rental ({vehicle.title})
                    </option>
                    <option value="Domestic Packages">Domestic Packages</option>
                    <option value="Trekking & Expedition">
                      Trekking & Expedition
                    </option>
                    <option value="Airport Transfer">Airport Transfer</option>
                  </select>
                </div>

                {/* Arrival Date (Native Calendar Picker Popup) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#D4AF37]" />
                    Arrival Date
                  </label>
                  <input
                    type="date"
                    name="arrivalDate"
                    required
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    onClick={(e) => e.currentTarget.showPicker?.()}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors cursor-pointer"
                  />
                </div>

                {/* Departure Date (Native Calendar Picker Popup) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#D4AF37]" />
                    Departure Date
                  </label>
                  <input
                    type="date"
                    name="departureDate"
                    required
                    value={formData.departureDate}
                    onChange={handleChange}
                    onClick={(e) => e.currentTarget.showPicker?.()}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors cursor-pointer"
                  />
                </div>

                {/* Estimated Arrival Time (ETA) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Clock size={13} className="text-[#D4AF37]" />
                    Estimated Arrival Time (ETA)
                  </label>
                  <input
                    type="time"
                    name="arrivalTime"
                    value={formData.arrivalTime}
                    onChange={handleChange}
                    onClick={(e) => e.currentTarget.showPicker?.()}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors cursor-pointer"
                  />
                </div>

                {/* Interactive Number of Travelers (+ / - Counter Upto 50+) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Number of Travelers
                  </label>
                  <div className="flex items-center justify-between rounded-xl bg-slate-950 border border-slate-800 p-2 text-sm text-white">
                    <button
                      type="button"
                      onClick={handleDecrementTravelers}
                      disabled={travelersCount <= 1}
                      className="h-9 w-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#D4AF37] disabled:opacity-40 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-bold text-white text-sm">
                      {travelersCount} {travelersCount === 1 ? "Traveler" : "Travelers"}
                      {travelersCount === 50 ? "+" : ""}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrementTravelers}
                      disabled={travelersCount >= 50}
                      className="h-9 w-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#D4AF37] disabled:opacity-40 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Travel Style */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Travel Style
                  </label>
                  <select
                    name="travelStyle"
                    value={formData.travelStyle}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="">Select travel style</option>
                    <option value="Private & Leisure">Private & Leisure</option>
                    <option value="Corporate / Business">
                      Corporate / Business
                    </option>
                    <option value="Family Holiday">Family Holiday</option>
                    <option value="Adventure & Off-road">
                      Adventure & Off-road
                    </option>
                  </select>
                </div>

                {/* Approximate Budget */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 block">
                    Approximate Budget
                  </label>
                  <select
                    name="approximateBudget"
                    value={formData.approximateBudget}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="">Select budget</option>
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Luxury / Premium">Luxury / Premium</option>
                  </select>
                </div>
              </div>

              {/* Tell Us More */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Tell Us More
                </label>
                <textarea
                  name="additionalInfo"
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Tell us about your trip, preferred itinerary, transportation needs, hotel requirements, activities, or anything else you would like us to know."
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 p-4 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none transition-colors resize-y"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#B8860B] py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                <Send size={15} />
                <span>Submit Enquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}