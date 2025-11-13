"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./gallery.module.scss";
import Frame from "@/components/Frame";
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import GalleryHeader from "@/components/GalleryHeader";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") || "http://localhost:5000";

export default function Gallery() {
   const [isLoading, setIsLoading] = useState(true);
   const [hasRedirected, setHasRedirected] = useState(false);
   const router = useRouter();

   useEffect(() => {
      const loadAndRedirect = async () => {
         try {
            const res = await fetch(`${BACKEND_URL}/admin/categories`);
            const data = await res.json();
            const categories: string[] = data.categories ?? [];

            if (categories.length > 0) {
               const sorted = categories.sort((a, b) => a.localeCompare(b, "hy"));
               const firstCategory = sorted[0];

               setHasRedirected(true);

               router.replace(`/gallery/${encodeURIComponent(firstCategory)}`);
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