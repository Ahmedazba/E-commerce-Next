import { Params } from "next/dist/server/request/params";
import React from "react";
import { ProductI } from "@/interfaces";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CarouselPlugin } from "@/components/Carousel/CarouselPlugin";
import AddToCart from "@/components/addToCart/AddToCart";
import { Star } from "lucide-react";

export default async function ProductDetails({ params }: { params: Params }) {
  const { productid } = await params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productid}`,
  );
  const { data: product }: { data: ProductI } = await response.json();

  return (
    <div className="  py-5 px-4 flex justify-center items-center">
      <Card className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-lg items-center">
        {/* الجزء الخاص بالصور - Left Side */}
        <CardHeader className="p-0 bg-white flex justify-center items-center">
          <div className=" max-w-2xs">
            <CarouselPlugin imgs={product.images} />
          </div>
        </CardHeader>

        {/* الجزء الخاص بالتفاصيل - Right Side */}
        <div className="flex flex-col justify-between p-8 bg-white">
          <CardContent className="p-0 space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2 text-primary">
                {product.category.name}
              </Badge>
              <CardTitle className="text-3xl font-bold text-gray-800 leading-tight">
                {product.title}
              </CardTitle>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="ml-1 font-semibold text-gray-700">
                  {product.ratingsAverage}
                </span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-gray-500">
                {product.ratingsQuantity} reviews
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-2xl font-bold text-green-600">
                {product.price} EGP
              </p>
              <CardDescription className="text-base leading-relaxed text-gray-600">
                {product.description}
              </CardDescription>
            </div>
          </CardContent>

          <div className="mt-8">
          <AddToCart productId={product.id}/>

          </div>
        </div>
      </Card>
    </div>
  );
}
