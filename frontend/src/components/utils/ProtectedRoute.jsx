import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../context/UserContext';

function ProtectedRoute (props) {
  const user = useContext(UserContext);
  const info = user.getInfo();

  if (!info.logged) {
    props.setAlert("Sorry. You need to be logged in");
  }

  return info.logged ? <Outlet/> : <Navigate to='/login'/>;
}

export default ProtectedRoute;