import React from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Params } from "next/dist/server/request/params";
import { ProductSpI } from "@/interfaces/productSp";
import Rating from "@/components/Rating/Rating";
import { Heart, StarHalfIcon } from "lucide-react";

import AddToCart from "@/components/AddToCart/AddToCart";
import { Slider } from "@/components/Slider/Slider";


export default async function ProductDetails({ params }: { params: Params }) {
  const { productId } = await params;
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`,
  );
  const { data: product }: { data: ProductSpI } = await response.json();
 

  return (
    <>
      <Card className="grid grid-cols-3 items-center">
        <div className="col-span-1">
          <Slider images={product.images} />
        </div>
        <div className="col-span-2">
          <CardHeader>
            <CardDescription>{product.brand.name}</CardDescription>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription className="text-black pt-4">{product.description}</CardDescription>
          </CardHeader>

          <CardContent className="text-[13px]">
            <p>{product.category.name}</p>
            <div className="">
              <div className="flex items-center">
                {product.ratingsAverage == 1 ? (
                  <Rating />
                ) : product.ratingsAverage > 1 && product.ratingsAverage < 2 ? (
                  <div className="flex items-center text-yellow-500">
                    <Rating />
                    <StarHalfIcon />
                  </div>
                ) : product.ratingsAverage == 2 ? (
                  <div className="flex items-center text-yellow-500">
                    <Rating /> <Rating />
                  </div>
                ) : product.ratingsAverage > 2 && product.ratingsAverage < 3 ? (
                  <div className="flex items-center text-yellow-500">
                    <Rating />
                    <Rating />
                    <StarHalfIcon />
                  </div>
                ) : product.ratingsAverage == 3 ? (
                  <div className="flex items-center text-yellow-500">
                    <Rating /> <Rating /> <Rating />
                  </div>
                ) : product.ratingsAverage > 3 && product.ratingsAverage < 4 ? (
                  <div className="flex items-center text-yellow-500">
                    <Rating />
                    <Rating />
                    <Rating />
                    <StarHalfIcon />
                  </div>
                ) : product.ratingsAverage == 4 ? (
                  <div className="flex items-center text-yellow-500">
                    <Rating /> <Rating /> <Rating /> <Rating />
                  </div>
                ) : product.ratingsAverage > 4 && product.ratingsAverage < 5 ? (
                  <div className="flex items-center text-yellow-500">
                    <Rating /> <Rating /> <Rating />
                    <Rating /> <StarHalfIcon />
                  </div>
                ) : product.ratingsAverage == 5 ? (
                  <div className="flex items-center text-yellow-500">
                    <Rating /> <Rating /> <Rating />
                    <Rating />
                    <Rating />
                  </div>
                ) : (
                  ""
                )}
                <p className="text-lg text-black">{product.ratingsAverage}</p>
              </div>
              <div className="mt-2 flex justify-between items-end">
                <div>
                  <p>Sold : ({product.sold})</p>
                  <p>Remaining : ({product.ratingsQuantity})</p>
                </div>
                <p className="text-black text-lg font-bold">{product.price} EGP</p>
              </div>
            </div>
          </CardContent>

          <div className="mt-4  ">
            <AddToCart productId={product.id} fromWishlist />
          </div>
        </div>
      </Card>
    </>
  );
}