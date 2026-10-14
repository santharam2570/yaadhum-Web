import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Inter, Rajdhani } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InteractionLayer } from "@/components/InteractionLayer";
import { company, headOffice, offices, postalAddress } from "@/data/company";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: "YAADHUM — AI, Cloud, Software & Managed IT Services",
    template: "%s · YAADHUM International Technologies",
  },
  description: company.description,
  keywords: [
    "IT services company",
    "AI development",
    "machine learning",
    "custom software development",
    "cloud management",
    "managed IT services",
    "AMC services",
    "business process automation",
    "e-commerce development",
    "digital transformation",
    "YAADHUM",
  ],
  openGraph: {
    type: "website",
    siteName: company.name,
    title: "YAADHUM International Technologies",
    description: "AI, cloud, software, automation and managed IT services for businesses worldwide.",
    images: ["/logo-full.jpg"],
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

export const viewport: Viewport = {
  themeColor: "#070304",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  url: company.url,
  logo: `${company.url}/logo-mark.jpg`,
  email: company.email,
  description: company.description,
  telephone: company.phone,
  address: postalAddress(headOffice),
  location: offices.map((o) => ({ "@type": "Place", name: `${company.short} ${o.label}`, telephone: o.phone, address: postalAddress(o) })),
  sameAs: Object.values(company.social),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${bricolage.variable} ${rajdhani.variable} ${instrument.variable} h-full antialiased`}
    >
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      {/* Browser extensions commonly inject attributes onto <body> before hydration. */}
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-fire px-5 py-2.5 font-brand font-bold text-white transition focus:translate-y-0"
        >
          Skip to content
        </a>
        <InteractionLayer />
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
