import React from "react";
import Home from "./Home";
import { Store } from "./Store";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

const Router = () => {
  const router = createBrowserRouter([
    //redirect from root to /home
    { path: "/", element: <Navigate replace to="/home" /> },
    { path: "/home", element: <Home /> },
    { path: "/store", element: <Store /> },
    //add more routes as needed
  ])

  //return the RouterProvider with the router object
  return <RouterProvider router={router} />;
}

export default Router;

