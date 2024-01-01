import ProductDetails from "@/app/components/products/ProductDetails";
import { fetchSingleProduct } from "@/app/functions/fetch";
import React from "react";

const SingleProductPage = async ({ params }) => {
  const singleProductData = await fetchSingleProduct(params.id);

  return (
    <>
      <ProductDetails {...singleProductData} />;
    </>
  );
};

export default SingleProductPage;
