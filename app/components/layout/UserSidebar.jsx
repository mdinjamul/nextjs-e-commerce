"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BsArrowRightShort } from "react-icons/bs";

const UserSidebar = () => {
  const router = useRouter();
  // log out
  const logOut = () => {
    toast.warning("You have logged out!!");
    signOut({ redirect: false }).then(() => {
      router.push("/login");
    });
  };

  return (
    <aside className="md:w-1/3 lg:w-1/4 px-4">
      <ul className="sidebar">
        <li>
          {" "}
          <Link
            href="/user/dashboard"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Dashboard
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/user/addresses"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Your Addresses
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/user/orders"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Orders
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/user/profile"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Profile
          </Link>
        </li>
        <li>
          {" "}
          <Link
            href="/user/security"
            className="block px-3 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-500 rounded-md"
          >
            Security
          </Link>
        </li>

        <li>
          {" "}
          <a
            className="block px-3 py-2 text-red-800 hover:bg-red-100 hover:text-white-500 rounded-md cursor-pointer"
            onClick={logOut}
          >
            Logout
          </a>
        </li>
      </ul>{" "}
      <div className="mt-8  ">
        <Link
          href="/admin/dashboard"
          className=" px-4 py-2 text-white bg-red-600 font-bold hover:bg-red-700 rounded-md"
        >
          <span>
            Go To Admin Panel{" "}
            <BsArrowRightShort className="inline-block text-2xl mb-1" />
          </span>
        </Link>
      </div>
    </aside>
  );
};

export default UserSidebar;
