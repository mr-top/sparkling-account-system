import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../context/UserContext';

function UnauthorisedRoute () {
  const user = useContext(UserContext);
  const info = user.getInfo();

  console.log(info);

  return info.logged ? <Navigate to='/home'/> : <Outlet/>;
}

export default UnauthorisedRoute;