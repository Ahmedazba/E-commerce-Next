import { ProductI } from "@/interfaces";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

import Link from "next/link";
import AddToCart from "@/components/addToCart/AddToCart";

export default async function Products() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
  );
  const { data: products }: { data: ProductI[] } = await response.json();
  // console.log(products);

  return (
    <>
      <h1 className="text-center text-5xl my-3 font-sans font-bold">
        Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products.map((product) => (
          <div key={product.id}>
            <Card className="my-3 hover:shadow-2xl cursor-pointer duration-300 transition-all hover:-translate-y-4">
              <Link href={`/products/${product.id}`}>
                <CardHeader>
                  <Image
                    src={product.imageCover}
                    alt=""
                    className="w-full "
                    width={300}
                    height={300}
                  />
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                  <CardDescription>Brand: {product.brand.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <FaStar size={20} className="text-yellow-500" />
                      <FaStar size={20} className="text-yellow-500" />
                      <FaStar size={20} className="text-yellow-500" />
                      <FaStar size={20} className="text-yellow-500" />
                      <p className="font-semibold">
                        ({product.ratingsAverage})
                      </p>
                    </div>

                    <p>
                      $<span className="font-bold ">{product.price} </span>EGP
                    </p>
                  </div>
                </CardContent>
              </Link>
              <AddToCart productId={product.id} />
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
