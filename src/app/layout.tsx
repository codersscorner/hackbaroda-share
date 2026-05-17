import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "You've been Selected For HackBaroda.",
  description:
    "Create your personalized HackBaroda 2026 selection poster. Download, share your achievement on LinkedIn, Twitter, or Instagram. Official poster generator for Gujarat's largest hackathon.",
  keywords: [
    "HackBaroda",
    "HackBaroda 2026",
    "poster generator",
    "hackathon",
    "selection poster",
    "Coder's Corner",
    "Vadodara hackathon",
    "share achievement",
    "LinkedIn poster",
    "Twitter share",
  ],
  authors: [{ name: "Coder's Corner", url: "https://hackbaroda-share.vercel.app" }],
  creator: "Coder's Corner",
  publisher: "Coder's Corner",
  metadataBase: new URL("https://hackbaroda-share.vercel.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/hb.png",
    shortcut: "/hb.png",
    apple: "/hb.png",
  },
  openGraph: {
    title: "HackBaroda 2026 | Poster Generator",
    description:
      "Celebrate your HackBaroda 2026 selection! Generate and share your personalized poster across social media.",
    images: [
      {
        url: "/hb.png",
        width: 1200,
        height: 630,
        alt: "HackBaroda 2026 — Poster Generator",
      },
    ],
    type: "website",
    siteName: "HackBaroda Poster Generator",
    url: "https://hackbaroda-share.vercel.app",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "HackBaroda 2026 | Share Your Selection",
    description:
      "Create and share your HackBaroda 2026 selection poster. Celebrate your achievement on social media.",
    images: ["/hb.png"],
    creator: "@coderscorner_",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HackBaroda 2026",
  alternateName: "HackBaroda",
  url: "https://hackbaroda-share.vercel.app",
  logo: "https://hackbaroda-share.vercel.app/hb.png",
  description:
    "Official poster generator for HackBaroda 2026, Gujarat's largest hackathon. Create and share your selection poster.",
  foundingDate: "2024",
  sameAs: [
    "https://www.instagram.com/coderscorner_/",
    "https://www.linkedin.com/company/coderscorner/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: ["English", "Hindi"],
  },
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "HackBaroda Poster Generator",
  url: "https://hackbaroda-share.vercel.app",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://hackbaroda-share.vercel.app/?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-[#111114]`}
      >
        
          {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}