import React from "react";
import App from "./App";
import Home from "./Home";
import { Store } from "./Store";
import Cart from "./Cart";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/store",
      element: <Store />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
  ]);

  // Return the RouterProvider with the router object
  return <RouterProvider router={router} />;
};

export default Router;
