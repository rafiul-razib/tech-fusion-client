import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../assets/Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProduct = () => {
  const product = useLoaderData();

  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  console.log(product);

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const product_name = form.product_name.value;
    const description = form.description.value;
    const owner_email = user?.email;
    const details_link = form.details_link.value;
    const tags = form.tags.value;

    const imageFile = { image: form.image.files[0] };
    // console.log(imageFile);

    // send image to server to get url
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res);

    if (res.data.success) {
      const newProduct = {
        product_name,
        description,
        owner_email,
        details_link,
        tags,
        image: res.data.data.display_url,
      };

      const updateItem = await axiosPublic.put(
        `/dashboard/products/${product._id}`,
        newProduct
      );
      console.log(updateItem.data);
      if (updateItem.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Product Updated Successfully!",
          icon: "success",
        });
      } else
        (error) => {
          console.log(error);
        };
    }
  };
  return (
    <div className="px-12 w-2/3">
      <h3 className="text-3xl font-bold">Update Product</h3>
      <form onSubmit={handleUpdateProduct} className="w-full">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            defaultValue={product.product_name}
            name="product_name"
            type="text"
            placeholder="product name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            defaultValue={product.description}
            name="description"
            type="text"
            placeholder="product description"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Owner</span>
          </label>
          <input
            value={user?.email}
            name="owner_email"
            type="email"
            placeholder="owner email"
            className="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">External Link</span>
          </label>
          <input
            defaultValue={product.details_link}
            name="details_link"
            type="text"
            placeholder="external link"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Tags</span>
          </label>
          <textarea
            defaultValue={product.tags}
            name="tags"
            type="text"
            placeholder="tags"
            className="input input-bordered"
            required
          />
        </div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Pick an Image</span>
          </div>
          <input
            name="image"
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
          <div className="label"></div>
        </label>
        <div className="form-control my-3">
          <button className="btn btn-primary">Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
