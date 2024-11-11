import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Outlet, Navigate } from "react-router-dom";

function UnauthorisedRoute() {
  const user = useContext(UserContext);

  return user.userLogged ? <Navigate to='/home'/> : <Outlet/>;
}

export default UnauthorisedRoute;