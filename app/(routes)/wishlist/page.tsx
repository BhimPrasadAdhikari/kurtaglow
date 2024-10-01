"use client";

import { useEffect, useState } from 'react';


import Container from '@/components/ui/container';

import WishItem from './components/wish-item';
import useWish from '@/hooks/use-wish';

export const revalidate = 0;

const WishListPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const wish=useWish();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-black">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Your Wishes.</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {wish.items.length === 0 && <p className="text-neutral-500">No items in your wishlist.</p>}
              <ul>
                {wish.items.map((item) => (
                  <WishItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
};

export default WishListPage;