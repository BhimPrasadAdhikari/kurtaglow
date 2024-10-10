"use client";
import React, { Suspense, useEffect, useState } from "react";
import Container from "@/components/ui/container";
import ProductsList from "@/components/product-list";
import { useSearchParams } from "next/navigation";
import ProductsListSkeleton from "@/components/ProductPage-skeleton";
import { Product } from "@/types";
import toast from "react-hot-toast";
import getSearch from "@/actions/get-search";

export const revalidate = 0;

const ProductPage = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const name = searchParams?.get("search");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (name) {
        try {
          const products = await getSearch({ name: name });
          const dp = products.filter(
            (product) =>
              product.name.toLowerCase() === name.toLowerCase() ||
              product.category.name.toLowerCase() === name.toLowerCase()
          );
          setProducts(dp);
        } catch (err) {
          toast.error("something went wrong");
          console.error("PRODUCTS_FETCH", err);
        }
        setLoading(false);
      }
    };
    fetchProducts();
  }, [name]);

  if (loading) {
    return <ProductsListSkeleton />;
  }

  return (
    <Container>
      <div className="space-y-10 pb-10 h-full">
        <Suspense fallback={<ProductsListSkeleton />}>
          <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ProductsList title="" data={products} />
          </div>
        </Suspense>
      </div>
    </Container>
  );
};

export default ProductPage;
