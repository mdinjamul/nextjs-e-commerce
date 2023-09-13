import { checkApiKey } from "@/backend/controllers/helper";
import { createProduct, getAllProducts } from "@/backend/controllers/products";
import { calculateAndUpdateAverageRating } from "@/backend/controllers/reviews";
import { connectDB } from "@/backend/utils/dbConnect";
import { NextResponse } from "next/server";

// create product
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
    const newProduct = await createProduct(request);

    // update averageRating when new product details will be created
    const avarageRatingData = await calculateAndUpdateAverageRating(
      newProduct.id
    );

    return NextResponse.json(newProduct, avarageRatingData);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to Create Product", error },
      { status: 500 }
    );
  }
};

// get product
export const GET = async (request) => {
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
    const getProducts = await getAllProducts(request);
    return NextResponse.json(getProducts);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to Get Products", error },
      { status: 500 }
    );
  }
};
