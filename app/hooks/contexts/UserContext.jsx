"use client";
import { createContext, useContext } from "react";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  return <UserContext.Provider value={""}>{children}</UserContext.Provider>;
};

const useUserContextHook = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("There is a error with Auth Context");
  }

  return context;
};

export { UserProvider, useUserContextHook };
