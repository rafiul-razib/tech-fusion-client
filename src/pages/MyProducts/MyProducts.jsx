import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../assets/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import SectionHeader from "../../components/SectionHeader/SectionHeader";

const MyProducts = () => {
  // const [products, refetch] = useUserProducts();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { refetch, data: myProducts = [] } = useQuery({
    queryKey: ["myProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-products?email=${user.email}`);
      return res.data;
    },
  });

  // console.log(myProducts);

  const handleDelete = (id) => {
    // console.log("delete requested", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/products/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div>
      <SectionHeader heading="My Products" />
      <div className="overflow-x-auto ps-12 lg:ps-0">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Votes</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={product.image} alt="Product image" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.product_name}</div>
                    </div>
                  </div>
                </td>
                <td>{product?.vote}</td>
                <td>{product?.status}</td>
                <th>
                  <Link to={`/dashboard/update/${product._id}`}>
                    <button className="btn btn-ghost btn-xs">Update</button>
                  </Link>
                </th>
                <th>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-ghost btn-xs"
                  >
                    <FaTrash />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Votes</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
