import { addNewAddress } from "@/backend/controllers/addresses";
import { checkApiKey } from "@/backend/controllers/helper";
import { connectDB } from "@/backend/utils/dbConnect";
import { NextResponse } from "next/server";

/**
 * CREATE ADDERESS
 */
export const POST = async (request) => {
  // check api key

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
