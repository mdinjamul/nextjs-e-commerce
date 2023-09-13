import { addNewAddress } from "@/backend/controllers/addresses";
import { checkApiKey } from "@/backend/controllers/helper";
import { connectDB } from "@/backend/utils/dbConnect";
import { NextResponse } from "next/server";

/**
 * CREATE ADDERESS
 */
export const POST = async (request) => {
  // check api key
  const checkapi = checkApiKey(request);
  if (!checkapi) {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 500 }
    );
  }

  try {
    await connectDB();
    const addAddress = await addNewAddress(request);

    return NextResponse.json(addAddress);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to add address", error },
      { status: 500 }
    );
  }
};
