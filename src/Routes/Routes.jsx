import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AllProducts from "../pages/AllProducts/AllProducts";
import DashBoard from "../pages/Dashboard/DashBoard";
import UserProfile from "../pages/UserProfile/UserProfile";
import AddProducts from "../pages/AddProducts/AddProducts";
import MyProducts from "../pages/MyProducts/MyProducts";
import UpdateProduct from "../pages/UpdateProduct/UpdateProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    children: [
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "add-product",
        element: <AddProducts />,
      },
      {
        path: "my-products",
        element: <MyProducts />,
      },
      {
        path: "update/:id",
        element: <UpdateProduct />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/${params.id}`),
      },
    ],
  },
]);
