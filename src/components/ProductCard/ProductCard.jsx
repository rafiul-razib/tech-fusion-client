import { BiDownvote, BiUpvote } from "react-icons/bi";
import useAxiosSecure from "../../assets/Hooks/useAxiosSecure";
import useUserProducts from "../../assets/Hooks/useUserProducts";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { GrDislike, GrLike } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import PrivateRoute from "../../Routes/PrivateRoute";

const ProductCard = ({ product }) => {
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useUserProducts();
  const { user } = useContext(AuthContext);
  const [onceClicked, setOnceClicked] = useState(false);
  const navigate = useNavigate();
  const {
    product_name,
    image,
    tags,
    description,
    _id,
    vote,
    downVote,
    owner_email,
  } = product;

  const handleUpVote = async (id) => {
    if (user) {
      const res = await axiosSecure.post(`product/upVote/${id}`);
      console.log(res.data);
      refetch();

      setOnceClicked(true);
    } else {
      navigate("/login");
    }
  };
  const handleDownVote = async (id) => {
    const res = await axiosSecure.post(`product/downVote/${id}`);
    console.log(res.data);
    refetch();

    setOnceClicked(true);
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl rounded-none">
      <div>
        <figure className="w-[300px]">
          <img className="w-full" src={image} alt="Album" />
        </figure>
      </div>
      <div className="px-4 space-y-2">
        <Link to={`product/${_id}`}>
          <h2 className="card-title">{product_name}</h2>
        </Link>
        <p>{description}</p>
        <div className="py-3">
          <h2>Tags : </h2>
        </div>
        <div className="card-actions justify-start items-center pb-1">
          <button
            onClick={() => handleUpVote(_id)}
            className={`btn btn-xs btn-outline ${
              user?.email == owner_email && "btn-disabled"
            } ${onceClicked && "btn-disabled"}`}
          >
            <GrLike /> {product.vote}
          </button>

          {/* <button
            onClick={() => handleDownVote(_id)}
            className={`btn btn-xs btn-outline ${
              user?.email == owner_email && "btn-disabled"
            } ${onceClicked && "btn-disabled"}`}
          >
            <GrDislike /> {product.downVote}
          </button> */}
          {/* <button className="btn btn-xs btn-outline">Details</button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
