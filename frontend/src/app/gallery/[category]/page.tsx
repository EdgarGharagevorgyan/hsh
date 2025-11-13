import GalleryHeader from "@/components/GalleryHeader";
import GalleryContent from "@/components/GalleryContent";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import Frame from "@/components/Frame";
import styles from "./category.module.scss";

type ImageItem = { url: string; filename: string };

interface Props {
   params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
   const { category } = await params;
   const decoded = decodeURIComponent(category);

   const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

   let items: ImageItem[] = [];

   try {
      const res = await fetch(`${BACKEND_URL}/admin/get-images-by`, {
         cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      items = (data.imagesBy?.[decoded] as ImageItem[] | undefined) ?? [];
   } catch (err) {
      console.error("Fetch error:", err);
   }

   return (
      <>
         <Frame />
         <GalleryHeader />

         {items.length === 0 ? (
            <main className={styles.emptyState}>
               <p className={styles.emptyMessage}>
                  <strong>{decoded}ներում պատկերներ չկան</strong>
               </p>
            </main>
         ) : (
            <GalleryContent items={items} />
         )}

         <Footer />
         <BackToTopButton />
      </>
   );
}