import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import axios from "axios";
const env = process.env;

function Visibility(props) {
  const user = useContext(UserContext);
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleVisibleClick () {
    setIsLoading(true);
    setMessage([false, 'Toggling...']);

    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:${env.back_port}/settings/visible`)
      .then(result => {
        if (result.data.success) {
          setMessage([true, result.data.msg]);
        } else if (result.data.logout) {
          props.setAlert('Sorry. We had to log you out as the session expired');
          user.logout();
          navigate('/home');
        } else {
          setMessage([false, result.data.msg || 'Cannot toggle']);
        }
      })
      .catch(error => {
        console.log(error);
        setMessage([false, 'Cannot toggle']);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-row">
      <button onClick={handleVisibleClick} className="btn btn-primary flex-initial" disabled={isLoading}>Toggle Visibility</button>
      {message.length > 0 && <p className={`${message[0] ? 'text-green-700' : 'text-red-700'} flex-auto text-center`}>{message[1]}</p>}
    </div>
  )
}

export default Visibility;