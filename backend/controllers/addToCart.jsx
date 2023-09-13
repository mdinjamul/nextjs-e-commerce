import prisma from "@/backend/prisma/prismaClient";

// create cart items
export const addToCartItems = async (request) => {
  const { userId, productId, title, image, price, stock, quantity } =
    await request.json();

  try {
    const createNewCartItem = await prisma.cart.create({
      data: {
        userId,
        productId,
        title,
        image,
        price,
        stock,
        quantity,
      },
    });

    return createNewCartItem;
  } catch (error) {
    console.log(error);
  }
};

// get cart items
export const getCartItems = async (request) => {
  const url = new URL(request.url);
  let queryParam = {};
  const userId = url.searchParams.get("userId") || "";
  const productId = url.searchParams.get("productId") || "";
  const id = url.searchParams.get("id") || "";

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
  if (productId) {
    queryParam = {
      where: {
        ...queryParam.where,
        productId: {
          equals: productId,
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
    const cartItems = await prisma.cart.findMany(queryParam);
    return cartItems;
  } catch (error) {
    throw error;
  }
};

// update cart items
export const updateCart = async (request) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || "";

  const updatedCartData = await request.json();

  try {
    const cartUpdate = await prisma.cart.update({
      where: {
        id: id,
      },
      data: {
        ...updatedCartData,
      },
    });

    return cartUpdate;
  } catch (error) {
    throw error;
  }
};

// Delete cart items
export const deleteCartItem = async (request) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id") || "";

  try {
    const cartDelete = await prisma.cart.delete({
      where: {
        id: id,
      },
    });

    return cartDelete;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
