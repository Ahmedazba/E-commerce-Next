
import { BrandsI } from '@/interfaces/brands';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'


export default async function Brands() {

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);
  const { data: brands }: { data: BrandsI[] } = await response.json();

  return <>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-10">
      {brands.map((brand) => (
        <div key={brand._id} className='shadow-xl bg-gray-50 rounded-xl m-3 sm:m-1 md:m-0'>
          <Link href={'/brands/' + brand._id}>
            <Image src={brand.image} alt="" className="w-full rounded-xl" width={300} height={300} />
          </Link>
          <h2 className='text-center'>{brand.name}</h2>
        </div>


      ))}
    </div>

  </>
}

