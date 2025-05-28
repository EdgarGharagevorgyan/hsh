"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Header from "@/components/Header";
import MobileHeader from "@/components/Header/MobileHeader"; 
import Frame from "@/components/Frame";
import Loading from "@/components/Loading";
import Content from "@/components/Content";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";

export default function Home() {
   const [isLoading, setIsLoading] = useState(true);
   const [isDesktop, setIsDesktop] = useState(true); 

   useEffect(() => { 
      const handleResize = () => {
         setIsDesktop(window.innerWidth > 1060);
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
   }, []);

   useEffect(() => {
      const timeout = setTimeout(() => setIsLoading(false), 1500);
      return () => clearTimeout(timeout);
   }, []);

   return (
      <>
         <Loading visible={isLoading} />
         <div
            className={styles.container}
            style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s ease" }}
         >
            <Frame />
            {isDesktop ? <Header /> : <MobileHeader />}
            <Content />
            <Footer />
            <BackToTopButton />
         </div>
      </>
   );
}
