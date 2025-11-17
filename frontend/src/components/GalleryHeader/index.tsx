"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./GalleryHeader.module.scss";

export default function GalleryHeader() {
   const [categories, setCategories] = useState<string[]>([]);
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const res = await fetch(`${BACKEND_URL}/admin/categories`);
            const data = await res.json();
            setCategories(data.categories || []);
         } catch (err) {
            console.error("Failed to load categories:", err);
         }
      };

      fetchCategories();
      const id = setInterval(fetchCategories, 30_000);
      return () => clearInterval(id);
   }, [BACKEND_URL]);

   const toggleMenu = () => setIsMenuOpen((prev) => !prev);
   const closeMenu = () => setIsMenuOpen(false);

   return (
      <header className={styles.galleryHeader}>
         <div className={styles.headerTop}>
            <div className={styles.logo}>
               <Link href="/" onClick={closeMenu}>
                  <Image
                     src="/hsh-logo.svg"
                     alt="HSH Logo"
                     width={256}
                     height={46}
                     priority
                     className={styles.logoImage}
                  />
               </Link>

            </div>

            <div className={styles.rightGroup}>
               <div className={styles.smLinks}>
                  <a
                     href="https://facebook.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label="Facebook"
                  >
                     <Image
                        src="/icons/facebook-f-111.svg"
                        alt=""
                        width={24}
                        height={24}
                        className={styles.smIcon}
                     />
                  </a>
                  <a
                     href="https://instagram.com"
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label="Instagram"
                  >
                     <Image
                        src="/icons/instagram-111.svg"
                        alt=""
                        width={24}
                        height={24}
                        className={styles.smIcon}
                     />
                  </a>
               </div>

               <button
                  className={styles.burgerButton}
                  onClick={toggleMenu}
                  aria-label="Toggle navigation menu"
                  aria-expanded={isMenuOpen}
               >
                  <span className={styles.burgerLine}></span>
                  <span className={styles.burgerLine}></span>
                  <span className={styles.burgerLine}></span>
               </button>
            </div>
         </div>

         <nav className={`${styles.navBar} ${isMenuOpen ? styles.navBarOpen : ""}`}>

            {categories.map((cat) => (
               <Link
                  key={cat}
                  href={`/gallery/${encodeURIComponent(cat)}`}
                  className={styles.navLink}
                  onClick={closeMenu}
               >
                  {cat}
               </Link>
            ))}

            <div className={styles.mobileSmLinks}>
               <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
               >
                  <Image
                     src="/icons/facebook-f-111.svg"
                     alt=""
                     width={24}
                     height={24}
                     className={styles.smIcon}
                  />
               </a>
               <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
               >
                  <Image
                     src="/icons/instagram-111.svg"
                     alt=""
                     width={24}
                     height={24}
                     className={styles.smIcon}
                  />
               </a>
            </div>
         </nav>

         {isMenuOpen && <div className={styles.mobileOverlay} onClick={closeMenu}></div>}
      </header>
   );
}