"use client";
import { Slider } from "@/components/ui/slider";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { useState } from "react";
import Currency from "./ui/currency";

interface PriceFilterProps {
  valueKey: string;
  name: string;
}
const PriceFilter: React.FC<PriceFilterProps> = ({ valueKey, name }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams?.get(valueKey);

  // State for the selected price range
  const [priceRange, setPriceRange] = useState<[number, number]>([600, 6000]); // Default range

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
      {/* Price Range Slider */}
      <div className="space-y-4">
        <Slider
          value={priceRange}
          onValueChange={onSliderChange}
          min={600}
          max={6000}
          step={10}
          defaultValue={[1500]}
          className="w-full "
        />
        <div className="flex justify-between text-sm">
          <Currency value={priceRange[0]} />
          <Currency value={priceRange[1]} />
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
