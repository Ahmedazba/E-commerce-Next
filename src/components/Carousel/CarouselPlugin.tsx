"use client";

import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export function CarouselPlugin({ imgs }: { imgs: string[] }) {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));

  if (!imgs || imgs.length == 0) return null;

  return (
    <Carousel plugins={[plugin.current]} className="w-full">
      <CarouselContent>
        {imgs.map((img, index) => (
          <CarouselItem key={index}>
            <Image
              alt={""}
              src={img}
              className="w-full"
              width={700}
              height={700}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
