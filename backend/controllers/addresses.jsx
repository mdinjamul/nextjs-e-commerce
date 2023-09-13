import prisma from "@/backend/prisma/prismaClient";

/**************
 * ADD REVIEW
 **************/
export const addNewAddress = async (request) => {
  const { userId, street, city, state, phone, zipCode, country } =
    await request.json();
  try {
    // Create a new review and associate it with the user and product
    const address = await prisma.address.create({
      data: {
        userId,
        street,
        city,
        state,
        phone,
        zipCode,
        country,
      },
    });

    return address;
  } catch (error) {
    throw error;
  }
};
