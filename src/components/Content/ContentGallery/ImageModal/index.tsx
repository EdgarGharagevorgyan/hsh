import React from "react";
import Image from "next/image";
import styles from "./ImageModal.module.scss";

type Props = {
  images: string[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  onClose: () => void;
};

export default function ImageModal({ images, currentIndex, setCurrentIndex, onClose }: Props) {
  const prev = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  const next = () => setCurrentIndex((currentIndex + 1) % images.length);

  return (
    <div className={styles.overlay}>
      <button className={`${styles.button} ${styles.close}`} onClick={onClose}>
        ×
      </button>
      <button className={`${styles.button} ${styles.left}`} onClick={prev}>
        ‹
      </button>
      <div className={styles.imageWrapper}>
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          fill
          sizes="90vw"
          className={styles.image}
        />
      </div>
      <button className={`${styles.button} ${styles.right}`} onClick={next}>
        ›
      </button>
    </div>
  );
}
