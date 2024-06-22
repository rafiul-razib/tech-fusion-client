import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../assets/Hooks/useAxiosPublic";
import useAxiosSecure from "../../assets/Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProducts = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const product_name = form.product_name.value;
    const description = form.description.value;
    const owner_email = user?.email;
    const details_link = form.details_link.value;
    const tags = form.tags.value;
    const insertedOn = new Date();
    const status = "Pending";

    const imageFile = { image: form.image.files[0] };

    // send image to server to get url
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // console.log(res);

    if (res.data.success) {
      const newProduct = {
        product_name,
        description,
        owner_email,
        details_link,
        tags,
        insertedOn,
        image: res.data.data.display_url,
        status,
      };

      // console.log(newProduct);

      const productRes = await axiosSecure.post("/products", newProduct);

      if (productRes.data.insertedId) {
        Swal.fire({
          title: "Success",
          text: "Product inserted successfully!",
          icon: "success",
        });
      }
    }
  };

  return (
    <div className="px-12 w-full lg:w-2/3 pt-12">
      <h3 className="text-3xl font-bold text-center">Add Your New Product</h3>
      <form onSubmit={handleAddProduct} className="w-full">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
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
          <button className="btn btn-primary">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
