export const revalidate = 0;
import React from 'react';
import Container from './ui/container';
import Link from 'next/link';
import MainNav from './main-nav';
import getCategories from '@/actions/get-categories';
import NavbarActions from './navbar-actions';
const Navbar = async () => {
  const categories = await getCategories();
  return (
    <Container>
      <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
        <Link href="/" className="px-4">
          <p>KURTA GLOW</p>
        </Link>
        <MainNav data={categories} />
        <NavbarActions />
      </div>
    </Container>
  );
};

export default Navbar;
