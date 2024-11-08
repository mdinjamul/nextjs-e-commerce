"use client";
import UserAddresses from "@/app/components/user/UserAddresses";
import { useUserContextHook } from "@/app/hooks/contexts/UserContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

const AddressesPage = () => {
  const { allAddress, getUserAddress } = useUserContextHook();
  const { data: session } = useSession();

  useEffect(() => {
    getUserAddress();
  }, [session]);

  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-5">
          {allAddress?.map((address) => {
            return <UserAddresses key={address?.id} {...address} />;
          })}
        </div>
      </div>

      <Link href="/user/addresses/new">
        <button className="px-4 py-2 inline-block text-blue-600 border border-gray-300 rounded-md hover:bg-gray-100">
          <i className="mr-1 fa fa-plus"></i> Add new address
        </button>
      </Link>

      <hr className="my-4" />
    </>
  );
};

export default AddressesPage;
