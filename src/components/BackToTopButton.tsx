// components/BackToTopButton.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./BackToTopButton.module.scss";

export default function BackToTopButton() {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const toggleVisibility = () => {
         setIsVisible(window.scrollY > 300);
      };

      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
   }, []);

   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };

   return isVisible ? (
      <button onClick={scrollToTop} className={styles.button} aria-label="Back to top">
         <Image src="/icons/square-caret-up-solid.svg" alt="Back to top" width={24} height={24} />
      </button>
   ) : null;
}
