import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import logo from "../../assets/logo/TF1-removebg-preview.png";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut();
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>

      <li>
        <NavLink to={"/all-products"}>All Products</NavLink>
      </li>

      {user ? (
        <li>
          <Link onClick={handleLogOut}>LogOut</Link>
        </li>
      ) : (
        <li>
          <NavLink to={"/login"}>Login</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar fixed bg-slate-700 opacity-60 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <img src={logo} alt="" className="w-1/3 pl-6" />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        <span>{user?.email}</span>

        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ml-12"
            >
              <div className="w-10 rounded-full">
                <img alt="User Image" src={user?.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box  mt-4"
            >
              <li>
                <h1>{user?.displayName}</h1>
              </li>
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
              <li>
                <button className="btn btn-sm" onClick={handleLogOut}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
