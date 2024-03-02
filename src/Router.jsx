import React from "react";
import Home from "./Home";
import { Store } from "./Store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const Router = () => {

  const router = createBrowserRouter([  
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/store",
      element: <Store />,
    },
 
  ])

  // Return the RouterProvider with the router object
  return <RouterProvider router={router} />;
};

export default Router;
