import { BiUpvote } from "react-icons/bi";
const ProductCard = ({ product }) => {
  const { product_name, image, tags, description } = product;
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
          <button className="btn btn-xs btn-outline">
            <BiUpvote /> +99
          </button>
          <button className="btn btn-xs btn-outline">Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
