import { GrLike } from "react-icons/gr";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../assets/Hooks/useAxiosSecure";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Reviews from "../../components/Reviews/Reviews";

const ProductDetail = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [onceClicked, setOnceClicked] = useState(false);
  const productId = useParams();
  const [reported, setReported] = useState(false);
  const { refetch, data: product = [] } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${productId.id}`);
      return res.data;
    },
  });

  const reporter = {
    reporterEmail: user.email,
  };

  const {
    product_name,
    image,
    description,
    owner_email,
    tags,
    _id,
    vote,
    details_link,
  } = product;

  const handleUpVote = async (id) => {
    const res = await axiosSecure.post(`product/upVote/${id}`);
    console.log(res.data);
    refetch();

    setOnceClicked(true);
  };

  const handleReport = (id) => {
    axiosSecure.post(`product/report/${id}`).then((res) => {
      refetch();
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        setReported(true);
      }
    });
  };

  return (
    <div>
      <div className="card lg:card-side max-w-6xl mx-auto bg-base-100 shadow-xl pt-24 rounded-none">
        <figure className="w-1/2 mx-auto">
          <img src={image} alt="product-img" />
        </figure>
        <div className="card-body">
          <h2 className="text-4xl font-semibold">{product_name}</h2>
          <p className="text-lg">{description}</p>
          <p className="text-lg">Tags : {tags}</p>
          <p className="text-lg">Up-vote count : {vote}</p>
          <p className="text-md">External link : {details_link}</p>
          <div className="card-actions justify-end items-center">
            <button
              onClick={() => handleUpVote(_id)}
              className={`btn btn-xs btn-outline ${
                user?.email == owner_email && "btn-disabled"
              } ${onceClicked && "btn-disabled"}`}
            >
              <GrLike /> {product.vote}
            </button>
            {reported ? (
              <button className={`btn btn-outline btn-xs disabled`}>
                Reported !
              </button>
            ) : (
              <button
                onClick={() => handleReport(_id)}
                className={`btn btn-outline btn-xs ${
                  user?.email == owner_email && "btn-disabled"
                }`}
              >
                Report Product !
              </button>
            )}
          </div>
        </div>
      </div>
      <Reviews reviewProductId={productId.id}></Reviews>
    </div>
  );
};

export default ProductDetail;
