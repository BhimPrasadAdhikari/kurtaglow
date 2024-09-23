
import { Badge } from 'lucide-react';
import Currency from '../ui/currency';
const InfoLoading =  () => {
    const specifications=[1,2,3,4]
  return (
    <div className='animate-pulse'>
        <div className='text-3xl font-bold text-gray-200  bg-slate-200 w-32 h-12 '> </div>
       <div className='bg-slate-200 text-gray-200 w-4 h-12'> 
       </div>
        <div className='mt-3 flex'>
             <div>
               <div className='text-3xl font-bold text-gray-200  bg-slate-200 w-32 h-12'> 
                
               </div>

            </div>
        <div className=' mx-2  '>
        <div className='text-3xl font-bold text-gray-200  bg-slate-200 w-32 h-12 '> </div>
            
            </div> 

   <div className='relative'>
    <Badge color='gray' fill='gray' className='absolute' size={38}/>
         </div>
        </div>
        <hr className='my-4 bg-slate-200 text-gray-200'/>
       <div className='flex flex-col gap-y-6 '>
         <div className='flex items-center gap-x-4 '>
            <div className='font-semibold bg-slate-200 text-gray-200 w-32 h-12'> </div>
            <div className='bg-slate-200 text-gray-200 w-32 h-12'>
            </div>
        </div>
        <div className='flex items-center gap-x-4'>
            <div className='font-semibold bg-slate-200 text-gray-200 w-32 h-12'> </div>
            <div className='h-6 w-6 rounded-full border border-gray-200 bg-slate-200'>
            </div>
        </div>
       </div>
       <hr className='my-4 bg-slate-200 text-gray-200'/>
       <div className='text-1xl font-bold bg-slate-200 text-gray-200 w-3 h-12'></div>
       <div className='flex  gap-x-6 '>
      {specifications?.map((specification,index)=>{
 return <div key={index} className='flex flex-col  gap-y-1 '>
 <div className='font-semibold bg-slate-200 text-gray-200 w-32 h-12'> 
 </div>
 <div className='bg-slate-200  w-32 h-12'>
     
 </div>
 <hr />
</div>
      })}
     </div>
       <div className='mt-10 flex items-center gap-x-3 '>
<div className='flex items-center gap-x-2  bg-slate-200 text-gray-200 w-4 h-4' >
</div>
       </div>
    </div>
  )
}

export default InfoLoading