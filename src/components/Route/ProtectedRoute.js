import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading === false) {
    if (isAuthenticated === false) {
      return <Navigate to="/medicines" />;
    }
    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/medicines" />;
    }
    return <Outlet />;
  }
  return null;
};

export default ProtectedRoute;
