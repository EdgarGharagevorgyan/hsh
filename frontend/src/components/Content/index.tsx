// import styles from "./Content.module.scss"
import ContentComment from "./ContentComment";
import ContentGallery from "./ContentGallery";
import ContentInfo from "./ContentInfo";
import ContentMap from "./ContentMap";
import ContentProducts from "./ContentProducts";

export default function Content() {
   return (
      <>
         <ContentInfo />
         <ContentGallery />
         <ContentComment />
         <ContentProducts />
         <ContentMap />
      </>
   );
}
