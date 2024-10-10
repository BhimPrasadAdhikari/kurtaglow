export const revalidate = 0;

import getCategory from "@/actions/get-category";

import React from "react";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import Filter from "../../../../components/filters";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";
import MobileFilter from "../../../../components/mobile-filter";
import ColorFilter from "@/components/colorFilter";
import SIzeFilter from "@/components/sizeFilter";
import PriceFilter from "@/components/price-filter";
import DiscountFilter from "@/components/discount-filter";
export interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
    min_price: string;
    max_price: string;
  };
}
const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  try {
    const category = await getCategory(params.categoryId);
    const products = await getProducts({
      categoryId: params.categoryId,
      colorId: searchParams.colorId,
      sizeId: searchParams.sizeId,
      min_price: searchParams.min_price,
      max_price: searchParams.max_price,
    });
    const sizes = await getSizes();
    const colors = await getColors();
    return (
      <div className="bg-white dark:bg-black">
        <Container>
          <Billboard data={category.billboard} />
          <div className="px-4 sm:px-6 lg:px-8 pb-24">
            <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
              <MobileFilter sizes={sizes} colors={colors} />
              <div className="hidden lg:block">
                <SIzeFilter valueKey="sizeId" name="Sizes" data={sizes} />
                <ColorFilter valueKey="colorId" name="Colors" data={colors} />
                <PriceFilter valueKey="price" name="Price Range" />
                <DiscountFilter valueKey="discount" name="Discount Range" />
              </div>
              <div className="mt-6 lg:col-span-4 lg:mt-0">
                {products?.length === 0 && <NoResult />}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {products?.map((item) => {
                    return <ProductCard key={item.id} data={item} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  } catch (err) {
    console.error("CATEGORY_PAGE", err);
  }
};

export default CategoryPage;
