// next-sitemap.config.js

import { categorySchema } from './src/shared/schemas/category.schema.ts';

/** @type {import('next-sitemap').IConfig} */
const config = {
   siteUrl: "https://hshfurnitures.com",
   generateRobotsTxt: true,
   exclude: ['/admin', '/admin/*', '/api/*'],
   robotsTxtOptions: {
      policies: [
         { userAgent: "*", allow: "/" },
         { userAgent: "*", disallow: ["/admin", "/api"] }
      ],
   },

   async additionalPaths() {
      const categories = Object.values(categorySchema).map(cat => cat.slug);

      return categories.map((slug) => ({
         loc: `/gallery/${slug}`,
         lastmod: new Date().toISOString(),
         changefreq: "weekly",
         priority: 0.8,
      }));
   },
};

export default config;