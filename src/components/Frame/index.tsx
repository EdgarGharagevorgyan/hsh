"use client";
import styles from "./Frame.module.scss";

export default function Frame() {
  return (
    <>
      <div className={`${styles.frame} ${styles["frame-top"]}`} />
      <div className={`${styles.frame} ${styles["frame-right"]}`} />
      <div className={`${styles.frame} ${styles["frame-bottom"]}`} />
      <div className={`${styles.frame} ${styles["frame-left"]}`} />
    </>
  );
}
