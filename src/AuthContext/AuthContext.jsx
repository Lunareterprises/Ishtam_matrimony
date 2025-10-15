import { createContext, useContext } from "react";

// Create the context
export const AuthContext = createContext();

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}