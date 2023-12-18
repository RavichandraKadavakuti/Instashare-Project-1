import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
const ProtectedRoutes = (props) => {
  const token = Cookies.get("jwt_token");
  if (token === undefined) {
    return <Navigate to="/login" />;
  }
  return props.children;
};

export default ProtectedRoutes;
