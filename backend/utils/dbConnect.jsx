import prisma from "@/prisma/prismaClient";
export const connectDB = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    return new Error(error.message);
  }
};
