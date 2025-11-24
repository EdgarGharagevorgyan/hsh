// src/app/layout.tsx

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
    "Ձեռագործ փայտե կահույք Երևանում և Հայաստանում. Մահճակալներ, պահարաններ, խոհանոցներ, հյուրասենյակ և գրասենյակային կահույք․ 20+ տարվա փորձ։ Handmade wooden furniture in Armenia.",
  keywords: [
    // Armenian
    "փայտե կահույք", "հատուկ պատվերով կահույք", "մահճակալ", "պահարան", "խոհանոցային կահույք",
    "կահույք Երևան", "ձեռագործ կահույք",

    // Armenian transliteration
    "payte kahuyq", "dzerragorc kahuyq", "mahcakal", "paharan", "khoxanoc kahuyq",
    "kahuyq yerevan", "patverov kahuyq",

    // Russian
    "деревянная мебель", "мебель на заказ", "кровать деревянная", "шкаф деревянный",
    "кухонная мебель", "мебель Ереван", "мебель Армения",

    // English searches
    "handmade wooden furniture Armenia",
    "custom wood furniture Yerevan",
    "wooden bed Armenia", "wood cabinet Armenia",

    // Misspellings 
    "payte kaxuyq", "pait kahuyq", "derevyana mebel", "derevyanaya mebel",
    "mebel erivan", "mebel armenia"
  ],
  authors: [{ name: "HSH Furniture" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "HSH Furniture | Ձեռագործ Փայտե Կահույք",
    description:
      "Ձեռագործ փայտե կահույք Երևանում․ Մահճակալներ, պահարաններ, խոհանոցային կահույք՝ բարձր որակով։",
    url: "https://hshfurnitures.com",
    siteName: "HSH Furniture",
    images: [
      {
        url: "/gallery-images/gallery-image-1.jpg",
        width: 1200,
        height: 630,
        alt: "Wooden furniture handmade in Armenia | Ձեռագործ փայտե կահույք",
      },
    ],
    locale: "hy_AM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HSH Furniture | Ձեռագործ Փայտե Կահույք",
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
  alternateName: [
    "Handmade Wooden Furniture Armenia",
    "Деревянная мебель Армения",
    "Dzerragorc payte kahuyq",
    "Derevyannaya mebel",
    "Payte kahuyq",
    "Mebel Yerevan"
  ],
  url: "https://hshfurnitures.com",
  logo: "https://hshfurnitures.com/hsh-logo.svg",
  description:
    "Ձեռագործ փայտե կահույք Հայաստանում։ Մահճակալներ, պահարաններ, սեղաններ, գրասենյակային և հյուրանոցային կահույք՝ պատվերով և բարձր որակով։",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Masis",
    addressRegion: "Ararat",
    addressCountry: "AM",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+374-77-803-778",
    contactType: "Customer Service",
    areaServed: ["Armenia", "AM", "Հայաստան", "Армения"],
    availableLanguage: ["Armenian", "Russian", "English"],
  },
  sameAs: [
    "https://www.facebook.com/hsh.furnitures/",
    "https://www.instagram.com/hsh_furnitures/"
  ]
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