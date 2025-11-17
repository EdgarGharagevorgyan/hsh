"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./admin.module.scss";

type ImageItem = {
   category: string;
   filename: string;
   url: string;
};

export default function AdminPage() {
   const { data: session, status } = useSession();
   const isAuthenticated = !!session;

   const BACKEND_URL =
      process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
      "http://localhost:5000";

   const [password, setPassword] = useState("");
   const [loginError, setLoginError] = useState("");

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
      if (isAuthenticated) {
         fetchImages();
         fetchCategories();
      }
   }, [isAuthenticated, fetchImages, fetchCategories]);

   const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoginError("");

      const res = await signIn("credentials", {
         password,
         redirect: false,
      });

      if (res?.error) {
         setLoginError("Սխալ գաղտնաբառ");
      } else {
         setPassword("");
      }
   };

   const handleLogout = () => {
      signOut({ callbackUrl: "/admin" });
   };

   if (status === "loading") {
      return (
         <div className={styles.container}>
            <p>Ստուգվում է...</p>
         </div>
      );
   }

   if (!isAuthenticated) {
      return (
         <div className={styles.loginPage}>
            <div className={styles.loginCard}>
               <div className={styles.logo}>
                  <Image
                     src="/hsh-logo.svg"
                     alt="HSH Logo"
                     width={200}
                     height={80}
                     priority
                  />
               </div>

               <h1 className={styles.loginTitle}>Ադմին մուտք</h1>
               <p className={styles.loginSubtitle}>
                  Մուտք գործեք Ձեր գաղտնաբառով
               </p>

               <form onSubmit={handleLogin} className={styles.loginForm}>
                  <div className={styles.inputWrapper}>
                     <input
                        type="password"
                        placeholder="Գաղտնաբառ"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoFocus
                        className={styles.passwordInput}
                     />
                  </div>

                  <button type="submit" className={styles.loginButton}>
                     Մուտք գործել
                  </button>

                  {loginError && <p className={styles.loginError}>{loginError}</p>}
               </form>

            </div>
         </div>
      );
   }

   return (
      <div className={styles.container}>
         <div className={styles.header}>
            <h1 className={styles.title}>Ադմին վահանակ</h1>
            <button onClick={handleLogout} className={styles.logoutButton}>
               Ելք
            </button>
         </div>

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
                  const allowed =
                     /[ա-ևԱ-Ֆ]/.test(key) ||
                     key === " " ||
                     key === "Backspace" ||
                     key === "Delete" ||
                     /^Arrow/.test(key) ||
                     key === "Home" ||
                     key === "End" ||
                     key === "Tab" ||
                     key === "Enter" ||
                     (e.ctrlKey && ["a", "c"].includes(key));

                  if (!allowed) {
                     e.preventDefault();
                     setError("Թույլատրվում է միայն հայերեն տառեր և բացատ");
                  } else {
                     setError(null);
                  }
               }}
               onPaste={(e) => {
                  e.preventDefault();
                  const text = e.clipboardData.getData("text");
                  const filtered = text.replace(/[^ա-ևԱ-Ֆ\s]/g, "").replace(/\s+/g, " ");
                  const newValue = rawCategoryInput + filtered;
                  setRawCategoryInput(newValue);
                  setNewCategory(newValue);
                  if (filtered !== text) setError("Միայն հայերեն տառերը տեղադրվեցին");
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
                        Ընտրել պատկերներ
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
                           ? Array.from(files).map((f) => f.name).join(", ")
                           : "Ֆայլեր չեն ընտրվել"}
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
                           setFiles(null);
                           setError(null);
                        }}
                        className={`${styles.uploadButton} ${styles.cancelButton}`}
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
                  <div key={cat} className={styles.categoryBlock}>
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

   async function handleAddCategory() {
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
   }

   async function handleUpload() {
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
   }

   async function handleDelete(category: string, filename: string) {
      if (!confirm(`Ջնջել ${filename}-ը ?`)) return;

      const res = await fetch(
         `${BACKEND_URL}/admin/delete/${category}/${filename}`,
         { method: "DELETE" }
      );

      if (res.ok) fetchImages();
      else setError("Չհաջողվեց ջնջել");
   }
}