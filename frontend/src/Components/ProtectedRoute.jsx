import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page.
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the requested route.
  return children;
};

export default ProtectedRoute;
