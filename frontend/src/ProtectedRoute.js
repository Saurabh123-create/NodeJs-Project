import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute(){
    let auth = localStorage.getItem('signup user');

    return ( auth ? <Outlet/> : <Navigate to={'/signup'}/>  )
}