import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

export default function useRepository(id) {
  const { data, loading, refetch } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: { repositoryId: id },
  });

  return { data, loading, refetch };
}
