import { Link } from "react-router-dom";
import useUserProducts from "../../../assets/Hooks/useUserProducts";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../assets/Hooks/useAxiosSecure";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";

const ReviewProductsQueue = () => {
  const [products, refetch] = useUserProducts();
  const axiosSecure = useAxiosSecure();
  // console.log(products);

  function sortProducts(products) {
    const sortOrder = {
      pending: 1,
      accepted: 2,
      rejected: 3,
    };

    products.sort((a, b) => sortOrder[a.status] - sortOrder[b.status]);
    return products;
  }

  const productQueue = sortProducts(products);

  const handleMakeFeatured = (id) => {
    axiosSecure.patch(`products/featured/${id}`).then((res) => {
      refetch();
      console.log(res.data);
    });
  };

  const handleAccept = (id) => {
    axiosSecure.patch(`products/accept/${id}`).then((res) => {
      refetch();
      console.log(res.data);
    });
  };

  const handleReject = (id) => {
    axiosSecure.patch(`products/reject/${id}`).then((res) => {
      refetch();
      console.log(res.data);
    });
  };
  return (
    <div>
      <div>
        <SectionHeader heading="Product Review Queue" />
      </div>
      <div className="overflow-x-auto ps-36 md:ps-0">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>View Details</th>
              <th>Make Featured</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {productQueue.map((product) => (
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
                <td>
                  <Link to={`/product/${product._id}`}>
                    <button className="btn btn-outline btn-xs">
                      View Details
                    </button>
                  </Link>
                </td>
                <td>
                  {product.category === "featured" ? (
                    "Featured"
                  ) : (
                    <button
                      onClick={() => handleMakeFeatured(product._id)}
                      className="btn btn-outline btn-xs"
                    >
                      Make Featured
                    </button>
                  )}
                </td>
                <th>
                  {product.status === "accepted" ? (
                    "Accepted"
                  ) : (
                    <button
                      onClick={() => handleAccept(product._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      Accept Now
                    </button>
                  )}
                </th>
                <th>
                  {product.status === "rejected" ? (
                    "Rejected"
                  ) : (
                    <button
                      onClick={() => handleReject(product._id)}
                      className="btn btn-ghost btn-xs"
                    >
                      <FaTrash /> Reject
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Name</th>
              <th>View Details</th>
              <th>Make Featured</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ReviewProductsQueue;
