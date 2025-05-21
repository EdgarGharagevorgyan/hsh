"use client";
import { useEffect, useState } from "react";
import styles from "./Loading.module.scss";

type LoadingProps = {
  visible: boolean;
};

export default function Loading({ visible }: LoadingProps) {
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 500); // duration matches fade-out
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <div className={`${styles.LoadingBg} ${visible ? styles.visible : styles.hidden}`}>
      <div className={styles.Loading}></div>
    </div>
  );
}
