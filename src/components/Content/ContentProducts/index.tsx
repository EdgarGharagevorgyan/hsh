"use client";

import { useRouter } from "next/navigation";
import styles from "./ContentProducts.module.scss";
import { categorySchema } from "@/shared/schemas/category.schema";

const productItems = [
   { name: "ՊԱՀԱՐԱՆ", key: "wardrobe", image: "/product-categories/wardrobe.png" },
   { name: "ՄԱՀՃԱԿԱԼ", key: "bed", image: "/product-categories/bed.png" },
   { name: "ԽՈՀԱՆՈՑԱՅԻՆ ԿԱՀՈՒՅՔ", key: "kitchen", image: "/product-categories/cooking.png" },
   { name: "ՍԵՂԱՆ", key: "table", image: "/product-categories/desk.png" },
   { name: "ԱԹՈՌ", key: "chairs", image: "/product-categories/chair.png" },
   { name: "ԼՈԳԱՐԱՆԻ ԿԱՀՈՒՅՔ", key: "bathroom", image: "/product-categories/sink.png" },
   { name: "ՀԵՌՈՒՍՏԱՑՈՒՅՑԻ ՏԱԿԴԻՐ", key: "tvstand", image: "/product-categories/tv-stand.png" },
   { name: "ՀՅՈՒՐԱՆՈՑԱՅԻՆ ԿԱՀՈՒՅՔ", key: "hotel", image: "/product-categories/guestroom.png" },
   { name: "ՕՐՈՐՈՑ", key: "cradle", image: "/product-categories/cradle.png" },
   { name: "ԳՐԱՍԵՆՅԱԿԻ ԿԱՀՈՒՅՔ", key: "office", image: "/product-categories/office.png" },
   { name: "ՓԱՅՏՅԱ ԱՔՍԵՍՈՒԱՌՆԵՐ", key: "wooden", image: "/product-categories/house.png" },
   { name: "ԱՆՀԱՏԱԿԱՆ ՊԱՏՎԵՐՆԵՐ", key: "customorders", image: "/product-categories/hammering.png" },
];

export default function ContentProducts() {
   const router = useRouter();

   return (
      <div id="services" className={styles.productsContainer}>
         <div className={styles.productsInfo}>
            <h2>Ապրանքատեսակներ</h2>
            <span className={styles.line}></span>
            <p>
               Այս բաժնում ներկայացված են մեր արտադրության մեջ առկա տարբեր արտադրատեսակները՝
               յուրաքանչյուրն ունի իր հատուկ բնութագրերը և կիրառման ոլորտը:
            </p>
         </div>

         <ul className={styles.productsTable}>
            {productItems.map((item, index) => {
               const category = categorySchema[item.key];

               return (
                  <li
                     key={index}
                     className={styles.productItem}
                     style={{ ["--bg" as string]: `url(${item.image})` }}
                     onClick={() => router.push(`/gallery/${category.slug}`)}
                  >
                     <span>{item.name}</span>
                  </li>
               );
            })}
         </ul>
      </div>
   );
}
