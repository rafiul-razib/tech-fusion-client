import { createBrowserRouter, useParams } from "react-router-dom";
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
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/AllUsers/AllUsers";
import ReviewProductsQueue from "../pages/Login/ReviewProductsQueue/ReviewProductsQueue";
import ReportedProducts from "../pages/ReportedProducts/ReportedProducts";
import Page404 from "../pages/Page404/Page404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Page404 />,
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
      {
        path: "/product/:id",
        element: (
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <AddProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: <AllUsers />,
      },
      {
        path: "review-products-queue",
        element: <ReviewProductsQueue />,
      },
      {
        path: "reported-products",
        element: <ReportedProducts />,
      },
      {
        path: "update/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://tech-fusion-server-gamma.vercel.app/products/${params.id}`
          ),
      },
    ],
  },
]);
