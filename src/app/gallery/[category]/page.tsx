// src/app/gallery/[category]/page.tsx

import { notFound } from "next/navigation";
import GalleryHeader from "@/src/components/GalleryHeader/ServerGalleryHeader";
import GalleryContent from "@/components/GalleryContent";
import Footer from "@/components/Footer";
import BackToTopButton from "@/src/components/BackToTopButton";
import Frame from "@/components/Frame";
import styles from "../gallery.module.scss";
import { categorySchema } from "@/shared/schemas/category.schema";

type ImageItem = { url: string; filename: string; imgAlt?: string; };

export const dynamic = "force-dynamic";
export const revalidate = false;

export async function generateStaticParams() {
    return Object.keys(categorySchema).map((key) => ({
        category: categorySchema[key].slug,
    }));
}

// Dynamic Metadata + OpenGraph + JSON-LD
export async function generateMetadata({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;
    const decoded = decodeURIComponent(category);
    const cat = Object.values(categorySchema).find((c) => c.slug === decoded);

    if (!cat) return { title: "404 – Էջը չի գտնվել" };

    const title = `${cat.name} | HSH Furniture`;
    const description = `Ձեռագործ ${cat.name.toLowerCase()}ներ՝ պատրաստված բարձրորակ փայտից։ 20+ տարվա փորձ, անվճար առաքում Երևանում։`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://hshfurnitures.com/gallery/${cat.slug}`,
            images: ["/gallery-images/gallery-image-1.jpg"],
            type: "website",
        },
        alternates: { canonical: `/gallery/${cat.slug}` },
    };
}

export default async function CategoryPage({
    params: awaitedParams,
}: {
    params: Promise<{ category: string }>;
}) {
    const params = await awaitedParams;
    const decoded = decodeURIComponent(params.category);

    const cat = Object.values(categorySchema).find((c) => c.slug === decoded);
    if (!cat) notFound();

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/admin/images?category=${encodeURIComponent(decoded)}`, {
        cache: "no-store",
    });

    const data = res.ok ? await res.json() : { images: [] };

    const items: ImageItem[] = (data.images ?? [])
        .filter((item: ImageItem) => item.filename !== ".keep");

    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${cat.name} | HSH Furniture`,
        description: `Ձեռագործ ${cat.name.toLowerCase()} Հայաստանում`,
        url: `https://hshfurnitures.com/gallery/${cat.slug}`,
        image: items[0]?.url || "/gallery-images/gallery-image-1.jpg",
    };

    return (
        <div className={styles.pageWrapper}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
            <Frame />
            <GalleryHeader />
            {items.length === 0 ? (
                <main className={styles.mainContent}>
                    <div className={styles.emptyState}>
                        <p className={styles.emptyMessage}>
                            <strong>{cat.name}ում դեռևս նկարներ չկան</strong>
                        </p>
                    </div>
                </main>
            ) : (
                <main className={styles.mainContent}>
                    <GalleryContent items={items} />
                </main>
            )}
            <Footer />
            <BackToTopButton />
        </div>
    );
}