"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Images } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
interface CarousalProps {
  data: Images[];
}
const CarouselPluginOrder: React.FC<CarousalProps> = ({ data }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  ); 

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-24 h-full relative"
      // onMouseEnter={plugin.current.stop}
      // onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="h-full w-full p-0">
        {data.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-0 h-full w-full">
              <div>
                <div className="h-full w-full flex justify-center items-center">
                   <Image
                    src={image.url}
                    height={700}
                    width={700}
                    alt="image"
                    priority
                    className="object-cover h-full w-full" // Ensure the image covers the area

                  />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10" />
    
    </Carousel>
  );
};
export default CarouselPluginOrder;
