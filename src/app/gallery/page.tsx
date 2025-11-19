"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./gallery.module.scss";
import Frame from "@/components/Frame";
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import GalleryHeader from "@/components/GalleryHeader";
import { categorySchema } from "@/shared/schemas/category.schema";

export default function Gallery() {
   const [isLoading, setIsLoading] = useState(true);
   const [hasRedirected, setHasRedirected] = useState(false);
   const router = useRouter();

   useEffect(() => {
      const loadAndRedirect = async () => {
         try {
            // const res = await fetch("/api/admin/categories", { cache: "no-store" });
            // const data = await res.json();
            const categoryKeys: string[] = Object.values(categorySchema).map(item => item.name);

            if (categoryKeys.length > 0) {
               const sortedKeys = categoryKeys.sort((a, b) => categorySchema[a].name.localeCompare(categorySchema[b].name, "hy"));
               const firstCategoryKey = sortedKeys[0];
               setHasRedirected(true);
               router.replace(`/gallery/${encodeURIComponent(categorySchema[firstCategoryKey].slug)}`);
               return;
            }
         } catch (err) {
            console.error("Failed to load categories:", err);
         }
         setIsLoading(false);
      };

      loadAndRedirect();
   }, [router]);

   if (hasRedirected || isLoading) {
      return <Loading visible={true} />;
   }

   return (
      <>
         <Loading visible={false} />
         <div className={styles.galleryContainer}>
            <Frame />
            <GalleryHeader />
            <div className={styles.emptyMessage}>
               <p>Գալերիան դեռևս դատարկ է։</p>
            </div>
            <Footer />
            <BackToTopButton />
         </div>
      </>
   );
}