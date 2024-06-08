import { BiUpvote } from "react-icons/bi";
import useAxiosSecure from "../../assets/Hooks/useAxiosSecure";
import useUserProducts from "../../assets/Hooks/useUserProducts";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const ProductCard = ({ product }) => {
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useUserProducts();
  const { user } = useContext(AuthContext);
  const { product_name, image, tags, description, _id, vote, owner_email } =
    product;

  const handleUpVote = async (id) => {
    const res = await axiosSecure.post(`product/upVote/${id}`);
    console.log(res.data);
    refetch();
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl rounded-none">
      <div>
        <figure className="w-[300px]">
          <img className="w-full" src={image} alt="Album" />
        </figure>
      </div>
      <div className="px-4 space-y-2">
        <h2 className="card-title">{product_name}</h2>
        <p>{description}</p>
        <div className="py-3">
          <h2>Tags : </h2>
        </div>
        <div className="card-actions justify-start items-center pb-1">
          <button
            onClick={() => handleUpVote(_id)}
            className={`btn btn-xs btn-outline ${
              user?.email == owner_email && "btn-disabled"
            }`}
          >
            <BiUpvote /> +{product.vote}
          </button>
          <button className="btn btn-xs btn-outline">Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
