import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "../card"
import img1 from "./images/1.png"
import img2 from "./images/2.png"
import img3 from "./images/3.png"
import img4 from "./images/4.png"
import Image from "next/image"

export function CarouselDemo() {
  return (
    <Carousel className="w-[200px] md:w-full">
      <CarouselContent>
        {[img1, img2, img3, img4].map((img, index) => (
          <CarouselItem key={index}>
            <div className="p-0 md:p-1">
              <Card>
                <CardContent className="relative aspect-square h-[260px] md:h-[400px] w-full md:flex md:items-center md:justify-center md:p-6 p-0 overflow-hidden">
                  <Image 
                    src={img} 
                    alt={`img-${index + 1}`}
                    fill 
                    className="object-contain md:object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}