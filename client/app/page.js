import { Button } from "@/components/ui/button";
import Image from "next/image";
import CategoryList from "./_components/CategoryList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import AllProductList from "./_components/AllProductList";
import DeliveryBanner from "./_components/DeliveryBanner";
import Footer from "./_components/Footer"

export default async function Home() {

  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();
  const deliveryBanner = await GlobalApi.deliveryBanner();
  return (
    <div className="p-5 md:p-10 px-16">
      <Slider sliderList={sliderList}/>
      <CategoryList categoryList={categoryList}/>
      <AllProductList productList={productList}/>
      <DeliveryBanner deliveryBanner={deliveryBanner}/>
      <Image src='/FreshShop.png' width={1000} height={200} className=" w-full h-[500px] object-contain "></Image>
      <Footer></Footer>
    </div>
  );
}
