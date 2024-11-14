import { TextField } from "./TextField";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { validateUsername, validatePassword, validateAll } from '../lib/verifyInput';
import axios from 'axios';
const env = process.env;

function Login(props) {
  const user = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const [inputsFailed, setInputsFailed] = useState(false);
  const navigate = useNavigate();

  function handleLoginSubmit (e) {
    e.preventDefault();
    setIsLoading(true);

    if (!validateAll(username, 'example@example.com', password)) {
      setInputsFailed(true);
      setIsLoading(false);
      return;
    }

    setMessage([false, 'Making a request...']);

    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:${env.back_port}/login`, {username, password})
      .then(result => {
        if (result.data.success) {
          setMessage([true, result.data.msg]);
          setTimeout(() => {
            user.login(result.data.username, result.data.description);
            navigate('/home');
          }, 3000);
        } else if (result.data.logout) {
          props.setAlert('Sorry. We had to log you out as the session expired');
          user.logout();
          navigate('/home');
        } else {
          setMessage([false, result.data.msg || 'Login Failed']);
        }
      })
      .catch(error => {
        console.log(error);
        setMessage([false, 'Could not login']);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="bg-base-100 my-10 px-10 py-5 rounded-md space-y-5">
      <p className="text-2xl">Log in to your account</p>
      <form onSubmit={handleLoginSubmit} className="space-y-2" id='login-form'>
        <TextField invalid={inputsFailed && !validateUsername(username)} value={username} type='text' labelValue='Username' inputChange={text => setUsername(text)}/>
        <TextField invalid={inputsFailed && !validatePassword(password)} value={password} type='password' labelValue='Password' inputChange={text => setPassword(text)}/>
      </form>
      <div className="space-x-5 flex flex-row">
        <button className="btn btn-primary flex-initial" disabled={isLoading} form="login-form">Log in</button>
        {message.length > 0 && <p className={`${message[0] ? 'text-green-700' : 'text-red-700'} flex-auto text-center`}>{message[1]}</p>}
      </div>
    </div>
  )
}

export default Login;