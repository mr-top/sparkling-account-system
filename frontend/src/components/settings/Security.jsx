import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '../TextField';
import { UserContext } from '../context/UserContext';
import { validatePassword } from '../../lib/verifyInput'; 
import Visibility from '../Visibility';
import axios from 'axios';
const env = process.env;

function Security (props) {
  const user = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputsFailed, setInputsFailed] = useState(false);
  const navigate = useNavigate();

  function handleBasicSubmit (e) {
    e.preventDefault();
    setIsLoading(true);

    if (!validatePassword(oldPassword) || !validatePassword(newPassword) || newPassword !== confirmPassword) {
      setInputsFailed(true);
      setIsLoading(false);
      return;
    }

    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:${env.back_port}/settings/security`, {oldPassword, newPassword})
      .then(result => {
        if (result.data.success) {
          setMessage([true, result.data.msg]);
        } else if (result.data.logout) {
          props.setAlert('Sorry. We had to log you out as the session expired');
          user.logout();
          navigate('/home');
        } else {
          setMessage([false, result.data.msg || 'Could not change password']);
        }
      })
      .catch(error => {
        console.log(error);
        setMessage([false, 'Could not change password']);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-col space-y-4">
      <form onSubmit={handleBasicSubmit} className="space-y-2" id='security-form'>
        <TextField invalid={inputsFailed && !validatePassword(oldPassword)} value={oldPassword} labelValue='Old Password' type='password' inputChange={text => setOldPassword(text)} />
        <TextField invalid={inputsFailed && !validatePassword(newPassword)} value={newPassword} labelValue='New Password' type='password' inputChange={text => setNewPassword(text)} />
        <TextField invalid={inputsFailed && (!validatePassword(confirmPassword) || newPassword !== confirmPassword)} value={confirmPassword} labelValue='Confirm Password' type='password' inputChange={text => setConfirmPassword(text)} />
      </form>
      <div className='flex flex-row'>
        <button className="btn btn-primary" form="security-form" disabled={isLoading}>Change Password</button>
        {message.length > 0 && <p className={`${message[0] ? 'text-green-700' : 'text-red-700'} flex-auto text-center`}>{message[1]}</p>}
      </div>
      <Visibility setAlert={props.setAlert}/>
    </div>
  )
}

export default Security;