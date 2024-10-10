"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/Button";
import { AlignJustify } from "lucide-react";

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

  // Adding Orders link
  routes.push({
    href: "/orders",
    label: "Orders",
    active: pathname === "/orders",
  });

  return (
    <>
      {/* Dropdown Menu for mobile view */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="mx-2 md:hidden">
          <Button variant="ghost" size="default">
            <AlignJustify size={15} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="flex gap-2 flex-col items-center"
        >
          {routes.map((route) => (
            <DropdownMenuItem key={route.href}>
              <Link href={route.href} className="text-sm font-medium">
                {route.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Horizontal Navigation for larger screens */}
      <nav className="hidden md:flex flex-row items-center space-x-4 lg:space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium",
              route.active ? "text-black dark:text-white" : "text-gray-500"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </>
  );
};

export default MainNav;
