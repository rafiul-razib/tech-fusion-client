import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaPaypal } from "react-icons/fa";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <SectionHeader heading="User Profile" />
      <div className="card lg:card-side max-w-6xl mx-auto bg-base-100 shadow-xl  rounded-none">
        <figure className="lg:ps-8">
          <img className="w-full" src={user.photoURL} alt="product-img" />
        </figure>
        <div className="card-body w-full">
          <h2 className="text-2xl font-semibold">{user.displayName}</h2>
          <p className="text-sm">Email: {user.email}</p>
          <p className="text-sm">Membership Status : Pending</p>
          {/* <p className="text-lg">Up-vote count : {vote}</p>
        <p className="text-md">External link : {details_link}</p> */}
          <div className="flex">
            <h1 className="text-xl">
              Be a Member :{" "}
              <button className="btn">
                <FaPaypal /> $ 1000
              </button>{" "}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
