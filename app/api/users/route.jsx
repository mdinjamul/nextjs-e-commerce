import { checkApiKey } from "@/backend/controllers/helper";
import { getUsers, updateUser } from "@/backend/controllers/users";
import { connectDB } from "@/backend/utils/dbConnect";
import { NextResponse } from "next/server";

// get users
export const GET = async (request) => {
  // check api key

  try {
    await connectDB();
    const getUser = await getUsers(request);
    return NextResponse.json(getUser);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to Get Users", error },
      { status: 500 }
    );
  }
};

// update user
export const PATCH = async (request) => {
  try {
    await connectDB();
    const updatedUser = await updateUser(request);
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to Update Users", error },
      { status: 500 }
    );
  }
};
