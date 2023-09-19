import { checkApiKey } from "@/backend/controllers/helper";
import { addNewUser } from "@/backend/controllers/users";
import { connectDB } from "@/backend/utils/dbConnect";
import { NextResponse } from "next/server";

// add new review
export const POST = async (request) => {
  // check api key

  try {
    await connectDB();
    const addUser = await addNewUser(request);

    return NextResponse.json(addUser);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to add user", error },
      { status: 500 }
    );
  }
};
