import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    // User not logged in, redirect to login
    return <Navigate to="/" replace />;
  }

  // User logged in, render children
  return children;
};

export default ProtectedRoute;