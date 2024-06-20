import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useReviews = ({ productId }) => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: reviews = [] } = useQuery({
    queryKey: ["review"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${productId}`);
      return res.data;
    },
  });
  return [refetch, reviews];
};

export default useReviews;
