import { BrandI } from "@/interfaces";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default async function Brands() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const { data }: { data: BrandI[] } = await response.json();
  console.log(data);

  return (
    <>
      <h1 className="text-center text-5xl my-3 font-sans font-bold">All Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {data.map((brand) => (
          <div key={brand._id}>
            <Card className="my-3 hover:shadow-2xl cursor-pointer duration-300 transition-all hover:-translate-y-4">
              <CardHeader>
                <Image
                  src={brand.image}
                  alt=""
                  className="w-full"
                  width={300}
                  height={300}
                />
                <CardTitle className="text-center">{brand.name}</CardTitle>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
