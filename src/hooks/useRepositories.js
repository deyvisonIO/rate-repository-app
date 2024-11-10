import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

export default function useRepositories() {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, { fetchPolicy: 'cache-and-network' });

  return { data, loading, refetch };
}
