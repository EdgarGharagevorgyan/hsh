"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type ImageItem = {
   category: string;
   filename: string;
   url: string;
};

export default function AdminPage() {
   /* ------------------------------------------------------------------ */
   /* 1. Backend URL – MUST be public in .env.local */
   /* ------------------------------------------------------------------ */
   const BACKEND_URL =
      process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
      "http://localhost:5000";

   /* ------------------------------------------------------------------ */
   /* 2. State */
   /* ------------------------------------------------------------------ */
   const [images, setImages] = useState<Record<string, ImageItem[]>>({});
   const [categories, setCategories] = useState<string[]>([]);
   const [files, setFiles] = useState<FileList | null>(null);
   const [selectedCategory, setSelectedCategory] = useState("");
   const [newCategory, setNewCategory] = useState("");
   const [showModal, setShowModal] = useState(false);
   const [isUploading, setIsUploading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   /* ------------------------------------------------------------------ */
   /* 3. API helpers */
   /* ------------------------------------------------------------------ */
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

   /* ------------------------------------------------------------------ */
   /* 4. Effects – load once + after every mutation */
   /* ------------------------------------------------------------------ */
   useEffect(() => {
      fetchImages();
      fetchCategories();
   }, [fetchImages, fetchCategories]);

   /* ------------------------------------------------------------------ */
   /* 5. Add new category */
   /* ------------------------------------------------------------------ */
   const handleAddCategory = async () => {
      if (!newCategory.trim()) return setError("Enter a category name");

      const res = await fetch(`${BACKEND_URL}/admin/add-category`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ category: newCategory.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
         setNewCategory("");
         fetchCategories();
      } else {
         setError(data.message ?? "Failed to add category");
      }
   };

   /* ------------------------------------------------------------------ */
   /* 6. Upload images */
   /* ------------------------------------------------------------------ */
   const handleUpload = async () => {
      if (!files?.length || !selectedCategory) {
         return setError("Select a category and at least one file");
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
         fetchImages(); // refresh gallery
      } else {
         const data = await res.json();
         setError(data.message ?? "Upload failed");
      }
   };

   /* ------------------------------------------------------------------ */
   /* 7. Delete image */
   /* ------------------------------------------------------------------ */
   const handleDelete = async (category: string, filename: string) => {
      const ok = window.confirm(`Delete ${filename}?`);
      if (!ok) return;

      const res = await fetch(
         `${BACKEND_URL}/admin/delete/${category}/${filename}`,
         { method: "DELETE" }
      );

      if (res.ok) fetchImages();
      else setError("Failed to delete");
   };

   /* ------------------------------------------------------------------ */
   /* 8. Render */
   /* ------------------------------------------------------------------ */
   return (
      <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
         <h1 style={{ marginBottom: "1.5rem" }}>Admin Panel</h1>

         {/* ---------- Add Category ---------- */}
         <section style={{ marginBottom: "1.5rem", display: "flex", gap: "0.5rem" }}>
            <input
               type="text"
               placeholder="New category name"
               value={newCategory}
               onChange={(e) => setNewCategory(e.target.value)}
               style={{ padding: "0.5rem", flex: 1 }}
            />
            <button onClick={handleAddCategory} style={btnStyle}>
               Add Category
            </button>
         </section>

         {/* ---------- Global Error ---------- */}
         {error && (
            <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
         )}

         {/* ---------- Upload Modal ---------- */}
         <button onClick={() => setShowModal(true)} style={btnStyle}>
            Upload Images
         </button>

         {showModal && (
            <div style={modalOverlay}>
               <div style={modalBox}>
                  <h2 style={{ marginTop: 0 }}>Upload Images</h2>

                  <select
                     value={selectedCategory}
                     onChange={(e) => setSelectedCategory(e.target.value)}
                     style={inputStyle}
                  >
                     <option value="">— Select category —</option>
                     {categories.map((c) => (
                        <option key={c} value={c}>
                           {c}
                        </option>
                     ))}
                  </select>

                  {/* File input with a changing key → resets when modal closes */}
                  <input
                     key={showModal ? "open" : "closed"}
                     type="file"
                     multiple
                     accept="image/*"
                     onChange={(e) => setFiles(e.target.files)}
                     style={{ ...inputStyle, marginTop: "0.5rem" }}
                  />

                  <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                     <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        style={btnStyle}
                     >
                        {isUploading ? "Uploading…" : "Upload"}
                     </button>
                     <button
                        onClick={() => {
                           setShowModal(false);
                           setError(null);
                        }}
                        style={{ ...btnStyle, background: "#aaa" }}
                     >
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* ---------- Gallery ---------- */}
         <section style={{ marginTop: "2rem" }}>
            {Object.entries(images).length === 0 ? (
               <p>No images yet.</p>
            ) : (
               Object.entries(images).map(([cat, imgs]) => (
                  <div key={cat} style={{ marginBottom: "2.5rem" }}>
                     <h2 style={{ textTransform: "capitalize" }}>{cat}</h2>
                     <div
                        style={{
                           display: "grid",
                           gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                           gap: "1rem",
                        }}
                     >
                        {imgs.map((img) => (
                           <div
                              key={img.filename}
                              style={{
                                 position: "relative",
                                 textAlign: "center",
                              }}
                           >
                              <Image
                                 src={img.url}
                                 alt={img.filename}
                                 width={150}
                                 height={150}
                                 style={{
                                    objectFit: "cover",
                                    borderRadius: "4px",
                                 }}
                              />
                              <button
                                 onClick={() => handleDelete(cat, img.filename)}
                                 style={{
                                    marginTop: "0.5rem",
                                    fontSize: "0.8rem",
                                    padding: "0.2rem 0.5rem",
                                    background: "#e63946",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                 }}
                              >
                                 Delete
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

/* ------------------------------------------------------------------ */
/* Simple inline styles – replace with Tailwind / CSS modules if you like */
/* ------------------------------------------------------------------ */
const btnStyle: React.CSSProperties = {
   padding: "0.5rem 1rem",
   background: "#0066cc",
   color: "#fff",
   border: "none",
   borderRadius: "4px",
   cursor: "pointer",
};

const inputStyle: React.CSSProperties = {
   display: "block",
   width: "100%",
   padding: "0.5rem",
   marginBottom: "0.5rem",
};

const modalOverlay: React.CSSProperties = {
   position: "fixed",
   inset: 0,
   background: "rgba(0,0,0,0.6)",
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
   zIndex: 9999,
};

const modalBox: React.CSSProperties = {
   background: "#fff",
   padding: "2rem",
   borderRadius: "8px",
   minWidth: "320px",
   maxWidth: "90vw",
};