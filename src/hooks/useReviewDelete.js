import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

export default function useReviewDelete() {
  const [mutation, result] = useMutation(DELETE_REVIEW);

  async function deleteReview(reviewId) {
    try {
    const { data } = await mutation({ variables: { reviewId } });

    return { data };
    } catch(e) {
      console.log(e)
    }
  }

  return [deleteReview, result];
}
