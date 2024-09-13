"use client";

import { useEffect, useState } from "react";



import PreviewModal from "@/components/preview-modal";
import ShippingModal from "@/components/customer-modal";
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return ( 
    <>
      <PreviewModal />
      <ShippingModal/>
    </>
   );
}
 
export default ModalProvider;