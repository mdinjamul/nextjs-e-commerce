"use client";
import Search from "./Search";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { fetchCartItems, fetchUserById } from "@/app/functions/fetch";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userData, setUserData] = useState();
  const [cartData, setCartData] = useState([]);

  // log out
  const logOut = () => {
    toast.warning("You have logged out!!");
    signOut({ redirect: false }).then(() => {
      router.push("/login");
    });
  };

  // fetch user data if session available
  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.id) {
        const userData = await fetchUserById(session.user.id);
        setUserData(userData?.[0]);
      }
    };
    if (session) {
      fetchUser();
    }

    const fetchCart = async () => {
      if (session?.user?.id) {
        const cartItems = await fetchCartItems(session.user.id);
        setCartData(cartItems);
      }
    };
    if (session) {
      fetchCart();
    }
  }, [session, cartData, cartData]);

  // split the name and take only firstname
  const nameParts = userData?.fullName.split(" ");

  return (
    <section className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5">
            <Link href="/">
              <Image
                src={"/images/logo.png"}
                style={{ height: "50px", width: "60px" }}
                height="40"
                width="120"
                alt="BuyItNow"
              />
            </Link>
          </div>
          <Search />

          <div className="flex items-center space-x-2 ml-auto">
            <Link
              href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
              <span className="hidden lg:inline ml-1">
                Cart (<b>{cartData?.length}</b>)
              </span>
            </Link>
            {session?.user ? (
              <>
                <button
                  className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
                  onClick={logOut}
                >
                  <i className="text-gray-400 w-5 fa fa-user"></i>
                  <span className="hidden lg:inline ml-1">Log Out</span>
                </button>
                <Link href="/dashboard/profile">
                  <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                    <Image
                      className="w-10 h-10 rounded-full"
                      src={
                        userData?.avatar
                          ? userData.avatar
                          : "/images/default.png"
                      }
                      height={100}
                      width={100}
                      alt="profile_image"
                    />
                    <div className="space-y-1 font-medium">
                      <p>Hello{`${" "}${nameParts?.[0]}`}</p>
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
                <span className="hidden lg:inline ml-1">Log in</span>
              </Link>
            )}
          </div>

          <div className="lg:hidden ml-2">
            <button
              type="button"
              className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
            >
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
