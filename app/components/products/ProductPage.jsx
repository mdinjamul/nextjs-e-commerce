"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Filters from "./Filters";
import ProductCard from "./ProductCard";
import { fetchFilteredProducts } from "@/app/functions/fetch";
import CustomPagination from "../pagination/CustomPagination";

const ProductPage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState();
  const [productsPerPage, setProductsPerPage] = useState();
  const searchParams = useSearchParams();
  const searQuery = searchParams.get("keyword") || "";
  const page = searchParams.get("page") || 1;
  const sort = searchParams.get("sort") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  let category = searchParams.get("category") || "";
  let rating = searchParams.get("rating") || "";

  // make category black for showing all products
  if (category === "all") {
    category = "";
  }

  // calling filtered products
  useEffect(() => {
    const fetchProductsFunction = async () => {
      const productsData = await fetchFilteredProducts(
        searQuery,
        page,
        category,
        sort,
        rating,
        minPrice,
        maxPrice
      );
      setFilteredProducts(productsData.products);
      setTotalProducts(productsData.productCount);
      setProductsPerPage(productsData.productsPerPage);
    };
    fetchProductsFunction();
  }, [searQuery, page, category, sort, rating, minPrice, maxPrice]);

  return (
    <>
      <section className="py-12">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            <Filters />
            <main className="md:w-2/3 lg:w-3/4 px-3">
              {filteredProducts?.map((productData) => {
                return <ProductCard key={productData.id} {...productData} />;
              })}
            </main>
          </div>
        </div>
        <div id="container" className="container m-auto pagination text-center">
          <CustomPagination
            totalProducts={totalProducts}
            productsPerPage={productsPerPage}
          />
        </div>
      </section>
    </>
  );
};

export default ProductPage;
