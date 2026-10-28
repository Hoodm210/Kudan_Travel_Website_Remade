import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  MapPin, 
  Calendar, 
  Star, 
  CheckCircle2, 
  XCircle, 
  Download, 
  ArrowLeft, 
  PhoneCall, 
  Sparkles,
  Check,
  Globe2
} from 'lucide-react';

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  image: string;
  meals: string;
  hotel: string;
}

interface TourDetail {
  slug: string;
  title: string;
  locations: string;
  category: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  overview: string;
  heroImages: string[];
  pdfFileName: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
}

const INBOUND_PACKAGE_DETAILS: Record<string, TourDetail> = {
  "ktm-bandipur-pokhara-nagarkot": {
    slug: "ktm-bandipur-pokhara-nagarkot",
    title: "Kathmandu, Bandipur, Pokhara & Nagarkot Heritage",
    locations: "KATHMANDU • BANDIPUR • POKHARA • NAGARKOT",
    category: "HERITAGE & HILL STATIONS",
    duration: "7N / 8D",
    rating: 4.9,
    reviewsCount: 142,
    overview: "An immersive 8-day journey across Nepal's iconic hill stations, heritage cities, and serene lakes. Experience Boudhanath, Patan, scenic drives to Bandipur, Phewa Lake boating, Sarangkot sunrise, Nagarkot Himalayan views, traditional rickshaw rides, and authentic cultural dance dinners.",
    heroImages: [
      "/pokhara.jpeg",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3bc?auto=format&fit=crop&q=80&w=800"
    ],
    pdfFileName: "ktm-bandipur-pokhara-7n8d.pdf",
    highlights: [
      "Boudhanath Stupa & Patan Durbar Square Tour",
      "Scenic countryside drive to hilltop Bandipur village",
      "Phewa Lake boating & Sarangkot Himalayan Sunrise",
      "Bhaktapur Durbar Square & Nagarkot Himalayan Sunset",
    ],
    inclusions: [
      "Airport transfers and private AC vehicle for all sightseeing",
      "7 Nights accommodation in 3/4 Star Hotels on twin-sharing basis",
      "Daily Breakfast and Dinner at hotels",
      "English-speaking professional tour guide"
    ],
    exclusions: [
      "International airfare",
      "Monuments entrance fees",
      "Lunch and personal expenses"
    ],
    itinerary: [
      { day: 1, title: "Arrival KTM, Boudhanath Stupa & Patan Durbar Square", description: "Greet upon arrival at TIA, hotel check-in, visit ancient Boudhanath Stupa and Patan Durbar Square.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Dinner", hotel: "Kathmandu Hotel" },
      { day: 2, title: "Scenic Countryside Drive to Hilltop Bandipur", description: "Drive through Trishuli river valley to Newari hilltop village of Bandipur. Evening heritage stroll.", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Bandipur Heritage Hotel" },
      { day: 3, title: "Drive to Pokhara & Phewa Lake Boating", description: "Scenic drive to Pokhara. Afternoon boat ride on Phewa Lake visiting Tal Barahi Island Temple.", image: "/pokhara.jpeg", meals: "Breakfast & Dinner", hotel: "Pokhara Hotel" },
      { day: 4, title: "Sarangkot Sunrise & Pokhara Valley Sightseeing", description: "Early morning Annapurna sunrise at Sarangkot. Visit Devi’s Fall, Gupteshwor Cave, and Mountain Museum.", image: "/pokhara.jpeg", meals: "Breakfast & Dinner", hotel: "Pokhara Hotel" },
      { day: 5, title: "Flight to Kathmandu, Bhaktapur & Nagarkot Sunset", description: "Morning flight to Kathmandu. Tour Bhaktapur Durbar Square and drive to Nagarkot for sunset.", image: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3bc?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Nagarkot Resort" },
      { day: 6, title: "Kathmandu Durbar Square & Cultural Dance Dinner", description: "Sunrise over Himalayas. Drive back to Kathmandu, rickshaw ride in Thamel, and evening cultural dance dinner.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Kathmandu Hotel" },
      { day: 7, title: "Newari Towns of Kirtipur & Khokana Exploration", description: "Explore traditional mustard oil pressing in Khokana and historical hill town Kirtipur.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Kathmandu Hotel" },
      { day: 8, title: "Farewell & Departure Transfer", description: "Hotel check-out, farewell souvenir greeting, and airport departure transfer.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600", meals: "Breakfast", hotel: "Check-out" },
    ],
  },
  "10-days-nepal-bhutan-tour": {
    slug: "10-days-nepal-bhutan-tour",
    title: "Ultimate Nepal & Bhutan Himalayan Kingdom Tour",
    locations: "KATHMANDU • THIMPHU • PUNAKHA • PARO",
    category: "CROSS-BORDER EXPEDITION",
    duration: "9N / 10D",
    rating: 5.0,
    reviewsCount: 96,
    overview: "A grand cross-border Himalayan voyage capturing the cultural essence of Nepal and the magical kingdom of Bhutan. Highlights include Tiger's Nest Monastery, Punakha Dzong, Dochula Pass, Bhaktapur cooking class, Namobuddha, and UNESCO World Heritage sites.",
    heroImages: [
      "/bhutan.jpeg",
      "https://images.unsplash.com/photo-1578593139366-10467756f7e5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800"
    ],
    pdfFileName: "nepal-bhutan-10d.pdf",
    highlights: [
      "Flight to Paro over Mount Everest & Himalayan ranges",
      "Hike to iconic Tiger's Nest (Taktsang Monastery)",
      "Dochula Pass (3,080m) & majestic Punakha Dzong",
      "Bhaktapur cooking experience & Sacred Namobuddha Monastery",
    ],
    inclusions: [
      "Bhutan visa clearance & SDF processing",
      "Internal flights and private transfers",
      "Hotel accommodations and all meals",
      "Licensed guides"
    ],
    exclusions: [
      "International airfare",
      "Personal expenses and tips"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu & Patan Tour", description: "Arrival greeting at airport. Tour Patan Durbar Square and Boudhanath Stupa.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Dinner", hotel: "Kathmandu Hotel" },
      { day: 2, title: "Newari Cultural Heritage Tour", description: "Visit historic Kirtipur and Khokana heritage settlements.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Kathmandu Hotel" },
      { day: 3, title: "Flight to Paro (Bhutan) & Drive to Thimphu", description: "Fly past Everest to Paro. Transfer to Thimphu, visit Buddha Dordenma and Trashichhoedzong.", image: "/bhutan.jpeg", meals: "Lunch & Dinner", hotel: "Thimphu Hotel" },
      { day: 4, title: "Dochula Pass & Punakha Dzong", description: "Drive over Dochula Pass (3,080m). Visit Punakha Dzong and Chimi Lhakhang fertility temple.", image: "/bhutan.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Punakha Hotel" },
      { day: 5, title: "Paro Return & Rinpung Dzong", description: "Drive back to Paro via Simtokha Dzong. Explore Ta Dzong National Museum.", image: "/bhutan.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Paro Hotel" },
      { day: 6, title: "Hike to Tiger's Nest (Taktsang Monastery)", description: "Pilgrimage hike up to cliffside Tiger's Nest Monastery (3,120m) and Kyichu Lhakhang.", image: "https://images.unsplash.com/photo-1578593139366-10467756f7e5?auto=format&fit=crop&q=80&w=600", meals: "Breakfast, Lunch & Dinner", hotel: "Paro Hotel" },
      { day: 7, title: "Flight to Kathmandu & Nagarkot Stay", description: "Fly back to Kathmandu. Traditional cooking class in Bhaktapur and sunset at Nagarkot.", image: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3bc?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Nagarkot Resort" },
      { day: 8, title: "Namobuddha Monastery Pilgrimage", description: "Morning Himalayan views, pilgrimage to sacred Namobuddha Stupa, return to Kathmandu.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Kathmandu Hotel" },
      { day: 9, title: "Swayambhunath Stupa & Farewell Dinner", description: "Visit Monkey Temple (Swayambhunath), Kathmandu Durbar Square, and cultural farewell dinner.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Kathmandu Hotel" },
      { day: 10, title: "International Departure Transfer", description: "Hotel check-out and private transfer to Tribhuvan International Airport.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600", meals: "Breakfast", hotel: "Check-out" },
    ],
  },
  "10-days-nepal-tour": {
    slug: "10-days-nepal-tour",
    title: "Grand Nepal Cultural & Spiritual Circuit",
    locations: "KATHMANDU • BANDIPUR • POKHARA • LUMBINI",
    category: "CULTURAL CIRCUIT",
    duration: "9N / 10D",
    rating: 4.9,
    reviewsCount: 118,
    overview: "The complete essential Nepal experience. Journey through the capital's heritage, peaceful hilltop Bandipur, Pokhara's lakes and caves, Lord Buddha's birthplace in Lumbini, Namobuddha monastery, and Nagarkot's mountain views.",
    heroImages: [
      "/pokhara.jpeg",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800",
      "/muktinath.jpeg"
    ],
    pdfFileName: "grand-nepal-10d.pdf",
    highlights: [
      "Maya Devi Temple & Sacred Ashoka Pillar in Lumbini",
      "Hilltop Bandipur village & Phewa Lake boating",
      "Sarangkot Sunrise & Pokhara cave exploration",
      "Nagarkot Himalayan Sunrise & Namobuddha Monastery",
    ],
    inclusions: [
      "Private AC transport throughout",
      "Hotel accommodations with breakfast and dinner",
      "Internal flights (Bhairahawa - Kathmandu)",
      "Professional guide"
    ],
    exclusions: [
      "International flights",
      "Monuments entry fees"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Arrive at Kathmandu airport, visit Boudhanath Stupa and Patan Durbar Square.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Dinner", hotel: "Kathmandu Hotel" },
      { day: 2, title: "Kirtipur & Khokana Newari Village Tour", description: "Explore ancient stone streets, wood carvings, and oil pressing heritage.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Kathmandu Hotel" },
      { day: 3, title: "Drive to Hilltop Bandipur", description: "Scenic drive to Bandipur. Evening walking tour of preserved Newari bazaar.", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Bandipur Hotel" },
      { day: 4, title: "Drive to Pokhara & Phewa Boating", description: "Drive along Seti river to Pokhara. Afternoon boat trip on Phewa Lake.", image: "/pokhara.jpeg", meals: "Breakfast & Dinner", hotel: "Pokhara Hotel" },
      { day: 5, title: "Sarangkot Sunrise & Sightseeing", description: "Sunrise mountain view from Sarangkot, Devi's Fall, and Gupteshwor Cave.", image: "/pokhara.jpeg", meals: "Breakfast & Dinner", hotel: "Pokhara Hotel" },
      { day: 6, title: "Flight to Sacred Lumbini", description: "Fly to Bhairahawa, visit Maya Devi Temple, Sacred Garden, and Ashoka Pillar.", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Lumbini Hotel" },
      { day: 7, title: "Flight to Kathmandu, Bhaktapur & Nagarkot", description: "Fly back to Kathmandu. Tour medieval Bhaktapur and overnight in Nagarkot.", image: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3bc?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Nagarkot Resort" },
      { day: 8, title: "Namobuddha Monastery Pilgrimage", description: "Himalayan sunrise view, pilgrimage to Namobuddha Stupa, drive back to Kathmandu.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Kathmandu Hotel" },
      { day: 9, title: "Swayambhunath & Cultural Farewell", description: "Visit Swayambhunath Monkey Temple, Kathmandu Durbar Square, and dinner show.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Kathmandu Hotel" },
      { day: 10, title: "Departure", description: "Hotel check-out and final transfer to airport.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600", meals: "Breakfast", hotel: "Check-out" },
    ],
  },
  "kathmandu-valley-cultural-tour": {
    slug: "kathmandu-valley-cultural-tour",
    title: "Kathmandu Valley Cultural Heritage",
    locations: "KATHMANDU • BHAKTAPUR • PATAN",
    category: "HERITAGE SHORT TOUR",
    duration: "3N / 4D",
    rating: 4.8,
    reviewsCount: 88,
    overview: "Explore UNESCO World Heritage Sites including Pashupatinath, Swayambhunath, and the historic Durbar Squares of Kathmandu, Patan, and Bhaktapur.",
    heroImages: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3bc?auto=format&fit=crop&q=80&w=800"
    ],
    pdfFileName: "kathmandu-valley-4d.pdf",
    highlights: [
      "Pashupatinath Sacred Hindu Temple & Evening Aarti",
      "Swayambhunath Stupa (Monkey Temple)",
      "Patan & Bhaktapur Medieval Durbar Squares",
    ],
    inclusions: [
      "Airport transfers",
      "3 Nights hotel accommodation with breakfast",
      "Private vehicle and guide for sightseeing"
    ],
    exclusions: [
      "Monument entry fees",
      "Lunch and dinner"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", description: "Airport greeting and transfer to hotel. Free evening in Thamel.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Dinner", hotel: "Kathmandu Hotel" },
      { day: 2, title: "Swayambhunath & Kathmandu Durbar Square", description: "Guided tour of Swayambhunath Stupa and historic Kathmandu Durbar Square.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Kathmandu Hotel" },
      { day: 3, title: "Patan, Bhaktapur & Pashupatinath Aarti", description: "Explore Patan Arts, Bhaktapur Pottery Square, and evening Pashupatinath Aarti ceremony.", image: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3bc?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Kathmandu Hotel" },
      { day: 4, title: "Departure Transfer", description: "Morning souvenir shopping and transfer to airport for departure.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600", meals: "Breakfast", hotel: "Check-out" },
    ],
  },
  "ebc-trek": {
    slug: "ebc-trek",
    title: "Everest Base Camp & Kala Patthar Expedition",
    locations: "LUKLA • NAMCHE • GORAKSHEP • EBC",
    category: "HIMALAYAN TREK",
    duration: "13N / 14D",
    rating: 5.0,
    reviewsCount: 210,
    overview: "The ultimate Himalayan trek to the base of Mount Everest (5,364m). Walk through iconic Sherpa villages, ancient monasteries, suspension bridges over the Dudh Koshi river, and stand face-to-face with the world's highest peak from Kala Patthar viewpoint (5,545m).",
    heroImages: [
      "/ebc.jpeg",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800"
    ],
    pdfFileName: "ebc-14d-itinerary.pdf",
    highlights: [
      "Mountain flight to Lukla (2,860m)",
      "Namche Bazaar & Tengboche Monastery",
      "Stand at Everest Base Camp (5,364m)",
      "Kala Patthar summit (5,545m) for sunrise over Everest",
    ],
    inclusions: [
      "Kathmandu-Lukla-Kathmandu flights",
      "Licensed trekking guide and porters",
      "All tea house stays and meals on trek",
      "National park permits"
    ],
    exclusions: [
      "Travel insurance",
      "Hot showers and device charging on trek",
      "Tips"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu & Trip Briefing", description: "Arrive in Kathmandu, meet trekking guide, gear check and trip preparation.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Dinner", hotel: "Kathmandu Hotel" },
      { day: 2, title: "Flight to Lukla (2,860m) & Trek to Phakding", description: "Mountain flight to Lukla airstrip and trek down along Dudh Koshi river to Phakding.", image: "/ebc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 3, title: "Trek to Namche Bazaar (3,440m)", description: "Cross Hillary Suspension Bridge and ascend up to Sherpa capital of Namche Bazaar.", image: "/ebc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 4, title: "Acclimatization Day in Namche Bazaar", description: "Hike up to Everest View Hotel (3,880m) for panorama of Everest and Ama Dablam.", image: "/ebc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 5, title: "Trek to Tengboche Monastery (3,867m)", description: "Walk through rhododendron forests to Tengboche, famous for ancient Buddhist monastery.", image: "/ebc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 6, title: "Trek to Dingboche (4,410m)", description: "Descend to Debuche, cross Imja river and trek up alpine valley to Dingboche.", image: "/ebc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 7, title: "Acclimatization Ridge Hike in Dingboche", description: "Acclimatization hike to Nangkartshang Peak viewpoint (5,080m).", image: "/ebc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 8, title: "Trek to Lobuche (4,940m)", description: "Pass Thukla memorial ridge dedicated to fallen climbers and arrive at Lobuche.", image: "/ebc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 9, title: "Trek to Gorakshep & Everest Base Camp (5,364m)", description: "Trek over Khumbu glacier to Gorakshep and push to Everest Base Camp.", image: "/ebc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 10, title: "Kala Patthar Summit (5,545m) & Trek to Pheriche", description: "Early morning steep hike up Kala Patthar for sunrise over Everest peak. Descend to Pheriche.", image: "/ebc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 11, title: "Trek Down to Namche Bazaar", description: "Retrace steps down past Tengboche back to Namche Bazaar.", image: "/ebc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 12, title: "Trek Down to Lukla", description: "Final day of trekking down valley to Lukla village.", image: "/ebc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 13, title: "Flight back to Kathmandu & Celebration", description: "Morning flight back to Kathmandu. Evening celebration dinner.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Kathmandu Hotel" },
      { day: 14, title: "Final Departure", description: "Hotel check-out and transfer to airport.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600", meals: "Breakfast", hotel: "Check-out" },
    ],
  },
  "annapurna-circuit": {
    slug: "annapurna-circuit",
    title: "Annapurna Circuit & Thorong La Pass Trek",
    locations: "BESISAHAR • MANANG • THORONG LA • MUKTINATH",
    category: "HIMALAYAN TREK",
    duration: "11N / 12D",
    rating: 4.9,
    reviewsCount: 155,
    overview: "Traverse one of the world's most renowned classic treks. Cross the formidable Thorong La Pass at 5,416m, descend to the sacred temple of Muktinath, explore apple orchards in Marpha, and relax at Pokhara's Fewa Lake.",
    heroImages: [
      "/abc.jpeg",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800",
      "/muktinath.jpeg"
    ],
    pdfFileName: "annapurna-circuit-12d.pdf",
    highlights: [
      "Cross high Thorong La Pass (5,416m)",
      "Sacred pilgrimage temple of Muktinath (3,800m)",
      "Manang Valley & Gangapurna Glacier Lake",
      "Marpha Apple Village & Tatopani Hot Springs",
    ],
    inclusions: [
      "Guide and porters",
      "Permits and TIMS",
      "Tea house accommodation and meals on trek"
    ],
    exclusions: [
      "Personal gear",
      "Insurance and tips"
    ],
    itinerary: [
      { day: 1, title: "Kathmandu to Besisahar & Chame Drive", description: "Scenic drive along Marsyangdi river to Chame (2,670m).", image: "/abc.jpeg", meals: "Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 2, title: "Trek from Chame to Pisang (3,200m)", description: "Trek past Apple orchards and dramatic rock walls to Upper Pisang.", image: "/abc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 3, title: "Trek to Manang Valley (3,540m)", description: "Walk high route via Nawal for breathtaking Annapurna massif views.", image: "/abc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 4, title: "Acclimatization Day in Manang", description: "Rest day exploring Gangapurna glacier lake and Braga monastery.", image: "/abc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 5, title: "Trek to Yak Kharka (4,050m)", description: "Ascend gradually past alpine pastures to Yak Kharka.", image: "/abc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 6, title: "Trek to Thorong High Camp (4,900m)", description: "Short trek to Thorong Phedi and steep climb up to High Camp.", image: "/abc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 7, title: "Cross Thorong La Pass (5,416m) to Muktinath", description: "Early start crossing high pass (5,416m) and descend down to Muktinath.", image: "/muktinath.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 8, title: "Muktinath Temple & Drive to Marpha", description: "Visit Muktinath 108 spouts temple, drive down to Marpha village.", image: "/muktinath.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 9, title: "Drive to Tatopani Natural Hot Springs", description: "Overland drive down Kali Gandaki gorge to Tatopani hot springs.", image: "/abc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 10, title: "Drive to Pokhara", description: "Drive down to Nayapul and transfer to Pokhara Lakeside.", image: "/pokhara.jpeg", meals: "Breakfast & Lunch", hotel: "Pokhara Hotel" },
      { day: 11, title: "Pokhara Sightseeing & Drive to Kathmandu", description: "Morning boat trip, afternoon scenic drive back to Kathmandu.", image: "/pokhara.jpeg", meals: "Breakfast & Dinner", hotel: "Kathmandu Hotel" },
      { day: 12, title: "Airport Departure Transfer", description: "Transfer to airport for homeward journey.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600", meals: "Breakfast", hotel: "Check-out" },
    ],
  },
  "annapurna-base-camp-trek": {
    slug: "annapurna-base-camp-trek",
    title: "Annapurna Base Camp & Sanctuary Trek",
    locations: "POKHARA • GHANDRUK • ABC (4,130m)",
    category: "HIMALAYAN TREK",
    duration: "9N / 10D",
    rating: 4.9,
    reviewsCount: 165,
    overview: "Trek through lush rhododendron forests, traditional Gurung villages, and natural hot springs, culminating in the 360-degree mountain amphitheater inside the Annapurna Sanctuary at 4,130m.",
    heroImages: [
      "/abc.jpeg",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800"
    ],
    pdfFileName: "abc-10d-itinerary.pdf",
    highlights: [
      "Stand inside 360-degree Annapurna Sanctuary (4,130m)",
      "Traditional Gurung heritage village of Ghandruk",
      "Machhapuchhre Base Camp (MBC) views",
      "Jhinu Danda natural riverside hot springs",
    ],
    inclusions: [
      "Guide and porters",
      "Permits",
      "Lodges and meals on trek"
    ],
    exclusions: [
      "Hot showers / Wi-Fi",
      "Tips"
    ],
    itinerary: [
      { day: 1, title: "Kathmandu to Pokhara Drive", description: "Scenic drive past rivers and terraced hills to Pokhara.", image: "/pokhara.jpeg", meals: "Dinner", hotel: "Pokhara Hotel" },
      { day: 2, title: "Drive to Nayapul & Trek to Ghandruk", description: "Drive to Nayapul and trek up stone steps to Ghandruk village.", image: "/abc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 3, title: "Trek to Chhomrong (2,170m)", description: "Ascend past Kimrong river valley to Chhomrong village.", image: "/abc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 4, title: "Trek to Bamboo / Himalaya (2,600m)", description: "Descend Chhomrong steps and trek through dense bamboo forest.", image: "/abc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 5, title: "Trek to Annapurna Base Camp (4,130m)", description: "Trek past Machhapuchhre Base Camp to Annapurna Base Camp.", image: "/abc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 6, title: "Annapurna I Sunrise & Trek to Bamboo", description: "Sunrise view over Annapurna I (8,091m) and trek down to Bamboo.", image: "/abc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 7, title: "Trek to Jhinu Danda Hot Springs", description: "Trek to Jhinu Danda and relax in natural riverside thermal pools.", image: "/abc.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Tea House Lodge" },
      { day: 8, title: "Trek to Nayapul & Drive to Pokhara", description: "Final trek down to Nayapul, transfer to Pokhara hotel.", image: "/pokhara.jpeg", meals: "Breakfast & Lunch", hotel: "Pokhara Hotel" },
      { day: 9, title: "Drive to Kathmandu", description: "Highway drive back to Kathmandu, free evening.", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600", meals: "Breakfast & Dinner", hotel: "Kathmandu Hotel" },
      { day: 10, title: "Departure", description: "Final transfer to international airport.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600", meals: "Breakfast", hotel: "Check-out" },
    ],
  },
  "mustang-overland": {
    slug: "mustang-overland",
    title: "Muktinath & Lower Mustang Overland Safari",
    locations: "POKHARA • TATOPANI • JOMSOM • MUKTINATH",
    category: "OVERLAND SAFARI",
    duration: "5N / 6D",
    rating: 4.8,
    reviewsCount: 110,
    overview: "Experience the rain-shadow desert landscapes of Mustang without arduous high-altitude walking. Ride in a private 4WD vehicle through Kali Gandaki gorge, visit Muktinath 108 water spouts, and taste apple brandy in Marpha.",
    heroImages: [
      "/muktinath.jpeg",
      "/pokhara.jpeg"
    ],
    pdfFileName: "mustang-overland-6d.pdf",
    highlights: [
      "4WD Scorpio overland drive through Kali Gandaki Gorge",
      "Muktinath sacred 108 water spouts (3,800m)",
      "Marpha apple orchard village & Kagbeni confluence",
      "Tatopani natural hot springs bath",
    ],
    inclusions: [
      "Private 4WD Scorpio jeep",
      "Hotel accommodation with breakfast and dinner",
      "Permits"
    ],
    exclusions: [
      "Lunch",
      "Personal expenses"
    ],
    itinerary: [
      { day: 1, title: "Kathmandu to Pokhara Drive", description: "Scenic highway drive to Pokhara. Free evening by Fewa lake.", image: "/pokhara.jpeg", meals: "Dinner", hotel: "Pokhara Hotel" },
      { day: 2, title: "Overland 4WD Drive to Tatopani Hot Springs", description: "Drive through Beni along Kali Gandaki gorge to Tatopani hot springs.", image: "/muktinath.jpeg", meals: "Breakfast & Dinner", hotel: "Tatopani Lodge" },
      { day: 3, title: "Drive to Jomsom & Muktinath Temple (3,800m)", description: "Drive past apple orchards in Marpha up to Muktinath Temple.", image: "/muktinath.jpeg", meals: "Breakfast & Dinner", hotel: "Muktinath Hotel" },
      { day: 4, title: "Muktinath Darshan & Kagbeni Tour", description: "Morning prayers at Muktinath, visit Kagbeni ancient village, drive to Jomsom.", image: "/muktinath.jpeg", meals: "Breakfast & Dinner", hotel: "Jomsom Hotel" },
      { day: 5, title: "Drive Back to Pokhara", description: "Return 4WD drive back down to Pokhara. Boating on Phewa lake.", image: "/pokhara.jpeg", meals: "Breakfast & Dinner", hotel: "Pokhara Hotel" },
      { day: 6, title: "Return Drive to Kathmandu & Departure", description: "Drive back to Kathmandu and final transfer to airport.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600", meals: "Breakfast", hotel: "Check-out" },
    ],
  },
  "pokhara-leisure-tour": {
    slug: "pokhara-leisure-tour",
    title: "Pokhara Lake & Mountain Escape",
    locations: "POKHARA • SARANGKOT • PEACE PAGODA",
    category: "LEISURE & NATURE",
    duration: "4N / 5D",
    rating: 4.9,
    reviewsCount: 130,
    overview: "Relax by Fewa Lake, witness breathtaking Annapurna views from Sarangkot sunrise, and explore caves, waterfalls, and peaceful temples.",
    heroImages: [
      "/pokhara.jpeg",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800"
    ],
    pdfFileName: "pokhara-leisure-5d.pdf",
    highlights: [
      "Sarangkot Himalayan Sunrise view",
      "Phewa Lake boat ride & Tal Barahi Temple",
      "World Peace Pagoda & International Mountain Museum",
    ],
    inclusions: [
      "Private vehicle transfers",
      "Hotel stays with breakfast",
      "Boating tickets"
    ],
    exclusions: [
      "Lunch and dinner",
      "Monument fees"
    ],
    itinerary: [
      { day: 1, title: "Arrival in Pokhara", description: "Arrive in Pokhara, hotel check-in and evening stroll on Lakeside.", image: "/pokhara.jpeg", meals: "Dinner", hotel: "Pokhara Hotel" },
      { day: 2, title: "Sarangkot Sunrise & Pokhara Sightseeing", description: "Sunrise at Sarangkot, visit Devi's Fall and Gupteshwor Mahadev Cave.", image: "/pokhara.jpeg", meals: "Breakfast & Dinner", hotel: "Pokhara Hotel" },
      { day: 3, title: "Fewa Boating & World Peace Pagoda", description: "Boat ride across Fewa Lake and short hike up to World Peace Pagoda.", image: "/pokhara.jpeg", meals: "Breakfast & Dinner", hotel: "Pokhara Hotel" },
      { day: 4, title: "Mountain Museum & Pumdikot Shiva Statue", description: "Visit International Mountain Museum and giant Pumdikot Shiva statue.", image: "/pokhara.jpeg", meals: "Breakfast & Dinner", hotel: "Pokhara Hotel" },
      { day: 5, title: "Departure", description: "Transfer back to Kathmandu or Pokhara airport for flight.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600", meals: "Breakfast", hotel: "Check-out" },
    ],
  },
  "chitwan-national-park-safari": {
    slug: "chitwan-national-park-safari",
    title: "Chitwan Wildlife Jungle Safari",
    locations: "CHITWAN NATIONAL PARK • RAPTI RIVER",
    category: "WILDLIFE SAFARI",
    duration: "2N / 3D",
    rating: 4.8,
    reviewsCount: 145,
    overview: "Venture into Nepal's first national park to spot rare One-Horned Rhinos, Bengal Tigers, exotic birds, and experience Tharu cultural dance.",
    heroImages: [
      "/chitwan.jpeg",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800"
    ],
    pdfFileName: "chitwan-safari-3d.pdf",
    highlights: [
      "Jeep Safari into deep Chitwan Jungle",
      "Rapti River Canoe ride spotting Gharial Crocodiles",
      "Tharu Cultural Stick Dance Show",
    ],
    inclusions: [
      "Jungle resort accommodation (Full Board)",
      "All jungle safari activities and naturalists",
      "Park entrance permits"
    ],
    exclusions: [
      "Bar bills",
      "Tips"
    ],
    itinerary: [
      { day: 1, title: "Drive to Chitwan & Tharu Cultural Show", description: "Drive to Chitwan jungle resort. Village walk and evening Tharu cultural dance show.", image: "/chitwan.jpeg", meals: "Lunch & Dinner", hotel: "Chitwan Resort" },
      { day: 2, title: "Jungle Jeep Safari & Canoe Ride", description: "Full day jungle activities: Rapti river canoe ride, jungle walk, jeep safari, and elephant breeding center.", image: "/chitwan.jpeg", meals: "Breakfast, Lunch & Dinner", hotel: "Chitwan Resort" },
      { day: 3, title: "Bird Watching Walk & Departure", description: "Early morning bird watching walk, breakfast, and return drive to Kathmandu/Pokhara.", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600", meals: "Breakfast", hotel: "Check-out" },
    ],
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function InboundTourDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slugKey = resolvedParams.slug;
  const tour = INBOUND_PACKAGE_DETAILS[slugKey] || INBOUND_PACKAGE_DETAILS["ktm-bandipur-pokhara-nagarkot"];

  if (!tour) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#172A3A] font-serif selection:bg-[#A44A3F] selection:text-white">
      
      {/* TOP NAVIGATION & BREADCRUMB */}
      <div className="bg-[#EFECE6]/70 border-b border-stone-200/80 py-4 font-sans text-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl flex items-center justify-between">
          <Link 
            href="/inbound" 
            className="inline-flex items-center gap-1.5 font-extrabold uppercase tracking-widest text-[#A44A3F] hover:translate-x-[-2px] transition-transform"
          >
            <ArrowLeft size={14} /> Back to Inbound Tours
          </Link>

          <a
            href={`/pdfs/${tour.pdfFileName}`}
            download
            className="inline-flex items-center gap-1.5 bg-[#172A3A] hover:bg-[#A44A3F] text-white px-3.5 py-1.5 font-extrabold uppercase tracking-widest transition-colors"
          >
            <Download size={13} className="text-amber-400" /> Download PDF Brochure
          </a>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-12 lg:pt-16 lg:pb-16 border-b border-stone-200/80 bg-[#EFECE6]/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="max-w-3xl">
            
            <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1 text-[10px] font-sans font-extrabold uppercase tracking-widest text-[#A44A3F] border border-stone-200 shadow-xs mb-4">
              <Globe2 size={13} className="text-[#A44A3F]" />
              <span>{tour.category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight text-[#172A3A] mb-4">
              {tour.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs font-sans font-semibold text-stone-600 mb-6">
              <div className="flex items-center gap-1 text-[#A44A3F]">
                <MapPin size={13} />
                <span className="uppercase font-extrabold tracking-wider">{tour.locations}</span>
              </div>

              <div className="flex items-center gap-1">
                <Calendar size={13} className="text-amber-500" />
                <span>{tour.duration}</span>
              </div>

              <div className="flex items-center gap-1 text-amber-500">
                <Star size={12} className="fill-amber-500" />
                <span className="text-[#172A3A] font-bold">{tour.rating}</span>
                <span className="text-stone-400 font-normal">({tour.reviewsCount} reviews)</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans font-normal">
              {tour.overview}
            </p>

          </div>
        </div>
      </section>

      {/* IMAGE GALLERY */}
      <section className="py-8 bg-[#F7F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tour.heroImages.map((imgUrl, idx) => (
              <div 
                key={idx} 
                className={`relative h-60 sm:h-72 bg-stone-200 overflow-hidden border border-stone-200 ${idx === 0 ? 'md:col-span-2' : ''}`}
              >
                <img
                  src={imgUrl}
                  alt={`${tour.title} scene ${idx + 1}`}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="py-12 bg-[#F7F5F0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* LEFT 2 COLUMNS - HIGHLIGHTS, ITINERARY, INCLUSIONS */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Highlights */}
              <div className="bg-white border border-stone-200/90 p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-serif text-[#172A3A] mb-4 flex items-center gap-2">
                  <Sparkles size={18} className="text-[#A44A3F]" /> Tour Highlights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs sm:text-sm text-stone-700">
                  {tour.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check size={15} className="text-[#A44A3F] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day to Day Itinerary */}
              <div>
                <h2 className="text-2xl font-serif text-[#172A3A] mb-6">Day-by-Day Itinerary</h2>
                <div className="space-y-6">
                  {tour.itinerary.map((dayItem) => (
                    <div 
                      key={dayItem.day}
                      className="bg-white border border-stone-200/90 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row gap-6"
                    >
                      <div className="relative w-full md:w-48 h-40 bg-stone-100 overflow-hidden shrink-0">
                        <img
                          src={dayItem.image}
                          alt={`Day ${dayItem.day}`}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-[#172A3A] text-amber-400 text-[10px] font-sans font-black uppercase tracking-widest px-2 py-0.5">
                          DAY {dayItem.day}
                        </div>
                      </div>

                      <div className="flex-1 font-sans">
                        <h3 className="font-serif text-lg text-[#172A3A] mb-2">
                          Day {dayItem.day}: {dayItem.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                          {dayItem.description}
                        </p>

                        <div className="flex flex-wrap gap-3 text-[11px] font-semibold text-stone-500 pt-3 border-t border-stone-100">
                          <span className="bg-[#EFECE6] px-2.5 py-1 text-[#172A3A]">🍽️ {dayItem.meals}</span>
                          <span className="bg-[#EFECE6] px-2.5 py-1 text-[#172A3A]">🏨 {dayItem.hotel}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs sm:text-sm">
                <div className="bg-white border border-stone-200/90 p-6 shadow-sm">
                  <h3 className="font-serif text-base text-[#172A3A] mb-4 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" /> What's Included
                  </h3>
                  <ul className="space-y-2.5 text-stone-600">
                    {tour.inclusions.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span> {inc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-stone-200/90 p-6 shadow-sm">
                  <h3 className="font-serif text-base text-[#172A3A] mb-4 flex items-center gap-2">
                    <XCircle size={16} className="text-[#A44A3F]" /> What's Excluded
                  </h3>
                  <ul className="space-y-2.5 text-stone-600">
                    {tour.exclusions.map((exc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#A44A3F] font-bold">✕</span> {exc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN - BOOKING SIDEBAR (NO PRICES) */}
            <div>
              <div className="bg-white border border-stone-200/90 p-6 shadow-sm sticky top-6 font-sans">
                
                <div className="space-y-3 border-b border-stone-100 pb-6 mb-6 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-extrabold text-[#172A3A]">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Private Arrangement:</span>
                    <span className="font-extrabold text-emerald-600">Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transport:</span>
                    <span className="font-extrabold text-[#172A3A]">Included</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/contact-us"
                    className="w-full py-3 bg-[#A44A3F] hover:bg-[#8B3E34] text-white text-xs font-black uppercase tracking-widest transition-colors block text-center"
                  >
                    Inquire For Booking
                  </Link>

                  <a
                    href={`/pdfs/${tour.pdfFileName}`}
                    download
                    className="w-full py-3 bg-[#EFECE6] hover:bg-stone-200 text-[#172A3A] text-xs font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={13} className="text-[#A44A3F]" /> Download PDF
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-stone-100 text-center text-xs">
                  <p className="text-stone-500 mb-2">Need a custom family or group quote?</p>
                  <a href="tel:+97714005191" className="font-extrabold text-[#A44A3F] flex items-center justify-center gap-1">
                    <PhoneCall size={13} /> Call Kathmandu Office Desk
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}