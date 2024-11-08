"use client";
import Search from "@/app/components/header/Search";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useCartContext } from "@/app/hooks/contexts/CartContext";
import { useUserContextHook } from "@/app/hooks/contexts/UserContext";

const Header = () => {
  const { data: session } = useSession();
  const { cartData, getCartItems } = useCartContext();
  const { userData, fetchUser } = useUserContextHook();

  useEffect(() => {
    getCartItems();
    fetchUser();
  }, [session]);

  // split the name and take only firstname
  const nameParts = userData?.fullName.split(" ");

  return (
    <section className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5">
            <Link href="/">
              <Image src={"/images/logo.png"} style={{ height: "50px", width: "60px" }} height="40" width="120" alt="BuyItNow" />
            </Link>
          </div>
          <Search />

          <div className="flex items-center space-x-2 ml-auto">
            <Link
              href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
              <span className="inline lg:inline ml-1">
                Cart (<b>{cartData?.reduce((accumulator, item) => accumulator + item.quantity, 0)}</b>)
              </span>
            </Link>
            {session?.user ? (
              <>
                <Link href="/user/dashboard">
                  <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                    <Image className="w-10 h-10 rounded-full" src={userData?.avatar ? userData.avatar : "/images/default.png"} height={100} width={100} alt="profile_image" />
                    <div className="space-y-1 font-medium">
                      <p>Hi,{`${" "}${nameParts?.[0]}`}</p>
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
              >
                <i className="text-gray-400 w-5 fa fa-user"></i>
                <span className="inline lg:inline ml-1">Log in</span>
              </Link>
            )}
          </div>

          <div className="lg:hidden ml-2">
            <button type="button" className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent">
              <span className="sr-only">Open menu</span>
              <i className="fa fa-bars fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
