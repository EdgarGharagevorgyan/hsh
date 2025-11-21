// src/shared/schemas/category.schema.ts

export interface Category {
   slug: string;
   name: string;
}

export interface CategorySchema {
   [key: string]: Category;
}

export const categorySchema: CategorySchema = {
   chairs: {
      slug: 'chairs',
      name: 'Աթոռներ',
   },
   customorders: {
      slug: 'customorders',
      name: 'Անհատական պատվերներ',
   },
   office: {
      slug: 'office',
      name: 'Գրասենյակի կահույք',
   },
   bathroom: {
      slug: 'bathroom',
      name: 'Լոգարանի կահույք',
   },
   kitchen: {
      slug: 'kitchen',
      name: 'Խոհանոցային կահույք',
   },
   tvstand: {
      slug: 'tvstand',
      name: 'Հեռուստացույցի տակդիր',
   },
   hotel: {
      slug: 'hotel',
      name: 'Հյուրանոցային կահույք',
   },
   bed: {
      slug: 'bed',
      name: 'Մահճակալ',
   },
   wardrobe: {
      slug: 'wardrobe',
      name: 'Պահարան',
   },
   table: {
      slug: 'table',
      name: 'Սեղան',
   },
   wooden: {
      slug: 'wooden',
      name: 'Փայտյա աքսեսուարներ',
   },
   cradle: {
      slug: 'cradle',
      name: 'Օրորոց',
   },
};