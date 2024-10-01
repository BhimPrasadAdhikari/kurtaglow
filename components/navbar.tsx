export const revalidate = 0;
import React from 'react';
import Container from './ui/container';
import Link from 'next/link';
import MainNav from './main-nav';
import getCategories from '@/actions/get-categories';
import NavbarActions from './navbar-actions';

const Navbar = async () => {
  try {
    const categories = await getCategories();
    return (
      <Container>
        <div className="relative flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Branding / Logo */}
          <Link href="/" className="text-lg font-bold">
            <p>KURTA GLOW</p>
          </Link>

          {/* Main Navigation for larger screens */}
          <div className="hidden lg:flex">
            <MainNav data={categories} />
          </div>

          {/* Navbar actions like cart, login, etc. */}
          <div className="flex items-center space-x-4">
            <NavbarActions />
          </div>

          {/* Hamburger menu for small screens */}
          </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className="lg:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MainNav data={categories} />
          </div>
        </div>
      </Container>
    );
  } catch (err) {
    console.log("NAVBAR_FETCH_ERROR", err);
  }
};

export default Navbar;
