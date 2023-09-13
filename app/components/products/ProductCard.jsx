"use client";
import { useCartContext } from "@/app/hooks/contexts/CartContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import StarRatings from "react-star-ratings";

const ProductCard = (productData) => {
  const {
    id: productId,
    images,
    title,
    description,
    price,
    stock,
    averageRating,
  } = productData;

  // cart context
  const { addToCart } = useCartContext();

  // collect data for add to cart fn parameter
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const image = images?.[0]?.url;
  const quantity = 1;

  // add to cart function
  // const addToCart = async () => {
  //   if (session) {
  //     const addToCartResponse = await fetchForAddToCart(
  //       userId,
  //       productId,
  //       title,
  //       image,
  //       price,
  //       stock,
  //       quantity
  //     );
  //     if (!addToCartResponse) {
  //       toast.error("Unable to add product to Cart");
  //     } else {
  //       toast.success("Product added to cart");
  //     }
  //   } else {
  //     toast.warning("you are not logged in, please login first");
  //     router.push("/login");
  //   }
  // };
  return (
    <div>
      <article className="border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 flex p-3">
            <div
              style={{
                width: "80%",
                height: "70%",
                position: "relative",
              }}
            >
              <Image
                src={images?.[0].url || "/images/default_product.png"}
                alt="product anme"
                height="240"
                width="240"
              />
            </div>
          </div>
          <div className="md:w-2/4">
            <div className="p-4">
              <Link
                href={`/product/${productId}`}
                className="hover:text-blue-600"
              >
                {title}
              </Link>
              <div className="flex flex-wrap items-center space-x-2 mb-2">
                <div className="ratings">
                  <div className="my-1">
                    <StarRatings
                      rating={averageRating}
                      starRatedColor="#ffb829"
                      numberOfStars={5}
                      starDimension="18px"
                      starSpacing="1px"
                      name="rating"
                    />
                  </div>
                </div>
                <b className="text-gray-300">•</b>
                <span className="ml-1 text-yellow-500">{averageRating}</span>
              </div>
              <p className="text-gray-500 mb-2">{description}</p>
            </div>
          </div>
          <div className="md:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200">
            <div className="p-5">
              <span className="text-xl font-semibold text-black">{price}</span>
              <p className="text-green-500">Free Shipping</p>
              <div className="my-3">
                {productData.stock >= 1 ? (
                  <button
                    className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer"
                    onClick={() =>
                      addToCart(
                        userId,
                        productId,
                        title,
                        image,
                        price,
                        stock,
                        quantity
                      )
                    }
                  >
                    Add to Cart
                  </button>
                ) : (
                  <p className="font-semibold text-red-600">Out of Stock</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ProductCard;
