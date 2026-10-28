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

const INDIA_PACKAGE_DETAILS: Record<string, TourDetail> = {
  'golden-triangle-delhi-agra-jaipur': {
    slug: 'golden-triangle-delhi-agra-jaipur',
    title: 'Classic Golden Triangle Tour',
    locations: 'DELHI • AGRA • JAIPUR',
    category: 'HERITAGE',
    duration: '5N / 6D',
    rating: 4.9,
    reviewsCount: 165,
    startingPriceNPR: 'NPR',
    overview: 'Experience India’s most iconic heritage route connecting New Delhi, Agra’s Taj Mahal, and the royal pink city of Jaipur with private AC transfers and handpicked hotels.',
    heroImages: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1585506954211-722e1fc1a23f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1599661046862-2f224f8d9515?auto=format&fit=crop&q=80&w=800'
    ],
    pdfFileName: 'golden-triangle-itinerary.pdf',
    highlights: [
      'Guided sunrise and sunset tours of the Taj Mahal',
      'Explore the majestic Agra Fort and Fatehpur Sikri',
      'Amber Palace tour in Jaipur with photo stop at Hawa Mahal',
      'Shopping at bustling local bazaars in Delhi and Jaipur'
    ],
    inclusions: [
      'Airport transfers and private AC vehicle for all sightseeing',
      '5 Nights accommodation in 3/4 Star Hotels on twin-sharing basis',
      'Daily Breakfast and Dinner at hotels',
      'English/Hindi speaking tour guide'
    ],
    exclusions: [
      'International airfare (Kathmandu - Delhi - Kathmandu)',
      'Monuments entrance fees and camera charges',
      'Lunch and personal expenses'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in New Delhi & City Sightseeing',
        description: 'Arrive at Delhi Indira Gandhi International Airport. Meet our representative and transfer to hotel. Visit Qutub Minar, India Gate, and drive past Rashtrapati Bhavan.',
        image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=600',
        meals: 'Dinner',
        hotel: 'Delhi Hotel'
      },
      {
        day: 2,
        title: 'Delhi to Agra via Yamuna Expressway',
        description: 'After breakfast, drive to Agra (approx. 3.5 hours). Check in to hotel and explore Agra Fort, a UNESCO World Heritage site showcasing Mughal architecture.',
        image: 'https://images.unsplash.com/photo-1590001155093-a3c66ab0c3bc?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Agra Hotel'
      },
      {
        day: 3,
        title: 'Taj Mahal Sunrise & Drive to Jaipur via Fatehpur Sikri',
        description: 'Early morning sunrise visit to the Taj Mahal. Return to hotel for breakfast, check out, and drive towards Jaipur, visiting Fatehpur Sikri en route.',
        image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Jaipur Hotel'
      },
      {
        day: 4,
        title: 'Jaipur Pink City Sightseeing',
        description: 'Explore Amber Fort, photo stop at Hawa Mahal and Jal Mahal, and visit City Palace and Jantar Mantar.',
        image: 'https://images.unsplash.com/photo-1599661046862-2f224f8d9515?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Jaipur Hotel'
      },
      {
        day: 5,
        title: 'Jaipur to Delhi Drive & Shopping',
        description: 'Drive back to Delhi. Evening free for leisure or shopping at local handicraft markets.',
        image: 'https://images.unsplash.com/photo-1585506954211-722e1fc1a23f?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Delhi Hotel'
      },
      {
        day: 6,
        title: 'Departure from Delhi',
        description: 'Breakfast at hotel and transfer to Delhi airport for flight back to Kathmandu.',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast',
        hotel: 'Check-out'
      }
    ]
  },
  'kashi-gaya-prayagraj-pilgrimage': {
    slug: 'kashi-gaya-prayagraj-pilgrimage',
    title: 'Kashi Vishwanath, Gaya & Ayodhya Yatra',
    locations: 'VARANASI • PRAYAGRAJ • AYODHYA • GAYA',
    category: 'PILGRIMAGE',
    duration: '6N / 7D',
    rating: 4.8,
    reviewsCount: 240,
    startingPriceNPR: 'NPR ',
    overview: 'A holy journey covering Kashi Vishwanath, Triveni Sangam in Prayagraj, Shri Ram Mandir in Ayodhya, and Vishnupad Temple at Gaya.',
    heroImages: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800'
    ],
    pdfFileName: 'kashi-yatra-itinerary.pdf',
    highlights: [
      'Ganga Aarti at Dashashwamedh Ghat',
      'Kashi Vishwanath Corridor Darshan',
      'Holy bath at Triveni Sangam Prayagraj',
      'Shri Ram Mandir Darshan in Ayodhya',
      'Pinda Daan at Gaya'
    ],
    inclusions: [
      'AC vehicle transfers from border / airport',
      '6 Nights hotel accommodation',
      'Pure Vegetarian Breakfast and Dinner',
      'Experienced Pilgrimage Tour Manager'
    ],
    exclusions: [
      'Priest fees & personal ritual samagri',
      'Boat ride tickets at Varanasi & Prayagraj',
      'Personal expenses'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Varanasi & Evening Ganga Aarti',
        description: 'Arrive in Varanasi. Transfer to hotel and witness the evening Ganga Aarti at Dashashwamedh Ghat.',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=600',
        meals: 'Dinner',
        hotel: 'Varanasi Hotel'
      },
      {
        day: 2,
        title: 'Kashi Vishwanath Darshan & Sarnath',
        description: 'Morning boat ride and Kashi Vishwanath temple darshan. Afternoon visit to Sarnath.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Varanasi Hotel'
      },
      {
        day: 3,
        title: 'Varanasi to Prayagraj (Sangam Bath)',
        description: 'Drive to Prayagraj. Take a holy bath at Triveni Sangam and visit Anand Bhavan.',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Prayagraj Hotel'
      },
      {
        day: 4,
        title: 'Prayagraj to Ayodhya Ram Mandir Darshan',
        description: 'Drive to Ayodhya. Darshan at Ram Lalla Mandir and Hanuman Garhi.',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Ayodhya Hotel'
      },
      {
        day: 5,
        title: 'Ayodhya to Gaya',
        description: 'Drive to Gaya and prepare for ancestral rituals at Vishnupad Temple.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Gaya Hotel'
      },
      {
        day: 6,
        title: 'Gaya Rituals, Bodhgaya & Return to Varanasi',
        description: 'Perform Pinda Daan rituals in Gaya, visit Mahabodhi Temple in Bodhgaya, and return to Varanasi.',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Varanasi Hotel'
      },
      {
        day: 7,
        title: 'Departure',
        description: 'Breakfast and departure transfer to airport/border.',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast',
        hotel: 'Check-out'
      }
    ]
  },
  'darjeeling-gangtok-himalayan-escape': {
    slug: 'darjeeling-gangtok-himalayan-escape',
    title: 'Darjeeling & Sikkim Scenic Escape',
    locations: 'MIRIK • DARJEELING • GANGTOK',
    category: 'HIMALAYAN ESCAPE',
    duration: '4N / 5D',
    rating: 4.8,
    reviewsCount: 190,
    startingPriceNPR: 'NPR ',
    overview: 'A scenic tour through lush tea gardens, Mt. Kanchenjunga sunrise views, Himalayan toy trains, and high-altitude Sikkim lakes.',
    heroImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800'
    ],
    pdfFileName: 'darjeeling-gangtok-itinerary.pdf',
    highlights: [
      'Early morning Tiger Hill sunrise view over Kanchenjunga',
      'UNESCO Himalayan Toy Train Ride',
      'High-altitude Tsomgo Lake & Baba Mandir excursion'
    ],
    inclusions: [
      'Pickup and drop from Kakarbhitta border / Bagdogra airport',
      'All transfers and sightseeing by private vehicle',
      '4 Nights accommodation with Breakfast and Dinner',
      'Inner-line permits for Sikkim'
    ],
    exclusions: [
      'Toy train tickets & entry monument tickets',
      'Personal expenses & tips'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Border/Airport Pickup & Transfer to Darjeeling',
        description: 'Pickup from border or airport, drive through Mirik tea gardens to Darjeeling.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600',
        meals: 'Dinner',
        hotel: 'Darjeeling Hotel'
      },
      {
        day: 2,
        title: 'Tiger Hill Sunrise & Darjeeling Sightseeing',
        description: '4:00 AM trip to Tiger Hill for sunrise. Visit Ghoom Monastery, Batasia Loop, and Tea Estate.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Darjeeling Hotel'
      },
      {
        day: 3,
        title: 'Darjeeling to Gangtok Transfer',
        description: 'Drive along the Teesta River to Gangtok. Evening stroll at MG Marg.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Gangtok Hotel'
      },
      {
        day: 4,
        title: 'Excursion to Tsomgo Lake & Baba Mandir',
        description: 'Excursion to glacial Tsomgo Lake (12,400 ft) and Baba Harbhajan Singh Temple.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Gangtok Hotel'
      },
      {
        day: 5,
        title: 'Departure Drop',
        description: 'Check out and transfer back to border or airport.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast',
        hotel: 'Check-out'
      }
    ]
  },
  'char-dham-uttarakhand-yatra': {
    slug: 'char-dham-uttarakhand-yatra',
    title: 'Sacred Char Dham Yatra (Uttarakhand)',
    locations: 'HARIDWAR • KEDARNATH • BADRINATH',
    category: 'SPIRITUAL YATRA',
    duration: '11N / 12D',
    rating: 5.0,
    reviewsCount: 110,
    startingPriceNPR: 'NPR ',
    overview: 'The complete sacred Yatra covering Yamunotri, Gangotri, Kedarnath Dham, and Badrinath in Uttarakhand.',
    heroImages: [
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=1200'
    ],
    pdfFileName: 'char-dham-itinerary.pdf',
    highlights: [
      'Kedarnath Temple Darshan',
      'Badrinath Temple & Mana Village',
      'Haridwar Ganga Aarti'
    ],
    inclusions: [
      'Private transport for full tour',
      '11 Nights hotel accommodation',
      'Daily Vegetarian Breakfast & Dinner'
    ],
    exclusions: [
      'Helicopter tickets for Kedarnath',
      'Pony / Doli charges during trek'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Haridwar',
        description: 'Arrive in Haridwar, check in to hotel, and attend Ganga Aarti at Har Ki Pauri.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600',
        meals: 'Dinner',
        hotel: 'Haridwar Hotel'
      },
      {
        day: 2,
        title: 'Haridwar to Barkot (Yamunotri base)',
        description: 'Drive via Mussoorie to Barkot.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Barkot Hotel'
      },
      {
        day: 3,
        title: 'Barkot to Yamunotri Darshan & Back',
        description: 'Trek to Yamunotri Dham, take holy bath in Surya Kund, and return to Barkot.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Barkot Hotel'
      },
      {
        day: 4,
        title: 'Barkot to Uttarkashi',
        description: 'Drive to Uttarkashi and visit Kashi Vishwanath Temple.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Uttarkashi Hotel'
      },
      {
        day: 5,
        title: 'Uttarkashi to Gangotri Darshan & Back',
        description: 'Drive to Gangotri Dham along Bhagirathi River for Darshan.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Uttarkashi Hotel'
      },
      {
        day: 6,
        title: 'Uttarkashi to Guptkashi',
        description: 'Drive to Guptkashi along Mandakini River.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Guptkashi Hotel'
      },
      {
        day: 7,
        title: 'Guptkashi to Kedarnath Dham',
        description: 'Proceed to Sonprayag/Gaurikund and trek or fly by helicopter to Kedarnath.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Kedarnath Camp/Lodge'
      },
      {
        day: 8,
        title: 'Kedarnath Darshan & Return to Guptkashi',
        description: 'Early morning temple Darshan and trek back down to Guptkashi.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Guptkashi Hotel'
      },
      {
        day: 9,
        title: 'Guptkashi to Badrinath Dham',
        description: 'Drive to Badrinath via Joshimath. Attend evening Aarti.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Badrinath Hotel'
      },
      {
        day: 10,
        title: 'Badrinath Darshan & Mana Village to Rudraprayag',
        description: 'Holy dip in Tapt Kund, Badrinath Darshan, visit Mana Village, and drive to Rudraprayag.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Rudraprayag Hotel'
      },
      {
        day: 11,
        title: 'Rudraprayag to Rishikesh & Haridwar',
        description: 'Drive via Devprayag to Rishikesh. Visit Ram Jhula and Lakshman Jhula.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Haridwar Hotel'
      },
      {
        day: 12,
        title: 'Departure',
        description: 'Breakfast and departure.',
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast',
        hotel: 'Check-out'
      }
    ]
  },
  'goa-beach-bliss': {
    slug: 'goa-beach-bliss',
    title: 'Goa Coastal Breeze & Heritage',
    locations: 'NORTH GOA • SOUTH GOA • OLD GOA',
    category: 'BEACH & HERITAGE',
    duration: '4N / 5D',
    rating: 4.7,
    reviewsCount: 145,
    startingPriceNPR: 'NPR ',
    overview: 'Relaxing coastal holiday featuring North Goa beaches, Portuguese heritage churches, and river cruises.',
    heroImages: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=1200'
    ],
    pdfFileName: 'goa-itinerary.pdf',
    highlights: ['Calangute & Baga Beaches', 'Mandovi River Sunset Cruise', 'Old Goa Churches'],
    inclusions: ['Hotel stay', 'Daily Breakfast', 'Airport transfers & sightseeing'],
    exclusions: ['Airfare', 'Water sports charges'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Goa',
        description: 'Arrive in Goa, transfer to beach resort, and evening free at leisure.',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600',
        meals: 'Dinner',
        hotel: 'Goa Resort'
      },
      {
        day: 2,
        title: 'North Goa Beach Tour',
        description: 'Visit Fort Aguada, Calangute Beach, Baga Beach, and Anjuna Beach.',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Goa Resort'
      },
      {
        day: 3,
        title: 'South Goa & Heritage Sightseeing',
        description: 'Visit Basilica of Bom Jesus, Se Cathedral, Mangueshi Temple, and Mandovi River Cruise.',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Goa Resort'
      },
      {
        day: 4,
        title: 'Leisure & Water Sports Day',
        description: 'Free day for shopping, water sports, or spa treatments.',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Goa Resort'
      },
      {
        day: 5,
        title: 'Departure',
        description: 'Breakfast and airport transfer.',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast',
        hotel: 'Check-out'
      }
    ]
  },
  'kerala-backwaters-munnar': {
    slug: 'kerala-backwaters-munnar',
    title: 'Enchanting Kerala: Backwaters & Munnar Hills',
    locations: 'COCHIN • MUNNAR • ALLEPPEY',
    category: 'NATURE & SPA',
    duration: '5N / 6D',
    rating: 4.9,
    reviewsCount: 125,
    startingPriceNPR: 'NPR ',
    overview: 'Explore misty hill stations in Munnar and enjoy an authentic overnight backwater houseboat cruise in Alleppey.',
    heroImages: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1200'
    ],
    pdfFileName: 'kerala-itinerary.pdf',
    highlights: ['Overnight Alleppey Houseboat Cruise', 'Munnar Tea Plantations', 'Kathakali Show'],
    inclusions: ['Hotels & Private Houseboat', 'Daily Breakfast & Dinner (All meals on houseboat)', 'AC vehicle transfer'],
    exclusions: ['Airfare', 'Ayurvedic treatments'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Cochin & Drive to Munnar',
        description: 'Arrive in Cochin and scenic drive past Cheeyappara Waterfalls to Munnar.',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600',
        meals: 'Dinner',
        hotel: 'Munnar Resort'
      },
      {
        day: 2,
        title: 'Munnar Hill Station Sightseeing',
        description: 'Visit Mattupetty Dam, Tea Museum, and Echo Point.',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Munnar Resort'
      },
      {
        day: 3,
        title: 'Munnar to Thekkady Spice Plantations',
        description: 'Drive to Thekkady, spice plantation tour, and Periyar Lake boat ride.',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Thekkady Hotel'
      },
      {
        day: 4,
        title: 'Thekkady to Alleppey Luxury Houseboat',
        description: 'Board your private houseboat in Alleppey and cruise through serene backwater villages.',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast, Lunch & Dinner',
        hotel: 'Private Houseboat'
      },
      {
        day: 5,
        title: 'Alleppey to Cochin Heritage Sightseeing',
        description: 'Disembark houseboat, drive to Cochin, and visit Chinese Fishing Nets & Fort Kochi.',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600',
        meals: 'Breakfast & Dinner',
        hotel: 'Cochin Hotel'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'Breakfast and transfer to Cochin Airport.',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=600',
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
  const tour = INDIA_PACKAGE_DETAILS[resolvedParams.slug];

  if (!tour) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#172A3A] font-serif selection:bg-[#A44A3F] selection:text-white">
      
      {/* TOP NAVIGATION & BREADCRUMB */}
      <div className="bg-[#EFECE6]/70 border-b border-stone-200/80 py-4 font-sans text-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl flex items-center justify-between">
          <Link 
            href="/India" 
            className="inline-flex items-center gap-1.5 font-extrabold uppercase tracking-widest text-[#A44A3F] hover:translate-x-[-2px] transition-transform"
          >
            <ArrowLeft size={14} /> Back to India Escapes
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

            {/* RIGHT COLUMN - BOOKING / PRICING SIDEBAR */}
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
                    <span>Nepal Passport Visa:</span>
                    <span className="font-extrabold text-emerald-600">Not Required</span>
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