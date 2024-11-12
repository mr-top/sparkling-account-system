import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../context/UserContext';

function ProtectedRoute () {
  const user = useContext(UserContext);
  const info = user.getInfo();

  console.log(info);


  return info.logged ? <Outlet/> : <Navigate to='/login'/>;
}

export default ProtectedRoute;