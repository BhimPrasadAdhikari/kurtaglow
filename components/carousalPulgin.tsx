'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Billboard } from "@/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
interface CarousalProps{
  data:Billboard[];
}
const CarouselPlugin:React.FC<CarousalProps> =({data}) =>{
  
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-3/4 h-60 "
      // onMouseEnter={plugin.current.stop}
      // onMouseLeave={plugin.current.reset}
      >
      <CarouselContent className="h-60 w-auto p-0">          
        {data.map((billboard, index) => (
      <CarouselItem key={index}>
            <div className="p-0 ">
              <div>
                <div className="flex justify-center aspect-auto">
                 <Image src={billboard.imageUrl} height={700} width={700} alt="image" priority />
                </div>              
              </div>
            </div>
          </CarouselItem>)
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
export default CarouselPlugin;