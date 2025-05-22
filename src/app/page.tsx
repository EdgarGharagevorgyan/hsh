"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Header from "@/components/Header";
import Frame from "@/components/Frame";
import Loading from "@/components/Loading";
import Content from "@/components/Content/ContentInfo";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

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
        <Header />
        <Content/>
      </div>
    </>
  );
}
