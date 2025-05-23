import styles from "./ContentProducts.module.scss";

const productItems = [
   { name: "ՊԱՀԱՐԱՆ", image: "/product-categories/wardrobe.png" },
   { name: "ՄԱՀՃԱԿԱԼ", image: "/product-categories/bed.png" },
   { name: "ԽՈՀԱՆՈՑԱՅԻՆ ԿԱՀՈՒՅՔ", image: "/product-categories/cooking.png" },
   { name: "ՍԵՂԱՆ", image: "/product-categories/desk.png" },
   { name: "ԱԹՈՌ", image: "/product-categories/chair.png" },
   { name: "ԼՈԳԱՐԱՆԻ ԿԱՀՈՒՅՔ", image: "/product-categories/sink.png" },
   { name: "ՀԵՌՈՒՍՏԱՑՈՒՅՑԻ ՏԱԿԴԻՐ", image: "/product-categories/tv-stand.png" },
   { name: "ՀՅՈՒՐԱՆՈՑԱՅԻՆ ԿԱՀՈՒՅՔ", image: "/product-categories/guestroom.png" },
   { name: "ՕՐՈՐՈՑ", image: "/product-categories/cradle.png" },
   { name: "ԳՐԱՍԵՆՅԱԿԻ ԿԱՀՈՒՅՔ", image: "/product-categories/office.png" },
   { name: "ՓԱՅՏՅԱ ԱՔՍԵՍՈՒԱՌՆԵՐ", image: "/product-categories/house.png" },
   { name: "ԱՆՀԱՏԱԿԱՆ ՊԱՏՎԵՐՆԵՐ", image: "/product-categories/hammering.png" },
];

export default function ContentProducts() {
   return (
      <div className={styles.productsContainer}>
         <div className={styles.productsInfo}>
            <h2>Ապրանքատեսակներ</h2>
            <span className={styles.line}></span>
            <p>
               Այս բաժնում ներկայացված են մեր արտադրության մեջ առկա տարբեր արտադրատեսակները՝
               յուրաքանչյուրն ունի իր հատուկ բնութագրերը և կիրառման ոլորտը:
            </p>
         </div>
         <ul className={styles.productsTable}>
            {productItems.map((item, index) => (
               <li
                  key={index}
                  className={styles.productItem}
                  style={{ ["--bg" as string]: `url(${item.image})` }}
               >
                  <span>{item.name}</span>
               </li>
            ))}
         </ul>
      </div>
   );
}