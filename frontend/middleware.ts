import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
   const session = await auth();

   if (request.nextUrl.pathname.startsWith("/admin") && !session) {
      const loginUrl = new URL("/admin", request.url);
      loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
   }

   return NextResponse.next();
}

export const config = {
   matcher: "/admin/:path*",
};