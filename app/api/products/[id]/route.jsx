import { checkApiKey } from "@/backend/controllers/helper";
import {
  deleteProduct,
  getUniqueProduct,
  updateProduct,
} from "@/backend/controllers/products";
import { calculateAndUpdateAverageRating } from "@/backend/controllers/reviews";
import { connectDB } from "@/backend/utils/dbConnect";
import { NextResponse } from "next/server";

// get single product by id
export const GET = async (request, { params }) => {
  // check api key

  try {
    const { id } = params;
    await connectDB();
    const getSingleProduct = await getUniqueProduct(id);
    return NextResponse.json(getSingleProduct);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to Get Product", error },
      { status: 500 }
    );
  }
};

// update product data
export const PATCH = async (request, { params }) => {
  // check api key

  try {
    const { id } = params;
    await connectDB();

    const updateProductData = await updateProduct(id, request);

    // update averageRating when product details will be updated
    const avarageRatingData = await calculateAndUpdateAverageRating(id);

    if (!updateProductData) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updateProductData, avarageRatingData);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to update Product", error },
      { status: 500 }
    );
  }
};

// DELETE PRODUCT
export const DELETE = async (request, { params }) => {
  // check api key

  try {
    const { id } = params;
    await connectDB();

    const deletedProduct = await deleteProduct(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(deletedProduct, {
      msg: "Product Deleted Successfuly",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to delete Product", error },
      { status: 500 }
    );
  }
};
