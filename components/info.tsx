
import { Product } from '@/types'
import React from 'react'
import Currency from '@/components/ui/currency';
import Button from '@/components/Button';
import { Badge } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';
import getSpecifications from '@/actions/get-specifications';
interface InfoProps{
    data:Product;
}
const Info: React.FC<InfoProps> = async ({
    data
}) => {
  const specifications=  await getSpecifications({categoryId:data.category.id});
// const specifications=data?.category.specifications
  console.log("specification",specifications)
  return (
    <div>
        <h1 className='text-3xl font-bold text-gray-900'>{data?.name}</h1>
       <span>{data?.detail}</span>
        <div className='mt-3 flex '>
        <div className=' text-2xl text-gray-900'>
              <Currency  value={data?.price-data?.discount/100*data?.price}/>
            </div>
        <div className='text-gray-400 mx-2 line-through decoration-red-500 '>
              <Currency value= {data?.price}/>
            
            </div> 

   <div className='relative'>
    <Badge color='red' fill='red' className='absolute' size={38}/>
       <span className='absolute left-1 top-1 text-white'>{data?.discount}&#37;</span>
         </div>
        </div>
        <hr className='my-4'/>
       <div className='flex flex-col gap-y-6'>
         <div className='flex items-center gap-x-4 '>
            <h3 className='font-semibold text-black'> Size:</h3>
            <div>
                {data?.size?.name}
            </div>
        </div>
        <div className='flex items-center gap-x-4 '>
            <h3 className='font-semibold text-black'> Color:</h3>
            <div className='h-6 w-6 rounded-full border border-gray-600' style={{backgroundColor:data?.color.value}}>
            </div>
        </div>
       </div>
       <hr className='my-4'/>
       <h2 className='text-1xl font-bold text-gray-900'>Specifications</h2>
       <div className='flex  gap-x-6'>
      {specifications?.map((specification,index)=>{
 return <div key={index} className='flex flex-col  gap-y-1 '>
 <h3 className='font-semibold text-gray-500'> {specification.name}</h3>
 <div>
     {specification.value}
 </div>
 <hr />
</div>
      })}
       </div>
       <div className='mt-10 flex items-center gap-x-3'>
<Button className='flex items-center gap-x-2'>
    Add To Cart
    <ShoppingCart/>
</Button>
       </div>
    </div>
  )
}

export default Info