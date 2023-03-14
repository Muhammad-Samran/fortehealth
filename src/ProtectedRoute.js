import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { routes } from "./routes";

const ProtectedRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const userType = JSON.parse(localStorage.getItem("user"));

  if (!token && !userType) {
    return <Navigate to={routes.LOGIN} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
