import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Loader2, StarHalfIcon, Trash2 } from "lucide-react";
import Rating from "@/components/Rating/Rating";
import Link from "next/link";
import AddToCart from "@/components/AddToCart/AddToCart";
import { formatCurrency } from "@/Helpers/formatCurrency";
import { ProducrI } from '@/interfaces/product';

import { Button } from '../ui/button';
type AllProductsProps = {
  products: ProducrI[];
  fromWishlist?: boolean;
  removeFromWishlist?: (id: string) => void;
  removingId?: string | null;
};

export default function AllProducts({ products, fromWishlist = false, removeFromWishlist,
  removingId }: AllProductsProps) {


  return <>


    <div className="flex flex-wrap">
      {products.map((product) => (

        <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 ">

          <Card className="my-3 hover:shadow-2xl cursor-pointer duration-300 transition-all hover:-translate-y-4">
            <Link href={"/products/" + (product.id || product._id)}>
              <Image src={product.imageCover} alt="" className="w-full rounded-t-xl" width={300} height={300} />
              <CardHeader>
                <CardTitle>{product.title.split(" ", 2)}</CardTitle>
                <CardDescription>{product.category.name}</CardDescription>
                <CardAction>{product.brand.name}</CardAction>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between">
                  {product.ratingsAverage == 1 ? (
                    <Rating />
                  ) : product.ratingsAverage > 1 && product.ratingsAverage < 2 ? (
                    <div className="flex text-yellow-500">
                      <Rating />
                      <StarHalfIcon />
                    </div>
                  ) : product.ratingsAverage == 2 ? (
                    <div className="flex text-yellow-500">
                      <Rating /> <Rating />
                    </div>
                  ) : product.ratingsAverage > 2 && product.ratingsAverage < 3 ? (
                    <div className="flex text-yellow-500">
                      <Rating />
                      <Rating />
                      <StarHalfIcon />
                    </div>
                  ) : product.ratingsAverage == 3 ? (
                    <div className="flex text-yellow-500">
                      <Rating /> <Rating /> <Rating />
                    </div>
                  ) : product.ratingsAverage > 3 && product.ratingsAverage < 4 ? (
                    <div className="flex text-yellow-500">
                      <Rating />
                      <Rating />
                      <Rating />
                      <StarHalfIcon />
                    </div>
                  ) : product.ratingsAverage == 4 ? (
                    <div className="flex text-yellow-500">
                      <Rating /> <Rating /> <Rating /> <Rating />
                    </div>
                  ) : product.ratingsAverage > 4 && product.ratingsAverage < 5 ? (
                    <div className="flex text-yellow-500">
                      <Rating /> <Rating /> <Rating />
                      <Rating /> <StarHalfIcon />
                    </div>
                  ) : product.ratingsAverage == 5 ? (
                    <div className="flex text-yellow-500">
                      <Rating /> <Rating /> <Rating />
                      <Rating />
                      <Rating />
                    </div>
                  ) : (
                    ""
                  )}
                  <p>{product.ratingsAverage}</p>
                </div>
                <p className="text-black">
                  Price : <span className="font-bold ">{formatCurrency(product.price)}</span>
                </p>
              </CardContent>
            </Link>

            

            {fromWishlist ? (
           <>
             < AddToCart productId={product.id} fromWishlist />
              <Button
                onClick={() => removeFromWishlist?.(product._id)}
                variant={"destructive"}
                className="cursor-pointer m-auto w-[95%]"
                disabled={removingId === product._id}
              >
                {removingId === product._id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Remove
              </Button>
           
           
           </> )
          :
         < AddToCart productId={product.id} fromWishlist = {false} />
          }


          </Card>
        </div>
      ))}
    </div>
  </>
}
