"use client";
import Link from "next/link";
import { BiSolidMap } from "react-icons/bi";

const UserDashboard = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-10">
        <Link href={"/user/addresses"}>
          <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
            <div>
              <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow ">
                <BiSolidMap />
              </span>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Your Addresses</h2>
              <p className="text-sm">Manage Your address</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default UserDashboard;
