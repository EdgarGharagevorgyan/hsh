// src/components/GalleryHeader/GalleryHeaderClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./GalleryHeader.module.scss";
import { categorySchema } from "@/shared/schemas/category.schema";

interface Props {
   initialCategories: string[];
}

export default function GalleryHeaderClient({ initialCategories }: Props) {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const toggleMenu = () => setIsMenuOpen(prev => !prev);
   const closeMenu = () => setIsMenuOpen(false);

   return (
      <header className={styles.galleryHeader}>
         <div className={styles.headerTop}>
            <div className={styles.logo}>
               <Link href="/" onClick={closeMenu}>
                  <Image
                     src="/hsh-logo.svg"
                     alt="HSH Furniture – Ձեռագործ փայտե կահույք"
                     width={256}
                     height={46}
                     priority
                     className={styles.logoImage}
                  />
               </Link>
            </div>

            <div className={styles.rightGroup}>
               <div className={styles.smLinks}>
                  <a href="https://www.facebook.com/hsh.furnitures/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                     <Image src="/icons/facebook-f-111.svg" alt="" width={24} height={24} className={styles.smIcon} />
                  </a>
                  <a href="https://www.instagram.com/hsh_furnitures/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                     <Image src="/icons/instagram-111.svg" alt="" width={24} height={24} className={styles.smIcon} />
                  </a>
               </div>

               <button
                  className={styles.burgerButton}
                  onClick={toggleMenu}
                  aria-label="Բացել մենյուն"
                  aria-expanded={isMenuOpen}
               >
                  <span className={styles.burgerLine}></span>
                  <span className={styles.burgerLine}></span>
                  <span className={styles.burgerLine}></span>
               </button>
            </div>
         </div>

         <nav className={`${styles.navBar} ${isMenuOpen ? styles.navBarOpen : ""}`}>
            {initialCategories.map(slug => (
               <Link
                  key={slug}
                  href={`/gallery/${encodeURIComponent(slug)}`}
                  className={styles.navLink}
                  onClick={closeMenu}
               >
                  {categorySchema[slug]?.name ?? slug}
               </Link>
            ))}

            <div className={styles.mobileSmLinks}>
               <a href="https://www.facebook.com/hsh.furnitures/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Image src="/icons/facebook-f-111.svg" alt="" width={24} height={24} className={styles.smIcon} />
               </a>
               <a href="https://www.instagram.com/hsh_furnitures/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Image src="/icons/instagram-111.svg" alt="" width={24} height={24} className={styles.smIcon} />
               </a>
            </div>
         </nav>

         {isMenuOpen && <div className={styles.mobileOverlay} onClick={closeMenu} aria-hidden="true" />}
      </header>
   );
}