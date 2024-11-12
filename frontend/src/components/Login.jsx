import { TextField } from "./TextField";
import { useState } from "react";
import { validateUsername, validatePassword, validateAll } from '../lib/verifyInput';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const [inputsFailed, setInputsFailed] = useState(false);

  function handleLoginSubmit (e) {
    e.preventDefault();
    setIsLoading(true);

    if (!validateAll(username, 'example@example.com', password)) {
      setInputsFailed(true);
      setIsLoading(false);
      return;
    }

    axios.post('http://localhost:5020/login', {username, password})
      .then(result => {
        if (result.success) {
          // login
          setMessage([true, result.msg]);
        } else if (result.logout) {
          // logout. impossible to reach here
          setMessage([false, result.msg]);
        } else {
          setMessage([false, result.msg]);
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
    <div className="bg-primary-content my-10 px-10 py-5 rounded-md space-y-5">
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