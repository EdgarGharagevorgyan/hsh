"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ContentGallery.module.scss";
import ImageModal from "./ImageModal";

const images = [
   "/gallery-images/gallery-image-1.jpg",
   "/gallery-images/gallery-image-2.jpg",
   "/gallery-images/gallery-image-3.jpg",
   "/gallery-images/gallery-image-4.jpg",
   "/gallery-images/gallery-image-5.jpg",
   "/gallery-images/gallery-image-6.jpg",
];

export default function ContentGallery() {
   const [currentIndex, setCurrentIndex] = useState<number | null>(null);
   const galleryRef = useRef<HTMLDivElement>(null);
   const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

   useEffect(() => {
      const node = galleryRef.current;
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               images.forEach((_, i) => {
                  setTimeout(() => {
                     setVisibleIndexes((prev) => [...prev, i]);
                  }, i * 100);
               });
            }
         },
         { threshold: 0.2 }
      );

      if (node) {
         observer.observe(node);
      }

      return () => {
         if (node) {
            observer.unobserve(node);
         }
      };
   }, []);

   return (
      <>
         <div ref={galleryRef} className={styles.gallery}>
            {images.map((src, index) => (
               <div
                  key={index}
                  className={`${styles.thumbnailWrapper} ${
                     visibleIndexes.includes(index) ? styles.visible : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
               >
                  <div className={styles.imageContainer}>
                     <Image
                        src={src}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className={styles.thumbnail}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority
                     />
                  </div>
               </div>
            ))}
         </div>

         {currentIndex !== null && (
            <ImageModal
               images={images}
               currentIndex={currentIndex}
               onClose={() => setCurrentIndex(null)}
               setCurrentIndex={setCurrentIndex}
            />
         )}
      </>
   );
}
