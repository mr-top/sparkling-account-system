import { TextField, AreaField } from "../TextField";
import { validateUsername } from "../../lib/verifyInput";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
const env = process.env;

function Basic(props) {
  const user = useContext(UserContext);
  const info = user.getInfo();
  const [username, setUsername] = useState(info.username);
  const [description, setDescription] = useState(info.description);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();

  function handleBasicSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!validateUsername(username) || description.length >= 300) {
      setIsLoading(false);
      return;
    }

    setMessage([false, 'Making a request...']);

    axios.defaults.withCredentials = true;
    axios.post(`${env.back_host}/settings/basic`, { username, description })
      .then(result => {
        if (result.data.success) {
          setMessage([true, result.data.msg]);
          user.login(result.data.username, result.data.description, result.data.id);
        } else if (result.data.logout) {
          props.setAlert('Sorry. We had to log you out as the session expired');
          user.logout();
          navigate('/home');
        } else {
          setMessage([false, result.data.msg]);
        }
      })
      .catch(error => {
        console.log(error);
        setMessage([false, 'Could not register']);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-col space-y-4">
      <form onSubmit={handleBasicSubmit} className="space-y-2" id='basic-form'>
        <TextField invalid={!validateUsername(username)} value={username} labelValue='Username' type='text' limit='20' inputChange={text => setUsername(text)} />
        <AreaField invalid={description.length > 300} value={description} labelValue='Description' type='text' limit='300' inputChange={text => setDescription(text)} />
      </form>
      <div>
        <button className="btn btn-primary" form="basic-form" disabled={isLoading}>Save Changes</button>
        {message.length > 0 && <p className={`${message[0] ? 'text-green-700' : 'text-red-700'} flex-auto text-center`}>{message[1]}</p>}
      </div>

    </div>
  )
}

export default Basic;