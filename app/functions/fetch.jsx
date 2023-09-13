import { toast } from "react-toastify";

/**********************
 * FETCH ALL PRODUCTS
 ***********************/
export const fetchProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    toast.error("Unable to fetch Products", err);
  }
};

/**************************
 * FETCH FILTERED PRODUCTS
 **************************/
export const fetchFilteredProducts = async (
  searQuery,
  page,
  category,
  sort,
  rating,
  minPrice,
  maxPrice
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?apiKey=${
        process.env.NEXT_PUBLIC_API_KEY
      }&&keyword=${searQuery || ""}&&page=${page}&&perPage=3&&category=${
        category || ""
      }&&sort=${sort || ""}&&rating=${rating || ""}&&minPrice=${
        minPrice || ""
      }&&maxPrice=${maxPrice || ""}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    toast.error("Unable to Fetch Products", err);
  }
};

export const fetchSingleProduct = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${id}?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const data = await response.json();
  return data;
};

/**********************
 * FETCH USER DETAILS
 ***********************/
// fetch by id
export const fetchUserById = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&&id=${id}`
    );
    const userData = await response.json();
    return userData;
  } catch (err) {
    toast.error("Unable to Fetch User", err);
  }
};

// fetch by email
export const fetchUserByEmail = async (email) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&&email=${email}`
    );
    const userData = await response.json();
    return userData;
  } catch (err) {
    toast.error("Unable to Fetch User", err);
  }
};

// fetch by phone
export const fetchUserByPhone = async (phone) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&&phone=${phone}`
    );
    const userData = await response.json();
    return userData;
  } catch (err) {
    toast.error("Unable to Fetch User", err);
  }
};

/**********************
 * CREATE NEW USER
 ***********************/
export const fetchForRegister = async (fullName, email, password) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      }
    );
    return response;
  } catch (err) {
    toast.error("Unable to Fetch User", err);
  }
};

/**********************
 * CREATE CART ITEMS
 ***********************/
export const fetchForAddToCart = async (
  userId,
  productId,
  title,
  image,
  price,
  stock,
  quantity
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId,
          title,
          image,
          price,
          stock,
          quantity,
        }),
      }
    );
    return response;
  } catch (err) {
    toast.error("Unable to create cart", err);
  }
};

/**********************
 * GET CART ITEMS
 ***********************/
export const fetchCartItems = async (userId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&&userId=${userId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch cart data: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("unable to get cart items");
  }
};

/**********************
 * UPDATE CART ITEMS
 ***********************/
export const fetchForUpdateCart = async (id, updatedCartData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&&id=${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: updatedCartData.quantity }),
      }
    );
    return response;
  } catch (err) {
    toast.error("Unable to update cart", err);
  }
};

/**********************
 * DELETE CART ITEMS
 ***********************/
export const fetchForDeleteCart = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cart?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&&id=${id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
  } catch (err) {
    toast.error("Unable to Delete cart", err);
  }
};
