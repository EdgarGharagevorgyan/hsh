import { NextResponse } from "next/server";
import { s3, BUCKET } from "@/lib/r2";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { DEFAULT_CATEGORIES } from "@/lib/defaultCategories";

export async function POST(request: Request) {
   const { category } = await request.json();

   if (DEFAULT_CATEGORIES.includes(category)) {
      return NextResponse.json({ error: "Հիմնական կատեգորիան չի կարող ջնջվել" }, { status: 400 });
   }

   const command = new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: `${category}/.keep`
   });

   try {
      await s3.send(command);
      return NextResponse.json({ success: true });
   } catch {
      return NextResponse.json({ error: "Ջնջումը ձախողվեց" }, { status: 500 });
   }
}