// src/shared/schemas/category.schema.ts

export interface Category {
   slug: string;
   name: string;
   imgAlt?: string;
}

export interface CategorySchema {
   [key: string]: Category;
}

export const categorySchema: CategorySchema = {
   chairs: {
      slug: 'chairs',
      name: 'Աթոռներ',
      imgAlt: 'HSH Furniture – Աթոռներ / At’orn’ner / Стулья / Wooden Chairs – Ձեռագործ, բարձրորակ, պատվերով, Երևան, Հայաստան',
   },
   customorders: {
      slug: 'customorders',
      name: 'Անհատական պատվերներ',
      imgAlt: 'HSH Furniture – Անհատական պատվերներ / Anhatakan patverner / Индивидуальные заказы / Custom Orders – Ձեռագործ, բարձրորակ, պատվերով, Երևան, Հայաստան',
   },
   office: {
      slug: 'office',
      name: 'Գրասենյակի կահույք',
      imgAlt: 'HSH Furniture – Գրասենյակի կահույք / Grasenkayi kahuyq / Офисная мебель / Office Furniture – Ձեռագործ, բարձրորակ, պատվերով, Երևան, Հայաստան',
   },
   bathroom: {
      slug: 'bathroom',
      name: 'Լոգարանի կահույք',
      imgAlt: 'HSH Furniture – Լոգարանի կահույք / Lograni kahuyq / Мебель для ванной / Bathroom Furniture – Ձեռագործ, բարձրորակ, պատվերով, Երևան, Հայաստան',
   },
   kitchen: {
      slug: 'kitchen',
      name: 'Խոհանոցային կահույք',
      imgAlt: 'HSH Furniture – Խոհանոցային կահույք / Khokhanotsayin kahuyq / Кухонная мебель / Kitchen Furniture – Ձեռագործ, բարձրորակ, պատվերով, Երևան, Հայաստան',
   },
   tvstand: {
      slug: 'tvstand',
      name: 'Հեռուստացույցի տակդիր',
      imgAlt: 'HSH Furniture – Հեռուստացույցի տակդիր / Herustats’uytsi takdir / Тумба под телевизор / TV Stand – Ձեռագործ, բարձրորակ, պատվերով, Երևան, Հայաստան',
   },
   hotel: {
      slug: 'hotel',
      name: 'Հյուրանոցային կահույք',
      imgAlt: 'HSH Furniture – Հյուրանոցային կահույք / Hyuranotsayin kahuyq / Мебель для гостиниц / Hotel Furniture – Ձեռագործ, բարձրորակ, պատվերով, Երևան, Հայաստան',
   },
   bed: {
      slug: 'bed',
      name: 'Մահճակալներ',
      imgAlt: 'HSH Furniture – Մահճակալներ / Mahchakalner / Кровати / Beds – Ձեռագործ, բարձրորակ, պատվերով, Երևան, Հայաստան',
   },
   wardrobe: {
      slug: 'wardrobe',
      name: 'Պահարաններ',
      imgAlt: 'HSH Furniture – Պահարաններ / Paharanner / Шкафы / Wardrobes – Ձեռագործ, բարձրորակ, պատվերով, Երևան, Հայաստան',
   },
   table: {
      slug: 'table',
      name: 'Սեղաններ',
      imgAlt: 'HSH Furniture – Սեղաններ / Seghaner / Столы / Tables – Ձեռագործ, բարձրորակ, պատվերով, Երևան, Հայաստան',
   },
   wooden: {
      slug: 'wooden',
      name: 'Փայտյա աքսեսուարներ',
      imgAlt: 'HSH Furniture – Փայտյա աքսեսուարներ / Paytya aksesuarner / Деревянные аксессуары / Wooden Accessories – Ձեռագործ, բարձրորակ, պատվերով, Երևան, Հայաստան',
   },
   cradle: {
      slug: 'cradle',
      name: 'Օրորոցներ',
      imgAlt: 'HSH Furniture – Օրորոցներ / Ororots’ner / Кроватки / Cradles – Ձեռագործ, բարձրորակ, պատվերով, Երևան, Հայաստան',
   },
};
