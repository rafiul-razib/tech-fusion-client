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
  const { data: product = [] } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${productId.id}`);
      return res.data;
    },
  });

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

  return (
    <div className="card w-1/2 mx-auto bg-base-100 shadow-xl pt-24 rounded-none">
      <figure>
        <img src={image} alt="product-img" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product_name}</h2>
        <p>{description}</p>
        <p>Tags : {tags}</p>
        <p>Up-vote count : {vote}</p>
        <p>External link : {details_link}</p>
        <div className="card-actions justify-end items-center">
          <button
            onClick={() => handleUpVote(_id)}
            className={`btn btn-xs btn-outline ${
              user?.email == owner_email && "btn-disabled"
            } ${onceClicked && "btn-disabled"}`}
          >
            <GrLike /> {product.vote}
          </button>
          <button className="btn btn-outline btn-xs">Report Product !</button>
        </div>
      </div>
      <Reviews reviewProductId={productId.id}></Reviews>
    </div>
  );
};

export default ProductDetail;
