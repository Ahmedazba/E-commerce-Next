"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20 px-4">

      <h1 className="text-4xl font-bold mb-4">Welcome to ShopMart</h1>


      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        Discover the latest technology, fashion, and lifestyle products.
        Quality guaranteed with fast shipping and excellent customer service.
      </p>


      <div className="flex gap-4">
        <Button onClick={() => { location.href = '/products'; }} className="bg-black text-white hover:bg-gray-800 cursor-pointer">
          Shop Now
        </Button>
        <Button onClick={() => { location.href = '/categories'; }} variant="outline" className="cursor-pointer">Browse Categories</Button>
      </div>
    </section>
  );
}
