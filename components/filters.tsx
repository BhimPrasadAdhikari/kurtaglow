"use client";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React from "react";
interface FilterProps {
  valueKey: string;
  name: string;
  data: (Size | Color)[];
}
const Filter: React.FC<FilterProps> = ({ valueKey, name, data }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams?.get(valueKey);
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
        {data.map((filter) => {
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
    </div>
  );
};

export default Filter;
