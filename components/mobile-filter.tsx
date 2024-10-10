"use client";

import Button from "@/components/Button";
import { Color, Size } from "@/types";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import IconButton from "@/components/ui/icon-button";
import SIzeFilter from "./sizeFilter";
import ColorFilter from "./colorFilter";
import PriceFilter from "./price-filter";
import DiscountFilter from "./discount-filter";

interface MobileFilterProps {
  sizes: Size[];
  colors: Color[];
}
const MobileFilter: React.FC<MobileFilterProps> = ({ sizes, colors }) => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        Filters
        <Plus size={20} />
      </Button>
      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        {/* background */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white  dark:bg-slate-900 py-4 pb-6 shadow-xl">
            {/* close button */}
            <div className="flex items-center justify-end px-4">
              <IconButton
                className="dark:bg-black"
                icon={<X size={15} />}
                onClick={onClose}
              />
            </div>
            {/* rendeer filters */}
            <div className="p-4">
              <SIzeFilter valueKey="sizeId" name="Sizes" data={sizes} />
              <ColorFilter valueKey="colorId" name="Colors" data={colors} />
              <PriceFilter valueKey="price" name="Price Range" />
              <DiscountFilter valueKey="discount" name="Discount Range" />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilter;
