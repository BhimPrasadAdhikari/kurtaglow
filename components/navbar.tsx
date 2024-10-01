export const revalidate = 0;
import React, { useState } from 'react';
import Container from './ui/container';
import Link from 'next/link';
import MainNav from './main-nav';
import getCategories from '@/actions/get-categories';
import NavbarActions from './navbar-actions';
import { Category } from '@/types'; // Adjust the import path as needed

const Navbar = () => {
  const [categories, setCategories] = useState<Category[]>([]); // Explicitly define the type for categories
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  // Fetch categories when the component mounts
  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        console.log("NAVBAR_FETCH_ERROR", err);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to run once on mount

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
        <div className="lg:hidden flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle menu state
            className="inline-flex items-center justify-center p-2 text-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen} // Reflect the state in the attribute
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMobileMenuOpen && ( // Conditional rendering based on state
        <div className="lg:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MainNav data={categories} />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Navbar;
