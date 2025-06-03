"use client";
import { useEffect, useState } from "react";
import styles from "./gallery.module.scss";
import Frame from "@/components/Frame";
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import GalleryHeader from "@/components/GalleryHeader";

export default function Gallery() {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const timeout = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timeout);
   }, []);



   return (
      <>
         <Loading visible={isLoading} />
         <div
            className={styles.galleryContainer}
            style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease" }}
         >
            <Frame />
            <GalleryHeader/>

            <Footer />
            <BackToTopButton />
         </div>
      </>
   );
}
