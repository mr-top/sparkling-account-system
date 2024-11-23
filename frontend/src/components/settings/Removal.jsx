import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { TextField } from "../TextField";
import { validatePassword, validateUsername } from "../../lib/verifyInput";
import axios from "axios";
const env = process.env;

function Removal (props) {
  const user = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputsFailed, setInputsFailed] = useState(false);
  const navigate = useNavigate();

  function handleRemoveSubmit (e) {
    e.preventDefault();

    if (!validateUsername(username) || !validatePassword(password)) {
      setInputsFailed(true);
      return;
    }

    setMessage([false, 'Deleting']);
    setIsLoading(true);

    axios.defaults.withCredentials = true;
    axios.post(`${env.back_host}/settings/removal`, {username, password})
      .then(result => {
        if (result.data.success || result.data.logout) {
          props.setAlert(result.data.logout ? 'Sorry. We had to log you out as the session expired' : 'Your account was removed');
          user.logout();
          navigate('/home');
        } else {
          setMessage([false, result.data.msg || 'Could not delete account']);
        }
      })
      .catch(error => {
        console.log(error);
        setMessage([false, 'Could not delete account']);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-col space-y-4">
      <form onSubmit={handleRemoveSubmit} className="space-y-2" id='removal-form'>
        <TextField invalid={inputsFailed && !validateUsername(username)} value={username} labelValue='Username' type='text' inputChange={text => setUsername(text)} />
        <TextField invalid={inputsFailed && !validatePassword(password)} value={password} labelValue='Password' type='password' inputChange={text => setPassword(text)} />
      </form>
      <div className='flex flex-row'>
        <button className="btn btn-primary" form="removal-form" disabled={isLoading}>Delete Account</button>
        {message.length > 0 && <p className={`${message[0] ? 'text-green-700' : 'text-red-700'} flex-auto text-center`}>{message[1]}</p>}
      </div>
    </div>
  )
}

export default Removal;