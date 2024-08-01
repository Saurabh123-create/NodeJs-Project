import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import SignUp from "./components/SignUp";
import Contact from "./components/Contact";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./components/Login";
export default function Routing() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path={"/"} element={<Home />} />
        <Route path={"/products"} element={<Products />} />
        <Route path={"/products/:id"} element={<Products />} />
        <Route path={"/contact"} element={<Contact />} />
      </Route>

      <Route path={"/signup"} element={<SignUp />} />
      <Route path={"/login"} element={<Login />} />
    </Routes>
  );
}
