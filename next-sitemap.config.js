// next-sitemap.config.js

/** @type {import('next-sitemap').IConfig} */
const config = {
   siteUrl: "https://hshfurnitures.com",
   generateRobotsTxt: true,
   robotsTxtOptions: {
      policies: [{ userAgent: "*", allow: "/" }],
   },

   async additionalPaths() {
      const categories = [
         "chairs", "customorders", "office", "bathroom", "kitchen",
         "tvstand", "hotel", "bed", "wardrobe", "table", "wooden", "cradle"
      ];

      return categories.map((slug) => ({
         loc: `/gallery/${slug}`,
         lastmod: new Date().toISOString(),
         changefreq: "weekly",
         priority: 0.8,
      }));
   },
};

export default config;