import { useContext, useEffect, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaHome, FaPlus, FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import useAxiosSecure from "../../assets/Hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const DashBoard = () => {
  const [isModerator, setIsModerator] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const { user } = useContext(AuthContext);
  // console.log(user);

  const axiosSecure = useAxiosSecure();

  const { refetch, data: userData = [] } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role?email=${user.email}`);
      if (res.data?.role === "admin") {
        setIsAdmin(true);
      } else if (res.data?.role === "moderator") {
        setIsModerator(true);
      }
      return res.data;
    },
  });
  // console.log(userData);

  console.log("isAdmin", isAdmin);
  console.log("isModerator", isModerator);

  return (
    <div className="flex">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* General Users */}
            <li>
              <Link to={"profile"}>
                <FaRegUser /> My Profile
              </Link>
            </li>
            <li>
              <Link to={"add-product"}>
                <FaPlus /> Add Product
              </Link>
            </li>
            <li>
              <Link to={"my-products"}>
                <AiOutlineProduct /> My Products
              </Link>
            </li>
            <div className="divider"></div>

            {/* MODERATOR */}

            {isModerator && (
              <>
                <li>
                  <Link to={"review-products-queue"} className="disabled">
                    <AiOutlineProduct /> Product Review Queue
                  </Link>
                </li>
                <li>
                  <Link to={"reported-products"}>
                    <FaUser /> Reported Contents
                  </Link>
                </li>

                <div className="divider"></div>
              </>
            )}

            {/* ADMIN */}
            {isAdmin && (
              <>
                <li>
                  <Link to={""}>
                    <AiOutlineProduct /> Statistics
                  </Link>
                </li>
                <li>
                  <Link to={"manage-users"}>
                    <FaUser /> Manage Users
                  </Link>
                </li>
                <li>
                  <Link to={"all-products"}>
                    <AiOutlineProduct /> Manage Coupons
                  </Link>
                </li>

                <div className="divider"></div>
              </>
            )}
            <li>
              <Link to={"/"}>
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to={"/all-products"}>
                <FaHome /> All Products
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
