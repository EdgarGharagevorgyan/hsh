import { redirect } from "next/navigation";
import { categorySchema } from "@/shared/schemas/category.schema";

export const dynamic = "force-dynamic"; 
export const revalidate = false;

export default function GalleryRootPage() {
   const sortedCategories = Object.values(categorySchema)
      .sort((a, b) => a.name.localeCompare(b.name, "hy"));

   const firstSlug = sortedCategories[0]?.slug ?? "bed";

   redirect(`/gallery/${firstSlug}`);
}

export const metadata = {
   robots: {
      index: false,
      follow: true,
   },
};