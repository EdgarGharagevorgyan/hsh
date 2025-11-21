// src/components/GalleryContent/index.tsx
"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./GalleryContent.module.scss";
import { categorySchema } from "@/shared/schemas/category.schema";

export type ImageItem = { url: string; filename: string };

interface Props {
   items: ImageItem[];
}

export default function GalleryContent({ items }: Props) {
   const pathname = usePathname();

   const getPageTitle = () => {
      if (!pathname?.startsWith("/gallery/")) return "Գալերիա";

      const slug = decodeURIComponent(pathname.split("/gallery/")[1]);
      const category = Object.values(categorySchema)
         .find(c => c.slug === slug);

      return category?.name || slug;

   };

   const title = getPageTitle();

   return (
      <main className={styles.container}>
         {/* H1 = #1 SEO signal */}
         <h1 className={styles.title}>{title} HSH Furniture</h1>

         <div className={styles.grid}>
            {items.map((img) => {
               const cleanName = img.filename
                  .split('.')[0]
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, l => l.toUpperCase());

               return (
                  <div key={img.filename} className={styles.item}>
                     <Image
                        src={img.url}
                        alt={`HSH Furniture – Ձեռագործ ${title.toLowerCase()} ${cleanName}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.image}
                        loading="lazy"
                     />
                  </div>
               );
            })}
         </div>
      </main>
   );
}