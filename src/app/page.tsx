import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  // https://ecommerce.routemisr.com/api/v1/products
  return (
    <>
      <div className="flex flex-col gap-5 mt-50 justify-center items-center text-center">
        <h1 className="text-6xl font-bold ">Welcome To ShopMart</h1>
        <p className="font-sans">
          The buying and selling of goods, services, or information over the
          internet and other computer networks
        </p>
        <Link href={"/products"}>
          <Button className="px-7 py-5 cursor-pointer">Shop Now</Button>
        </Link>
      </div>
    </>
  );
}
