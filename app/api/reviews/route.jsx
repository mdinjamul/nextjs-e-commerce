import { checkApiKey } from "@/backend/controllers/helper";
import {
  addNewReview,
  calculateAndUpdateAverageRating,
} from "@/backend/controllers/reviews";
import { connectDB } from "@/backend/utils/dbConnect";
import { NextResponse } from "next/server";

// add new review
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
    const addReview = await addNewReview(request);

    // update averageRating when new review will be created
    const avarageRatingData = await calculateAndUpdateAverageRating(productId);

    return NextResponse.json(addReview, avarageRatingData);
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to add review", error },
      { status: 500 }
    );
  }
};
