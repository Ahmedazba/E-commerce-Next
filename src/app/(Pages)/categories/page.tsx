
import { CategoryI } from '@/interfaces/category';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


export default async function Categories() {

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`);
  const {data : categorys} : {data : CategoryI []} = await response.json();
  
  
  return <>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-10">
      {categorys.map((category) => (
        <div key={category._id} className='shadow-xl bg-gray-50 rounded-xl m-3 sm:m-1 md:m-0'>
         <Link href={'/categories/' + category._id}>
            <Image src={category.image} alt="" className="h-50 w-50 rounded-xl object-fill mx-auto" width={300} height={300} />
         </Link>
            
          <h2 className='text-center'>{category.name}</h2>
        </div>


      ))}
    </div>
  </>
}