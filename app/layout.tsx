import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kudantravel.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kudan Travel & Tours | Luxury Nepal & Worldwide Travel",
    template: "%s | Kudan Travel & Tours",
  },
  description:
    "Official travel and tour operator in Nepal. Offering inbound Himalayan tours, custom high-altitude trekking, luxury 4WD vehicle rentals, domestic flight bookings, and outbound holidays.",
  keywords: [
    "Kudan Travel",
    "Nepal Tourism Board",
    "Nepal Tours",
    "Himalayan Trekking",
    "Annapurna Circuit Trek",
    "Everest Base Camp Trek",
    "Nepal Vehicle Rental",
    "Scorpio Rental Nepal",
    "HiAce Rental Kathmandu",
    "NATTA",
    "TAAN",
  ],
  authors: [{ name: "Kudan Travel & Tours Pvt. Ltd." }],
  creator: "Kudan Travel & Tours",
  publisher: "Kudan Travel & Tours",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Kudan Travel & Tours | Authentic Nepal & Global Journeys",
    description:
      "Premier tour and trekking agency based in Kathmandu, Nepal. Government registered, NTB, NATTA, and TAAN accredited.",
    siteName: "Kudan Travel & Tours",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kudan Travel & Tours Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kudan Travel & Tours | Luxury Nepal Travel Agency",
    description: "Inbound Himalayan tours, private vehicle fleet, flight bookings, and outbound holiday packages.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#060910",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Structured Data for Google Search Rich Results (SEO)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Kudan Travel & Tours Pvt. Ltd.",
  image: `${SITE_URL}/logo.png`,
  "@id": SITE_URL,
  url: SITE_URL,
  telephone: "+977-1-4005191",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kathmandu",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 27.7172,
    longitude: 85.324,
  },
  sameAs: [
    "https://facebook.com/kudantravel",
    "https://instagram.com/kudantravel",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${serifFont.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#060910] text-slate-100 font-sans antialiased selection:bg-[#C5A059] selection:text-black min-h-screen flex flex-col justify-between">
        {/* Subtle Ambient Background Backdrop */}
        <div 
          className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.08),rgba(255,255,255,0))] pointer-events-none z-[-1]" 
          aria-hidden="true"
        />

        {/* Top Header Bar */}
        <Header />

        {/* Main Page Area */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* Footer Bar */}
        <Footer />
      </body>
    </html>
  );
}