/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import styles from "./GalleryHeader.module.scss";

export default function GalleryHeader() {
   const navItems = [
      { label: "Գլխավոր", href: "/" },
      { label: "Լոգարան", href: "/bathroom" },
      { label: "Մահճակալ", href: "/bed" },
      { label: "Աթոռ", href: "/chair" },
      { label: "Օրորոց", href: "/crib" },
      { label: "Հյուրասենյակ", href: "/living-room" },
      { label: "Խոհանոց", href: "/kitchen" },
      { label: "Գրասենյակ", href: "/office" },
      { label: "Սեղան", href: "/table" },
      { label: "Հեռուստացույցի տակդիր", href: "/TV-stand" },
      { label: "Պահարան", href: "/wardrobe" },
      { label: "Փայտյա աքսեսուարներ", href: "/wooden-accessories" },
   ];

   return (
      <div className={styles.galleryHeader}>
         <div className={styles.headerTop}>
            <div className={styles.logo}>
               <img src="/hsh-logo.svg" alt="Logo" />
            </div>

            <div className={styles.smLinks}>
               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="/icons/facebook-f-111.svg" alt="Facebook" className={styles.smIcon} />
               </a>
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="/icons/instagram-111.svg" alt="Instagram" className={styles.smIcon} />
               </a>
            </div>
         </div>

         <nav className={styles.navBar}>
            {navItems.map((item, index) => (
               <Link key={index} href={item.href === "/" ? "/" : `/gallery${item.href}`}>
                  {item.label}
               </Link>
            ))}
         </nav>
      </div>
   );
}
