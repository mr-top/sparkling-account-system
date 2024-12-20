import { TextField } from "./TextField";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { validateUsername, validateEmail, validatePassword, validateAll } from '../lib/verifyInput';
import { UserContext } from "./context/UserContext";
import axios from 'axios';
const env = process.env;

function Register(props) {
  const user = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const [inputsFailed, setInputsFailed] = useState(false);
  const navigate = useNavigate();

  function handleRegisterSubmit (e) {
    e.preventDefault();
    setIsLoading(true);

    if (!validateAll(username, email, password) || confirmPassword !== password) {
      setInputsFailed(true);
      setIsLoading(false);
      return;
    }

    setMessage([false, 'Making a request...']);

    axios.defaults.withCredentials = true;
    axios.post(`${env.back_host}/register`, {username, email, password})
      .then(result => {
        if (result.data.success) {
          setMessage([true, result.data.msg]);
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else if (result.data.logout) {
          props.setAlert('Sorry. We had to log you out as the session expired');
          user.logout();
          navigate('/home');
        } else {
          setMessage([false, result.data.msg || 'Register Failed']);
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
      <p className="text-2xl">Create an account</p>
      <form onSubmit={handleRegisterSubmit} className="space-y-2" id='register-form'>
        <TextField invalid={inputsFailed && !validateUsername(username)} value={username} type='text' labelValue='Username' inputChange={text => setUsername(text)}/>
        <TextField invalid={inputsFailed && !validateEmail(email)} value={email} type='text' labelValue='Email' inputChange={text => setEmail(text)}/>
        <TextField invalid={inputsFailed && !validatePassword(password)} value={password} type='password' labelValue='Password' inputChange={text => setPassword(text)}/>
        <TextField invalid={inputsFailed && (!validatePassword(confirmPassword) || confirmPassword !== password)} value={confirmPassword} type='password' labelValue='Confirm password' inputChange={text => setConfirmPassword(text)}/>
      </form>
      <div className="space-x-5 flex flex-row">
        <button className="btn btn-primary flex-initial" disabled={isLoading} form="register-form">Register</button>
        {message.length > 0 && <p className={`${message[0] ? 'text-green-700' : 'text-red-700'} flex-auto text-center`}>{message[1]}</p>}
      </div>
    </div>
  )
}

export default Register;