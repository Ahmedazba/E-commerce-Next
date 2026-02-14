import React from 'react'
import { Params } from 'next/dist/server/request/params';
import { ProducrI } from '@/interfaces/product';
import AllProducts from '@/components/AllProducts/AllProducts';


export default async function SpecificBrand({ params }: { params: Params }) {
  const { brandId } = await params;


  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
  const { data: products }: { data: ProducrI[] } = await response.json();


  return <>

    {Array.isArray(products) && products.length > 0 ? <AllProducts products={products} /> : <p className="text-center flex items-center justify-center h-[400px] text-gray-500 mt-10">Brand unavailable.</p>
    }

  </>
}
