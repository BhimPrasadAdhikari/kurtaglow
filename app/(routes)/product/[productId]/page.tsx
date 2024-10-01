import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';
import ProductsList from '@/components/product-list';
import Container from '@/components/ui/container';
import Gallery from '@/components/gallery/';
import Info from '@/components/info';
import { Suspense } from 'react';
import InfoSkeleton from '@/components/skeleton/info_skeleton';
import getSpecifications from '@/actions/get-specifications';
import ProductPageSkeleton from './components/ProductPageSkeleton'; // New skeleton component
import GallerySkeleton from '@/components/skeleton/gallery-skeleton';

export interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const moreProducts = await getProducts({ categoryId: product?.category.id });
  const specifications = await getSpecifications({ categoryId: product?.category.id });

  return (
    <div className="bg-white dark:bg-black">
      <Container>
        <div className="px-4 py-0 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallery with Skeleton */}
            <Suspense fallback={<GallerySkeleton/>}>
              <Gallery images={product.images} />
            </Suspense>

            {/* Info with Skeleton */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Suspense fallback={<InfoSkeleton />}>
                <Info data={product} specifications={specifications} />
              </Suspense>
            </div>
          </div>

          <hr className="my-10" />

          {/* Related Products List with Skeleton */}
          <Suspense fallback={<ProductPageSkeleton />}>
            <ProductsList title="Related Items" data={moreProducts} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
