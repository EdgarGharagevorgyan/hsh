/* eslint-disable @next/next/no-img-element */
import styles from "./GalleryContent.module.scss";

export default function GalleryContent({
   items,
}: {
   items: { id: number; title: string; image: string }[];
}) {
   return (
      <div className={styles.galleryGrid}>
         {items.map((item) => (
            <div key={item.id} className={styles.galleryItem}>
               <img src={item.image} alt={item.title} />
               <p>{item.title}</p>
            </div>
         ))}
      </div>
   );
}
