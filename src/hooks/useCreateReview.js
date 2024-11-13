import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

export default function useCreateReview() {
  const [mutation, result] = useMutation(CREATE_REVIEW);

  async function createReview(review) {
    const { data } = await mutation({ variables: { review } });

    return { data };
  }

  return [createReview, result];
}
