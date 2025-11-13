"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./admin.module.scss";

type ImageItem = {
   category: string;
   filename: string;
   url: string;
};

export default function AdminPage() {
   const BACKEND_URL =
      process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
      "http://localhost:5000";

   const [images, setImages] = useState<Record<string, ImageItem[]>>({});
   const [categories, setCategories] = useState<string[]>([]);
   const [files, setFiles] = useState<FileList | null>(null);
   const [selectedCategory, setSelectedCategory] = useState("");
   const [newCategory, setNewCategory] = useState("");
   const [showModal, setShowModal] = useState(false);
   const [isUploading, setIsUploading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [rawCategoryInput, setRawCategoryInput] = useState("");

   const fetchImages = useCallback(async () => {
      try {
         const res = await fetch(`${BACKEND_URL}/admin/get-images-by`);
         const data = await res.json();
         setImages(data.imagesBy ?? {});
      } catch (e) {
         console.error(e);
      }
   }, [BACKEND_URL]);

   const fetchCategories = useCallback(async () => {
      try {
         const res = await fetch(`${BACKEND_URL}/admin/categories`);
         const data = await res.json();
         setCategories(data.categories ?? []);
      } catch (e) {
         console.error(e);
      }
   }, [BACKEND_URL]);

   useEffect(() => {
      fetchImages();
      fetchCategories();
   }, [fetchImages, fetchCategories]);

   const handleAddCategory = async () => {
      if (!newCategory.trim()) return setError("Մուտքագրեք կատեգորիայի անունը");

      const res = await fetch(`${BACKEND_URL}/admin/add-category`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ category: newCategory.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
         setNewCategory("");
         setRawCategoryInput(""); 
         setError(null);

         await Promise.all([fetchCategories(), fetchImages()]);
         setSelectedCategory(newCategory.trim());
      } else {
         setError(data.message ?? "Չհաջողվեց ավելացնել կատեգորիան");
      }
   };

   const handleUpload = async () => {
      if (!files?.length || !selectedCategory) {
         return setError("Ընտրեք կատեգորիա և առնվազն մեկ ֆայլ");
      }

      setIsUploading(true);
      setError(null);

      const formData = new FormData();
      Array.from(files).forEach((f) => formData.append("images", f));
      formData.append("categories", selectedCategory);

      const res = await fetch(`${BACKEND_URL}/admin/upload`, {
         method: "POST",
         body: formData,
      });

      setIsUploading(false);

      if (res.ok) {
         setFiles(null);
         setSelectedCategory("");
         setShowModal(false);
         fetchImages();
      } else {
         const data = await res.json();
         setError(data.message ?? "Վերբեռնումը ձախողվեց");
      }
   };

   const handleDelete = async (category: string, filename: string) => {
      const ok = window.confirm(`Ջնջել ${filename}-ը ?`);
      if (!ok) return;

      const res = await fetch(
         `${BACKEND_URL}/admin/delete/${category}/${filename}`,
         { method: "DELETE" }
      );

      if (res.ok) fetchImages();
      else setError("Չհաջողվեց ջնջել");
   };

   return (
      <div className={styles.container}>
         <h1 className={styles.title}>Ադմինիստրատորի վահանակ</h1>

         <section className={styles.addCategorySection}>
            <input
               type="text"
               placeholder="Նոր կատեգորիայի անվանումը"
               value={rawCategoryInput}
               onChange={(e) => {
                  const raw = e.target.value;
                  setRawCategoryInput(raw);

                  const filtered = raw
                     .replace(/[^ա-ևԱ-Ֆ\s]/g, "")
                     .replace(/\s+/g, " ")
                     .trimStart();

                  setNewCategory(filtered);
               }}
               onKeyDown={(e) => {
                  const key = e.key;
                  const ctrl = e.ctrlKey || e.metaKey;
                  const isArmenianLetter = /[ա-ևԱ-Ֆ]/.test(key);
                  const isSpace = key === " ";
                  const isBackspace = key === "Backspace";
                  const isDelete = key === "Delete";
                  const isArrow = /^Arrow(Left|Right|Up|Down)$/.test(key);
                  const isHome = key === "Home";
                  const isEnd = key === "End";
                  const isSelectAll = ctrl && key === "a";
                  const isCopy = ctrl && key === "c";
                  const isTab = key === "Tab";
                  const isEnter = key === "Enter";

                  if (
                     isArmenianLetter ||
                     isSpace ||
                     isBackspace ||
                     isDelete ||
                     isArrow ||
                     isHome ||
                     isEnd ||
                     isSelectAll ||
                     isCopy ||
                     isTab ||
                     isEnter
                  ) {
                     setError(null);
                     return;
                  }

                  e.preventDefault();
                  setError("Թույլատրվում է միայն հայերեն տառեր և բացատ");
               }}
               onPaste={(e) => {
                  e.preventDefault();
                  const text = e.clipboardData.getData("text");
                  const filtered = text
                     .replace(/[^ա-ևԱ-Ֆ\s]/g, "")
                     .replace(/\s+/g, " ")
                     .trimStart();

                  const newValue = rawCategoryInput + filtered;
                  setRawCategoryInput(newValue);
                  setNewCategory(newValue);

                  if (filtered !== text) {
                     setError("Միայն հայերեն տառերը տեղադրվեցին");
                  } else {
                     setError(null);
                  }
               }}
               className={styles.categoryInput}
               autoComplete="off"
            />

            <button onClick={handleAddCategory} className={styles.uploadButton}>
               Ավելացնել կատեգորիա
            </button>
         </section>

         {error && <p className={styles.error}>{error}</p>}

         <button onClick={() => setShowModal(true)} className={styles.uploadButton}>
            Վերբեռնել պատկերներ
         </button>

         {showModal && (
            <div className={styles.modalOverlay}>
               <div className={styles.modalBox}>
                  <h2 className={styles.modalTitle}>Վերբեռնել պատկերներ</h2>

                  <select
                     value={selectedCategory}
                     onChange={(e) => setSelectedCategory(e.target.value)}
                     className={styles.select}
                  >
                     <option value="">— Ընտրեք կատեգորիա —</option>
                     {categories.map((c) => (
                        <option key={c} value={c}>
                           {c}
                        </option>
                     ))}
                  </select>

                  <div>
                     <label className={styles.fileLabel}>
                        Ներբեռնել պատկերներ
                        <input
                           type="file"
                           multiple
                           accept="image/*"
                           onChange={(e) => setFiles(e.target.files)}
                           className={styles.fileInput}
                        />
                     </label>

                     <div className={styles.fileList}>
                        {files && files.length > 0
                           ? Array.from(files).map((file) => file.name).join(", ")
                           : "Ֆայլը ընտրված չէ"}
                     </div>
                  </div>

                  <div className={styles.modalActions}>
                     <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        className={styles.uploadButton}
                     >
                        {isUploading ? "Բեռնվում է…" : "Վերբեռնել"}
                     </button>
                     <button
                        onClick={() => {
                           setShowModal(false);
                           setError(null);
                        }}
                        className={styles.uploadButton + " " + styles.cancelButton}
                     >
                        Չեղարկել
                     </button>
                  </div>
               </div>
            </div>
         )}

         <section className={styles.imagesSection}>
            {Object.entries(images).length === 0 ? (
               <p className={styles.emptyMessage}>Դեռևս պատկերներ չկան։</p>
            ) : (
               Object.entries(images).map(([cat, imgs]) => (
                  <div key={cat}>
                     <h2 className={styles.categoryTitle}>{cat}</h2>
                     <div className={styles.imageGrid}>
                        {imgs.map((img) => (
                           <div key={img.filename} className={styles.imageItem}>
                              <Image
                                 src={img.url}
                                 alt={img.filename}
                                 width={150}
                                 height={150}
                                 className={styles.image}
                              />
                              <button
                                 onClick={() => handleDelete(cat, img.filename)}
                                 className={styles.deleteButton}
                              >
                                 Ջնջել
                              </button>
                           </div>
                        ))}
                     </div>
                  </div>
               ))
            )}
         </section>
      </div>
   );
}