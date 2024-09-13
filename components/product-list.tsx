import ProductCard from '@/components/ui/product-card';
import React from 'react';
import { Product } from '@/types';
import NoResult from '@/components/ui/no-result';

export interface ProductListProps {
  title: string
  data:Product[]
}
const ProductsList: React.FC<ProductListProps> = async ({ title,data }) => {
  return (
    <div className='px-4 py-2'>
      <h1 className='py-2 text-3xl font-semibold'>{title}</h1>
        {data.length===0 && <NoResult/>}
     <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
         {data?.map((item) => {
        return <ProductCard key={item.id} data={item} />;
      })}
      </div>
    </div>
  );
};
export default ProductsList;