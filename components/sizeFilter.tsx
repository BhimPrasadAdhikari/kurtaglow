"use client";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import { Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { useState } from "react";
interface FilterProps {
  valueKey: string;
  name: string;
  data: Size[];
}
const SIzeFilter: React.FC<FilterProps> = ({ valueKey, name, data }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams?.get(valueKey);
  const [showAll, setShowAll] = useState(false); // Manage whether to show all colors or not
  const initialVisibleSizes = 10; // Number of initially visible colors
  const displayedSizes = showAll ? data : data.slice(0, initialVisibleSizes); // Either show all colors or the first 5

  const toggleShowAll = () => {
    setShowAll(!showAll); // Toggle between showing all or limited colors
  };
  const onClick = (id: string) => {
    const current = qs.parse(searchParams!.toString());
    const query = {
      ...current,
      [valueKey]: id,
    };
    if (current[valueKey] === id) {
      query[valueKey] = null;
    }
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
      <div className="flex flex-wrap gap-2">
        {displayedSizes.map((filter) => {
          return (
            <div key={filter.id} className="flex items-center">
              <Button
                className={cn(
                  "rounded-md text-sm text-gray-800 p-2 bg-white border dark:text-white dark:bg-slate-900 border-gray-300 flex gap-1 items-center justify-center",
                  selectedValue === filter.id &&
                    "bg-black text-white dark:bg-white dark:text-black"
                )}
                onClick={() => onClick(filter.id)}
              >
                {filter.name}
              </Button>
            </div>
          );
        })}
      </div>
      {data.length > initialVisibleSizes && (
        <button className="text-blue-500 mt-2" onClick={toggleShowAll}>
          {showAll ? "Show less" : `+${data.length - initialVisibleSizes} more`}
        </button>
      )}
    </div>
  );
};

export default SIzeFilter;
