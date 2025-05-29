import GalleryHeader from "@/components/GalleryHeader";
import GalleryContent from "@/components/GalleryContent";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import Frame from "@/components/Frame";

interface Props {
   params: { category: string };
}

export default async function CategoryPage({ params }: Props) {
   const { category } = params;

   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
   const res = await fetch(`${baseUrl}/api/gallery/${category}`, {
      cache: "no-store",
   });

   if (!res.ok) {
      const errorText = await res.text(); 
      console.error("API response error:", errorText);
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
   }

   const items = await res.json();

   return (
      <>
         <Frame />
         <GalleryHeader />
         <GalleryContent items={items} />
         <Footer />
         <BackToTopButton />
      </>
   );
}
