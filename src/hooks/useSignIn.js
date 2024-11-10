import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

export default function useSignIn() {
  const [mutation, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  async function SignIn(credentials) {
    const { data } = await mutation({ variables: { credentials } });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    
    return { data };
    
  }

  return [SignIn, result];
}
