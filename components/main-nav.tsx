'use client';
import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Category } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/Button';
interface MainNavProps {
  data: Category[];
}
const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();
  const routes = data?.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));
routes.push( {href:'/orders',label:'Orders', active:pathname==='/orders'})
  return (
    <>
    <DropdownMenu >
      <DropdownMenuTrigger asChild className='mx-5 md:hidden'>
        <Button variant="ghost" size="default" >
        Categories
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className='flex gap-2 flex-col items-center'>
      {routes.map((route) => {
        return (
          <Link
            key={route.href}
            href={route.href}
            className='text-sm font-medium'
          >
            {route.label}
          </Link>
        );
      })}
      </DropdownMenuContent>
    </DropdownMenu>
    
    <nav className="flex flex-row sm:hidden items-center space-x-4 lg:space-x-6">
      {routes.map((route) => {
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'text-sm font-medium',
              route.active
                ? 'text-black dark:text-white'
                : 'text-gray-500'
            )}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
    </>
  );
};
export default MainNav;
