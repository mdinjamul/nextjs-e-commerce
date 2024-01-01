"use client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/app/hooks/contexts/AuthContext";
import { CartProvider } from "@/app/hooks/contexts/CartContext";
import { UserProvider } from "@/app/hooks/contexts/UserContext";

export default function GlobalProvider({ children }) {
  return (
    <SessionProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
      <AuthProvider>
        <UserProvider>
          <CartProvider>{children}</CartProvider>
        </UserProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
