import { useEffect } from "react";
import useSignOut from "../hooks/useSignOut";
import { Navigate } from "react-router-native";

export default function SignOut() {
  const [signOut, signedOut ] = useSignOut();
  useEffect(() => { signOut() }, []);

  if(signedOut) return <Navigate to="/" replace />
  return null;
}
