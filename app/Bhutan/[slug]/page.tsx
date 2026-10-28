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
  startingPriceNPR: string;
  overview: string;
  heroImages: string[];
  pdfFileName: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
}

const BHUTAN_PACKAGE_DETAILS: Record<string, TourDetail> = {
  'thimphu-paro-cultural-explorer': {
    slug: 'thimphu-paro-cultural-explorer',
    title: 'Thimphu & Paro Cultural Explorer',
    locations: 'THIMPHU • PARO • TIGER\'S NEST',
    category: 'BESTSELLER',
    duration: '3N / 4D',
    rating: 4.9,
    reviewsCount: 112,
    startingPriceNPR: 'NPR 65,000',
    overview: 'An essential Himalayan getaway to Bhutan. Explore the capital city Thimphu, cross mountain passes, and hike up to the iconic Tiger’s Nest (Paro Taktsang) monastery.',
    heroImages: [
      'https://images.unsplash.com/photo-1578593139366-10467756f7e5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800'
    ],
    pdfFileName: 'bhutan-3n4d-itinerary.pdf',
    highlights: [
      'Hike to the legendary Tiger’s Nest Monastery (Taktsang)',
      'Visit Tashichho Dzong and Buddha Dordenma in Thimphu',
      'Scenic flight views of the Himalayan range from Kathmandu',
      'Experience traditional Bhutanese culture and cuisine'
    ],
    inclusions: [
      'Bhutan visa clearance & SDF (Sustainable Development Fee) processing',
      'Airport transfers and private transport for sightseeing',
      '3 Nights hotel accommodation in 3-Star standard hotels',
      'Daily Breakfast, Lunch, and Dinner',
      'Licensed English-speaking Bhutanese tour guide'
    ],
    exclusions: [
      'Flight tickets (Kathmandu - Paro - Kathmandu)',
      'Personal expenses, tips, and travel insurance'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Flight to Paro & Transfer to Thimphu',
        description: 'Fly into Paro International Airport over breathtaking Himalayan ranges. Meet your guide and drive to Thimphu (approx. 1.5 hours). Evening stroll around Thimphu local craft bazaar.',
        image: 'https://images.unsplash.com/photo-1578593139366-10467756f7e5?auto=format&fit=crop&q=80&w=600',
        meals: 'Lunch & Dinner',
        hotel: 'Thimphu Hotel'
      },
      {
        day: 2,
        title: 'Thimphu Sightseeing to Paro',
        description: 'Visit Buddha Dordenma (Buddha Point), National Memorial Chorten, and Tashichho Dzong. Drive back to Paro in the afternoon.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast, Lunch & Dinner',
        hotel: 'Paro Hotel'
      },
      {
        day: 3,
        title: 'Tiger’s Nest Monastery (Taktsang) Hike',
        description: 'Embark on an unforgettable morning hike to Tiger’s Nest Monastery clinging to a cliffside. Visit Kyichu Lhakhang in the afternoon.',
        image: 'https://images.unsplash.com/photo-1578593139366-10467756f7e5?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast, Lunch & Dinner',
        hotel: 'Paro Hotel'
      },
      {
        day: 4,
        title: 'Departure from Paro',
        description: 'After breakfast, transfer to Paro International Airport for your return flight to Kathmandu.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast',
        hotel: 'Check-out'
      }
    ]
  },
  'bhutan-classic-valley-tour': {
    slug: 'bhutan-classic-valley-tour',
    title: 'Classic Bhutan Valley & Dzong Panorama',
    locations: 'THIMPHU • PUNAKHA • PARO',
    category: 'CULTURAL HERITAGE',
    duration: '4N / 5D',
    rating: 4.9,
    reviewsCount: 148,
    startingPriceNPR: 'NPR 82,000',
    overview: 'An immersive 5-day journey exploring three major valleys of Bhutan: Thimphu, Punakha (historic winter capital), and Paro.',
    heroImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1578593139366-10467756f7e5?auto=format&fit=crop&q=80&w=800'
    ],
    pdfFileName: 'bhutan-4n5d-itinerary.pdf',
    highlights: [
      'Cross the scenic Dochula Pass (3,100m) with 108 memorial stupas',
      'Explore the magnificent Punakha Dzong beside the Mo Chhu river',
      'Hike to Tiger’s Nest Monastery in Paro'
    ],
    inclusions: [
      'Bhutan visa & SDF fees included',
      '4 Nights hotel accommodation',
      'All meals (Breakfast, Lunch & Dinner)',
      'Private transport and licensed guide'
    ],
    exclusions: [
      'International flights',
      'Personal expenses'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Paro & Thimphu Transfer',
        description: 'Fly into Paro and drive to Thimphu. Check-in and relax.',
        image: 'https://images.unsplash.com/photo-1578593139366-10467756f7e5?auto=format&fit=crop&q=80&w=600',
        meals: 'Lunch & Dinner',
        hotel: 'Thimphu Hotel'
      },
      {
        day: 2,
        title: 'Thimphu to Punakha via Dochula Pass',
        description: 'Drive across Dochula Pass to Punakha. Visit Punakha Dzong and Suspension Bridge.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast, Lunch & Dinner',
        hotel: 'Punakha Hotel'
      },
      {
        day: 3,
        title: 'Punakha to Paro',
        description: 'Drive back to Paro. Visit Paro Dzong and National Museum of Bhutan.',
        image: 'https://images.unsplash.com/photo-1578593139366-10467756f7e5?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast, Lunch & Dinner',
        hotel: 'Paro Hotel'
      },
      {
        day: 4,
        title: 'Tiger’s Nest Hike',
        description: 'Full day excursion and hike to Taktsang Monastery (Tiger’s Nest).',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast, Lunch & Dinner',
        hotel: 'Paro Hotel'
      },
      {
        day: 5,
        title: 'Departure from Paro',
        description: 'Transfer to Paro Airport for your flight back home.',
        image: 'https://images.unsplash.com/photo-1578593139366-10467756f7e5?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast',
        hotel: 'Check-out'
      }
    ]
  },
  'bhutan-himalayan-kingdom-expedition': {
    slug: 'bhutan-himalayan-kingdom-expedition',
    title: 'Himalayan Kingdom & Phobjikha Valley',
    locations: 'THIMPHU • PUNAKHA • PHOBJIKHA • PARO',
    category: 'GRAND EXPEDITION',
    duration: '6N / 7D',
    rating: 5.0,
    reviewsCount: 84,
    startingPriceNPR: 'NPR 115,000',
    overview: 'The grand expedition across Bhutan including the glacier valley of Phobjikha, home of the endangered black-necked cranes.',
    heroImages: [
      'https://images.unsplash.com/photo-1578593139366-10467756f7e5?auto=format&fit=crop&q=80&w=1200'
    ],
    pdfFileName: 'bhutan-6n7d-itinerary.pdf',
    highlights: ['Phobjikha glacial valley', 'Gangtey Monastery', 'Tiger’s Nest hike', 'Punakha Dzong'],
    inclusions: ['Visa & SDF', '6 Nights hotel stay', 'All meals', 'Guide & vehicle'],
    exclusions: ['Airfare', 'Tips'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Paro to Thimphu',
        description: 'Arrive at Paro and transfer to Thimphu.',
        image: 'https://images.unsplash.com/photo-1578593139366-10467756f7e5?auto=format&fit=crop&q=80&w=600',
        meals: 'Lunch & Dinner',
        hotel: 'Thimphu Hotel'
      },
      {
        day: 2,
        title: 'Thimphu to Punakha',
        description: 'Drive via Dochula Pass to Punakha valley.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast, Lunch & Dinner',
        hotel: 'Punakha Hotel'
      },
      {
        day: 3,
        title: 'Punakha to Phobjikha Valley',
        description: 'Scenic drive to the stunning glacial valley of Phobjikha.',
        image: 'https://images.unsplash.com/photo-1578593139366-10467756f7e5?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast, Lunch & Dinner',
        hotel: 'Phobjikha Hotel'
      },
      {
        day: 4,
        title: 'Phobjikha to Punakha / Thimphu',
        description: 'Explore Gangtey Monastery and drive back towards western valleys.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast, Lunch & Dinner',
        hotel: 'Thimphu Hotel'
      },
      {
        day: 5,
        title: 'Thimphu to Paro',
        description: 'Drive to Paro and visit local landmarks.',
        image: 'https://images.unsplash.com/photo-1578593139366-10467756f7e5?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast, Lunch & Dinner',
        hotel: 'Paro Hotel'
      },
      {
        day: 6,
        title: 'Tiger’s Nest Hike',
        description: 'Hike to Taktsang Monastery.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast, Lunch & Dinner',
        hotel: 'Paro Hotel'
      },
      {
        day: 7,
        title: 'Departure',
        description: 'Transfer to Paro Airport for return flight.',
        image: 'https://images.unsplash.com/photo-1578593139366-10467756f7e5?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast',
        hotel: 'Check-out'
      }
    ]
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TourDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tour = BHUTAN_PACKAGE_DETAILS[resolvedParams.slug];

  if (!tour) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#172A3A] font-serif selection:bg-[#A44A3F] selection:text-white">
      
      {/* TOP NAVIGATION & BREADCRUMB */}
      <div className="bg-[#EFECE6]/70 border-b border-stone-200/80 py-4 font-sans text-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl flex items-center justify-between">
          <Link 
            href="/Bhutan" 
            className="inline-flex items-center gap-1.5 font-extrabold uppercase tracking-widest text-[#A44A3F] hover:translate-x-[-2px] transition-transform"
          >
            <ArrowLeft size={14} /> Back to Bhutan Escapes
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
            
            <div className="lg:col-span-2 space-y-10">
              
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

            <div>
              <div className="bg-white border border-stone-200/90 p-6 shadow-sm sticky top-6 font-sans">
                
                <span className="block text-[9px] font-extrabold uppercase tracking-widest text-stone-400">
                  STARTING FROM
                </span>
                <span className="text-2xl font-extrabold text-[#172A3A] block mb-6">
                  {tour.startingPriceNPR}
                </span>

                <div className="space-y-3 border-t border-b border-stone-100 py-4 mb-6 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-extrabold text-[#172A3A]">{tour.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bhutan Visa & SDF:</span>
                    <span className="font-extrabold text-emerald-600">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Private Car Transfer:</span>
                    <span className="font-extrabold text-[#172A3A]">Included</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href="#inquire"
                    className="w-full py-3 bg-[#A44A3F] hover:bg-[#8B3E34] text-white text-xs font-black uppercase tracking-widest transition-colors block text-center"
                  >
                    Inquire For Booking
                  </a>

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
                  <a href="tel:+97712345678" className="font-extrabold text-[#A44A3F] flex items-center justify-center gap-1">
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