"use client";

import { useState } from "react";
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

const INBOUND_DATA: Record<string, TourDetails> = {
  "ktm-bandipur-pokhara-nagarkot": {
    title: "Kathmandu, Bandipur, Pokhara & Nagarkot Heritage",
    locations: "KATHMANDU • BANDIPUR • POKHARA • NAGARKOT",
    duration: "7N / 8D",
    price: "NPR 58,000",
    image: "/pokhara.jpeg",
    pdfUrl: "/pdf/ktm-bandipur-pokhara-7n8d.pdf",
    description: "An immersive 8-day journey across Nepal's iconic hill stations, heritage cities, and serene lakes. Experience Boudhanath, Patan, scenic drives to Bandipur, Phewa Lake boating, Sarangkot sunrise, Nagarkot Himalayan views, traditional rickshaw rides, and authentic cultural dance dinners.",
    highlights: [
      "Boudhanath Stupa & Patan Durbar Square Tour",
      "Scenic countryside drive to hilltop Bandipur village",
      "Phewa Lake boating & Sarangkot Himalayan Sunrise",
      "Bhaktapur Durbar Square & Nagarkot Himalayan Sunset",
    ],
    itinerary: [
      { day: 1, title: "Arrival KTM, Boudhanath Stupa & Patan Durbar Square", details: "Greet upon arrival at TIA, hotel check-in, visit ancient Boudhanath Stupa and Patan Durbar Square." },
      { day: 2, title: "Scenic Countryside Drive to Hilltop Bandipur", details: "Drive through Trishuli river valley to Newari hilltop village of Bandipur. Evening heritage stroll." },
      { day: 3, title: "Drive to Pokhara & Phewa Lake Boating", details: "Scenic drive to Pokhara. Afternoon boat ride on Phewa Lake visiting Tal Barahi Island Temple." },
      { day: 4, title: "Sarangkot Sunrise & Pokhara Valley Sightseeing", details: "Early morning Annapurna sunrise at Sarangkot. Visit Devi’s Fall, Gupteshwor Cave, and Mountain Museum." },
      { day: 5, title: "Flight to Kathmandu, Bhaktapur & Nagarkot Sunset", details: "Morning flight to Kathmandu. Tour Bhaktapur Durbar Square and drive to Nagarkot for sunset." },
      { day: 6, title: "Kathmandu Durbar Square & Cultural Dance Dinner", details: "Sunrise over Himalayas. Drive back to Kathmandu, rickshaw ride in Thamel, and evening cultural dance dinner." },
      { day: 7, title: "Newari Towns of Kirtipur & Khokana Exploration", details: "Explore traditional mustard oil pressing in Khokana and historical hill town Kirtipur." },
      { day: 8, title: "Farewell & Departure Transfer", details: "Hotel check-out, farewell souvenir greeting, and airport departure transfer." },
    ],
  },
  "10-days-nepal-bhutan-tour": {
    title: "Ultimate Nepal & Bhutan Himalayan Kingdom Tour",
    locations: "KATHMANDU • THIMPHU • PUNAKHA • PARO",
    duration: "9N / 10D",
    price: "NPR 185,000",
    image: "/bhutan.jpeg",
    pdfUrl: "/pdf/nepal-bhutan-10d.pdf",
    description: "A grand cross-border Himalayan voyage capturing the cultural essence of Nepal and the magical kingdom of Bhutan. Highlights include Tiger's Nest Monastery, Punakha Dzong, Dochula Pass, Bhaktapur cooking class, Namobuddha, and UNESCO World Heritage sites.",
    highlights: [
      "Flight to Paro over Mount Everest & Himalayan ranges",
      "Hike to iconic Tiger's Nest (Taktsang Monastery)",
      "Dochula Pass (3,080m) & majestic Punakha Dzong",
      "Bhaktapur cooking experience & Sacred Namobuddha Monastery",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu & Patan Tour", details: "Arrival greeting at airport. Tour Patan Durbar Square and Boudhanath Stupa." },
      { day: 2, title: "Newari Cultural Heritage Tour", details: "Visit historic Kirtipur and Khokana heritage settlements." },
      { day: 3, title: "Flight to Paro (Bhutan) & Drive to Thimphu", details: "Fly past Everest to Paro. Transfer to Thimphu, visit Buddha Dordenma and Trashichhoedzong." },
      { day: 4, title: "Dochula Pass & Punakha Dzong", details: "Drive over Dochula Pass (3,080m). Visit Punakha Dzong and Chimi Lhakhang fertility temple." },
      { day: 5, title: "Paro Return & Rinpung Dzong", details: "Drive back to Paro via Simtokha Dzong. Explore Ta Dzong National Museum." },
      { day: 6, title: "Hike to Tiger's Nest (Taktsang Monastery)", details: "Pilgrimage hike up to cliffside Tiger's Nest Monastery (3,120m) and Kyichu Lhakhang." },
      { day: 7, title: "Flight to Kathmandu & Nagarkot Stay", details: "Fly back to Kathmandu. Traditional cooking class in Bhaktapur and sunset at Nagarkot." },
      { day: 8, title: "Namobuddha Monastery Pilgrimage", details: "Morning Himalayan views, pilgrimage to sacred Namobuddha Stupa, return to Kathmandu." },
      { day: 9, title: "Swayambhunath Stupa & Farewell Dinner", details: "Visit Monkey Temple (Swayambhunath), Kathmandu Durbar Square, and cultural farewell dinner." },
      { day: 10, title: "International Departure Transfer", details: "Hotel check-out and private transfer to Tribhuvan International Airport." },
    ],
  },
  bhutan: {
    title: "Ultimate Nepal & Bhutan Himalayan Kingdom Tour",
    locations: "KATHMANDU • THIMPHU • PUNAKHA • PARO",
    duration: "9N / 10D",
    price: "NPR 185,000",
    image: "/bhutan.jpeg",
    pdfUrl: "/pdf/nepal-bhutan-10d.pdf",
    description: "A grand cross-border Himalayan voyage capturing the cultural essence of Nepal and the magical kingdom of Bhutan. Highlights include Tiger's Nest Monastery, Punakha Dzong, Dochula Pass, Bhaktapur cooking class, Namobuddha, and UNESCO World Heritage sites.",
    highlights: [
      "Flight to Paro over Mount Everest & Himalayan ranges",
      "Hike to iconic Tiger's Nest (Taktsang Monastery)",
      "Dochula Pass (3,080m) & majestic Punakha Dzong",
      "Bhaktapur cooking experience & Sacred Namobuddha Monastery",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu & Patan Tour", details: "Arrival greeting at airport. Tour Patan Durbar Square and Boudhanath Stupa." },
      { day: 2, title: "Newari Cultural Heritage Tour", details: "Visit historic Kirtipur and Khokana heritage settlements." },
      { day: 3, title: "Flight to Paro (Bhutan) & Drive to Thimphu", details: "Fly past Everest to Paro. Transfer to Thimphu, visit Buddha Dordenma and Trashichhoedzong." },
      { day: 4, title: "Dochula Pass & Punakha Dzong", details: "Drive over Dochula Pass (3,080m). Visit Punakha Dzong and Chimi Lhakhang fertility temple." },
      { day: 5, title: "Paro Return & Rinpung Dzong", details: "Drive back to Paro via Simtokha Dzong. Explore Ta Dzong National Museum." },
      { day: 6, title: "Hike to Tiger's Nest (Taktsang Monastery)", details: "Pilgrimage hike up to cliffside Tiger's Nest Monastery (3,120m) and Kyichu Lhakhang." },
      { day: 7, title: "Flight to Kathmandu & Nagarkot Stay", details: "Fly back to Kathmandu. Traditional cooking class in Bhaktapur and sunset at Nagarkot." },
      { day: 8, title: "Namobuddha Monastery Pilgrimage", details: "Morning Himalayan views, pilgrimage to sacred Namobuddha Stupa, return to Kathmandu." },
      { day: 9, title: "Swayambhunath Stupa & Farewell Dinner", details: "Visit Monkey Temple (Swayambhunath), Kathmandu Durbar Square, and cultural farewell dinner." },
      { day: 10, title: "International Departure Transfer", details: "Hotel check-out and private transfer to Tribhuvan International Airport." },
    ],
  },
  "10-days-nepal-tour": {
    title: "Grand Nepal Cultural & Spiritual Circuit",
    locations: "KATHMANDU • BANDIPUR • POKHARA • LUMBINI",
    duration: "9N / 10D",
    price: "NPR 82,000",
    image: "/pokhara.jpeg",
    pdfUrl: "/pdf/grand-nepal-10d.pdf",
    description: "The complete essential Nepal experience. Journey through the capital's heritage, peaceful hilltop Bandipur, Pokhara's lakes and caves, Lord Buddha's birthplace in Lumbini, Namobuddha monastery, and Nagarkot's mountain views.",
    highlights: [
      "Maya Devi Temple & Sacred Ashoka Pillar in Lumbini",
      "Hilltop Bandipur village & Phewa Lake boating",
      "Sarangkot Sunrise & Pokhara cave exploration",
      "Nagarkot Himalayan Sunrise & Namobuddha Monastery",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", details: "Arrive at Kathmandu airport, visit Boudhanath Stupa and Patan Durbar Square." },
      { day: 2, title: "Kirtipur & Khokana Newari Village Tour", details: "Explore ancient stone streets, wood carvings, and oil pressing heritage." },
      { day: 3, title: "Drive to Hilltop Bandipur", details: "Scenic drive to Bandipur. Evening walking tour of preserved Newari bazaar." },
      { day: 4, title: "Drive to Pokhara & Phewa Boating", details: "Drive along Seti river to Pokhara. Afternoon boat trip on Phewa Lake." },
      { day: 5, title: "Sarangkot Sunrise & Sightseeing", details: "Sunrise mountain view from Sarangkot, Devi's Fall, and Gupteshwor Cave." },
      { day: 6, title: "Flight to Sacred Lumbini", details: "Fly to Bhairahawa, visit Maya Devi Temple, Sacred Garden, and Ashoka Pillar." },
      { day: 7, title: "Flight to Kathmandu, Bhaktapur & Nagarkot", details: "Fly back to Kathmandu. Tour medieval Bhaktapur and overnight in Nagarkot." },
      { day: 8, title: "Namobuddha Monastery Pilgrimage", details: "Himalayan sunrise view, pilgrimage to Namobuddha Stupa, drive back to Kathmandu." },
      { day: 9, title: "Swayambhunath & Cultural Farewell", details: "Visit Swayambhunath Monkey Temple, Kathmandu Durbar Square, and dinner show." },
      { day: 10, title: "Departure", details: "Hotel check-out and final transfer to airport." },
    ],
  },
  "kathmandu-valley-cultural-tour": {
    title: "Kathmandu Valley Cultural Heritage",
    locations: "KATHMANDU • BHAKTAPUR • PATAN",
    duration: "3N / 4D",
    price: "NPR 25,000",
    image: "/pokhara.jpeg",
    pdfUrl: "/pdf/kathmandu-valley-4d.pdf",
    description: "Explore UNESCO World Heritage Sites including Pashupatinath, Swayambhunath, and the historic Durbar Squares of Kathmandu, Patan, and Bhaktapur.",
    highlights: [
      "Pashupatinath Sacred Hindu Temple & Evening Aarti",
      "Swayambhunath Stupa (Monkey Temple)",
      "Patan & Bhaktapur Medieval Durbar Squares",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu", details: "Airport greeting and transfer to hotel. Free evening in Thamel." },
      { day: 2, title: "Swayambhunath & Kathmandu Durbar Square", details: "Guided tour of Swayambhunath Stupa and historic Kathmandu Durbar Square." },
      { day: 3, title: "Patan, Bhaktapur & Pashupatinath Aarti", details: "Explore Patan Arts, Bhaktapur Pottery Square, and evening Pashupatinath Aarti ceremony." },
      { day: 4, title: "Departure Transfer", details: "Morning souvenir shopping and transfer to airport for departure." },
    ],
  },
  "ebc-trek": {
    title: "Everest Base Camp & Kala Patthar Expedition",
    locations: "LUKLA • NAMCHE • GORAKSHEP • EBC",
    duration: "13N / 14D",
    price: "NPR 115,000",
    image: "/ebc.jpeg",
    pdfUrl: "/pdf/ebc-14d-itinerary.pdf",
    description: "The ultimate Himalayan trek to the base of Mount Everest (5,364m). Walk through iconic Sherpa villages, ancient monasteries, suspension bridges over the Dudh Koshi river, and stand face-to-face with the world's highest peak from Kala Patthar viewpoint (5,545m).",
    highlights: [
      "Mountain flight to Lukla (2,860m)",
      "Namche Bazaar & Tengboche Monastery",
      "Stand at Everest Base Camp (5,364m)",
      "Kala Patthar summit (5,545m) for sunrise over Everest",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu & Trip Briefing", details: "Arrive in Kathmandu, meet trekking guide, gear check and trip preparation." },
      { day: 2, title: "Flight to Lukla (2,860m) & Trek to Phakding", details: "Mountain flight to Lukla airstrip and trek down along Dudh Koshi river to Phakding." },
      { day: 3, title: "Trek to Namche Bazaar (3,440m)", details: "Cross Hillary Suspension Bridge and ascend up to Sherpa capital of Namche Bazaar." },
      { day: 4, title: "Acclimatization Day in Namche Bazaar", details: "Hike up to Everest View Hotel (3,880m) for panorama of Everest and Ama Dablam." },
      { day: 5, title: "Trek to Tengboche Monastery (3,867m)", details: "Walk through rhododendron forests to Tengboche, famous for ancient Buddhist monastery." },
      { day: 6, title: "Trek to Dingboche (4,410m)", details: "Descend to Debuche, cross Imja river and trek up alpine valley to Dingboche." },
      { day: 7, title: "Acclimatization Ridge Hike in Dingboche", details: "Acclimatization hike to Nangkartshang Peak viewpoint (5,080m)." },
      { day: 8, title: "Trek to Lobuche (4,940m)", details: "Pass Thukla memorial ridge dedicated to fallen climbers and arrive at Lobuche." },
      { day: 9, title: "Trek to Gorakshep & Everest Base Camp (5,364m)", details: "Trek over Khumbu glacier to Gorakshep and push to Everest Base Camp." },
      { day: 10, title: "Kala Patthar Summit (5,545m) & Trek to Pheriche", details: "Early morning steep hike up Kala Patthar for sunrise over Everest peak. Descend to Pheriche." },
      { day: 11, title: "Trek Down to Namche Bazaar", details: "Retrace steps down past Tengboche back to Namche Bazaar." },
      { day: 12, title: "Trek Down to Lukla", details: "Final day of trekking down valley to Lukla village." },
      { day: 13, title: "Flight back to Kathmandu & Celebration", details: "Morning flight back to Kathmandu. Evening celebration dinner." },
      { day: 14, title: "Final Departure", details: "Hotel check-out and transfer to airport." },
    ],
  },
  ebc: {
    title: "Everest Base Camp & Kala Patthar Expedition",
    locations: "LUKLA • NAMCHE • GORAKSHEP • EBC",
    duration: "13N / 14D",
    price: "NPR 115,000",
    image: "/ebc.jpeg",
    pdfUrl: "/pdf/ebc-14d-itinerary.pdf",
    description: "The ultimate Himalayan trek to the base of Mount Everest (5,364m). Walk through iconic Sherpa villages, ancient monasteries, suspension bridges over the Dudh Koshi river, and stand face-to-face with the world's highest peak from Kala Patthar viewpoint (5,545m).",
    highlights: [
      "Mountain flight to Lukla (2,860m)",
      "Namche Bazaar & Tengboche Monastery",
      "Stand at Everest Base Camp (5,364m)",
      "Kala Patthar summit (5,545m) for sunrise over Everest",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Kathmandu & Trip Briefing", details: "Arrive in Kathmandu, meet trekking guide, gear check and trip preparation." },
      { day: 2, title: "Flight to Lukla (2,860m) & Trek to Phakding", details: "Mountain flight to Lukla airstrip and trek down along Dudh Koshi river to Phakding." },
      { day: 3, title: "Trek to Namche Bazaar (3,440m)", details: "Cross Hillary Suspension Bridge and ascend up to Sherpa capital of Namche Bazaar." },
      { day: 4, title: "Acclimatization Day in Namche Bazaar", details: "Hike up to Everest View Hotel (3,880m) for panorama of Everest and Ama Dablam." },
      { day: 5, title: "Trek to Tengboche Monastery (3,867m)", details: "Walk through rhododendron forests to Tengboche, famous for ancient Buddhist monastery." },
      { day: 6, title: "Trek to Dingboche (4,410m)", details: "Descend to Debuche, cross Imja river and trek up alpine valley to Dingboche." },
      { day: 7, title: "Acclimatization Ridge Hike in Dingboche", details: "Acclimatization hike to Nangkartshang Peak viewpoint (5,080m)." },
      { day: 8, title: "Trek to Lobuche (4,940m)", details: "Pass Thukla memorial ridge dedicated to fallen climbers and arrive at Lobuche." },
      { day: 9, title: "Trek to Gorakshep & Everest Base Camp (5,364m)", details: "Trek over Khumbu glacier to Gorakshep and push to Everest Base Camp." },
      { day: 10, title: "Kala Patthar Summit (5,545m) & Trek to Pheriche", details: "Early morning steep hike up Kala Patthar for sunrise over Everest peak. Descend to Pheriche." },
      { day: 11, title: "Trek Down to Namche Bazaar", details: "Retrace steps down past Tengboche back to Namche Bazaar." },
      { day: 12, title: "Trek Down to Lukla", details: "Final day of trekking down valley to Lukla village." },
      { day: 13, title: "Flight back to Kathmandu & Celebration", details: "Morning flight back to Kathmandu. Evening celebration dinner." },
      { day: 14, title: "Final Departure", details: "Hotel check-out and transfer to airport." },
    ],
  },
  "annapurna-circuit": {
    title: "Annapurna Circuit & Thorong La Pass Trek",
    locations: "BESISAHAR • MANANG • THORONG LA • MUKTINATH",
    duration: "11N / 12D",
    price: "NPR 88,000",
    image: "/abc.jpeg",
    pdfUrl: "/pdf/annapurna-circuit-12d.pdf",
    description: "Traverse one of the world's most renowned classic treks. Cross the formidable Thorong La Pass at 5,416m, descend to the sacred temple of Muktinath, explore apple orchards in Marpha, and relax at Pokhara's Fewa Lake.",
    highlights: [
      "Cross high Thorong La Pass (5,416m)",
      "Sacred pilgrimage temple of Muktinath (3,800m)",
      "Manang Valley & Gangapurna Glacier Lake",
      "Marpha Apple Village & Tatopani Hot Springs",
    ],
    itinerary: [
      { day: 1, title: "Kathmandu to Besisahar & Chame Drive", details: "Scenic drive along Marsyangdi river to Chame (2,670m)." },
      { day: 2, title: "Trek from Chame to Pisang (3,200m)", details: "Trek past Apple orchards and dramatic rock walls to Upper Pisang." },
      { day: 3, title: "Trek to Manang Valley (3,540m)", details: "Walk high route via Nawal for breathtaking Annapurna massif views." },
      { day: 4, title: "Acclimatization Day in Manang", details: "Rest day exploring Gangapurna glacier lake and Braga monastery." },
      { day: 5, title: "Trek to Yak Kharka (4,050m)", details: "Ascend gradually past alpine pastures to Yak Kharka." },
      { day: 6, title: "Trek to Thorong High Camp (4,900m)", details: "Short trek to Thorong Phedi and steep climb up to High Camp." },
      { day: 7, title: "Cross Thorong La Pass (5,416m) to Muktinath", details: "Early start crossing high pass (5,416m) and descend down to Muktinath." },
      { day: 8, title: "Muktinath Temple & Drive to Marpha", details: "Visit Muktinath 108 spouts temple, drive down to Marpha village." },
      { day: 9, title: "Drive to Tatopani Natural Hot Springs", details: "Overland drive down Kali Gandaki gorge to Tatopani hot springs." },
      { day: 10, title: "Drive to Pokhara", details: "Drive down to Nayapul and transfer to Pokhara Lakeside." },
      { day: 11, title: "Pokhara Sightseeing & Drive to Kathmandu", details: "Morning boat trip, afternoon scenic drive back to Kathmandu." },
      { day: 12, title: "Airport Departure Transfer", details: "Transfer to airport for homeward journey." },
    ],
  },
  annapurna: {
    title: "Annapurna Circuit & Thorong La Pass Trek",
    locations: "BESISAHAR • MANANG • THORONG LA • MUKTINATH",
    duration: "11N / 12D",
    price: "NPR 88,000",
    image: "/abc.jpeg",
    pdfUrl: "/pdf/annapurna-circuit-12d.pdf",
    description: "Traverse one of the world's most renowned classic treks. Cross the formidable Thorong La Pass at 5,416m, descend to the sacred temple of Muktinath, explore apple orchards in Marpha, and relax at Pokhara's Fewa Lake.",
    highlights: [
      "Cross high Thorong La Pass (5,416m)",
      "Sacred pilgrimage temple of Muktinath (3,800m)",
      "Manang Valley & Gangapurna Glacier Lake",
      "Marpha Apple Village & Tatopani Hot Springs",
    ],
    itinerary: [
      { day: 1, title: "Kathmandu to Besisahar & Chame Drive", details: "Scenic drive along Marsyangdi river to Chame (2,670m)." },
      { day: 2, title: "Trek from Chame to Pisang (3,200m)", details: "Trek past Apple orchards and dramatic rock walls to Upper Pisang." },
      { day: 3, title: "Trek to Manang Valley (3,540m)", details: "Walk high route via Nawal for breathtaking Annapurna massif views." },
      { day: 4, title: "Acclimatization Day in Manang", details: "Rest day exploring Gangapurna glacier lake and Braga monastery." },
      { day: 5, title: "Trek to Yak Kharka (4,050m)", details: "Ascend gradually past alpine pastures to Yak Kharka." },
      { day: 6, title: "Trek to Thorong High Camp (4,900m)", details: "Short trek to Thorong Phedi and steep climb up to High Camp." },
      { day: 7, title: "Cross Thorong La Pass (5,416m) to Muktinath", details: "Early start crossing high pass (5,416m) and descend down to Muktinath." },
      { day: 8, title: "Muktinath Temple & Drive to Marpha", details: "Visit Muktinath 108 spouts temple, drive down to Marpha village." },
      { day: 9, title: "Drive to Tatopani Natural Hot Springs", details: "Overland drive down Kali Gandaki gorge to Tatopani hot springs." },
      { day: 10, title: "Drive to Pokhara", details: "Drive down to Nayapul and transfer to Pokhara Lakeside." },
      { day: 11, title: "Pokhara Sightseeing & Drive to Kathmandu", details: "Morning boat trip, afternoon scenic drive back to Kathmandu." },
      { day: 12, title: "Airport Departure Transfer", details: "Transfer to airport for homeward journey." },
    ],
  },
  "annapurna-base-camp-trek": {
    title: "Annapurna Base Camp & Sanctuary Trek",
    locations: "POKHARA • GHANDRUK • ABC (4,130m)",
    duration: "9N / 10D",
    price: "NPR 65,000",
    image: "/abc.jpeg",
    pdfUrl: "/pdf/abc-10d-itinerary.pdf",
    description: "Trek through lush rhododendron forests, traditional Gurung villages, and natural hot springs, culminating in the 360-degree mountain amphitheater inside the Annapurna Sanctuary at 4,130m.",
    highlights: [
      "Stand inside 360-degree Annapurna Sanctuary (4,130m)",
      "Traditional Gurung heritage village of Ghandruk",
      "Machhapuchhre Base Camp (MBC) views",
      "Jhinu Danda natural riverside hot springs",
    ],
    itinerary: [
      { day: 1, title: "Kathmandu to Pokhara Drive", details: "Scenic drive past rivers and terraced hills to Pokhara." },
      { day: 2, title: "Drive to Nayapul & Trek to Ghandruk", details: "Drive to Nayapul and trek up stone steps to Ghandruk village." },
      { day: 3, title: "Trek to Chhomrong (2,170m)", details: "Ascend past Kimrong river valley to Chhomrong village." },
      { day: 4, title: "Trek to Bamboo / Himalaya (2,600m)", details: "Descend Chhomrong steps and trek through dense bamboo forest." },
      { day: 5, title: "Trek to Annapurna Base Camp (4,130m)", details: "Trek past Machhapuchhre Base Camp to Annapurna Base Camp." },
      { day: 6, title: "Annapurna I Sunrise & Trek to Bamboo", details: "Sunrise view over Annapurna I (8,091m) and trek down to Bamboo." },
      { day: 7, title: "Trek to Jhinu Danda Hot Springs", details: "Trek to Jhinu Danda and relax in natural riverside thermal pools." },
      { day: 8, title: "Trek to Nayapul & Drive to Pokhara", details: "Final trek down to Nayapul, transfer to Pokhara hotel." },
      { day: 9, title: "Drive to Kathmandu", details: "Highway drive back to Kathmandu, free evening." },
      { day: 10, title: "Departure", details: "Final transfer to international airport." },
    ],
  },
  "mustang-overland": {
    title: "Muktinath & Lower Mustang Overland Safari",
    locations: "POKHARA • TATOPANI • JOMSOM • MUKTINATH",
    duration: "5N / 6D",
    price: "NPR 45,000",
    image: "/muktinath.jpeg",
    pdfUrl: "/pdf/mustang-overland-6d.pdf",
    description: "Experience the rain-shadow desert landscapes of Mustang without arduous high-altitude walking. Ride in a private 4WD vehicle through Kali Gandaki gorge, visit Muktinath 108 water spouts, and taste apple brandy in Marpha.",
    highlights: [
      "4WD Scorpio overland drive through Kali Gandaki Gorge",
      "Muktinath sacred 108 water spouts (3,800m)",
      "Marpha apple orchard village & Kagbeni confluence",
      "Tatopani natural hot springs bath",
    ],
    itinerary: [
      { day: 1, title: "Kathmandu to Pokhara Drive", details: "Scenic highway drive to Pokhara. Free evening by Fewa lake." },
      { day: 2, title: "Overland 4WD Drive to Tatopani Hot Springs", details: "Drive through Beni along Kali Gandaki gorge to Tatopani hot springs." },
      { day: 3, title: "Drive to Jomsom & Muktinath Temple (3,800m)", details: "Drive past apple orchards in Marpha up to Muktinath Temple." },
      { day: 4, title: "Muktinath Darshan & Kagbeni Tour", details: "Morning prayers at Muktinath, visit Kagbeni ancient village, drive to Jomsom." },
      { day: 5, title: "Drive Back to Pokhara", details: "Return 4WD drive back down to Pokhara. Boating on Phewa lake." },
      { day: 6, title: "Return Drive to Kathmandu & Departure", details: "Drive back to Kathmandu and final transfer to airport." },
    ],
  },
  mustang: {
    title: "Muktinath & Lower Mustang Overland Safari",
    locations: "POKHARA • TATOPANI • JOMSOM • MUKTINATH",
    duration: "5N / 6D",
    price: "NPR 45,000",
    image: "/muktinath.jpeg",
    pdfUrl: "/pdf/mustang-overland-6d.pdf",
    description: "Experience the rain-shadow desert landscapes of Mustang without arduous high-altitude walking. Ride in a private 4WD vehicle through Kali Gandaki gorge, visit Muktinath 108 water spouts, and taste apple brandy in Marpha.",
    highlights: [
      "4WD Scorpio overland drive through Kali Gandaki Gorge",
      "Muktinath sacred 108 water spouts (3,800m)",
      "Marpha apple orchard village & Kagbeni confluence",
      "Tatopani natural hot springs bath",
    ],
    itinerary: [
      { day: 1, title: "Kathmandu to Pokhara Drive", details: "Scenic highway drive to Pokhara. Free evening by Fewa lake." },
      { day: 2, title: "Overland 4WD Drive to Tatopani Hot Springs", details: "Drive through Beni along Kali Gandaki gorge to Tatopani hot springs." },
      { day: 3, title: "Drive to Jomsom & Muktinath Temple (3,800m)", details: "Drive past apple orchards in Marpha up to Muktinath Temple." },
      { day: 4, title: "Muktinath Darshan & Kagbeni Tour", details: "Morning prayers at Muktinath, visit Kagbeni ancient village, drive to Jomsom." },
      { day: 5, title: "Drive Back to Pokhara", details: "Return 4WD drive back down to Pokhara. Boating on Phewa lake." },
      { day: 6, title: "Return Drive to Kathmandu & Departure", details: "Drive back to Kathmandu and final transfer to airport." },
    ],
  },
  "pokhara-leisure-tour": {
    title: "Pokhara Lake & Mountain Escape",
    locations: "POKHARA • SARANGKOT • PEACE PAGODA",
    duration: "4N / 5D",
    price: "NPR 35,000",
    image: "/pokhara.jpeg",
    pdfUrl: "/pdf/pokhara-leisure-5d.pdf",
    description: "Relax by Fewa Lake, witness breathtaking Annapurna views from Sarangkot sunrise, and explore caves, waterfalls, and peaceful temples.",
    highlights: [
      "Sarangkot Himalayan Sunrise view",
      "Phewa Lake boat ride & Tal Barahi Temple",
      "World Peace Pagoda & International Mountain Museum",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Pokhara", details: "Arrive in Pokhara, hotel check-in and evening stroll on Lakeside." },
      { day: 2, title: "Sarangkot Sunrise & Pokhara Sightseeing", details: "Sunrise at Sarangkot, visit Devi's Fall and Gupteshwor Mahadev Cave." },
      { day: 3, title: "Fewa Boating & World Peace Pagoda", details: "Boat ride across Fewa Lake and short hike up to World Peace Pagoda." },
      { day: 4, title: "Mountain Museum & Pumdikot Shiva Statue", details: "Visit International Mountain Museum and giant Pumdikot Shiva statue." },
      { day: 5, title: "Departure", details: "Transfer back to Kathmandu or Pokhara airport for flight." },
    ],
  },
  pokhara: {
    title: "Pokhara Lake & Mountain Escape",
    locations: "POKHARA • SARANGKOT • PEACE PAGODA",
    duration: "4N / 5D",
    price: "NPR 35,000",
    image: "/pokhara.jpeg",
    pdfUrl: "/pdf/pokhara-leisure-5d.pdf",
    description: "Relax by Fewa Lake, witness breathtaking Annapurna views from Sarangkot sunrise, and explore caves, waterfalls, and peaceful temples.",
    highlights: [
      "Sarangkot Himalayan Sunrise view",
      "Phewa Lake boat ride & Tal Barahi Temple",
      "World Peace Pagoda & International Mountain Museum",
    ],
    itinerary: [
      { day: 1, title: "Arrival in Pokhara", details: "Arrive in Pokhara, hotel check-in and evening stroll on Lakeside." },
      { day: 2, title: "Sarangkot Sunrise & Pokhara Sightseeing", details: "Sunrise at Sarangkot, visit Devi's Fall and Gupteshwor Mahadev Cave." },
      { day: 3, title: "Fewa Boating & World Peace Pagoda", details: "Boat ride across Fewa Lake and short hike up to World Peace Pagoda." },
      { day: 4, title: "Mountain Museum & Pumdikot Shiva Statue", details: "Visit International Mountain Museum and giant Pumdikot Shiva statue." },
      { day: 5, title: "Departure", details: "Transfer back to Kathmandu or Pokhara airport for flight." },
    ],
  },
  "chitwan-national-park-safari": {
    title: "Chitwan Wildlife Jungle Safari",
    locations: "CHITWAN NATIONAL PARK • RAPTI RIVER",
    duration: "2N / 3D",
    price: "NPR 28,000",
    image: "/chitwan.jpeg",
    pdfUrl: "/pdf/chitwan-safari-3d.pdf",
    description: "Venture into Nepal's first national park to spot rare One-Horned Rhinos, Bengal Tigers, exotic birds, and experience Tharu cultural dance.",
    highlights: [
      "Jeep Safari into deep Chitwan Jungle",
      "Rapti River Canoe ride spotting Gharial Crocodiles",
      "Tharu Cultural Stick Dance Show",
    ],
    itinerary: [
      { day: 1, title: "Drive to Chitwan & Tharu Cultural Show", details: "Drive to Chitwan jungle resort. Village walk and evening Tharu cultural dance show." },
      { day: 2, title: "Jungle Jeep Safari & Canoe Ride", details: "Full day jungle activities: Rapti river canoe ride, jungle walk, jeep safari, and elephant breeding center." },
      { day: 3, title: "Bird Watching Walk & Departure", details: "Early morning bird watching walk, breakfast, and return drive to Kathmandu/Pokhara." },
    ],
  },
  chitwan: {
    title: "Chitwan Wildlife Jungle Safari",
    locations: "CHITWAN NATIONAL PARK • RAPTI RIVER",
    duration: "2N / 3D",
    price: "NPR 28,000",
    image: "/chitwan.jpeg",
    pdfUrl: "/pdf/chitwan-safari-3d.pdf",
    description: "Venture into Nepal's first national park to spot rare One-Horned Rhinos, Bengal Tigers, exotic birds, and experience Tharu cultural dance.",
    highlights: [
      "Jeep Safari into deep Chitwan Jungle",
      "Rapti River Canoe ride spotting Gharial Crocodiles",
      "Tharu Cultural Stick Dance Show",
    ],
    itinerary: [
      { day: 1, title: "Drive to Chitwan & Tharu Cultural Show", details: "Drive to Chitwan jungle resort. Village walk and evening Tharu cultural dance show." },
      { day: 2, title: "Jungle Jeep Safari & Canoe Ride", details: "Full day jungle activities: Rapti river canoe ride, jungle walk, jeep safari, and elephant breeding center." },
      { day: 3, title: "Bird Watching Walk & Departure", details: "Early morning bird watching walk, breakfast, and return drive to Kathmandu/Pokhara." },
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

  return <InboundDetailView tour={tour} />;
}

// Client Component to handle state-based image fallbacks cleanly
function InboundDetailView({ tour }: { tour: TourDetails }) {
  const [imgSrc, setImgSrc] = useState(tour.image);

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#172A3A] font-serif selection:bg-[#A44A3F] selection:text-white py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Back Link */}
        <Link
          href="/inbound"
          className="inline-flex items-center gap-2 text-xs font-sans font-extrabold uppercase tracking-widest text-[#A44A3F] hover:text-[#172A3A] transition-colors mb-8"
        >
          <ArrowLeft size={15} />
          <span>Back to Inbound Nepal Tours</span>
        </Link>

        {/* Hero Banner Image Box */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-stone-200 border border-stone-200/90 shadow-md">
          <img
            src={imgSrc}
            alt={tour.title}
            className="h-full w-full object-cover"
            onError={() =>
              setImgSrc("https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80")
            }
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
          
          {/* Main Content */}
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
                PRICE PER PERSON
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
                <span>Licensed DMC Ground Handling & Support</span>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <Link
                href="/contact"
                className="block w-full text-center bg-[#172A3A] hover:bg-[#A44A3F] transition-colors py-3 text-xs font-extrabold uppercase tracking-widest text-white shadow-xs"
              >
                Book Inbound Package
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