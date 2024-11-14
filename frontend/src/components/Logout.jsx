import { useState, useContext } from "react";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const env = process.env;

function Logout () {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogoutClick(){
    setIsLoading(true);

    axios.defaults.withCredentials = true;
    axios.get(`http://localhost:${env.back_port}/settings/logout`, {})
      .then(result => {
        if (result.data.logout) {
          user.logout();
          navigate('/home');
        }
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <button onClick={handleLogoutClick} className="btn w-[6.5rem]" disabled={isLoading}>Logout</button>
  )
}

export default Logout;