import prisma from "@/backend/prisma/prismaClient";
import bcrypt from "bcryptjs";

export const addNewUser = async (request) => {
  const { username, fullName, email, phone, password, avatar } =
    await request.json();

  // Validate email using regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      error: "Invalid email format",
    };
  }

  // Validate password using regex (at least 8 characters, one uppercase, one lowercase, and one digit)
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return {
      error:
        "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit",
    };
  }

  // Check if the user already exists
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phone }],
    },
  });

  if (existingUser) {
    return {
      error: "User already exists. Please log in.",
    };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create a new user and associate it with the provided data
    const user = await prisma.user.create({
      data: {
        username,
        fullName,
        email,
        phone,
        password: hashedPassword,
        avatar,
      },
    });

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Rethrow the error for further handling in the route handler
  }
};

/**************
 * GET USER
 **************/

export const getUsers = async (request) => {
  const url = new URL(request.url);
  let queryParam = {};
  const email = url.searchParams.get("email") || "";
  const phone = url.searchParams.get("phone") || "";
  const id = url.searchParams.get("id") || "";

  if (email) {
    queryParam = {
      where: {
        ...queryParam.where,
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    };
  }
  if (phone) {
    queryParam = {
      where: {
        ...queryParam.where,
        phone: {
          equals: phone,
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
    const users = await prisma.user.findMany(queryParam);
    return users;
  } catch (error) {
    throw error;
  }
};

/*****************
 * UPDATE USER
 *****************/
export const updateUser = async (id, updatedData) => {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      ...updatedData,
    },
  });

  return user;
};
