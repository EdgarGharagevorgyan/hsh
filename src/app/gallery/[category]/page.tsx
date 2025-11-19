import GalleryHeader from "@/components/GalleryHeader";
import GalleryContent from "@/components/GalleryContent";
import Footer from "@/components/Footer";
import BackToTopButton from "@/components/BackToTopButton";
import Frame from "@/components/Frame";
import styles from "../gallery.module.scss";
import { categorySchema } from "@/shared/schemas/category.schema";

type ImageItem = { url: string; filename: string };

export const dynamic = "force-dynamic";
export const revalidate = false;

export async function generateStaticParams() {
    return Object.keys(categorySchema).map((key) => ({ category: key }));
}

export default async function CategoryPage({ params: awaitedParams }: { params: Promise<{ category: string }> }) {
    const params = await awaitedParams;
    const decoded = decodeURIComponent(params.category);

    const categoryName = categorySchema[params.category]?.name || decoded;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/admin/images?category=${encodeURIComponent(decoded)}`, {
        cache: "no-store"
    });

    const data = res.ok ? await res.json() : { images: [] };
    const rawItems: ImageItem[] = data.images || [];

    const items = rawItems.filter(img => img.filename !== ".keep");
    const isEmpty = items.length === 0;

    return (
        <>
            <Frame />
            <GalleryHeader />

            {isEmpty ? (
                <main className={styles.emptyState}>
                    <p className={styles.emptyMessage}>
                        <strong>{categoryName}ներում պատկերներ չկան</strong>
                    </p>
                </main>
            ) : (
                <GalleryContent items={items} />
            )}

            <Footer />
            <BackToTopButton />
        </>
    );
}
