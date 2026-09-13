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
  // --- HERITAGE & CULTURAL ---
  "ktm-bandipur-pokhara-nagarkot": {
    title: "7N/8D Kathmandu, Bandipur, Pokhara & Nagarkot Heritage",
    locations: "Kathmandu • Bandipur • Pokhara • Nagarkot • Bhaktapur",
    duration: "7N / 8D",
    price: "NPR 58,000",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    description: "An immersive 8-day journey across Nepal's iconic hill stations, heritage cities, and serene lakes. Experience Boudhanath, Patan, scenic drives to Bandipur, Phewa Lake boating, Sarangkot sunrise, Nagarkot Himalayan views, traditional rickshaw rides, and authentic cultural dance dinners.",
    highlights: [
      "Day 1: Arrival KTM, Boudhanath Stupa & Patan Durbar Square",
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
    highlights: [
      "Day 1: Arrival in Kathmandu & transfer to hotel",
      "Day 2: UNESCO Heritage Tour: Swayambhunath & Kathmandu Durbar Square",
      "Day 3: Patan Durbar Square, Bhaktapur medieval city & Pashupatinath Evening Aarti",
      "Day 4: Final shopping at Thamel & airport departure transfer"
    ],
  },

  // --- TREKKING ITINERARIES ---
  "ebc-trek": {
    title: "14 Days Everest Base Camp & Kala Patthar Expedition",
    locations: "Lukla • Namche Bazaar • Tengboche • Gorakshep • EBC",
    duration: "13N / 14D",
    price: "NPR 115,000",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    description: "The ultimate Himalayan trek to the base of Mount Everest (5,364m). Walk through iconic Sherpa villages, ancient monasteries, suspension bridges over the Dudh Koshi river, and stand face-to-face with the world's highest peak from Kala Patthar viewpoint (5,545m).",
    highlights: [
      "Day 1: Arrival in Kathmandu & trip briefing with guide",
      "Day 2: Thrilling flight to Lukla (2,860m) & trek to Phakding (2,610m)",
      "Day 3: Trek to Namche Bazaar (3,440m) through Sagarmatha National Park",
      "Day 4: Acclimatization day in Namche Bazaar & hike to Everest View Hotel",
      "Day 5: Trek from Namche to Tengboche Monastery (3,867m) with Ama Dablam views",
      "Day 6: Trek to Dingboche (4,410m) through alpine forest landscapes",
      "Day 7: Second acclimatization day in Dingboche with ridge hike to Nangkartshang Peak",
      "Day 8: Trek to Lobuche (4,940m) past the Everest Memorial at Thukla Pass",
      "Day 9: Trek to Gorakshep (5,164m) & push to Everest Base Camp (5,364m)",
      "Day 10: Early morning summit of Kala Patthar (5,545m) for Everest sunrise & trek down to Pheriche",
      "Day 11: Trek down to Namche Bazaar",
      "Day 12: Final day of trekking down to Lukla",
      "Day 13: Flight back to Kathmandu & celebration dinner",
      "Day 14: Final hotel check-out & international departure transfer"
    ],
  },
  "annapurna-circuit": {
    title: "12 Days Annapurna Circuit & Thorong La Pass Trek",
    locations: "Besisahar • Manang • Thorong La Pass • Muktinath • Pokhara",
    duration: "11N / 12D",
    price: "NPR 88,000",
    image: "https://images.unsplash.com/photo-1585864970145-325863508113?auto=format&fit=crop&w=1200&q=80",
    description: "Traverse one of the world's most renowned classic treks. Cross the formidable Thorong La Pass at 5,416m, descend to the sacred temple of Muktinath, explore apple orchards in Marpha, and relax at Pokhara's Fewa Lake.",
    highlights: [
      "Day 1: Scenic drive from Kathmandu to Besisahar & Chame",
      "Day 2: Trek from Chame to Pisang (3,200m) along Marsyangdi river",
      "Day 3: Trek to Manang Valley (3,540m) with views of Annapurna II & IV",
      "Day 4: Rest & acclimatization day in Manang (hike to Gangapurna Glacier lake)",
      "Day 5: Trek from Manang to Ledar / Yak Kharka (4,050m)",
      "Day 6: Trek to Thorong Phedi / High Camp (4,900m)",
      "Day 7: Cross Thorong La Pass (5,416m) & descend to Muktinath Temple (3,800m)",
      "Day 8: Explore Muktinath 108 spouts & drive/trek to Marpha apple village",
      "Day 9: Drive through Kali Gandaki valley to Tatopani natural hot springs",
      "Day 10: Drive/trek to Pokhara via Nayapul",
      "Day 11: Pokhara sightseeing & scenic drive back to Kathmandu",
      "Day 12: Departure transfer to airport"
    ],
  },
  "annapurna-base-camp-trek": {
    title: "Annapurna Base Camp Trek",
    locations: "Pokhara • Ghandruk • ABC (4,130m)",
    duration: "9N / 10D",
    price: "NPR 65,000",
    image: "https://images.unsplash.com/photo-1585869110973-7280be312084?auto=format&fit=crop&w=1200&q=80",
    description: "Trek through lush rhododendron forests, traditional Gurung villages, and natural hot springs, culminating in the 360-degree mountain amphitheater inside the Annapurna Sanctuary at 4,130m.",
    highlights: [
      "Day 1: Drive from Kathmandu to Pokhara & transfer to Lakeside",
      "Day 2: Drive to Nayapul / Jhinu & trek to Ghandruk village (1,940m)",
      "Day 3: Trek from Ghandruk to Chhomrong village (2,170m)",
      "Day 4: Trek through bamboo forests to Himalaya / Dovan (2,600m)",
      "Day 5: Trek past Machhapuchhre Base Camp (MBC) to Annapurna Base Camp (4,130m)",
      "Day 6: Sunrise over Annapurna I (8,091m) & trek down to Bamboo (2,310m)",
      "Day 7: Trek from Bamboo down to Jhinu Danda natural hot springs",
      "Day 8: Trek to Siwai/Nayapul & drive back to Pokhara",
      "Day 9: Scenic highway drive back to Kathmandu",
      "Day 10: Final hotel check-out & international departure"
    ],
  },
  "mustang-overland": {
    title: "6 Days Muktinath & Lower Mustang Overland Safari",
    locations: "Pokhara • Tatopani • Jomsom • Muktinath • Marpha",
    duration: "5N / 6D",
    price: "NPR 45,000",
    image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80",
    description: "Experience the rain-shadow desert landscapes of Mustang without arduous high-altitude walking. Ride in a private 4WD vehicle through Kali Gandaki gorge, visit Muktinath 108 water spouts, and taste apple brandy in Marpha.",
    highlights: [
      "Day 1: Kathmandu to Pokhara scenic tourist bus / drive",
      "Day 2: Overland Scorpio drive to Tatopani hot springs & Ghasa",
      "Day 3: Drive along Kali Gandaki river to Jomsom & Muktinath Temple (3,800m)",
      "Day 4: Muktinath Darshan, Kagbeni sacred confluence & Marpha village walk",
      "Day 5: Drive back to Pokhara & evening boat ride on Phewa Lake",
      "Day 6: Return drive to Kathmandu & departure transfer"
    ],
  },

  // --- ADVENTURE & LEISURE ---
  "pokhara-leisure-tour": {
    title: "Pokhara Lake & Mountain Escape",
    locations: "Pokhara • Sarangkot • Peace Pagoda",
    duration: "4N / 5D",
    price: "NPR 35,000",
    image: "https://images.unsplash.com/photo-1540411608474-4325bbd12869?auto=format&fit=crop&w=1200&q=80",
    description: "Relax by Fewa Lake, witness breathtaking Annapurna views from Sarangkot sunrise, and explore caves, waterfalls, and peaceful temples.",
    highlights: [
      "Day 1: Arrival in Pokhara & Lakeside stroll",
      "Day 2: Sarangkot Sunrise over Annapurna Range & ZipFlyer adventure",
      "Day 3: Boating on Fewa Lake to Tal Barahi Temple & World Peace Pagoda hike",
      "Day 4: Devi's Fall, Gupteshwor Cave & International Mountain Museum",
      "Day 5: Return transfer to Kathmandu"
    ],
  },

  // --- WILDLIFE SAFARI ---
  "chitwan-national-park-safari": {
    title: "Chitwan Wildlife Jungle Safari",
    locations: "Chitwan National Park • Rapti River",
    duration: "2N / 3D",
    price: "NPR 28,000",
    image: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80",
    description: "Venture into Nepal's first national park to spot rare One-Horned Rhinos, Bengal Tigers, exotic birds, and experience Tharu cultural dance.",
    highlights: [
      "Day 1: Drive to Chitwan, Tharu village walk & evening cultural dance show",
      "Day 2: Full day safari: Jeep safari into deep jungle, Rapti canoe ride & elephant breeding center",
      "Day 3: Morning bird watching walk & return drive to Kathmandu or Pokhara"
    ],
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