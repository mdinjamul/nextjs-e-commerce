import {
  addToCartItems,
  deleteCartItem,
  getCartItems,
  updateCart,
} from "@/backend/controllers/addToCart";
import { checkApiKey } from "@/backend/controllers/helper";
import { connectDB } from "@/backend/utils/dbConnect";
import { NextResponse } from "next/server";

// Create cart items
export const POST = async (request) => {
  try {
    await connectDB();
    const createCartItem = await addToCartItems(request);

    return NextResponse.json(createCartItem);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to add address", error },
      { status: 500 }
    );
  }
};

// get cart items
export const GET = async (request) => {
  // check api

  try {
    await connectDB();
    const cartItems = await getCartItems(request);

    return NextResponse.json(cartItems);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to get cart items", error },
      { status: 500 }
    );
  }
};

// update cart data
export const PATCH = async (request) => {
  // check api key

  try {
    await connectDB();
    const updateCartData = await updateCart(request);

    if (!updateCartData) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updateCartData);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to update Cart", error },
      { status: 500 }
    );
  }
};

// delete cart data
export const DELETE = async (request) => {
  // check api key

  try {
    await connectDB();
    const deleteCartData = await deleteCartItem(request);

    if (!deleteCartData) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deleteCartData);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to delete Cart", error },
      { status: 500 }
    );
  }
};
