"use client";

import Image from "next/image";
import styles from "./GalleryContent.module.scss";

type ImageItem = {
   category: string;
   filename: string;
   url: string;
};

interface GalleryContentProps {
   items: ImageItem[];
}

export default function GalleryContent({ items }: GalleryContentProps) {
   if (!items || !items.length) return <p>No images found.</p>;

   return (
      <div className={styles.galleryGrid}>
         {items.map(item => (
            <div key={item.filename} className={styles.galleryItem}>
               <Image
                  src={item.url}
                  alt={item.filename}
                  width={300}
                  height={300}
                  style={{ objectFit: "cover" }}
               />
            </div>
         ))}
      </div>
   );
}
