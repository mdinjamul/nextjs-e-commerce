import prisma from "@/backend/prisma/prismaClient";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/backend/utils/dbConnect";
import { toast } from "react-toastify";
// import NextAuth from "next-auth/next";

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          await connectDB();
          const user = await prisma.user.findFirst({
            where: {
              email: email,
            },
          });

          if (!user) {
            toast.error("Invalid Credentials");
            return { error: "Invalid Credentials" };
          }

          const passwordMatching = await bcrypt.compare(
            password,
            user.password
          );

          if (!passwordMatching) {
            toast.error("Invalid Credentials");
            return { error: "Invalid Credentials" };
          }

          return user;
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // Set the session max age 7 days
    expires: 30 * 24 * 60 * 60, // set the session expiration time 30 days
  },

  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.user.id;

      delete session?.user?.email;

      return session;
    },

    // async redirect({ url, baseUrl }) {
    //   return url.startsWith(baseUrl + "/login")
    //     ? Promise.resolve("/dashboard/profile")
    //     : Promise.resolve("/login");
    // },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
