"use client";
export const revalidate = 0;
import React, { useEffect, useState } from "react";
import Container from "./ui/container";
import Link from "next/link";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import { Category } from "@/types";
import SearchBar from "./search-bar";
import { Search } from "lucide-react";

const Navbar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State to toggle search bar for small screens

  // Async function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await getCategories(); // Adjust the endpoint as needed
      setCategories(response); // Assuming the response is an array of category names
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // useEffect to fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []); // Empty dependency array means this runs once on mount
  return (
    <>
      {" "}
      <Container>
        <div className=" flex flex-shrink items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Branding / Logo */}
          <Link href="/" className="text-lg font-bold">
            <p>KURTA GLOW</p>
          </Link>
          {/* Mobile menu, show/hide based on menu state */}
          <div className="lg:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MainNav data={categories} />
            </div>
          </div>
          {/* Search Bar for large screens */}
          <div className="hidden lg:flex lg:items-center">
            <SearchBar /> {/* Pass categories to SearchBar */}
          </div>

          <div className="lg:hidden relative mx-1 ">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button>
          </div>

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
      </Container>
      <div className="flex items-center justify-center">
        {isSearchOpen && (
          <div className="flex items-center justify-center z-30 mt-2 bg-transparent text-black p-4 rounded shadow-lg w-64">
            <SearchBar /> {/* Pass categories to SearchBar */}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
