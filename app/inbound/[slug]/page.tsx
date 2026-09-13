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

const INBOUND_DATA: Record<string, TourDetails> = {
  "ktm-bandipur-pokhara-nagarkot": {
    title: "7N/8D Kathmandu, Bandipur, Pokhara & Nagarkot Heritage",
    locations: "Kathmandu • Bandipur • Pokhara • Nagarkot • Bhaktapur",
    duration: "7N / 8D",
    price: "NPR 58,000",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    description: "An immersive 8-day journey across Nepal's iconic hill stations, heritage cities, and serene lakes. Experience Boudhanath, Patan, scenic drives to Bandipur, Phewa Lake boating, Sarangkot sunrise, Nagarkot Himalayan views, traditional rickshaw rides, and authentic cultural dance dinners.",
    highlights: [
      "Day 1: Arrival KTM (Turkish Airlines), Boudhanath Stupa & Patan Durbar Square",
      "Day 2: Scenic countryside drive to hilltop Bandipur & evening village stroll",
      "Day 3: Drive to Pokhara, Phewa Lake boating & Taal Barahi Temple",
      "Day 4: Sarangkot Himalayan Sunrise, Devi's Fall, Gupteshwor Cave & Mountain Museum",
      "Day 5: Flight to Kathmandu, Bhaktapur Durbar Square & Nagarkot Sunset",
      "Day 6: KTM Durbar Square, Traditional Rickshaw Ride, Swayambhunath & Cultural Dance Dinner",
      "Day 7: Ancient Newari towns of Kirtipur & Khokana exploration",
      "Day 8: Hotel check-out, farewell, and departure transfer to Tribhuvan International Airport"
    ],
  },
  "10-days-nepal-bhutan-tour": {
    title: "10 Days Ultimate Nepal & Bhutan Himalayan Kingdom Tour",
    locations: "Kathmandu • Thimphu • Punakha • Paro • Nagarkot",
    duration: "9N / 10D",
    price: "NPR 185,000",
    image: "https://images.unsplash.com/photo-1585869110973-7280be312084?auto=format&fit=crop&w=1200&q=80",
    description: "A grand cross-border Himalayan voyage capturing the cultural essence of Nepal and the magical kingdom of Bhutan. Highlights include Tiger's Nest Monastery, Punakha Dzong, Dochula Pass, Bhaktapur cooking class, Namobuddha, and UNESCO World Heritage sites.",
    highlights: [
      "Day 1: Arrival KTM, Boudhanath Stupa & Patan Durbar Square",
      "Day 2: Cultural exploration of historical Kirtipur & Khokana Newari settlements",
      "Day 3: Flight to Paro (Bhutan), drive to Thimphu, Buddha Point & Trashichhoedzong",
      "Day 4: Dochula Pass (3,080m), majestic Punakha Dzong & Chimi Lhakhang",
      "Day 5: Drive to Paro via Simtokha Dzong, Ta Dzong Museum & Rinpung Dzong",
      "Day 6: Hike to iconic Tiger's Nest (Taktsang Monastery) & 7th-century Kyichu Lhakhang",
      "Day 7: Flight back to KTM, Bhaktapur cooking class at The Nanee & Nagarkot stay",
      "Day 8: Sacred Namobuddha Monastery pilgrimage & return to Kathmandu",
      "Day 9: Swayambhunath, Kathmandu Durbar Square, Thamel & Cultural Farewell Dinner",
      "Day 10: Airport departure transfer with sweet memories of Nepal & Bhutan"
    ],
  },
  "10-days-nepal-tour": {
    title: "10 Days Grand Nepal Cultural & Spiritual Circuit",
    locations: "Kathmandu • Bandipur • Pokhara • Lumbini • Nagarkot",
    duration: "9N / 10D",
    price: "NPR 82,000",
    image: "https://images.unsplash.com/photo-1540411608474-4325bbd12869?auto=format&fit=crop&w=1200&q=80",
    description: "The complete essential Nepal experience. Journey through the capital's heritage, peaceful hilltop Bandipur, Pokhara's lakes and caves, Lord Buddha's birthplace in Lumbini, Namobuddha monastery, and Nagarkot's mountain views.",
    highlights: [
      "Day 1: Arrival KTM, Boudhanath Stupa & Patan Durbar Square",
      "Day 2: Historic Newari towns of Kirtipur & Khokana",
      "Day 3: Scenic drive to hilltop Bandipur settlement",
      "Day 4: Drive to Pokhara, Phewa Lake boating & Taal Barahi Temple",
      "Day 5: Sarangkot Sunrise, Devi's Fall, Gupteshwor Cave & Mountain Museum",
      "Day 6: Flight to Bhairahawa, Maya Devi Temple & Ashoka Pillar in Sacred Lumbini",
      "Day 7: Flight to KTM, Bhaktapur Durbar Square, Juju Dhau tasting & Nagarkot hill station",
      "Day 8: Pilgrimage to Namobuddha Monastery & drive back to Kathmandu",
      "Day 9: Swayambhunath Stupa, KTM Durbar Square, Rickshaw Ride & Cultural Dinner",
      "Day 10: Final hotel check-out & airport departure transfer"
    ],
  },
  "kathmandu-valley-cultural-tour": {
    title: "Kathmandu Valley Cultural Heritage",
    locations: "Kathmandu • Bhaktapur • Patan",
    duration: "3N / 4D",
    price: "NPR 25,000",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    description: "Explore UNESCO World Heritage Sites including Pashupatinath, Swayambhunath, and the historic Durbar Squares of Kathmandu, Patan, and Bhaktapur.",
    highlights: ["Swayambhunath Stupa (Monkey Temple)", "Bhaktapur Durbar Square Architectural Tour", "Pashupatinath Temple Evening Aarti", "Traditional Newari Dinner Experience"],
  },
  "pokhara-leisure-tour": {
    title: "Pokhara Lake & Mountain Escape",
    locations: "Pokhara • Sarangkot • Peace Pagoda",
    duration: "4N / 5D",
    price: "NPR 35,000",
    image: "https://images.unsplash.com/photo-1540411608474-4325bbd12869?auto=format&fit=crop&w=1200&q=80",
    description: "Relax by Fewa Lake, witness breathtaking Annapurna views from Sarangkot sunrise, and explore caves, waterfalls, and peaceful temples.",
    highlights: ["Sarangkot Sunrise over Annapurna Range", "Boating on Fewa Lake to Tal Barahi Temple", "Davis Falls & Gupteshwor Cave", "World Peace Pagoda Hike"],
  },
  "annapurna-base-camp-trek": {
    title: "Annapurna Base Camp Trek",
    locations: "Pokhara • Ghandruk • ABC",
    duration: "9N / 10D",
    price: "NPR 65,000",
    image: "https://images.unsplash.com/photo-1585869110973-7280be312084?auto=format&fit=crop&w=1200&q=80",
    description: "Trek through rhododendron forests, Gurung villages, and hot springs, culminating in the 360-degree mountain amphitheater at Annapurna Base Camp (4,130m).",
    highlights: ["Annapurna Sanctuary at 4,130m", "Jhinu Danda Natural Hot Springs", "Traditional Gurung Village of Ghandruk", "Full Licensed Trekking Guide & Porters"],
  },
  "chitwan-national-park-safari": {
    title: "Chitwan Wildlife Jungle Safari",
    locations: "Chitwan National Park",
    duration: "2N / 3D",
    price: "NPR 28,000",
    image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80",
    description: "Venture into Nepal's first national park to spot rare One-Horned Rhinos, Bengal Tigers, exotic birds, and experience Tharu cultural dance.",
    highlights: ["Jeep Safari into Deep Jungle", "Canoe Ride on Rapti River", "Tharu Cultural Dance Performance", "Jungle Walk with Wildlife Experts"],
  },
};

export default async function InboundDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = INBOUND_DATA[slug];

  if (!tour) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16">
      <div className="container-x max-w-5xl">
        {/* Back Link */}
        <Link
          href="/inbound"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#D4AF37] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>Back to Inbound Nepal Tours</span>
        </Link>

        {/* Hero Banner */}
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

        {/* Details Grid */}
        <div className="mt-8 grid gap-8 md:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Package Details</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {tour.description}
            </p>

            <h3 className="text-lg font-bold text-white mt-8 mb-4">Day-by-Day Itinerary Highlights</h3>
            <ul className="grid gap-3">
              {tour.highlights.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle2 size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-[#D4AF37]/30 bg-slate-900 p-6 shadow-xl h-fit">
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Price Per Person</span>
              <p className="text-3xl font-black text-[#D4AF37] mt-1">{tour.price}</p>
              
              <div className="mt-6 flex items-center gap-2 border-t border-b border-slate-800 py-4 text-xs font-bold text-slate-300">
                <Calendar size={16} className="text-[#D4AF37]" />
                <span>Duration: {tour.duration}</span>
              </div>
            </div>

            <Link
              href="/contact-us"
              className="mt-8 block w-full text-center rounded-full bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#B8860B] py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg hover:scale-[1.02] transition-transform"
            >
              Book Inbound Package
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}