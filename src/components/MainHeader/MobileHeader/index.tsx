/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import styles from "./MobileHeader.module.scss";

export default function Header() {
   const [isActive, setIsActive] = useState(false);
   const [isSticky, setIsSticky] = useState(false);

   const toggleMenu = () => {
      setIsActive((prev) => !prev);
   };

   const closeMenu = () => {
      setIsActive(false);
   };

   useEffect(() => {
      const handleScroll = () => {
         setIsSticky(window.scrollY > 700);
         if (window.scrollY > 700) {
            setIsActive(false); 
         }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const navLinks = [
      { label: "ԳԼԽԱՎՈՐ", href: "#home" },
      { label: "ՄԵՐ ՄԱՍԻՆ", href: "#about" },
      { label: "ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ", href: "#services" },
      { label: "ՀԱՃԱԽՈՐԴՆԵՐ", href: "#clients" },
      { label: "ԿԱՊ ՄԵԶ ՀԵՏ", href: "#contact" },
      { label: "ԳԱԼԵՐԻԱ", href: "/gallery" },
   ];

   const renderMenu = () => (
      <nav className={styles.mobileMenu}>
         <div className={styles.smLinks}>
            <a href="https://www.facebook.com/hsh.furnitures/" target="_blank" rel="noopener noreferrer">
               <img src="/icons/facebook-f-111.svg" alt="Facebook" className={styles.smIcon} />
            </a>
            <a href="https://www.instagram.com/hsh_furnitures/" target="_blank" rel="noopener noreferrer">
               <img src="/icons/instagram-111.svg" alt="Instagram" className={styles.smIcon} />
            </a>
         </div>
         {navLinks.map(({ label, href }, index) => (
            <div key={label} className={styles.menuItemWrapper}>
               <a href={href} className={styles.menuItem} onClick={closeMenu}>
                  {label}
               </a>
               {index !== navLinks.length - 1 && <div className={styles.divider}></div>}
            </div>
         ))}
      </nav>
   );

   return (
      <>
         <header id="home" className={styles.headerContainer}>
            <div className={styles.header}>
               <div className={styles.logo}>
                  <img src="/hsh-logo.svg" alt="Logo" />
               </div>

               <button
                  className={`${styles.burger} ${isActive ? styles.active : ""}`}
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                  aria-expanded={isActive}
               >
                  <span className={styles.bar}></span>
                  <span className={styles.bar}></span>
                  <span className={styles.bar}></span>
               </button>
               {!isSticky && isActive && <div className={styles.menuWrapper}>{renderMenu()}</div>}
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
            <div className={`${styles.stickyHeader} ${styles.stickyEnter}`}>
               <div className={styles.logo}>
                  <img src="/hsh-logo.svg" alt="Logo" />
               </div>

               <button
                  className={`${styles.burger} ${isActive ? styles.active : ""}`}
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                  aria-expanded={isActive}
               >
                  <span className={styles.bar}></span>
                  <span className={styles.bar}></span>
                  <span className={styles.bar}></span>
               </button>

               {isActive && <div className={styles.menuWrapper}>{renderMenu()}</div>}
            </div>
         )}
      </>
   );
}
