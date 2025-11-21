import HomeClient from "@/src/components/HomeClient"; 

export const metadata = {
   title: "Գլխավոր | HSH Furniture – Ձեռագործ Փայտե Կահույք Հայաստանում",
   description:
      "20+ տարվա փորձով ձեռագործ փայտե կահույք՝ մահճակալներ, պահարաններ, խոհանոցներ, գրասենյակային կահույք։ Անվճար չափագրում և առաքում Երևանում։",
   openGraph: {
      title: "HSH Furniture – Ձեռագործ Փայտե Կահույք",
      images: "/gallery-images/gallery-image-1.jpg",
   },
   alternates: { canonical: "/" }
};

export default function HomePage() {
   return <HomeClient />; 
}