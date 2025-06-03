/* eslint-disable @next/next/no-img-element */
"use client";
import styles from "./Footer.module.scss";

export default function Footer() {
   return (
      <footer className={styles.footer}>
         <div className={styles.content}>
            <p className={styles.text}>Made with love</p>
            <div className={styles.socials}>
               <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="/icons/facebook-f-999.svg" alt="Facebook" className={styles.smIcon} />
               </a>
               <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="/icons/instagram-999.svg" alt="Instagram" className={styles.smIcon} />
               </a>
            </div>
         </div>
      </footer>
   );
}
