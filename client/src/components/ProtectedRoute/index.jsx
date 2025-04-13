import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const ProtectedRoute = () => {
  const jwt = Cookies.get("jwtToken");
  console.log(jwt)
  return jwt !== undefined ? <Outlet /> : <Navigate path="/login" />;
};

export default ProtectedRoute;
