import type { Metadata } from "next";
import "./globals.scss";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://hshfurnitures.com"), 
  title: {
    default: "HSH Furniture | Ձեռագործ Փայտե Կահույք Հայաստանում",
    template: "%s | HSH Furniture",
  },
  description:
    "20+ տարվա փորձով ձեռագործ փայտե կահույք՝ մահճակալներ, պահարաններ, խոհանոցներ, գրասենյակային և հյուրանոցային կահույք։ Երևան, Հայաստան։",
  keywords:
    "փայտե կահույք, ձեռագործ կահույք, մահճակալ, պահարան, խոհանոցային կահույք, Երևան, Հայաստան, պատվերով կահույք",
  authors: [{ name: "HSH Furniture" }],
  alternates: {
    canonical: "/",
    // languages: { "hy-AM": "/", "ru-RU": "/ru" }, // add when you have Russian
  },
  openGraph: {
    title: "HSH Furniture | Ձեռագործ Փայտե Կահույք",
    description: "Բարձրորակ ձեռագործ կահույք՝ պատրաստված սիրով և փորձով",
    url: "https://hsh.am",
    siteName: "HSH Furniture",
    images: [
      {
        url: "/gallery-images/gallery-image-1.jpg",
        width: 1200,
        height: 630,
        alt: "HSH Furniture – Ձեռագործ փայտե կահույք",
      },
    ],
    locale: "hy_AM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HSH Furniture | Ձեռագործ Փայտե Կահույք",
    description: "20+ տարվա փորձ, բարձր որակ, անհատական պատվերներ",
    images: ["/gallery-images/gallery-image-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HSH Furniture",
  url: "https://hsh.am",
  logo: "https://hsh.am/hsh-logo.svg",
  description: "Ձեռագործ փայտե կահույքի արտադրություն և վաճառք Հայաստանում",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Երևան",
    addressCountry: "AM",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+374-XX-XXX-XXX", // replace
    contactType: "Customer Service",
    areaServed: "AM",
    availableLanguage: ["Armenian", "Russian"],
  },
  sameAs: [
    "https://facebook.com/yourpage",
    "https://instagram.com/yourpage",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hy" >
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}