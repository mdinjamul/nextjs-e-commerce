import prisma from "@/prisma/prismaClient";

/**************
 * ADD ADDRESS
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

/**************
 * GET ADDRESS
 **************/

export const getAddress = async (request) => {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId") || "";
  const id = url.searchParams.get("id") || "";

  let queryParam = {};

  if (userId) {
    queryParam = {
      where: {
        ...queryParam.where,
        userId: {
          equals: userId,
        },
      },
    };
  }

  if (id) {
    queryParam = {
      where: {
        ...queryParam.where,
        id: {
          equals: id,
        },
      },
    };
  }

  try {
    const addresses = await prisma.address.findMany(queryParam);
    return addresses;
  } catch (error) {
    throw error;
  }
};

/*****************
 * UPDATE ADDRESS
 *****************/
export const updateAddress = async (request) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || "";

  const updatedAddrData = await request.json();
  try {
    const address = await prisma.address.update({
      where: {
        id: id,
      },
      data: {
        ...updatedAddrData,
      },
    });

    return address;
  } catch (error) {
    throw error;
  }
};

/*****************
 * DELETE ADDRESS
 *****************/
export const deleteAddress = async (request) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || "";

  try {
    const address = await prisma.address.delete({
      where: {
        id: id,
      },
    });
    return address;
  } catch (error) {
    throw error;
  }
};
