import { useApolloClient } from "@apollo/client";
import AuthStorage from "../utils/authStorage";
import useAuthStorage from "./useAuthStorage"
import { useState } from "react";

export default function useSignOut() {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [signedOut, setSignedOut] = useState(false);

  async function signOut() {
    if(!(authStorage instanceof AuthStorage)) return;
    await authStorage.removeAccessToken();
    apolloClient.resetStore(); 

    setSignedOut(true);
  }


  return [signOut, signedOut];
} 
