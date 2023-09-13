"use client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../hooks/contexts/AuthContext";
import { CartProvider } from "../hooks/contexts/CartContext";

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
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
