"use client";
import { createQueryString } from "@/app/functions/commonFunctions";
import { fetchProducts } from "@/app/functions/fetch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

const Filters = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams();

  // fetch all products
  useEffect(() => {
    const fetchCategory = async () => {
      const data = await fetchProducts();
      setAllProducts(data.products);
    };
    fetchCategory();
  }, []);

  // extract categorynames from products
  let categoryNames = allProducts?.map((currentItem) => {
    return currentItem.category.toLowerCase();
  });
  // filter unique categories
  const uniqueCategory = ["all", ...new Set(categoryNames)];

  // handle click on category
  const handleCategoryClick = (event) => {
    router.push("?" + createQueryString(searchparams, "category", event));
  };

  // handle click on rating
  const handleRatingClick = (event) => {
    router.push("?" + createQueryString(searchparams, "rating", event));
  };

  // handle price click
  const handlePriceBtnClick = () => {
    const minPriceParam = createQueryString(searchparams, "minPrice", minPrice);
    const minAndMaxPriceParam = createQueryString(
      minPriceParam,
      "maxPrice",
      maxPrice
    );
    router.push("?" + minAndMaxPriceParam);
  };

  // clear all filters
  const clearFilters = () => {
    router.replace(pathname);
  };

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <a
        className="md:hidden mb-5  w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
        href="#"
      >
        Filter by
      </a>
      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Filter by Price ($)</h3>
        <div className="grid md:grid-cols-3 gap-x-2">
          <div className="mb-4">
            <input
              name="min"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <input
              name="max"
              className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <button
              onClick={handlePriceBtnClick}
              className="px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Go
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
        <h3 className="font-semibold mb-2">Filter by Category</h3>

        <ul className="space-y-1">
          {uniqueCategory?.map((category, index) => {
            return (
              <li key={index}>
                <label className="flex items-center">
                  <input
                    name="category"
                    type="radio"
                    value={category}
                    className="h-4 w-4 "
                    onChange={(e) => handleCategoryClick(e.target.value)}
                  />
                  <span className="ml-2 text-gray-500 capitalize">
                    {" "}
                    {category}{" "}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>

        <hr className="my-4" />

        <h3 className="font-semibold mb-2">Filter by Ratings</h3>
        <ul className="space-y-1">
          <li>
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  name="ratings"
                  type="radio"
                  value={rating}
                  className="h-4 w-4"
                  onChange={(e) => handleRatingClick(e.target.value)}
                />
                <span className="ml-2 text-gray-500">
                  {" "}
                  <StarRatings
                    rating={rating}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />{" "}
                </span>
              </label>
            ))}
          </li>
        </ul>
      </div>
      <button
        onClick={clearFilters}
        className="mt-3 px-1 py-2 text-center w-full inline-block text-white bg-red-600 border border-transparent rounded-md hover:bg-blue-700"
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default Filters;
