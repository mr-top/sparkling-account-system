import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute () {
  const user = useContext(UserContext);

  return user.userLogged ? <Outlet/> : <Navigate to='/login'/>;
}

export default ProtectedRoute;