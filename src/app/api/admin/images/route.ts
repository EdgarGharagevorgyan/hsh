import { NextResponse } from "next/server";
import { s3, BUCKET, PUBLIC_URL } from "@/lib/r2";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const category = searchParams.get("category");

   const command = new ListObjectsV2Command({
      Bucket: BUCKET,
      Delimiter: "/",
   });

   const response = await s3.send(command);

   const imagesBy: Record<string, { filename: string; url: string }[]> = {};

   (response.CommonPrefixes || []).forEach(prefixObj => {
      const cat = prefixObj.Prefix!.slice(0, -1);
      imagesBy[cat] = [];
   });

   const listAll = new ListObjectsV2Command({ Bucket: BUCKET });
   const all = await s3.send(listAll);

   (all.Contents || []).forEach(obj => {
      if (!obj.Key || obj.Key.endsWith("/")) return;
      const parts = obj.Key.split("/");
      if (parts.length < 2) return;
      const cat = parts[0];
      const filename = parts.slice(1).join("/");
      if (!imagesBy[cat]) imagesBy[cat] = [];
      imagesBy[cat].push({
         filename,
         url: `${PUBLIC_URL}/${obj.Key}`
      });
   });

   if (category) {
      const images = imagesBy[decodeURIComponent(category)] || [];
      return NextResponse.json({ images });
   }

   return NextResponse.json({ imagesBy });
}