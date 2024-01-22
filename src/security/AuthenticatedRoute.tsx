import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { UserContext } from "../context/UserContext";

const AuthenticatedRoute = () => {
  const context = useContext(UserContext);
  console.log("Route", context);
  if (!context.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Outlet></Outlet>;
};

export default AuthenticatedRoute;
