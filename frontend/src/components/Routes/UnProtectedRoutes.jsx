import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../";

const UnProtectedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default UnProtectedRoutes;
