import { NextResponse } from "next/server";
import { s3, BUCKET } from "@/lib/r2";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
// import { DEFAULT_CATEGORIES } from "@/lib/defaultCategories";

export async function GET() {
   const command = new ListObjectsV2Command({
      Bucket: BUCKET,
      Delimiter: "/"
   });

   const response = await s3.send(command);

   const fromR2 = (response.CommonPrefixes || [])
      .map(p => p.Prefix!.slice(0, -1))
   // .filter(cat => !DEFAULT_CATEGORIES.includes(cat as typeof DEFAULT_CATEGORIES[number]));

   const categories = [...fromR2].sort((a, b) => a.localeCompare(b, "hy"));

   return NextResponse.json({ categories });
}