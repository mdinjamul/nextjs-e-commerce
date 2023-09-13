"use client";
import { fetchForRegister, fetchUserByEmail } from "@/app/functions/fetch";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const router = useRouter();
  // register user function
  const registerUser = async (fullName, email, password) => {
    try {
      // get user by email to check user is already exist or not
      const isUserExist = await fetchUserByEmail(email);

      if (!isUserExist) {
        toast.error("User check failed ");
        return;
      }

      if (isUserExist.length > 0) {
        toast.error("User already exists. Please log in.");
        return;
      }

      // validate email using regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        // Invalid email format
        toast.error("Please enter a valid email address.");
        return;
      }

      // Password validation using regex
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        // Invalid password format
        toast.error(
          "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit."
        );
        return;
      }

      // register new user
      const newUserRegister = await fetchForRegister(fullName, email, password);

      if (!newUserRegister) {
        toast.error("Registration failed");
      } else {
        toast.success("Registration successful, Please Login");
        router.push("/login");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.", error);
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// create custom hook for use Auth context hook
const useAuthContextHook = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("There is a error with Auth Context");
  }
  return context;
};

export { AuthProvider, useAuthContextHook };
