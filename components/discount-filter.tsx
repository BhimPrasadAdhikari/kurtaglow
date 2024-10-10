"use client";
import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { useState } from "react";

interface DiscountFilterProps {
  valueKey: string;
  name: string;
}
const DiscountFilter: React.FC<DiscountFilterProps> = ({ valueKey, name }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams?.get(valueKey);

  // State for the selected price range
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30]); // Default range

  // Update the query params when slider changes
  const onSliderChange = (value: [number, number]) => {
    setPriceRange(value);
    const current = qs.parse(searchParams!.toString());
    const query = {
      ...current,
      [`min_${valueKey}`]: value[0],
      [`max_${valueKey}`]: value[1],
    };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  };
  return (
    <div className="mb-8 ">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      {/* Discount Range Slider */}
      <div className="space-y-4">
        <Slider
          value={priceRange}
          onValueChange={onSliderChange}
          min={0}
          max={30}
          step={5}
          defaultValue={[0]}
          className="w-full "
        />
        <div className="flex justify-between text-sm">
          <span>{priceRange[0]}%</span>
          <span>{priceRange[1]}%</span>
        </div>
      </div>
    </div>
  );
};

export default DiscountFilter;
