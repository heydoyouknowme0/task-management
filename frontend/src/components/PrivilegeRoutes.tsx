import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PrivateRoutes({}) {
  const { isAdmin } = useAuth();

  if (isAdmin === undefined) return "loading...";

  return isAdmin === true ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
