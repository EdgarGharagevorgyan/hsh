"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ContentMap.module.scss";
import MapView from "./MapView";

export default function ContentMap() {
   const wrapperRef = useRef<HTMLDivElement>(null);
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setIsVisible(true);
               observer.disconnect();
            }
         },
         { threshold: 0.1 }
      );

      if (wrapperRef.current) observer.observe(wrapperRef.current);

      return () => observer.disconnect();
   }, []);

   return (
      <div ref={wrapperRef} className={`${styles.bgWrapper} ${isVisible ? styles.show : ""}`}>
         <div id="contact" className={styles.mapContainer}>
            <h2>Կապ հաստատեք մեզ հետ՝ զանգահարելով կամ պարզապես լրացնելով այս ձևը</h2>
            <span className={styles.line}></span>

            <div className={styles.formWrapper}>
               <form className={styles.inputRow} onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Անուն" required />
                  <input type="tel" placeholder="Հեռախոսահամար" required />
                  <button type="submit">Send</button>
               </form>

               <div className={styles.bottomRow}>
                  <div className={styles.contactInfo}>
                     <p>
                        <strong>Հեռախոսահամար: </strong>
                        <br className={styles.lineBrake} />
                        +374(77)-803-778
                     </p>
                     <p>
                        <strong>Էլ. հասցե: </strong>
                        <br className={styles.lineBrake} />
                        contact@hshfurnitures.com
                     </p>
                  </div>
                  <div className={styles.mapWrapper}>
                     <MapView />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
