import {
  addNewAddress,
  deleteAddress,
  getAddress,
  updateAddress,
  updateDefaultAddress,
} from "@/backend/controllers/addresses";
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

/**
 * GET ADDRESS
 */
export const GET = async (request) => {
  try {
    await connectDB();
    const userAddress = await getAddress(request);

    return NextResponse.json(userAddress);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to get address", error },
      { status: 500 }
    );
  }
};

/**
 * UPDATE ADDRESS
 */
export const PATCH = async (request) => {
  try {
    await connectDB();
    const updateAddr = await updateAddress(request);

    return NextResponse.json(updateAddr);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to Update Address" },
      { status: 500 }
    );
  }
};

/**
 * DELETE ADDRESS
 */
export const DELETE = async (request) => {
  try {
    connectDB();
    const deleteAddr = await deleteAddress(request);

    return NextResponse.json(deleteAddr);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to delete address" },
      { status: 500 }
    );
  }
};
