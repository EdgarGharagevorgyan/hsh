// src/auth.ts

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
   trustHost: true, 
   providers: [
      Credentials({
         credentials: {
            password: { label: "Գաղտնաբառ", type: "password" },
         },
         async authorize(credentials) {
            const password = credentials?.password as string | undefined;
            const adminPassword = process.env.ADMIN_PASSWORD;

            if (!adminPassword) {
               console.error("ADMIN_PASSWORD not set in environment");
               return null;
            }

            if (password && password === adminPassword) {
               return {
                  id: "1",
                  name: "Admin",
                  email: "admin@hsh.am"
               };
            }
            return null;
         },
      }),
   ],
   pages: {
      signIn: "/admin/login",
   },
   session: {
      strategy: "jwt",
      maxAge: 24 * 60 * 60,
   },
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.id = user.id;
         }
         return token;
      },
      async session({ session, token }) {
         if (token && session.user) {
            session.user.id = token.id as string;
         }
         return session;
      },
   },
});