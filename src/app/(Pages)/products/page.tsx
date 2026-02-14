
import { ProductI } from "@/interfaces/product";
import React from "react";


import AllProducts from "@/components/AllProducts/AllProducts";





export default async function Products() {


  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`);
  const { data: products }: { data: ProductI[] } = await response.json();




  return (
    <>
      <AllProducts products={products} />

    </>
  );
}
