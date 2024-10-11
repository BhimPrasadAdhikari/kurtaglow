"use client";

import { Images as ImageType } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";
import Image from "next/image";
export interface gallery {
  images: ImageType[];
}
const Gallery: React.FC<gallery> = ({ images }) => {
  return (
    <div className="w-full h-full relative">
      <Tabs defaultValue={images[0].id} className="w-full">
        {images.map((image) => {
          return (
            <TabsContent
              key={image.id}
              value={image.id}
              className="w-full h-full"
            >
              <Image
                 src={image.url}
                 width={400}
                 height={400}
                 alt="image"
                 priority
                 className="" // Ensure the image covers the area

             
              />
            </TabsContent>
          );
        })}
        <TabsList className="flex mt-5 items-center bg-transparent h-[60px] justify-center w-full ">
          {images.map((image) => {
            return (
              <TabsTrigger key={image.id} value={image.id}>
                <Image
                  src={image.url}
                  alt="image"
                  width={40}
                  height={40}
                  className=""
                />
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Gallery;
