import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, CheckCircle2 } from "lucide-react";

interface TourDetails {
  title: string;
  locations: string;
  duration: string;
  price: string;
  image: string;
  description: string;
  highlights: string[];
}

const TOURS_DATA: Record<string, TourDetails> = {
  // Matches homepage slug "thailand-express" or short "thailand"
  "thailand-express": {
    title: "Essential Thailand (Bangkok & Pattaya)",
    locations: "Bangkok • Pattaya • Coral Island",
    duration: "4N / 5D",
    price: "NPR 65,000",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
    description: "Experience the vibrant city life of Bangkok alongside the tranquil beaches of Pattaya and thrilling island activities.",
    highlights: ["Coral Island Speedboat Trip", "Bangkok Temple & City Tour", "Alcazar Show Admission", "Private Airport Transfers"],
  },
  thailand: {
    title: "Essential Thailand (Bangkok & Pattaya)",
    locations: "Bangkok • Pattaya • Coral Island",
    duration: "4N / 5D",
    price: "NPR 65,000",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80",
    description: "Experience the vibrant city life of Bangkok alongside the tranquil beaches of Pattaya and thrilling island activities.",
    highlights: ["Coral Island Speedboat Trip", "Bangkok Temple & City Tour", "Alcazar Show Admission", "Private Airport Transfers"],
  },

  // Matches homepage slug "dubai-desert-safari" or short "dubai"
  "dubai-desert-safari": {
    title: "Dubai Glitz & Desert Safari",
    locations: "Dubai • Abu Dhabi • Desert Camp",
    duration: "5N / 6D",
    price: "NPR 110,000",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    description: "Witness ultra-modern luxury, breathtaking skyscrapers, and authentic Arabian desert adventures in the heart of UAE.",
    highlights: ["Burj Khalifa Observation Deck", "4x4 Desert Safari with BBQ Dinner", "Dhow Cruise Dinner at Marina", "Dubai Mall & Fountain Show"],
  },
  dubai: {
    title: "Dubai Glitz & Desert Safari",
    locations: "Dubai • Abu Dhabi • Desert Camp",
    duration: "5N / 6D",
    price: "NPR 110,000",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    description: "Witness ultra-modern luxury, breathtaking skyscrapers, and authentic Arabian desert adventures in the heart of UAE.",
    highlights: ["Burj Khalifa Observation Deck", "4x4 Desert Safari with BBQ Dinner", "Dhow Cruise Dinner at Marina", "Dubai Mall & Fountain Show"],
  },

  // Matches homepage slug "bali-tropical-escape" or short "bali"
  "bali-tropical-escape": {
    title: "Bali Island & Culture Getaway",
    locations: "Ubud • Kuta • Nusa Penida",
    duration: "5N / 6D",
    price: "NPR 85,000",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    description: "Immerse yourself in Bali's rich culture, scenic rice terraces, sacred temples, and paradise islands.",
    highlights: ["Nusa Penida Island Day Tour", "Ubud Monkey Forest & Rice Terrace", "Tegallalang Rice Terrace Swing", "Beachfront Resort Accommodation"],
  },
  bali: {
    title: "Bali Island & Culture Getaway",
    locations: "Ubud • Kuta • Nusa Penida",
    duration: "5N / 6D",
    price: "NPR 85,000",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    description: "Immerse yourself in Bali's rich culture, scenic rice terraces, sacred temples, and paradise islands.",
    highlights: ["Nusa Penida Island Day Tour", "Ubud Monkey Forest & Rice Terrace", "Tegallalang Rice Terrace Swing", "Beachfront Resort Accommodation"],
  },

  // Singapore & Malaysia
  singapore: {
    title: "Singapore & Malaysia",
    locations: "Singapore • Genting",
    duration: "6N / 7D",
    price: "NPR 115,000",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    description: "Explore the futuristic marvels of Singapore and the cool mountain leisure destination of Genting Highlands.",
    highlights: ["Gardens by the Bay & Supertree Grove", "Universal Studios Singapore Ticket", "Genting Cable Car Ride", "Kuala Lumpur City Tour"],
  },
};

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = TOURS_DATA[slug];

  if (!tour) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16">
      <div className="container-x max-w-5xl">
        {/* Back Link */}
        <Link
          href="/outbound"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#D4AF37] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>Back to All Outbound Tours</span>
        </Link>

        {/* Hero Banner Image */}
        <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
          <img
            src={tour.image}
            alt={tour.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#D4AF37] bg-slate-900/80 px-3 py-1 rounded-full border border-[#D4AF37]/30 backdrop-blur">
              <MapPin size={13} />
              {tour.locations}
            </span>
            <h1 className="mt-3 text-3xl sm:text-5xl font-black text-white">
              {tour.title}
            </h1>
          </div>
        </div>

        {/* Tour Details Box */}
        <div className="mt-8 grid gap-8 md:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Trip Overview</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {tour.description}
            </p>

            <h3 className="text-lg font-bold text-white mt-8 mb-4">Package Highlights</h3>
            <ul className="grid gap-3">
              {tour.highlights.map((item, index) => (
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
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Starting From</span>
              <p className="text-3xl font-black text-[#D4AF37] mt-1">{tour.price}</p>
              
              <div className="mt-6 flex items-center gap-2 border-t border-b border-slate-800 py-4 text-xs font-bold text-slate-300">
                <Calendar size={16} className="text-[#D4AF37]" />
                <span>Duration: {tour.duration}</span>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-8 block w-full text-center rounded-full bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#B8860B] py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg hover:scale-[1.02] transition-transform"
            >
              Book This Package
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}