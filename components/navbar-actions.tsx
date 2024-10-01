"use client";
import { HeartIcon, ShoppingBag } from 'lucide-react';
import Button from './Button';
import { useEffect, useState } from 'react';
import useCart from "@/hooks/use-cart";
import { useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { ModeToggle } from './ui/mode-toggle';
import useWish from '@/hooks/use-wish';

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const cart = useCart();
  const wish = useWish();
  const router = useRouter();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4 relative">
      <ModeToggle />
      
      {/* Wishlist Button */}
      <div className="relative">
        <Button 
          onClick={() => router.push('/wishlist')}
          className="bg-black flex items-center p-2 rounded-full">
          <HeartIcon size={20} color="white" />
        </Button>
        {wish.items.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
            {wish.items.length}
          </span>
        )}
      </div>

      {/* Cart Button */}
      <div className="relative">
        <Button 
          onClick={() => router.push('/cart')}
          className="bg-black flex items-center p-2 rounded-full">
          <ShoppingBag size={20} color="white" />
        </Button>
        {cart.items.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
            {cart.items.length}
          </span>
        )}
      </div>

      {/* User Button */}
      <UserButton afterSignOutUrl='/' />
    </div>
  );
};

export default NavbarActions;
