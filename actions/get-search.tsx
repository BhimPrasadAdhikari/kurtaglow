import qs from 'query-string';
import { Product } from '@/types';

// Define the query interface
export interface Query {
  name?: string; // Optional name field
}

// Base API URL for fetching products
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}search`;

// Function to perform the search query
const getSearch = async (query: Query): Promise<Product[]> => {
  // Use qs.stringifyUrl to append query params to the base URL
  const url = qs.stringifyUrl({
    url: baseUrl,
    query: {
      name: query.name, // Attach the name query parameter
    },
  });

  // Perform the fetch request
  const res = await fetch(url);

  // Return the response as JSON
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
};

export default getSearch;
