import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../context/UserContext';

function UnauthorisedRoute (props) {
  const user = useContext(UserContext);
  const info = user.getInfo();

  if (info.logged) {
    props.setAlert("Sorry. You're already logged in");
  }

  return info.logged ? <Navigate to='/home'/> : <Outlet/>;
}

export default UnauthorisedRoute;