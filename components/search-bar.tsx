import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import getProducts from "@/actions/get-products";
import getCategories from "@/actions/get-categories";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length < 3) {
      toast.error("Query must be at least 3 characters long.");
      return;
    }

    // Regular expression to check if the query contains only letters
    const regex = /^[a-zA-Z\s]+$/; // This matches only letters (uppercase and lowercase)

    if (!regex.test(query)) {
      toast.error("Query can only contain letters.");
      return;
    }

    router.push(`/product/?search=${query}`);
  };
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const products = await getProducts({});
        const productNames = products?.map((product) => product?.name);
        const categories = await getCategories();
        const categoryNames = categories?.map((category) => category?.name);
        const suggestions = categoryNames?.concat(...productNames);
        setSuggestions(suggestions);
      } catch (error) {
        console.error("SEARCH_BAR_ERROR ", error);
      }
    };
    fetchNames();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    // Filter suggestions based on the query
    const filtered = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowDropdown(value.length > 0 && filtered.length > 0); // Show dropdown if there are suggestions
  };
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion.toLowerCase());
    setShowDropdown(false); // Close dropdown on selection
    // Implement further action on selection, if needed
  };
  return (
    <div className=" w-full relative ">
      <form onSubmit={handleSearch} className="flex items-center">
        <Input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search by category or product name"
          className=" flex-grow min-w-[200px] rounded-l-md px-4 py-2 dark:text-white" // Ensure it grows and has a minimum width
        />
        <button
          type="submit"
          className="bg-yellow-600  text-white rounded-r-md px-4 py-2"
        >
          <Search />
        </button>
      </form>
      {showDropdown && (
        <div className="absolute z-20 w-full bg-white dark:bg-black  rounded-md mt-1 max-h-60 ">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200 dark:text-white"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
