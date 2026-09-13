import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// TypeScript may not have declarations for CSS side-effect imports in some setups.
// Next.js still processes this stylesheet during the build.
// @ts-expect-error CSS side-effect import
import "@/app/globals.css";

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: true,
});

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: true,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kudantravel.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kudan Travel & Tours | Premier B2B DMC & Nepal Tour Operator",
    template: "%s | Kudan Travel & Tours",
  },
  description:
    "Leading Destination Management Company (DMC) and tour operator in Nepal. Specialized in B2B ground handling, Himalayan treks, luxury transport fleet rentals, domestic flight ticketing, and outbound holiday packages.",
  keywords: [
    "Kudan Travel & Tours",
    "Nepal DMC",
    "B2B Tour Operator Nepal",
    "Nepal Travel Agency",
    "Himalayan Trekking Operator",
    "Everest Base Camp Trek DMC",
    "Annapurna Trekking Packages",
    "Private Vehicle Rental Kathmandu",
    "Scorpio Rental Nepal",
    "HiAce Rental Kathmandu",
    "NATTA Member Agency",
    "TAAN Registered Operator",
    "Nepal Tourism Board Licensed",
  ],
  authors: [{ name: "Kudan Travel & Tours Pvt. Ltd." }],
  creator: "Kudan Travel & Tours",
  publisher: "Kudan Travel & Tours Pvt. Ltd.",
  category: "Travel & Tourism",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Kudan Travel & Tours | B2B DMC & Authentic Nepal Journeys",
    description:
      "Government-registered, NTB, NATTA, and TAAN accredited Destination Management Company headquartered in Lazimpat, Kathmandu. Delivering premier inbound and outbound travel solutions.",
    siteName: "Kudan Travel & Tours",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kudan Travel & Tours - Premier B2B & Inbound Tour Operator in Nepal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kudan Travel & Tours | B2B Nepal Tour Operator & DMC",
    description: "Inbound Himalayan expeditions, B2B ground support, luxury fleet rentals, and outbound holiday packages.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#070A11",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Rich Structured Data (JSON-LD) for Search Engine Verification & Google Maps Integration
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["TravelAgency", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: "Kudan Travel & Tours Pvt. Ltd.",
      legalName: "Kudan Travel and Tours Pvt. Ltd.",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.jpeg`,
      image: `${SITE_URL}/og-image.jpg`,
      telephone: "+977-1-4005191",
      email: "info@kudantravel.com",
      priceRange: "$$",
      currenciesAccepted: "NPR, USD",
      paymentAccepted: "Cash, Credit Card, Bank Transfer, eSewa, Khalti, Fonepay",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Metro Park Building, Lazimpat",
        addressLocality: "Kathmandu",
        postalCode: "44600",
        addressCountry: "NP",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 27.7172,
        longitude: 85.324,
      },
      areaServed: [
        { "@type": "Country", name: "Nepal" },
        { "@type": "Country", name: "Bhutan" },
        { "@type": "Country", name: "Thailand" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      sameAs: [
        "https://facebook.com/kudantravel",
        "https://instagram.com/kudantravel",
        "https://natta.org.np",
        "https://www.taan.org.np",
        "https://ntb.gov.np",
      ],
    },
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
      <body className="bg-[#070A11] text-slate-100 font-sans antialiased selection:bg-[#D4AF37] selection:text-slate-950 min-h-screen flex flex-col justify-between">
        {/* Ambient Subtle Background Highlight */}
        <div
          className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.06),rgba(255,255,255,0))] pointer-events-none z-[-1]"
          aria-hidden="true"
        />

        {/* Header Navigation */}
        <Header />

        {/* Main Content Workspace */}
        <main className="flex-1 relative z-10">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}