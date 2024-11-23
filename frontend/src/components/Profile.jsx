import { useLayoutEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UsersBrowser from "./UsersBrowser";
import axios from "axios";
const env = process.env;

function Profile(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});

  useLayoutEffect(() => {
    const inputId = Number(id);

    if (!(inputId > 0)) {
      props.setAlert('Invalid input');
      navigate('/home');
      return;
    }

    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:${env.back_port}/profile`, { inputId })
      .then(result => {
        if (result.data.success) {
          setUserInfo({ ...result.data.userInfo });
        } else {
          props.setAlert(result.data.msg);
          navigate('/home');
        }
      })
      .catch(error => {
        console.log(error);
        props.setAlert('Could not load an user');
        navigate('/home');
      });
  }, []);

  return (
    <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-5">
      <div className="bg-base-100 w-[22rem] h-[20rem] my-10 px-10 py-5 rounded-md space-y-4">
        <div className="flex flex-row">
          <img className="rounded-full w-[6rem] h-[6rem] flex-initial border-2 border-primary" src='https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg' alt='anonymous picture' />
          <div className="flex-1 px-4">
            <h2 className="text-2xl flex-initial">{userInfo.username}</h2>
            <p className="text-xs mt-4 text-neutral-content">Join Date</p>
            <p>2024 October 13</p>
          </div>
        </div>
        <p>{userInfo.description}</p>
      </div>
      <UsersBrowser/>
    </div>
  )
}

export default Profile;