import { NextResponse } from "next/server";
import { s3, BUCKET } from "@/lib/r2";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req: Request) {
   const { category, filename } = await req.json();

   const command = new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: `${category}/${filename}`
   });

   await s3.send(command);
   return NextResponse.json({ message: "Ջնջվեց" });
}