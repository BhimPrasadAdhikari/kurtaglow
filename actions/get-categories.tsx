// "https://admin-dashboard-eight-lemon.vercel.app/api/66e1b12be5a4dd025ef9081f/categories"

import { Category } from "@/types";
const url = `${process.env.NEXT_PUBLIC_API_URL}categories`;
const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
};
export default getCategories;
