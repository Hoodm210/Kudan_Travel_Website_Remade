import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  PhoneCall,
  FileText,
  Download,
} from "lucide-react";

interface DayItinerary {
  day: number;
  title: string;
  details: string;
}

interface TourDetails {
  title: string;
  locations: string;
  duration: string;
  price: string;
  image: string;
  pdfUrl: string;
  description: string;
  highlights: string[];
  itinerary: DayItinerary[];
}

const TOURS_DATA: Record<string, TourDetails> = {
  // 1. BALI
  "bali-tropical-escape": {
    title: "Bali Island & Cultural Sanctuary Getaway",
    locations: "UBUD • KUTA • NUSA PENIDA",
    duration: "5N / 6D",
    price: "NPR 85,000",
    image: "/bali.png",
    pdfUrl: "/pdf/bali-5n6d-itinerary.pdf",
    description: "Immerse yourself in Bali's rich culture, scenic rice terraces, sacred temples, and paradise beach islands.",
    highlights: [
      "Nusa Penida Island Day Tour",
      "Ubud Monkey Forest & Sacred Sanctuary",
      "Tegallalang Rice Terrace Swing Experience",
      "Beachfront Resort Accommodation",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Bali & Kuta Sunset", details: "Greeting upon arrival at Ngurah Rai Airport (DPS). Transfer to hotel and relax at Kuta Beach." },
      { day: 2, title: "Nusa Penida Island Excursion", details: "Speedboat trip to Nusa Penida. Visit Kelingking Beach, Broken Beach, and Crystal Bay." },
      { day: 3, title: "Ubud Cultural Tour & Jungle Swing", details: "Explore Sacred Monkey Forest, Tegallalang Rice Terraces, and enjoy the famous Bali Swing." },
      { day: 4, title: "Tanah Lot & Uluwatu Sunset", details: "Visit Tanah Lot sea temple and Uluwatu Temple cliff edge for sunset." },
      { day: 5, title: "Water Sports & Leisure Day", details: "Enjoy jet ski and banana boat rides at Tanjung Benoa beach followed by spa sessions." },
      { day: 6, title: "Departure from Bali", details: "Free time for souvenir shopping before private transfer to airport." },
    ],
  },
  bali: {
    title: "Bali Island & Cultural Sanctuary Getaway",
    locations: "UBUD • KUTA • NUSA PENIDA",
    duration: "5N / 6D",
    price: "NPR 85,000",
    image: "/bali.png",
    pdfUrl: "/pdf/bali-5n6d-itinerary.pdf",
    description: "Immerse yourself in Bali's rich culture, scenic rice terraces, sacred temples, and paradise beach islands.",
    highlights: ["Nusa Penida Island Day Tour", "Ubud Monkey Forest & Sacred Sanctuary", "Tegallalang Rice Terrace Swing Experience", "Beachfront Resort Accommodation"],
    itinerary: [
      { day: 1, title: "Arrival in Bali & Kuta Sunset", details: "Greeting upon arrival at Ngurah Rai Airport (DPS). Transfer to hotel and relax at Kuta Beach." },
      { day: 2, title: "Nusa Penida Island Excursion", details: "Speedboat trip to Nusa Penida. Visit Kelingking Beach, Broken Beach, and Crystal Bay." },
      { day: 3, title: "Ubud Cultural Tour & Jungle Swing", details: "Explore Sacred Monkey Forest, Tegallalang Rice Terraces, and enjoy the famous Bali Swing." },
      { day: 4, title: "Tanah Lot & Uluwatu Sunset", details: "Visit Tanah Lot sea temple and Uluwatu Temple cliff edge for sunset." },
      { day: 5, title: "Water Sports & Leisure Day", details: "Enjoy jet ski and banana boat rides at Tanjung Benoa beach followed by spa sessions." },
      { day: 6, title: "Departure from Bali", details: "Free time for souvenir shopping before private transfer to airport." },
    ],
  },

  // 2. THAILAND ESSENTIAL (4N/5D)
  "thailand-express": {
    title: "Essential Thailand & Coral Island Escape",
    locations: "BANGKOK • PATTAYA • CORAL ISLAND",
    duration: "4N / 5D",
    price: "NPR 55,000",
    image: "/thailand.png",
    pdfUrl: "/pdf/thailand-4n5d-itinerary.pdf",
    description: "Experience the vibrant city life of Bangkok alongside the tranquil beaches of Pattaya and thrilling speedboat island activities.",
    highlights: ["Coral Island Speedboat Trip with Lunch", "Bangkok Temple & Golden Buddha City Tour", "Alcazar Cabaret Show Admission", "Private Airport & Hotel Transfers"],
    itinerary: [
      { day: 1, title: "Arrival in Bangkok & Transfer to Pattaya", details: "Arrive at Suvarnabhumi Airport and transfer to Pattaya. Evening Alcazar Show." },
      { day: 2, title: "Coral Island Speedboat Cruise", details: "Excursion to Coral Island with seafood lunch and water activities." },
      { day: 3, title: "Pattaya to Bangkok Temple Tour", details: "Transfer to Bangkok. Visit Marble Temple and Golden Buddha Temple." },
      { day: 4, title: "Bangkok Safari World & Marine Park", details: "Full day safari experience drive with live stunt performances." },
      { day: 5, title: "Shopping & Departure", details: "Free time for shopping before private transfer to airport." },
    ],
  },
  thailand: {
    title: "Essential Thailand & Coral Island Escape",
    locations: "BANGKOK • PATTAYA • CORAL ISLAND",
    duration: "4N / 5D",
    price: "NPR 55,000",
    image: "/thailand.png",
    pdfUrl: "/pdf/thailand-4n5d-itinerary.pdf",
    description: "Experience the vibrant city life of Bangkok alongside the tranquil beaches of Pattaya and thrilling speedboat island activities.",
    highlights: ["Coral Island Speedboat Trip with Lunch", "Bangkok Temple & Golden Buddha City Tour", "Alcazar Cabaret Show Admission", "Private Airport & Hotel Transfers"],
    itinerary: [
      { day: 1, title: "Arrival in Bangkok & Transfer to Pattaya", details: "Arrive at Suvarnabhumi Airport and transfer to Pattaya. Evening Alcazar Show." },
      { day: 2, title: "Coral Island Speedboat Cruise", details: "Excursion to Coral Island with seafood lunch and water activities." },
      { day: 3, title: "Pattaya to Bangkok Temple Tour", details: "Transfer to Bangkok. Visit Marble Temple and Golden Buddha Temple." },
      { day: 4, title: "Bangkok Safari World & Marine Park", details: "Full day safari experience drive with live stunt performances." },
      { day: 5, title: "Shopping & Departure", details: "Free time for shopping before private transfer to airport." },
    ],
  },

  // 3. THAILAND GRAND (5N/6D)
  "thailand-grand-escape": {
    title: "Grand Thailand & Phuket Tropical Explorer",
    locations: "BANGKOK • PHUKET • PATTAYA",
    duration: "5N / 6D",
    price: "NPR 68,000",
    image: "/thailand.png",
    pdfUrl: "/pdf/thailand-5n6d-itinerary.pdf",
    description: "An extended island getaway exploring Thailand's bustling metropolis, pristine Phuket beaches, and lively Pattaya coastlines.",
    highlights: ["Phi Phi Island Cruise", "Pattaya Floating Market Excursion", "Bangkok Safari World", "Deluxe Hotel Stay"],
    itinerary: [
      { day: 1, title: "Arrival in Bangkok & Transfer to Pattaya", details: "Arrive in Bangkok and transfer to Pattaya resort." },
      { day: 2, title: "Pattaya Beach & Floating Market", details: "Full day enjoying beach sports and traditional floating markets." },
      { day: 3, title: "Flight to Phuket & Patong Evening", details: "Flight to Phuket and leisure walk along Patong Beach." },
      { day: 4, title: "Phi Phi Island Day Cruise", details: "Big boat cruise to Maya Bay and Phi Phi Don with lunch." },
      { day: 5, title: "Phuket City Tour & Old Town", details: "Visit Big Buddha, Wat Chalong, and Phuket Old Town." },
      { day: 6, title: "Homeward Departure", details: "Transfer to Phuket airport for flight home." },
    ],
  },
  grandthailand: {
    title: "Grand Thailand & Phuket Tropical Explorer",
    locations: "BANGKOK • PHUKET • PATTAYA",
    duration: "5N / 6D",
    price: "NPR 68,000",
    image: "/thailand.png",
    pdfUrl: "/pdf/thailand-5n6d-itinerary.pdf",
    description: "An extended island getaway exploring Thailand's bustling metropolis, pristine Phuket beaches, and lively Pattaya coastlines.",
    highlights: ["Phi Phi Island Cruise", "Pattaya Floating Market Excursion", "Bangkok Safari World", "Deluxe Hotel Stay"],
    itinerary: [
      { day: 1, title: "Arrival in Bangkok & Transfer to Pattaya", details: "Arrive in Bangkok and transfer to Pattaya resort." },
      { day: 2, title: "Pattaya Beach & Floating Market", details: "Full day enjoying beach sports and traditional floating markets." },
      { day: 3, title: "Flight to Phuket & Patong Evening", details: "Flight to Phuket and leisure walk along Patong Beach." },
      { day: 4, title: "Phi Phi Island Day Cruise", details: "Big boat cruise to Maya Bay and Phi Phi Don with lunch." },
      { day: 5, title: "Phuket City Tour & Old Town", details: "Visit Big Buddha, Wat Chalong, and Phuket Old Town." },
      { day: 6, title: "Homeward Departure", details: "Transfer to Phuket airport for flight home." },
    ],
  },

  // 4. SINGAPORE
  "singapore-city-escape": {
    title: "Singapore City & Sentosa Island Explorer",
    locations: "SINGAPORE • SENTOSA • MARINA BAY",
    duration: "5N / 6D",
    price: "NPR 115,000",
    image: "/singapore.png",
    pdfUrl: "/pdf/singapore-5n6d-itinerary.pdf",
    description: "Explore the futuristic architectural marvels of Singapore, world-class entertainment hubs, and lush botanical gardens.",
    highlights: ["Gardens by the Bay Pass", "Universal Studios Singapore Ticket", "Sentosa Cable Car Ride", "Marina Bay Sands SkyPark"],
    itinerary: [
      { day: 1, title: "Arrival in Singapore & Night Safari", details: "Arrival transfer to hotel. Evening Singapore Night Safari tram tour." },
      { day: 2, title: "City Highlights & Gardens by the Bay", details: "Visit Merlion Park, Chinatown, and Gardens by the Bay Flower Dome." },
      { day: 3, title: "Universal Studios Singapore", details: "Full day access to Universal Studios movie theme park." },
      { day: 4, title: "Sentosa Island Day Tour", details: "Cable car ride to Sentosa, Madame Tussauds, and Wings of Time show." },
      { day: 5, title: "Marina Bay Sands & Shopping", details: "Observation deck entry at Marina Bay Sands and Orchard Road shopping." },
      { day: 6, title: "Changi Airport Jewel Departure", details: "Explore Jewel Changi indoor waterfall before departure flight." },
    ],
  },
  singapore: {
    title: "Singapore City & Sentosa Island Explorer",
    locations: "SINGAPORE • SENTOSA • MARINA BAY",
    duration: "5N / 6D",
    price: "NPR 115,000",
    image: "/singapore.png",
    pdfUrl: "/pdf/singapore-5n6d-itinerary.pdf",
    description: "Explore the futuristic architectural marvels of Singapore, world-class entertainment hubs, and lush botanical gardens.",
    highlights: ["Gardens by the Bay Pass", "Universal Studios Singapore Ticket", "Sentosa Cable Car Ride", "Marina Bay Sands SkyPark"],
    itinerary: [
      { day: 1, title: "Arrival in Singapore & Night Safari", details: "Arrival transfer to hotel. Evening Singapore Night Safari tram tour." },
      { day: 2, title: "City Highlights & Gardens by the Bay", details: "Visit Merlion Park, Chinatown, and Gardens by the Bay Flower Dome." },
      { day: 3, title: "Universal Studios Singapore", details: "Full day access to Universal Studios movie theme park." },
      { day: 4, title: "Sentosa Island Day Tour", details: "Cable car ride to Sentosa, Madame Tussauds, and Wings of Time show." },
      { day: 5, title: "Marina Bay Sands & Shopping", details: "Observation deck entry at Marina Bay Sands and Orchard Road shopping." },
      { day: 6, title: "Changi Airport Jewel Departure", details: "Explore Jewel Changi indoor waterfall before departure flight." },
    ],
  },

  // 5. MALAYSIA
  "malaysia-genting-tour": {
    title: "Malaysia Highland & Culture Discovery",
    locations: "KUALA LUMPUR • GENTING • MALACCA",
    duration: "5N / 6D",
    price: "NPR 65,000",
    image: "/malaysia.png",
    pdfUrl: "/pdf/malaysia-5n6d-itinerary.pdf",
    description: "A blend of cosmopolitan shopping in Kuala Lumpur and cool mountain entertainment at Genting Highlands.",
    highlights: ["Petronas Twin Towers Photo Stop", "Awana SkyWay Cable Car", "Batu Caves Tour", "Malacca Heritage Excursion"],
    itinerary: [
      { day: 1, title: "Arrival in Kuala Lumpur", details: "Arrive at KLIA, private transfer to hotel. Evening free." },
      { day: 2, title: "Kuala Lumpur City Tour & Batu Caves", details: "Visit Petronas Twin Towers, King Palace, and Batu Caves." },
      { day: 3, title: "Genting Highlands Day Trip", details: "Cable car ride to Genting Highlands indoor theme park and casino." },
      { day: 4, title: "Historical Malacca Excursion", details: "Day tour to UNESCO heritage city Malacca, St. Paul Church, and Jonker Street." },
      { day: 5, title: "Shopping at Bukit Bintang", details: "Full day leisure shopping at Pavilion Mall and Suria KLCC." },
      { day: 6, title: "Departure", details: "Private transfer to KLIA airport for homeward flight." },
    ],
  },
  malaysia: {
    title: "Malaysia Highland & Culture Discovery",
    locations: "KUALA LUMPUR • GENTING • MALACCA",
    duration: "5N / 6D",
    price: "NPR 65,000",
    image: "/malaysia.png",
    pdfUrl: "/pdf/malaysia-5n6d-itinerary.pdf",
    description: "A blend of cosmopolitan shopping in Kuala Lumpur and cool mountain entertainment at Genting Highlands.",
    highlights: ["Petronas Twin Towers Photo Stop", "Awana SkyWay Cable Car", "Batu Caves Tour", "Malacca Heritage Excursion"],
    itinerary: [
      { day: 1, title: "Arrival in Kuala Lumpur", details: "Arrive at KLIA, private transfer to hotel. Evening free." },
      { day: 2, title: "Kuala Lumpur City Tour & Batu Caves", details: "Visit Petronas Twin Towers, King Palace, and Batu Caves." },
      { day: 3, title: "Genting Highlands Day Trip", details: "Cable car ride to Genting Highlands indoor theme park and casino." },
      { day: 4, title: "Historical Malacca Excursion", details: "Day tour to UNESCO heritage city Malacca, St. Paul Church, and Jonker Street." },
      { day: 5, title: "Shopping at Bukit Bintang", details: "Full day leisure shopping at Pavilion Mall and Suria KLCC." },
      { day: 6, title: "Departure", details: "Private transfer to KLIA airport for homeward flight." },
    ],
  },

  // 6. JAPAN
  "japan-cherry-blossom-tour": {
    title: "Japan Golden Route & Heritage Circuit",
    locations: "TOKYO • KYOTO • OSAKA • MT. FUJI",
    duration: "5N / 6D",
    price: "NPR 225,000",
    image: "/japan.png",
    pdfUrl: "/pdf/japan-5n6d-itinerary.pdf",
    description: "Journey through Japan's iconic Golden Route—from neon-lit Tokyo avenues to ancient Kyoto temples and Mt. Fuji views.",
    highlights: ["Shinkansen Bullet Train Ticket", "Mt. Fuji 5th Station Cruise", "Kyoto Fushimi Inari Shrine", "Osaka Dotonbori Tour"],
    itinerary: [
      { day: 1, title: "Arrival in Tokyo", details: "Arrive at Narita or Haneda airport. Transfer to hotel." },
      { day: 2, title: "Tokyo City Sightseeing", details: "Visit Sensoji Temple in Asakusa, Tokyo Skytree, and Shibuya Crossing." },
      { day: 3, title: "Mt. Fuji & Lake Ashi Excursion", details: "Trip to Mt. Fuji 5th Station, Lake Ashi cruise, and Hakone Ropeway." },
      { day: 4, title: "Bullet Train to Kyoto & Ancient Temples", details: "Shinkansen bullet train to Kyoto. Visit Fushimi Inari and Kinkakuji Golden Pavilion." },
      { day: 5, title: "Osaka Castle & Dotonbori", details: "Transfer to Osaka. Tour Osaka Castle and Dotonbori food district." },
      { day: 6, title: "Kansai Departure", details: "Transfer to Kansai International Airport (KIX) for flight." },
    ],
  },
  japan: {
    title: "Japan Golden Route & Heritage Circuit",
    locations: "TOKYO • KYOTO • OSAKA • MT. FUJI",
    duration: "5N / 6D",
    price: "NPR 225,000",
    image: "/japan.png",
    pdfUrl: "/pdf/japan-5n6d-itinerary.pdf",
    description: "Journey through Japan's iconic Golden Route—from neon-lit Tokyo avenues to ancient Kyoto temples and Mt. Fuji views.",
    highlights: ["Shinkansen Bullet Train Ticket", "Mt. Fuji 5th Station Cruise", "Kyoto Fushimi Inari Shrine", "Osaka Dotonbori Tour"],
    itinerary: [
      { day: 1, title: "Arrival in Tokyo", details: "Arrive at Narita or Haneda airport. Transfer to hotel." },
      { day: 2, title: "Tokyo City Sightseeing", details: "Visit Sensoji Temple in Asakusa, Tokyo Skytree, and Shibuya Crossing." },
      { day: 3, title: "Mt. Fuji & Lake Ashi Excursion", details: "Trip to Mt. Fuji 5th Station, Lake Ashi cruise, and Hakone Ropeway." },
      { day: 4, title: "Bullet Train to Kyoto & Ancient Temples", details: "Shinkansen bullet train to Kyoto. Visit Fushimi Inari and Kinkakuji Golden Pavilion." },
      { day: 5, title: "Osaka Castle & Dotonbori", details: "Transfer to Osaka. Tour Osaka Castle and Dotonbori food district." },
      { day: 6, title: "Kansai Departure", details: "Transfer to Kansai International Airport (KIX) for flight." },
    ],
  },

  // 7. SWITZERLAND & ITALY
  "switzerland-italy-grand-tour": {
    title: "Swiss Alps & Italian Heritage Panorama",
    locations: "ZURICH • LUCERNE • MILAN • VENICE",
    duration: "6N / 7D",
    price: "NPR 285,000",
    image: "/switzerland-italy.png",
    pdfUrl: "/pdf/switzerland-italy-6n7d-itinerary.pdf",
    description: "Traverse breathtaking Swiss alpine landscapes and majestic Italian historical cities on an unforgettable European journey.",
    highlights: ["Mt. Titlis Cable Car Experience", "Lake Lucerne Boat Tour", "Milan Duomo Cathedral Plaza", "Venice Gondola Grand Canal Ride"],
    itinerary: [
      { day: 1, title: "Arrival in Zurich & Lucerne Transfer", details: "Arrive in Zurich, transfer to alpine town of Lucerne." },
      { day: 2, title: "Mt. Titlis Cable Car Excursion", details: "Cable car ride to Mt. Titlis summit, Ice Grotto, and Cliff Walk suspension bridge." },
      { day: 3, title: "Scenic Train to Milan, Italy", details: "Alpine train route into Milan. Visit Duomo di Milano and Galleria Vittorio Emanuele II." },
      { day: 4, title: "Venice Canal Tour", details: "Day tour to Venice. St. Mark’s Square, Doge's Palace, and gondola ride." },
      { day: 5, title: "Verona & Lake Garda", details: "En route trip visiting Juliet’s House in Verona and scenic Lake Garda." },
      { day: 6, title: "Milan Fashion District Leisure", details: "Leisure day for Italian fashion shopping and cafe dining." },
      { day: 7, title: "Milan Airport Departure", details: "Transfer to Milan Malpensa airport for departure." },
    ],
  },
  switzerland: {
    title: "Swiss Alps & Italian Heritage Panorama",
    locations: "ZURICH • LUCERNE • MILAN • VENICE",
    duration: "6N / 7D",
    price: "NPR 285,000",
    image: "/switzerland-italy.png",
    pdfUrl: "/pdf/switzerland-italy-6n7d-itinerary.pdf",
    description: "Traverse breathtaking Swiss alpine landscapes and majestic Italian historical cities on an unforgettable European journey.",
    highlights: ["Mt. Titlis Cable Car Experience", "Lake Lucerne Boat Tour", "Milan Duomo Cathedral Plaza", "Venice Gondola Grand Canal Ride"],
    itinerary: [
      { day: 1, title: "Arrival in Zurich & Lucerne Transfer", details: "Arrive in Zurich, transfer to alpine town of Lucerne." },
      { day: 2, title: "Mt. Titlis Cable Car Excursion", details: "Cable car ride to Mt. Titlis summit, Ice Grotto, and Cliff Walk suspension bridge." },
      { day: 3, title: "Scenic Train to Milan, Italy", details: "Alpine train route into Milan. Visit Duomo di Milano and Galleria Vittorio Emanuele II." },
      { day: 4, title: "Venice Canal Tour", details: "Day tour to Venice. St. Mark’s Square, Doge's Palace, and gondola ride." },
      { day: 5, title: "Verona & Lake Garda", details: "En route trip visiting Juliet’s House in Verona and scenic Lake Garda." },
      { day: 6, title: "Milan Fashion District Leisure", details: "Leisure day for Italian fashion shopping and cafe dining." },
      { day: 7, title: "Milan Airport Departure", details: "Transfer to Milan Malpensa airport for departure." },
    ],
  },
  swis: {
    title: "Swiss Alps & Italian Heritage Panorama",
    locations: "ZURICH • LUCERNE • MILAN • VENICE",
    duration: "6N / 7D",
    price: "NPR 285,000",
    image: "/switzerland-italy.png",
    pdfUrl: "/pdf/switzerland-italy-6n7d-itinerary.pdf",
    description: "Traverse breathtaking Swiss alpine landscapes and majestic Italian historical cities on an unforgettable European journey.",
    highlights: ["Mt. Titlis Cable Car Experience", "Lake Lucerne Boat Tour", "Milan Duomo Cathedral Plaza", "Venice Gondola Grand Canal Ride"],
    itinerary: [
      { day: 1, title: "Arrival in Zurich & Lucerne Transfer", details: "Arrive in Zurich, transfer to alpine town of Lucerne." },
      { day: 2, title: "Mt. Titlis Cable Car Excursion", details: "Cable car ride to Mt. Titlis summit, Ice Grotto, and Cliff Walk suspension bridge." },
      { day: 3, title: "Scenic Train to Milan, Italy", details: "Alpine train route into Milan. Visit Duomo di Milano and Galleria Vittorio Emanuele II." },
      { day: 4, title: "Venice Canal Tour", details: "Day tour to Venice. St. Mark’s Square, Doge's Palace, and gondola ride." },
      { day: 5, title: "Verona & Lake Garda", details: "En route trip visiting Juliet’s House in Verona and scenic Lake Garda." },
      { day: 6, title: "Milan Fashion District Leisure", details: "Leisure day for Italian fashion shopping and cafe dining." },
      { day: 7, title: "Milan Airport Departure", details: "Transfer to Milan Malpensa airport for departure." },
    ],
  },

  // 8. LAOS
  "laos-heritage-trail": {
    title: "Laos Heritage & Luang Prabang Explorer",
    locations: "LUANG PRABANG • VIENTIANE • VANG VIENG",
    duration: "5N / 6D",
    price: "NPR 78,000",
    image: "/laos.png",
    pdfUrl: "/pdf/laos-5n6d-itinerary.pdf",
    description: "Discover serene Mekong riverfront cities, UNESCO World Heritage temples, and turquoise limestone waterfalls.",
    highlights: ["Kuang Si Waterfalls Tour", "Mekong River Sunset Cruise", "Luang Prabang Night Market", "Vang Vieng Cave Tour"],
    itinerary: [
      { day: 1, title: "Arrival in Luang Prabang", details: "Greeting at Luang Prabang airport. Transfer to riverfront resort." },
      { day: 2, title: "UNESCO Temples & Kuang Si Waterfalls", details: "Visit Wat Xieng Thong and swim in turquoise Kuang Si Waterfalls." },
      { day: 3, title: "High Speed Train to Vang Vieng", details: "Train to Vang Vieng. Nam Xay Viewpoint hike and Tham Chang Cave." },
      { day: 4, title: "Transfer to Vientiane Capital", details: "Drive to Vientiane. Tour Pha That Luang Stupa and Patuxai Victory Monument." },
      { day: 5, title: "Buddha Park & Mekong Sunset", details: "Visit Buddha Park and evening walk along Mekong River night market." },
      { day: 6, title: "Homeward Departure", details: "Transfer to Vientiane Wattay airport for departure flight." },
    ],
  },
  laos: {
    title: "Laos Heritage & Luang Prabang Explorer",
    locations: "LUANG PRABANG • VIENTIANE • VANG VIENG",
    duration: "5N / 6D",
    price: "NPR 78,000",
    image: "/laos.png",
    pdfUrl: "/pdf/laos-5n6d-itinerary.pdf",
    description: "Discover serene Mekong riverfront cities, UNESCO World Heritage temples, and turquoise limestone waterfalls.",
    highlights: ["Kuang Si Waterfalls Tour", "Mekong River Sunset Cruise", "Luang Prabang Night Market", "Vang Vieng Cave Tour"],
    itinerary: [
      { day: 1, title: "Arrival in Luang Prabang", details: "Greeting at Luang Prabang airport. Transfer to riverfront resort." },
      { day: 2, title: "UNESCO Temples & Kuang Si Waterfalls", details: "Visit Wat Xieng Thong and swim in turquoise Kuang Si Waterfalls." },
      { day: 3, title: "High Speed Train to Vang Vieng", details: "Train to Vang Vieng. Nam Xay Viewpoint hike and Tham Chang Cave." },
      { day: 4, title: "Transfer to Vientiane Capital", details: "Drive to Vientiane. Tour Pha That Luang Stupa and Patuxai Victory Monument." },
      { day: 5, title: "Buddha Park & Mekong Sunset", details: "Visit Buddha Park and evening walk along Mekong River night market." },
      { day: 6, title: "Homeward Departure", details: "Transfer to Vientiane Wattay airport for departure flight." },
    ],
  },
  lao: {
    title: "Laos Heritage & Luang Prabang Explorer",
    locations: "LUANG PRABANG • VIENTIANE • VANG VIENG",
    duration: "5N / 6D",
    price: "NPR 78,000",
    image: "/laos.png",
    pdfUrl: "/pdf/laos-5n6d-itinerary.pdf",
    description: "Discover serene Mekong riverfront cities, UNESCO World Heritage temples, and turquoise limestone waterfalls.",
    highlights: ["Kuang Si Waterfalls Tour", "Mekong River Sunset Cruise", "Luang Prabang Night Market", "Vang Vieng Cave Tour"],
    itinerary: [
      { day: 1, title: "Arrival in Luang Prabang", details: "Greeting at Luang Prabang airport. Transfer to riverfront resort." },
      { day: 2, title: "UNESCO Temples & Kuang Si Waterfalls", details: "Visit Wat Xieng Thong and swim in turquoise Kuang Si Waterfalls." },
      { day: 3, title: "High Speed Train to Vang Vieng", details: "Train to Vang Vieng. Nam Xay Viewpoint hike and Tham Chang Cave." },
      { day: 4, title: "Transfer to Vientiane Capital", details: "Drive to Vientiane. Tour Pha That Luang Stupa and Patuxai Victory Monument." },
      { day: 5, title: "Buddha Park & Mekong Sunset", details: "Visit Buddha Park and evening walk along Mekong River night market." },
      { day: 6, title: "Homeward Departure", details: "Transfer to Vientiane Wattay airport for departure flight." },
    ],
  },

  // 9. VIETNAM
  "vietnam-halong-bay-tour": {
    title: "Vietnam Scenic Heritage & Halong Cruise",
    locations: "HANOI • HALONG BAY • NINH BINH",
    duration: "4N / 5D",
    price: "NPR 62,000",
    image: "/vietnam.png",
    pdfUrl: "/pdf/vietnam-4n5d-itinerary.pdf",
    description: "Sail through emerald waters surrounded by thousands of towering limestone islands in world-famous Halong Bay.",
    highlights: ["Overnight Halong Bay Cruise", "Hanoi Old Quarter Food Tour", "Trang An Boat Trip", "Water Puppet Show"],
    itinerary: [
      { day: 1, title: "Arrival in Hanoi", details: "Arrive at Noi Bai airport. Transfer to hotel in Old Quarter." },
      { day: 2, title: "Halong Bay Cruise Overnight", details: "Drive to Halong Bay port. Board luxury cruise, kayak through caves." },
      { day: 3, title: "Halong Bay to Hanoi", details: "Morning Tai Chi on deck, cave exploration, and return drive to Hanoi." },
      { day: 4, title: "Ninh Binh & Trang An Boat Ride", details: "Full day excursion to Ninh Binh, Trang An sampan boat ride, and Hang Mua Peak." },
      { day: 5, title: "Hanoi City Tour & Departure", details: "Visit Ho Chi Minh Mausoleum and One Pillar Pagoda before flight." },
    ],
  },
  vietnam: {
    title: "Vietnam Scenic Heritage & Halong Cruise",
    locations: "HANOI • HALONG BAY • NINH BINH",
    duration: "4N / 5D",
    price: "NPR 62,000",
    image: "/vietnam.png",
    pdfUrl: "/pdf/vietnam-4n5d-itinerary.pdf",
    description: "Sail through emerald waters surrounded by thousands of towering limestone islands in world-famous Halong Bay.",
    highlights: ["Overnight Halong Bay Cruise", "Hanoi Old Quarter Food Tour", "Trang An Boat Trip", "Water Puppet Show"],
    itinerary: [
      { day: 1, title: "Arrival in Hanoi", details: "Arrive at Noi Bai airport. Transfer to hotel in Old Quarter." },
      { day: 2, title: "Halong Bay Cruise Overnight", details: "Drive to Halong Bay port. Board luxury cruise, kayak through caves." },
      { day: 3, title: "Halong Bay to Hanoi", details: "Morning Tai Chi on deck, cave exploration, and return drive to Hanoi." },
      { day: 4, title: "Ninh Binh & Trang An Boat Ride", details: "Full day excursion to Ninh Binh, Trang An sampan boat ride, and Hang Mua Peak." },
      { day: 5, title: "Hanoi City Tour & Departure", details: "Visit Ho Chi Minh Mausoleum and One Pillar Pagoda before flight." },
    ],
  },

  // 10. DUBAI
  "dubai-desert-safari": {
    title: "Dubai Glitz & Desert Safari Expedition",
    locations: "DUBAI • ABU DHABI • DESERT CAMP",
    duration: "4N / 5D",
    price: "NPR 95,000",
    image: "/dubai.png",
    pdfUrl: "/pdf/dubai-4n5d-itinerary.pdf",
    description: "Witness ultra-modern luxury, breathtaking skyscrapers, and authentic Arabian desert adventures in the heart of UAE.",
    highlights: ["Burj Khalifa 124th Floor Entry", "4x4 Desert Safari with BBQ Dinner", "Dubai Marina Dhow Cruise", "Abu Dhabi Grand Mosque Tour"],
    itinerary: [
      { day: 1, title: "Arrival in Dubai & Marina Dhow Cruise", details: "Arrive in Dubai, private transfer to hotel. Evening Dhow Cruise with dinner." },
      { day: 2, title: "Dubai City Tour & Burj Khalifa", details: "City tour visiting Dubai Frame, Jumeirah Beach, and 124th Floor Burj Khalifa." },
      { day: 3, title: "Desert Safari & BBQ Camp", details: "4x4 dune bashing adventure in desert, camel rides, and live BBQ dinner show." },
      { day: 4, title: "Abu Dhabi Grand Mosque Excursion", details: "Full day tour to Abu Dhabi visiting Sheikh Zayed Grand Mosque." },
      { day: 5, title: "Souk Shopping & Homeward Flight", details: "Free shopping time at Gold & Spice Souk before airport transfer." },
    ],
  },
  dubai: {
    title: "Dubai Glitz & Desert Safari Expedition",
    locations: "DUBAI • ABU DHABI • DESERT CAMP",
    duration: "4N / 5D",
    price: "NPR 95,000",
    image: "/dubai.png",
    pdfUrl: "/pdf/dubai-4n5d-itinerary.pdf",
    description: "Witness ultra-modern luxury, breathtaking skyscrapers, and authentic Arabian desert adventures in the heart of UAE.",
    highlights: ["Burj Khalifa 124th Floor Entry", "4x4 Desert Safari with BBQ Dinner", "Dubai Marina Dhow Cruise", "Abu Dhabi Grand Mosque Tour"],
    itinerary: [
      { day: 1, title: "Arrival in Dubai & Marina Dhow Cruise", details: "Arrive in Dubai, private transfer to hotel. Evening Dhow Cruise with dinner." },
      { day: 2, title: "Dubai City Tour & Burj Khalifa", details: "City tour visiting Dubai Frame, Jumeirah Beach, and 124th Floor Burj Khalifa." },
      { day: 3, title: "Desert Safari & BBQ Camp", details: "4x4 dune bashing adventure in desert, camel rides, and live BBQ dinner show." },
      { day: 4, title: "Abu Dhabi Grand Mosque Excursion", details: "Full day tour to Abu Dhabi visiting Sheikh Zayed Grand Mosque." },
      { day: 5, title: "Souk Shopping & Homeward Flight", details: "Free shopping time at Gold & Spice Souk before airport transfer." },
    ],
  },

  // 11. MALDIVES
  "maldives-luxury-escape": {
    title: "Maldives Luxury Atoll & Beach Haven",
    locations: "MALE • MALE ATOLL • PRIVATE RESORT",
    duration: "3N / 4D",
    price: "NPR 110,000",
    image: "/maldives.png",
    pdfUrl: "/pdf/maldives-3n4d-itinerary.pdf",
    description: "Unwind on powdery white sand beaches surrounded by crystal turquoise lagoons in an exclusive island bungalow setting.",
    highlights: ["Speedboat Airport Transfers", "All-Inclusive Resort Dining", "House Reef Snorkeling", "Sunset Dolphin Cruise"],
    itinerary: [
      { day: 1, title: "Speedboat Transfer to Private Resort", details: "Meet at Male Velana International Airport. Speedboat transfer to island resort." },
      { day: 2, title: "Atoll Snorkeling & Water Sports", details: "Day spent swimming in turquoise lagoon, snorkeling, and kayaking." },
      { day: 3, title: "Sunset Dolphin Safari Cruise", details: "Relaxing day at beach villa followed by late afternoon dolphin boat cruise." },
      { day: 4, title: "Departure", details: "Speedboat transfer back to Male airport for flight." },
    ],
  },
  maldives: {
    title: "Maldives Luxury Atoll & Beach Haven",
    locations: "MALE • MALE ATOLL • PRIVATE RESORT",
    duration: "3N / 4D",
    price: "NPR 110,000",
    image: "/maldives.png",
    pdfUrl: "/pdf/maldives-3n4d-itinerary.pdf",
    description: "Unwind on powdery white sand beaches surrounded by crystal turquoise lagoons in an exclusive island bungalow setting.",
    highlights: ["Speedboat Airport Transfers", "All-Inclusive Resort Dining", "House Reef Snorkeling", "Sunset Dolphin Cruise"],
    itinerary: [
      { day: 1, title: "Speedboat Transfer to Private Resort", details: "Meet at Male Velana International Airport. Speedboat transfer to island resort." },
      { day: 2, title: "Atoll Snorkeling & Water Sports", details: "Day spent swimming in turquoise lagoon, snorkeling, and kayaking." },
      { day: 3, title: "Sunset Dolphin Safari Cruise", details: "Relaxing day at beach villa followed by late afternoon dolphin boat cruise." },
      { day: 4, title: "Departure", details: "Speedboat transfer back to Male airport for flight." },
    ],
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
    <main className="min-h-screen bg-[#F7F5F0] text-[#172A3A] font-serif selection:bg-[#A44A3F] selection:text-white py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Back Link */}
        <Link
          href="/outbound-tours"
          className="inline-flex items-center gap-2 text-xs font-sans font-extrabold uppercase tracking-widest text-[#A44A3F] hover:text-[#172A3A] transition-colors mb-8"
        >
          <ArrowLeft size={15} />
          <span>Back to All Outbound Tours</span>
        </Link>

        {/* Hero Banner Image Box */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-stone-200 border border-stone-200/90 shadow-md">
          <img
            src={tour.image}
            alt={tour.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 font-sans">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#A44A3F] bg-white px-3 py-1 shadow-xs border border-stone-200">
              <MapPin size={12} />
              {tour.locations}
            </span>
            <h1 className="mt-3 text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
              {tour.title}
            </h1>
          </div>
        </div>

        {/* Tour Details Grid */}
        <div className="mt-8 grid gap-8 md:grid-cols-[2fr_1fr]">
          
          <div className="space-y-8">
            {/* Overview Box */}
            <div className="bg-white border border-stone-200/90 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-serif font-bold text-[#172A3A] mb-3">Trip Overview</h2>
              <p className="text-stone-600 font-sans leading-relaxed text-sm sm:text-base font-normal">
                {tour.description}
              </p>

              <div className="mt-8 border-t border-stone-100 pt-6">
                <h3 className="text-base font-serif font-bold text-[#172A3A] mb-4">Package Highlights</h3>
                <ul className="grid gap-3 font-sans">
                  {tour.highlights.map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 font-medium">
                      <CheckCircle2 size={16} className="text-[#A44A3F] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Detailed Day-By-Day Itinerary */}
            {tour.itinerary && tour.itinerary.length > 0 && (
              <div className="bg-white border border-stone-200/90 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#A44A3F]">
                      PROGRAM DETAILS
                    </span>
                    <h2 className="text-xl font-serif font-bold text-[#172A3A]">
                      Day-by-Day Itinerary
                    </h2>
                  </div>

                  <a
                    href={tour.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#172A3A] hover:text-[#A44A3F] border border-stone-200 px-3 py-1.5 transition-colors"
                  >
                    <Download size={13} />
                    <span>Download PDF</span>
                  </a>
                </div>

                <div className="space-y-6 font-sans">
                  {tour.itinerary.map((dayItem) => (
                    <div key={dayItem.day} className="flex gap-4 items-start">
                      <div className="flex items-center justify-center bg-[#172A3A] text-white font-extrabold text-xs h-8 w-8 shrink-0">
                        D{dayItem.day}
                      </div>
                      <div className="border-l-2 border-stone-200 pl-4 pb-2">
                        <h4 className="text-sm font-bold text-[#172A3A]">
                          Day {dayItem.day}: {dayItem.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                          {dayItem.details}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing, PDF & Booking Action Card */}
          <div className="flex flex-col justify-between bg-white border border-stone-200/90 p-6 shadow-sm h-fit font-sans sticky top-24">
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-stone-400">
                STARTING FROM
              </span>
              <p className="text-2xl font-extrabold text-[#172A3A] mt-1">{tour.price}</p>
              
              <div className="mt-6 flex items-center gap-2 border-t border-b border-stone-100 py-3.5 text-xs font-bold text-stone-700">
                <Calendar size={15} className="text-[#A44A3F]" />
                <span>Duration: {tour.duration}</span>
              </div>

              {/* Download Printable PDF Button */}
              <div className="mt-4 pt-2">
                <a
                  href={tour.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#EFECE6] hover:bg-stone-200 transition-colors py-2.5 px-3 text-xs font-bold text-[#172A3A] border border-stone-300"
                >
                  <FileText size={15} className="text-[#A44A3F]" />
                  <span>View Printable PDF Itinerary</span>
                </a>
              </div>

              <div className="mt-4 flex items-center gap-2 text-[11px] text-stone-500 font-medium">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Includes Flights, Visas & Ground Support</span>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <Link
                href="/contact"
                className="block w-full text-center bg-[#172A3A] hover:bg-[#A44A3F] transition-colors py-3 text-xs font-extrabold uppercase tracking-widest text-white shadow-xs"
              >
                Book This Package
              </Link>
              <a
                href="tel:+977014005191"
                className="flex items-center justify-center gap-2 w-full text-center bg-stone-100 hover:bg-stone-200 transition-colors py-2.5 text-[11px] font-bold text-[#172A3A]"
              >
                <PhoneCall size={13} />
                <span>Call Desk (+977-014005191)</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}