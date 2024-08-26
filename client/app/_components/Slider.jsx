"use client"
import Image from "next/image"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default function Slider({ sliderList }) {
  return (
    <div>
      <Carousel>
      <CarouselPrevious />
        <CarouselContent>
          {sliderList.map((slider, index) => {
            // // Log the image URL to the console
            // console.log(slider);

            return (    
              <CarouselItem key={index}>
                <Image
                  src={slider.attributes?.image?.data[0].attributes?.url}
                  width={1000}
                  height={400}
                  alt="slider"
                  className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl border shadow-lg"
                />
              </CarouselItem>
            )
          })}
        </CarouselContent>
       
        <CarouselNext />
      </Carousel>
    </div>
  )
}
