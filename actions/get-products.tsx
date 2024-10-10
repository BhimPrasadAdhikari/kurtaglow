import qs from "query-string";
import { Product } from "@/types";
export interface Query {
  colorId?: string;
  sizeId?: string;
  categoryId?: string;
  isFeatured?: boolean;
  name?: string;
  min_price?: string;
  max_price?: string;
  min_discount?: string;
  max_discount?: string;
}
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}products`;
// const baseUrl="https://admin-dashboard-eight-lemon.vercel.app/api/66e1b12be5a4dd025ef9081f/products"
const getProducts = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: baseUrl,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
      name: query.name,
      min_price: query.min_price,
      max_price: query.max_price,
      min_discount: query.min_discount,
      max_discount: query.max_discount,
    },
  });
  const res = await fetch(url);
  return res.json();
};
export default getProducts;
