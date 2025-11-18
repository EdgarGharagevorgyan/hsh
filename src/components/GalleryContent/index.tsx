"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./GalleryContent.module.scss";

export type ImageItem = { url: string; filename: string };

interface Props {
   items: ImageItem[];
}

export default function GalleryContent({ items }: Props) {
   const pathname = usePathname();

   const getPageTitle = () => {
      if (!pathname) return "Գլխավոր";
      if (pathname.startsWith("/gallery/")) {
         const slug = pathname.split("/gallery/")[1];
         return decodeURIComponent(slug);
      }
      return "Գլխավոր";
   };

   const title = getPageTitle();

   return (
      <main className={styles.container}>
         <h2 className={styles.title}>{title}</h2>
         <div className={styles.grid}>
            {items.map((img) => (
               <div key={img.filename} className={styles.item}>
                  <Image
                     src={img.url}
                     alt={img.filename}
                     fill
                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     className={styles.image}
                     priority={false}
                  />
               </div>
            ))}
         </div>
      </main>
   );
}