import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, ShieldCheck, Fuel, CheckCircle2 } from "lucide-react";

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
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    description: "Comfortable air-conditioned private car rentals with trained local drivers for Kathmandu city tours, Nagarkot trips, and short inter-city routes.",
    inclusions: ["Fuel & Parking Fees Included", "Experienced Local Driver", "Clean & Sanitized Interior", "Air Conditioning & Music System"],
  },
  "4x4-scorpio-jeep-rental": {
    title: "4x4 Scorpio SUV & Jeep Rental",
    vehicleType: "Mahindra Scorpio / Toyota Prado",
    capacity: "6 - 7 Passengers",
    price: "NPR 8,500 / Day",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    description: "Rugged 4WD off-road vehicles built for long-distance highway routes, rough mountain terrains, Muktinath, Besisahar, and trekking starting points.",
    inclusions: ["All-Wheel Drive (4WD) Capability", "Roof Rack Luggage Carrier", "Hill-Driving Expert Driver", "Highway Taxes & Tolls Paid"],
  },
  "toyota-hiace-van-rental": {
    title: "Toyota HiAce Tourist Van",
    vehicleType: "Toyota HiAce High Roof",
    capacity: "14 Passengers",
    price: "NPR 12,000 / Day",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    description: "Ideal choice for group travel, family holidays, and long trips to Pokhara, Chitwan, or Lumbini. Superior comfort with spacious seating.",
    inclusions: ["High Roof with Ample Headroom", "Dual Air Conditioning", "Dedicated Luggage Boot", "Professional Uniformed Driver"],
  },
  "tribhuvan-airport-private-transfer": {
    title: "Airport Transfer (TIA Kathmandu)",
    vehicleType: "Private AC Car / Van",
    capacity: "1 - 14 Passengers",
    price: "NPR 1,500 / Trip For Cars",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    description: "Stress-free airport pickup and drop services at Tribhuvan International Airport (TIA) with personalized signboards and flight monitoring.",
    inclusions: ["Airport Entrance Fees Included", "Welcome Name Board at Terminal", "24/7 Flight Delay Tracking", "Luggage Assistance"],
  },
};

export default async function TransportationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = VEHICLES_DATA[slug];

  if (!vehicle) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16">
      <div className="container-x max-w-5xl">
        {/* Back Link */}
        <Link
          href="/transportation"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#D4AF37] transition-colors mb-8"
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
        <div className="mt-8 grid gap-8 md:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Vehicle Overview</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {vehicle.description}
            </p>

            <h3 className="text-lg font-bold text-white mt-8 mb-4">What's Included</h3>
            <ul className="grid gap-3">
              {vehicle.inclusions.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 size={18} className="text-[#D4AF37] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing & Booking Card */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#D4AF37]/30 bg-slate-900 p-6 shadow-xl h-fit">
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Rate Standard</span>
              <p className="text-3xl font-black text-[#D4AF37] mt-1">{vehicle.price}</p>
              
              <div className="mt-6 border-t border-b border-slate-800 py-4 text-xs font-bold text-slate-300 space-y-2">
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

            <Link
              href="/contact-us"
              className="mt-8 block w-full text-center rounded-full bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#B8860B] py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg hover:scale-[1.02] transition-transform"
            >
              Book Vehicle Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}