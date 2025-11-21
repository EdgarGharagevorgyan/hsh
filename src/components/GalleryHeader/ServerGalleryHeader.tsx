// src/components/GalleryHeader/ServerGalleryHeader.tsx
import GalleryHeaderClient from "./GalleryHeaderClient";
import { categorySchema } from "@/shared/schemas/category.schema";

// This runs on the server → Google instantly sees all category links!
export default function ServerGalleryHeader() {
   const categories = Object.values(categorySchema)
      .map(c => c.slug)
      .sort((a, b) => categorySchema[a].name.localeCompare(categorySchema[b].name, "hy"));

   return <GalleryHeaderClient initialCategories={categories} />;
}