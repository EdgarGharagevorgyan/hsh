/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";

export default function Header() {
   const [isSticky, setIsSticky] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         const scrollY = window.scrollY;
         setIsSticky(scrollY > 700); 
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   return (
      <>
         <header className={styles.headerContainer}>
            <div className={styles.header}>
               <div className={styles.logo}>
                  <img src="/hsh-logo.svg" alt="Logo" />
               </div>
               <nav className={styles.nav}>
                  <Link href="/">ԳԼԽԱՎՈՐ</Link>
                  <Link href="/about">ՄԵՐ ՄԱՍԻՆ</Link>
                  <Link href="/services">ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ</Link>
                  <Link href="/clients">ՀԱՃԱԽՈՐԴՆԵՐ</Link>
                  <Link href="/contact">ԿԱՊ ՄԵԶ ՀԵՏ</Link>
                  <Link href="/gallery">ԳԱԼԵՐԻԱ</Link>
               </nav>
               <div className={styles.smLinks}>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                     <img
                        src="/icons/facebook-f-111.svg"
                        alt="Facebook"
                        className={styles.smIcon}
                     />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                     <img
                        src="/icons/instagram-111.svg"
                        alt="Instagram"
                        className={styles.smIcon}
                     />
                  </a>
               </div>
            </div>
            <div className={styles.headerBody}>
               <span className={styles.line}></span>
               <h1>Ոճ և հարմարավետություն՝ ձեր տան համար</h1>
               <h2>
                  HSH Furnitures-ը բացահայտում է ժամանակակից դիզայնի նոր հայեցակարգերը, որոնք
                  միավորում են ոճը, որակը և ֆունկցիոնալությունը։ Մենք հավատում ենք, որ յուրաքանչյուր
                  կահույք պետք է լինի ոչ միայն գեղեցիկ, այլև հարմարավետ ու երկարատև։
               </h2>
               <span className={styles.line}></span>
            </div>
         </header>

         {isSticky && (
            <div className={styles.stickyHeader}>
               <div className={styles.logo}>
                  <img src="/hsh-logo.svg" alt="Logo" />
               </div>
               <nav className={styles.nav}>
                  <Link href="/">ԳԼԽԱՎՈՐ</Link>
                  <Link href="/about">ՄԵՐ ՄԱՍԻՆ</Link>
                  <Link href="/services">ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ</Link>
                  <Link href="/clients">ՀԱՃԱԽՈՐԴՆԵՐ</Link>
                  <Link href="/contact">ԿԱՊ ՄԵԶ ՀԵՏ</Link>
                  <Link href="/gallery">ԳԱԼԵՐԻԱ</Link>
               </nav>
               <div className={styles.smLinks}>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                     <img
                        src="/icons/facebook-f-111.svg"
                        alt="Facebook"
                        className={styles.smIcon}
                     />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                     <img
                        src="/icons/instagram-111.svg"
                        alt="Instagram"
                        className={styles.smIcon}
                     />
                  </a>
               </div>
            </div>
         )}
      </>
   );
}
