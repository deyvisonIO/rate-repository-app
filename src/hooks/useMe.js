import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

export default function useMe(reviews = false) {
  const {data, loading, refetch} = useQuery(ME, {
    variables: {
      reviews
    }
  });

  return {data, loading, refetch};
}
