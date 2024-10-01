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
    <div className="ml-auto flex items-center gap-x-4">
      {/* Dark mode toggle */}
      <ModeToggle />

      {/* Wishlist Button */}
      <Button 
        onClick={() => router.push('/wishlist')}
        className="bg-black flex items-center px-2 py-1 sm:px-4 sm:py-2 rounded-full"
      >
        <HeartIcon size={20} color="white" />
        <span className="ml-1 text-xs sm:text-sm font-medium">
          {wish.items.length}
        </span>
      </Button>

      {/* Cart Button */}
      <Button 
        onClick={() => router.push('/cart')}
        className="bg-black flex items-center px-2 py-1 sm:px-4 sm:py-2 rounded-full"
      >
        <ShoppingBag size={20} color="white" />
        <span className="ml-1 text-xs sm:text-sm font-medium">
          {cart.items.length}
        </span>
      </Button>

      {/* User Profile Button */}
      <div className="flex items-center">
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};

export default NavbarActions;
