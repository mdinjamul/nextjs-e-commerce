"use client";
import {
  fetchForCreateAddress,
  fetchForDeleteAddress,
  fetchForGetAddress,
  fetchForUpdateAddress,
  fetchForUpdateUser,
  fetchUserById,
} from "@/app/functions/fetch";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState();
  const [allAddress, setAllAddress] = useState([]);
  const [addressId, setAddressId] = useState("");

  /******************
   * ADDRESS SECTION
   ******************/

  // fetch user details
  const fetchUser = async () => {
    if (session) {
      const userData = await fetchUserById(session?.user?.id);
      setUserData(userData?.[0]);
    }
  };

  // update user profile details
  const handleUpdateUserSubmit = async (e, fullName, email, avatar) => {
    e.preventDefault();

    // call fetch api to update user
    const updateUser = await fetchForUpdateUser(
      session?.user?.id,
      fullName,
      email,
      avatar
    );

    if (updateUser) {
      toast.success("User Updated");
      // router.push("/user/profile");
    } else {
      toast.error("Unable to update user");
    }
    return updateUser;
  };

  /******************
   * ADDRESS SECTION
   ******************/
  // create address
  const handleCreateAddressSubmit = async (
    e,
    userId,
    street,
    city,
    state,
    phoneNo,
    zipcode,
    country
  ) => {
    e.preventDefault();
    const addAddress = await fetchForCreateAddress(
      userId,
      street,
      city,
      state,
      phoneNo,
      zipcode,
      country
    );

    if (addAddress) {
      toast.success("New Address Added");
      router.push("/user/addresses");
    } else {
      toast.error("Unable to add New Address");
    }
    return addAddress;
  };

  // fetch user address
  const getUserAddress = async () => {
    const addresses = await fetchForGetAddress(session?.user?.id);
    setAllAddress(addresses);
  };

  // store address id to state variable to update the address
  const handleEditAddress = (id) => {
    setAddressId(id);
  };

  // update address
  const handleUpdateAddressSubmit = async (
    e,
    addressId,
    userId,
    street,
    city,
    state,
    phoneNo,
    zipcode,
    country
  ) => {
    e.preventDefault();
    const updateAddress = await fetchForUpdateAddress(
      addressId,
      userId,
      street,
      city,
      state,
      phoneNo,
      zipcode,
      country
    );

    if (updateAddress) {
      toast.success(" Address Updated");
      router.push("/user/addresses");
    } else {
      toast.error("Unable to update Address");
    }
    return updateAddress;
  };

  // delete address
  const handleDeleteAddress = async (id) => {
    try {
      await fetchForDeleteAddress(id);

      // re render the component
      const updatedAddrData = allAddress.filter((item) => item.id !== id);
      setAllAddress(updatedAddrData);

      toast.success("Address Deleted Successfully");
    } catch (error) {
      toast.error("Unable to delete the address");
    }
  };

  // return
  return (
    <UserContext.Provider
      value={{
        fetchUser,
        handleUpdateUserSubmit,
        userData,
        handleCreateAddressSubmit,
        handleUpdateAddressSubmit,
        getUserAddress,
        allAddress,
        addressId,
        handleEditAddress,
        handleDeleteAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContextHook = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("There is a error with User Context");
  }

  return context;
};

export { UserProvider, useUserContextHook };
