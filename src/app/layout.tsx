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
    "Coder's Corner connects top college developers with real-world projects. Build, earn, and grow with India's leading student freelancing community. Join hackathons, workshops, and real client work.",
  keywords: [
    "Coders Corner",
    "student developers India",
    "college freelancing",
    "developer community",
    "hackathons India",
    "student talent platform",
    "freelance developers",
    "React developers India",
    "coding community",
    "tech events India",
  ],
  authors: [{ name: "Coder's Corner", url: "https://coderscorner.in" }],
  creator: "Coder's Corner",
  publisher: "Coder's Corner",
  metadataBase: new URL("https://coderscorner.in"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Coder's Corner | India's Developer Community",
    description:
      "Where college developers build real projects. Join hackathons, workshops, and freelance with top companies.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Coder's Corner — India's Developer Community",
      },
    ],
    type: "website",
    siteName: "Coder's Corner",
    url: "https://coderscorner.in",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coder's Corner | Build Real Projects",
    description:
      "India's freelancing community powered by top college developers. Real work. Real skills. Real growth.",
    images: ["/logo.png"],
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
  name: "Coder's Corner",
  alternateName: "CodersCorner",
  url: "https://coderscorner.in",
  logo: "https://coderscorner.in/logo.png",
  description:
    "India's freelancing community connecting top college developers with companies that need quality work done.",
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
  name: "Coder's Corner",
  url: "https://coderscorner.in",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://coderscorner.in/search?q={search_term_string}",
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