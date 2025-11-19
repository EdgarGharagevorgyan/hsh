export interface Category {
   slug: string;
   name: string;
}

export interface CategorySchema {
   [key: string]: Category;
}

export const categorySchema: CategorySchema = {
   chairs: {
      slug: 'Chair',
      name: 'Աթոռներ',
   },
   customorders: {
      slug: 'Custom orders',
      name: 'Անհատական պատվերներ',
   },
   office: {
      slug: 'Office furniture',
      name: 'Գրասենյակի կահույք',
   },
   bathroom: {
      slug: 'Bathroom furniture',
      name: 'Լոգարանի կահույք',
   },
   kitchen: {
      slug: 'Kitchen furniture',
      name: 'Խոհանոցային կահույք',
   },
   tvstand: {
      slug: 'TV-stand',
      name: 'Հեռուստացույցի տակդիր',
   },
   hotel: {
      slug: 'Hotel furniture',
      name: 'Հյուրանոցային կահույք',
   },
   bed: {
      slug: 'Bed',
      name: 'Մահճակալ',
   },
   wardrobe: {
      slug: 'Wardrobe',
      name: 'Պահարան',
   },
   table: {
      slug: 'Table',
      name: 'Սեղան',
   },
   wooden: {
      slug: 'Wooden accessories',
      name: 'Փայտյա աքսեսուարներ',
   },
   cradle: {
      slug: 'Cradle',
      name: 'Օրորոց',
   },
};