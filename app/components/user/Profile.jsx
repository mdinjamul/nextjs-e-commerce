"use client";
import Link from "next/link";
import UserAddresses from "./UserAddresses";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data } = useSession();
  return (
    <>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={"/images/default.png"}
            alt={"user name"}
          />
        </div>
        <figcaption>
          <h5 className="font-semibold text-lg">Ghulam</h5>
          <p>
            <b>Email:</b> ghulam@gmail.com | <b>Joined On:</b>
            2023-12-24
          </p>
        </figcaption>
      </figure>

      <hr className="my-4" />

      <UserAddresses />

      <Link href="/address/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 fa fa-plus"></i> Add new address
        </button>
      </Link>

      <hr className="my-4" />
    </>
  );
};

export default Profile;
