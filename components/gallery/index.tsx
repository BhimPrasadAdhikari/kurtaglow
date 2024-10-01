
"use client"

import { Images as ImageType } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import React from 'react'
import Image from "next/image"
export interface gallery{
    images:ImageType[]
}
const Gallery:React.FC<gallery> = ({
    images
}) => {
  return (   
     <div >
        <Tabs defaultValue={images[0].id} className="w-[400px]">
        {images.map((image)=>{
  return  <TabsContent key={image.id} value={image.id}>
    <Image src={image.url} alt="image"  width={400} height={400} priority className="h-auto w-auto"/>
  </TabsContent>
   })
   } 
  <TabsList className="flex items-center justify-center">
   {images.map((image)=>{
  return  <TabsTrigger key={image.id} value={image.id} >
    <Image src={image.url} alt="image"  width={40} height={40} className="h-auto w-auto "/>
  </TabsTrigger>
   })
   } 
  </TabsList>
  
</Tabs>

    </div>
  )
}

export default Gallery;