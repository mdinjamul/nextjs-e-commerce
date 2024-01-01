import prisma from "@/prisma/prismaClient";

/**************
 * ADD REVIEW
 **************/
export const addNewReview = async (request) => {
  const { productId, userId, title, rating, comment } = await request.json();
  try {
    // Create a new review and associate it with the user and product
    const reviews = await prisma.review.create({
      data: {
        productId,
        userId,
        title,
        rating,
        comment,
      },
    });

    return reviews;
  } catch (error) {
    throw error;
  }
};

/***************************************
 * CALCULATE AND UPDATE AVARAGE RATING
 ***************************************/

export const calculateAndUpdateAverageRating = async (productId) => {
  try {
    // Fetch all reviews for the specific product
    const productReviews = await prisma.review.findMany({
      where: {
        productId: productId,
      },
      select: {
        rating: true, // Select only the "rating" field from reviews
      },
    });

    // Calculate the average rating
    const totalRatings = productReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    const calculateAverageRating = parseFloat(
      productReviews.length > 0
        ? (totalRatings / productReviews.length).toFixed(1)
        : 0
    );

    // Update the averageRating field in the Product collection
    const updateAvarageRating = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        averageRating: calculateAverageRating,
      },
    });

    return updateAvarageRating;
  } catch (error) {
    throw error;
  }
};

/*****************
 * UPDATE REVIEW
 *****************/
export const updateReview = async (id, updatedData) => {
  const review = await prisma.review.update({
    where: {
      id: id,
    },
    data: {
      ...updatedData,
    },
  });

  return review;
};
