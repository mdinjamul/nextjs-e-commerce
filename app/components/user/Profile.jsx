"use client";
import { useUserContextHook } from "@/app/hooks/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";

const Profile = () => {
  const { userData } = useUserContextHook();

  return (
    <>
      <div className="flex items-start justify-between sm:items-center">
        <div>
          <h5 className="font-semibold text-lg">
            Full Name : {userData?.fullName}
          </h5>
          <p>
            <b>Email:</b> {userData?.email} <br /> <b>Joined On: </b>
            {userData?.createdAt}
          </p>
        </div>
        <div className="relative flex items-center flex-row">
          <div className="mr-5">
            <h2>Profile Picture</h2>
          </div>
          <div>
            <Image
              width={100}
              height={100}
              className="w-16 h-16 rounded-full mr-4"
              src={userData?.avatar ? userData.avatar : "/images/default.png"}
              alt={userData?.fullName ? userData.fullName : "User Name"}
            />
          </div>
        </div>
      </div>
      <div className="bg-blue-600 mt-5 inline-block py-2 px-4 rounded text-white cursor-pointer hover:bg-blue-700">
        <Link href="/user/profile/update">Edit Profile</Link>
      </div>
    </>
  );
};

export default Profile;
