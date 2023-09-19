"use client";
import Link from "next/link";
import { RiDeleteBinLine, RiDeleteBin7Line } from "react-icons/ri";
import { TiTick } from "react-icons/ti";
import { useCartContext } from "../hooks/contexts/CartContext";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const CartPage = () => {
  // cart context
  const {
    getCartItems,
    cartData,
    isLoading,
    increaseQty,
    decreaseQty,
    subTotalPrice,
    totalUnits,
    gst,
    totalPrice,
    updateCart,
    deleteItem,
  } = useCartContext();

  const { data: session } = useSession();

  // call function to get cart items
  useEffect(() => {
    getCartItems();
  }, [session]);

  return (
    <>
      <section className="py-5 sm:py-7 bg-blue-100">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2">
            {cartData?.length} Item(s) in Cart
          </h2>
        </div>
      </section>

      {isLoading ? (
        <div className="flex items-center justify-center text-4xl font-bold text-gray-400 mt-40">
          <h2>Loading...</h2>
        </div>
      ) : (
        <section className="py-10">
          {cartData.length > 0 ? (
            <div className="container max-w-screen-xl mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Cart items */}
                <main className="md:w-3/4">
                  <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                    {cartData?.map((cartItem) => {
                      return (
                        <div key={cartItem?.id}>
                          <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                            <div className="w-full lg:w-2/5 xl:w-2/4">
                              <figure className="flex leading-5">
                                <div>
                                  <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                    <img
                                      src={cartItem?.image}
                                      alt="cart image title"
                                    />
                                  </div>
                                </div>
                                <figcaption className="ml-3">
                                  <p>
                                    <a href="#" className="hover:text-blue-600">
                                      {cartItem?.title}
                                    </a>
                                  </p>
                                </figcaption>
                              </figure>
                            </div>
                            <div className="w-24">
                              <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                <button
                                  data-action="decrement"
                                  className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                  onClick={() => decreaseQty(cartItem?.id)}
                                >
                                  {cartItem.quantity <= 1 ? (
                                    <span
                                      className="m-auto text-sm font-medium "
                                      onClick={() => deleteItem(cartItem?.id)}
                                    >
                                      <RiDeleteBinLine className="m-auto font-medium" />
                                    </span>
                                  ) : (
                                    <span className="m-auto text-2xl font-medium">
                                      -
                                    </span>
                                  )}
                                </button>
                                <input
                                  className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900 custom-input-number"
                                  value={cartItem?.quantity}
                                  readOnly
                                />

                                <button
                                  data-action="increment"
                                  className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                  onClick={() => increaseQty(cartItem?.id)}
                                >
                                  <span className="m-auto text-2xl font-medium">
                                    +
                                  </span>
                                </button>
                              </div>
                            </div>
                            <div>
                              <div className="leading-5">
                                <p className="font-semibold not-italic">
                                  $
                                  {(
                                    cartItem?.price * cartItem?.quantity
                                  ).toFixed(2)}
                                </p>
                                <small className="text-gray-400">
                                  ${cartItem?.price} / per item
                                </small>
                              </div>
                            </div>
                            <div className="flex-auto flex justify-end items-center">
                              <div className="float-right flex justify-center items-center gap-2">
                                <button
                                  className="px-2 py-2 inline-block text-white text-sm bg-green-600 shadow-sm border border-gray-200 rounded-full hover:bg-green-700 cursor-pointer disabled:bg-gray-300 disabled:hover:bg-gray-300 disabled:cursor-default"
                                  onClick={() => updateCart(cartItem?.id)}
                                  disabled={
                                    cartItem.isQuantityChanged === false
                                  }
                                >
                                  <TiTick />
                                </button>
                                <button
                                  className="px-2 py-2 inline-block text-white text-sm bg-red-600 shadow-sm border border-gray-200 rounded-full hover:bg-red-700 cursor-pointer "
                                  onClick={() => deleteItem(cartItem?.id)}
                                >
                                  <RiDeleteBin7Line />
                                </button>
                              </div>
                            </div>
                          </div>
                          <hr className="my-4" />
                        </div>
                      );
                    })}
                  </article>
                </main>

                {/* Sidebar Calculation Section */}
                <aside className="md:w-1/4">
                  <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                    <ul className="mb-5">
                      <li className="flex justify-between text-gray-600  mb-1">
                        <span>Subtotal price:</span>
                        <span>${subTotalPrice}</span>
                      </li>
                      <li className="flex justify-between text-gray-600  mb-1">
                        <span>Total Units:</span>
                        <span className="text-black-500">
                          {totalUnits} Units
                        </span>
                      </li>
                      <li className="flex justify-between text-gray-600  mb-1">
                        <span>GST (18%):</span>
                        <span>${gst}</span>
                      </li>
                      <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                        <span>Total price:</span>
                        <span>${totalPrice}</span>
                      </li>
                    </ul>

                    <a className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer">
                      Continue
                    </a>

                    <Link
                      href="/products"
                      className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-blue-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                    >
                      Back to shop
                    </Link>
                  </article>
                </aside>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mt-20">
              <h2 className="text-5xl font-bold text-gray-500 mb-5">
                Cart is Empty
              </h2>
              <Link
                href="/products"
                className="px-4 py-3 inline-block text-lg text-center font-medium text-white bg-blue-600 shadow-sm border border-gray-200 rounded-md hover:bg-blue-700"
              >
                Back to shop
              </Link>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default CartPage;
