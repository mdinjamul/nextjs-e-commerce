import { checkApiKey } from "@/backend/controllers/helper";
import { getUsers } from "@/backend/controllers/users";
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
