import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../assets/Hooks/useAxiosSecure";
// import Slider from "react-slick";
import { Rating } from "@smastrom/react-rating";
import { useContext, useState } from "react";
import useReviews from "../../assets/Hooks/useReviews";
import { AuthContext } from "../../providers/AuthProvider";
import "@smastrom/react-rating/style.css";

const Reviews = ({ reviewProductId }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);

  const { refetch, data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${reviewProductId}`);
      return res.data;
    },
  });

  // console.log(reviews);

  const handleReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = user.email;
    const photoURL = user.photoURL;
    const displayName = user.displayName;
    const review_message = form.review_message.value;
    const rating_stars = rating;

    const review = {
      email,
      photoURL,
      displayName,
      review_message,
      rating_stars,
    };

    // console.log(review);

    axiosSecure
      .post(`/add-review/${reviewProductId}`, review)
      .then((res) => {
        refetch();
        console.log(res.data);
      })
      .then((error) => console.log(error));
  };

  return (
    <div>
      {/* Review */}
      <div>Reviews section</div>
      <div>
        <h1>Post review</h1>
        <div className="card shrink-0 w-full max-w-sm bg-base-100 shadow-none mx-auto">
          <form onSubmit={handleReview} className="card-body">
            <div className="form-control">
              <div className="flex items-center justify-between">
                <h1>{user?.displayName}</h1>

                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar ml-12"
                >
                  <div className="w-10 rounded-full">
                    <img alt="User Image" src={user?.photoURL} />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Review</span>
              </label>
              <input
                name="review_message"
                type="text"
                placeholder="Review description"
                className="input input-bordered"
                required
              />
            </div>
            {/* Rating */}
            <div>
              <Rating
                style={{ maxWidth: 180 }}
                value={rating}
                onChange={setRating}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Submit Review</button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <h3>{reviews.length} Reviews</h3>
        {reviews.map((item) => (
          <div key={item._id}>
            <div className="card card-side bg-base-100 shadow-xl">
              <figure className="rounded">
                <img src={item.photoURL} alt="Movie" />
              </figure>
              <div className="card-body">
                <h2 className="text-sm">{item.review_message}</h2>
                <Rating style={{ maxWidth: 180 }} value={item.rating_stars} />
                <div className="text-xs justify-start">{item.displayName}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
