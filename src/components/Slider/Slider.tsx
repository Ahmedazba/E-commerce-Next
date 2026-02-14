'use client'
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"


export function Slider({images } : {images : string[] }) {
  return (
    <Carousel className="w-full max-w-xs"   plugins={[
        Autoplay({
          delay: 1000,
        }),
      ]}>
      <CarouselContent>
        {images.map((img , index)=> <CarouselItem key={index}>
            <Image src={img} className='w-full' alt='' width={200} height={200}/>
          </CarouselItem>)}
        
      </CarouselContent>
      
    </Carousel>
  )
}
  