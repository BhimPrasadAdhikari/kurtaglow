'use client';
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Billboard } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface CarouselProps {
  data: Billboard[];
}

const CarouselPlugin: React.FC<CarouselProps> = ({ data }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <div className="w-full h-60 sm:h-80 md:h-96 lg:h-112 relative overflow-hidden"> {/* Full width and responsive height */}
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full" // Full width and height
      >
        <CarouselContent className="h-full w-full p-0">          
          {data.map((billboard, index) => (
            <CarouselItem key={index} className="h-full w-full">
              <div className="h-full w-full flex justify-center items-center"> {/* Centering the image */}
                <Image 
                  src={billboard.imageUrl} 
                  height={700} 
                  width={700} 
                  alt="image" 
                  priority 
                  className="object-cover h-full w-full" // Ensure the image covers the area
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10" />
      </Carousel>
    </div>
  );
}

export default CarouselPlugin;
