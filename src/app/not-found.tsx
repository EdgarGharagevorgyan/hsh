import Link from "next/link";

export const metadata = {
   title: "404 – Էջը չի գտնվել | HSH Furniture",
   robots: { index: false },
};

export default function NotFound() {
   return (
      <div>
         <h1>404</h1>
         <p>Էջը չի գտնվել</p>
         <Link href="/">← Վերադառնալ գլխավոր էջ</Link>
      </div>
   );
}