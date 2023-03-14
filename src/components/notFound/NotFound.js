import React from "react";
import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";
import { routes } from "../../routes";

const NotFound = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const userType = JSON.parse(localStorage.getItem("user"));

  if (!token && !userType) {
    return <Navigate to={routes.LOGIN} />;
  }
  return <Box>Not Found</Box>;
};

export default NotFound;
