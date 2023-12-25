import { useContext } from "react";
import AuthContext from "../context/Auth";

const useAuth = () => {
  const { auth, verifyAuth, isAdmin } = useContext(AuthContext);
  return { auth, verifyAuth, isAdmin };
};

export default useAuth;
