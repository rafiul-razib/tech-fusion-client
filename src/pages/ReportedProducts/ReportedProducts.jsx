import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../assets/Hooks/useAxiosSecure";
import useUserProducts from "../../assets/Hooks/useUserProducts";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ReportedProducts = () => {
  const [products, refetch] = useUserProducts();
  const axiosSecure = useAxiosSecure();

  const reportedProducts = products.filter((product) => product.report > 0);

  const handleDelete = (id) => {
    console.log("Requested delete", id);
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
    refetch();
  };

  console.log(reportedProducts);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>View Details</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reportedProducts.map((item, idx) => (
              <tr key={item._id}>
                <th>{idx + 1}</th>
                <td>{item.product_name}</td>
                <td>
                  <Link to={`/product/${item._id}`}>
                    <button className="btn btn-xs btn-outline">
                      View Details
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-xs btn-outline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedProducts;
