import { NextResponse } from "next/server";
import { s3, BUCKET } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req: Request) {
   const formData = await req.formData();
   const files = formData.getAll("files") as File[];
   const category = formData.get("category") as string;

   if (!files.length || !category) {
      return NextResponse.json({ message: "Բացակայում է կատեգորիա կամ ֆայլեր" }, { status: 400 });
   }

   for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name}`;

      const command = new PutObjectCommand({
         Bucket: BUCKET,
         Key: `${category}/${filename}`,
         Body: buffer,
         ContentType: file.type,
      });

      await s3.send(command);
   }

   return NextResponse.json({ message: "Վերբեռնվեց" });
}