// src/app/page.tsx

import HomeClient from "@/src/components/HomeClient";

export const metadata = {
   title: "Գլխավոր | HSH Furniture – Ձեռագործ Փայտե Կահույք Հայաստանում",
   description:
      "20+ տարվա փորձով ձեռագործ փայտե կահույք՝ մահճակալներ, պահարաններ, խոհանոցներ, գրասենյակային կահույք։ Անվճար չափագրում և առաքում Երևանում։",

   keywords: [
      "ձեռագործ փայտե կահույք",
      "փայտե կահույք Հայաստան",
      "պատվերով կահույք Երևան",
      "մահճակալներ, պահարաններ, խոհանոց",
      "wood furniture Armenia",
      "derevyannaya mebel Armenia",
      "dzerragorc payte kahuyq"
   ],

   openGraph: {
      title: "HSH Furniture – Ձեռագործ Փայտե Կահույք",
      description: "Բարձրորակ ձեռագործ փայտե կահույք՝ պատրաստված սիրով և փորձով",
      images: "/gallery-images/gallery-image-1.jpg",
      url: "https://hshfurnitures.com",
      type: "website",
      locale: "hy_AM",
      siteName: "HSH Furniture",
   },

   alternates: { canonical: "/" },

   robots: {
      index: true,
      follow: true,
   }
};

export default function HomePage() {
   return <HomeClient />;
}
