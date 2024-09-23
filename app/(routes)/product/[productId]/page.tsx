import getProduct from '@/actions/get-product'
import getProducts from '@/actions/get-products';
import ProductsList from '@/components/product-list';
import Container from '@/components/ui/container';
import Gallery from '@/components/gallery/';
import Info from '@/components/info';
import { Suspense } from 'react';
import InfoLoading from '@/components/skeleton/info_skeleton';

export interface ProductPageProps{
 params:{
    productId:string
 }
}
const ProductPage:React.FC<ProductPageProps> = async({
    params
}) => {
    const product=await getProduct(params.productId);
    const moreProducts=await getProducts({categoryId:product?.category.id})
    return (
    <div className='bg-white'>
     <Container>
      <div className='px-4 py-10 sm:px-6 lg:px-8'>
     <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
     <Suspense fallback={<div className='w-96 h-96 bg-slate-200 animate-pulse'></div>}>
     <Gallery images={product.images}/>
     </Suspense>
      <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
     <Suspense fallback={<InfoLoading/>}>

        <Info data={product}/>
     </Suspense>

      </div>
     </div>
     <hr  className=' my-10'/>
     <Suspense fallback={<p>loading products....</p>}>

     <ProductsList title="Related Items"  data={moreProducts}/>
     </Suspense>

      </div>
     </Container>
    
    </div>
  )
}

export default ProductPage