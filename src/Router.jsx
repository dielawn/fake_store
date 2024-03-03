import React from "react";
import Home from "./Home";
import { Store } from "./Store";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

const Router = () => {
  const router = createBrowserRouter([
    // Redirect from root to /home
    { path: "/", element: <Navigate replace to="/home" /> },
    { path: "/home", element: <Home /> },
    { path: "/store", element: <Store /> },
    // Add more routes as needed
  ]);

  // Return the RouterProvider with the router object
  return <RouterProvider router={router} />;
};

export default Router;

