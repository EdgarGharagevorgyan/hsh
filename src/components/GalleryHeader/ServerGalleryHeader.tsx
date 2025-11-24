// src/components/GalleryHeader/ServerGalleryHeader.tsx
import GalleryHeaderClient from "./GalleryHeaderClient";
import { categorySchema } from "@/shared/schemas/category.schema";

export default function ServerGalleryHeader() {
   const categories = Object.values(categorySchema)
   .sort((a, b) => a.name.localeCompare(b.name, "hy"))
   .map(c => c.slug);

   return <GalleryHeaderClient initialCategories={categories} />;
}