"use client"
import { ShoppingBag } from 'lucide-react';
import Button from './Button';
import { useEffect, useState } from 'react';
import useCart from "@/hooks/use-cart";
import { useRouter } from 'next/navigation';

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const cart = useCart();
const router=useRouter();
  if (!isMounted) {
    return null;
  }
  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button 
      onClick={() => router.push('/cart')}
      className="bg-black flex items-center px-4 py-2 rounded-full">
        <ShoppingBag size={20} color="white" />
        <span className="ml-1 text-sm font-medium">
        {cart.items.length}

        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;
