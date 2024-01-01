import { useUserContextHook } from "@/app/hooks/contexts/UserContext";
import Link from "next/link";
import { BiSolidMap } from "react-icons/bi";

const UserAddresses = (address) => {
  const { handleEditAddress, handleDeleteAddress, handleSetDefaultAddress } =
    useUserContextHook();

  return (
    <div className="mb-5 gap-4 bg-gray-100  p-4 rounded-md relative overflow-hidden">
      <div className="w-full flex align-center  ">
        <div className="mr-3">
          <span className="flex items-center justify-center text-yellow-500 w-12 h-12 bg-white rounded-full shadow mt-2">
            <BiSolidMap />
          </span>
        </div>
        <div className="text-gray-600">
          <p>
            {address?.street}
            <br />
            {address?.city}
            <br /> {address?.state}
            <br />
            {address?.zipCode}
            <br /> {address?.country}
            <br /> {address?.phone}
          </p>

          <div className="mt-5 text-sm flex gap-4">
            <Link
              href={"/user/addresses/update"}
              className="text-blue-600"
              onClick={() => handleEditAddress(address.id)}
            >
              Edit
            </Link>

            <button
              className="text-red-600"
              onClick={() => handleDeleteAddress(address.id)}
            >
              Delete
            </button>

            {/* {address?.isDefault ? (
              <div className="default absolute top-0 right-0 py-1 px-5 m-3 rounded-full bg-green-500 text-white text-sm">
                <span>Default</span>
              </div>
            ) : (
              <button
                className="text-green-700"
                onClick={() => handleSetDefaultAddress(address.id)}
              >
                Set as Default
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAddresses;
