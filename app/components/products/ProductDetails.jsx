"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import StarRatings from "react-star-ratings";
import BreadCrumbs from "@/app/components/breadcrumbs/BreadCrubms";
import { useSession } from "next-auth/react";
import { useCartContext } from "@/app/hooks/contexts/CartContext";

const ProductDetails = (singleProductData) => {
  const {
    id: productId,
    images,
    title,
    description,
    category,
    seller,
    price,
    stock,
    averageRating,
  } = singleProductData;

  // cart context
  const { addToCart } = useCartContext();

  // change preview images
  const imgRef = useRef(null);
  const setImagePriview = (url) => {
    imgRef.current.src = url;
  };

  // product stock check
  const inStock = stock >= 1;

  // collect data for addToCart function parameter
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const image = images?.[0]?.url;
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <BreadCrumbs />
      <section className="bg-white py-10">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
            <aside>
              <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
                <img
                  ref={imgRef}
                  className="object-cover inline-block"
                  src={images?.[0].url || "/images/default_product.png"}
                  alt="Product title"
                  width="340"
                  height="340"
                />
              </div>
              <div className="space-x-2 overflow-auto text-center whitespace-nowrap">
                {images?.map((image, index) => {
                  return (
                    <a
                      className="inline-block border border-gray-200 p-1 rounded-md hover:border-blue-500 cursor-pointer"
                      onClick={() => setImagePriview(image.url)}
                      key={index}
                    >
                      <Image
                        className="w-14 h-14"
                        src={image.url}
                        alt="Product title"
                        width="500"
                        height="500"
                      />
                    </a>
                  );
                })}
              </div>
            </aside>
            <main>
              <h2 className="font-semibold text-2xl mb-4">{title}</h2>

              <div className="flex flex-wrap items-center space-x-2 mb-2">
                <div className="ratings">
                  <StarRatings
                    rating={averageRating}
                    starRatedColor="#ffb829"
                    numberOfStars={5}
                    starDimension="20px"
                    starSpacing="2px"
                    name="rating"
                  />
                </div>
                <span className="text-yellow-500">{averageRating}</span>

                <svg
                  width="6px"
                  height="6px"
                  viewBox="0 0 6 6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
                </svg>
                <span className="text-green-500">Verified</span>
              </div>
              <p className="mb-4 font-semibold text-xl">{price}</p>
              <p className="mb-4 text-gray-500">{description}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {stock >= 1 ? (
                  <div className="border">
                    <button
                      className="px-4 py-2 inline-block text-black  border hover:bg-gray-200"
                      onClick={() =>
                        setQuantity(quantity > 1 ? quantity - 1 : quantity)
                      }
                    >
                      -
                    </button>
                    <p className="px-4 py-2 inline-block text-black  border">
                      {quantity}
                    </p>
                    <button
                      className="px-4 py-2 inline-block text-black  border hover:bg-gray-200"
                      onClick={() =>
                        setQuantity(quantity < stock ? quantity + 1 : stock)
                      }
                    >
                      +
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {stock >= 1 ? (
                  <button
                    className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
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
                    Add to cart
                  </button>
                ) : (
                  <p className="font-normal text-red-600">
                    Product is not available right now, it will be available
                    soon!
                  </p>
                )}
              </div>

              <ul className="mb-5">
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Stock:</b>
                  <span
                    className={`${
                      inStock ? "text-green-500" : "text-red-500 font-semibold"
                    }`}
                  >
                    {inStock ? "In Stock (" + stock + ")" : "Out of Stock"}
                  </span>
                </li>
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Category:</b>
                  <span className="text-gray-500">{category}</span>
                </li>
                <li className="mb-1">
                  {" "}
                  <b className="font-medium w-36 inline-block">Seller:</b>
                  <span className="text-gray-500">{seller}</span>
                </li>
              </ul>
            </main>
          </div>

          {/* <NewReview /> */}
          <hr />

          <div className="font-semibold">
            <h1 className="text-gray-500 review-title mb-6 mt-10 text-2xl">
              Other Customers Reviews
            </h1>
            {/* <Reviews /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
