'use client';
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

interface CarouselProps {
  data: Images[];
}

const CarouselPluginOrder: React.FC<CarouselProps> = ({ data }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-60"
    >
      <CarouselContent className="h-full w-full p-0">
        {data.map((image, index) => (
          <CarouselItem key={index} className="flex justify-center">
            <div className="w-full h-full relative">
              <Image
                src={image.url}
                alt="image"
                fill
                className="object-cover"
                priority
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CarouselPluginOrder;
