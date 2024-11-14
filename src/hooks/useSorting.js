import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

export default function useSorting() {
  const [mutation, result] = useMutation(CREATE_USER);

  async function SignUp(user) {
    const { data } = await mutation({ variables: { user } });
    
    return { data };
    
  }

  return [SignUp, result];
}
