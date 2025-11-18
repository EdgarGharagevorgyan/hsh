import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [
      Credentials({
         credentials: {
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            if (credentials?.password === process.env.ADMIN_PASSWORD) {
               return { id: "1", name: "Admin" };
            }
            return null;
         },
      }),
   ],
   pages: { signIn: "/admin" },
   session: { strategy: "jwt" },
   secret: process.env.NEXTAUTH_SECRET,
});