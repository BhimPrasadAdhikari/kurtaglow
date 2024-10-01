import React, { Suspense } from 'react';
import Container from '@/components/ui/container';
import ProductsList from '@/components/product-list';
import getProducts from '@/actions/get-products';
import getBillboards from '@/actions/get-billboards';
import CarouselPlugin from '@/components/carousalPulgin';
import HomePageSkeleton from "@/components/HomePageSkelton";

export const revalidate = 0;

const HomePage = async () => {
  try { 
    const products = await getProducts({ isFeatured: true });
    const billboards = await getBillboards();

    return (
      <Container>
        <div className='space-y-10 pb-10'>
          {/* Billboard (Commented out for now) */}
          {/* <Billboard data={billboard} /> */}

          <Suspense fallback={<HomePageSkeleton />}>
            <div className='flex items-center justify-center mx-4 md:mx-20'>
              <CarouselPlugin data={billboards} />
            </div>
          </Suspense> 

          <Suspense fallback={<HomePageSkeleton />}>
            <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
              <ProductsList title="Featured Products" data={products} />
            </div>
          </Suspense>
        </div>
      </Container>
    );
  } catch (err) {
    console.log("HOME_PAGE", err);
    return (
      <>Something Went Wrong</>
    );
  }
};

export default HomePage;
