"use client"
import { Product as ProductType } from '@/types';
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import IconButton from '@/components/ui/icon-button';
import { Expand, ShoppingCart } from 'lucide-react';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
export interface ProductCardProps {
  data: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router=useRouter() 
  const onClickHandler=()=>{
    router.push(`/product/${data?.id}`)
   }
   const onAddToCart:MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };
   const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };
  return (
    <div onClick={onClickHandler} className=" bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
       <div className='aspect-square rounded-xl bg-gray-100 relative'>
       <Image src={data.images[0].url} alt={data.name} width={200} height={200} className='w-full rounded-md h-auto'/>
       <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
        <div className='flex gap-x-6 justify-center'>
          <IconButton
           onClick={onPreview}
          icon={<Expand size={20}className='text-grey-600'/>}
          className='' />
           <IconButton
           onClick={onAddToCart}
          icon={<ShoppingCart size={20}className='text-grey-600'/>}
          className='' />

        </div>
       </div>
       </div>
       {/*description*/}
      <div>
        <p className='font-semibold text-lg'>{data.name}</p>
        <p className='text-gray-500 text-sm'>{data.category?.name}</p>
      </div>
      {/*price*/}
      <div className=' flex items-center justify-between'>
        <Currency value={data?.price}/>
        </div>
    </div>
  );
};
export default ProductCard;
