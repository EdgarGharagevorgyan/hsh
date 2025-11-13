import GalleryHeader from "@/components/GalleryHeader";
import GalleryContent from "@/components/GalleryContent";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import Frame from "@/components/Frame";

interface Props {
   params: { category: string };
}

export default async function CategoryPage({ params }: Props) {
   const category = params?.category;

   const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
   const res = await fetch(`${BACKEND_URL}/admin/get-images-by`, { cache: "no-store" });

   if (!res.ok) {
      const errorText = await res.text();
      console.error("API response error:", errorText);
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
   }

   const data = await res.json();
   const items = data.imagesBy[category] || [];

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
