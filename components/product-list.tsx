"use client";

import ProductCard from "@/components/ui/product-card";
import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import NoResult from "@/components/ui/no-result";

export interface ProductListProps {
  title: string;
  data: Product[];
}

const ProductsList: React.FC<ProductListProps> = ({ title, data }) => {
  const [visibleProducts, setVisibleProducts] = useState<number[]>([]);

  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = [];
    data.forEach((_, index) => {
      const timeoutId = setTimeout(() => {
        setVisibleProducts((prev) => [...prev, index]);
      }, index * 100); // Adjust the delay for smooth appearance
      timeoutIds.push(timeoutId);
    });

    // Clear timeouts if component unmounts
    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [data]);

  return (
    <div className="px-4 py-2">
      <h1 className="py-2 text-3xl font-semibold">{title}</h1>
      {data.length === 0 && <NoResult />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((item, index) => (
          <div
            key={item.id}
            className={`${
              visibleProducts.includes(index) ? "animate-fade-in-up" : ""
            } opacity-0 transition-opacity duration-500`}
          >
            <ProductCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
