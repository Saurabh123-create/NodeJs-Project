import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import SignUp from "./components/SignUp";
import Contact from "./components/Contact";
import ProtectedRoute from "./ProtectedRoute";

export default function Routing() {
  return (
    <Routes>

      <Route element={<ProtectedRoute />}>
        <Route path={"/"} element={<Home />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/contact"} element={<Contact />} />
      </Route>

      <Route path={"/signup"} element={<SignUp />} />

    </Routes>
  );
}
