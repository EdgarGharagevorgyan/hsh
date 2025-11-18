import { NextResponse } from "next/server";
import { s3, BUCKET } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { DEFAULT_CATEGORIES } from "@/lib/defaultCategories";

export async function POST(request: Request) {
   const { category } = await request.json();

   if (!category || typeof category !== "string") {
      return NextResponse.json({ message: "Անվավեր անուն" }, { status: 400 });
   }

   const trimmed = category.trim();
   if (trimmed === "") {
      return NextResponse.json({ message: "Դատարկ անուն" }, { status: 400 });
   }

   if (DEFAULT_CATEGORIES.includes(trimmed as typeof DEFAULT_CATEGORIES[number])) {
      return NextResponse.json({ message: "Այս կատեգորիան արդեն գոյություն ունի" }, { status: 400 });
   }

   const key = `${trimmed}/.keep`;

   try {
      await s3.send(new PutObjectCommand({
         Bucket: BUCKET,
         Key: key,
         Body: "",
         ContentType: "text/plain"
      }));
      return NextResponse.json({ success: true });
   } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Սխալ ստեղծման ժամանակ" }, { status: 500 });
   }
}