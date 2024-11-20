import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const env = process.env;

function UsersBrowser(props) {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function getUsers() {
    setIsLoading(true);

    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:${env.back_port}/users`, { page })
      .then(result => {
        if (result.data.success) {
          setUsers(result.data.users);
          setMaxPage(result.data.max);
        } else {
          setMessage([false, result.data.msg]);
        }
      })
      .catch(error => {
        console.log(error);
        setMessage([false, 'Could not get users'])
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useLayoutEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [page]);

  return (
    <div className={`bg-base-100 mb-10 sm:mt-10 px-10 py-5 rounded-md space-y-5 h-[20rem] w-[22rem] sm:w-[12rem] flex flex-col ${props.classes}`}>
      <div className="basis-5/6">
        <ul className="space-y-2">
          {users.map((user, idx) => <li key={idx} className="flex flex-row">
            <img className="rounded-full w-[3rem] h-[3rem] flex-initial border-2 border-primary" src='https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg' alt={`anonymous picture ${idx}`} />
            <Link to={`/profile/${user.id}`} reloadDocument={true}><button className="flex-1 px-4 py-3">{user.username}</button></Link>
            </li>)}
        </ul>
      </div>
      <div className="basis-1/6 flex flex-row justify-center">
        <div className="flex flex-row flex-initial">
          <button onClick={() => setPage((prev) => prev - 1)} disabled={page <= 1 || isLoading} className="btn btn-link">{'<--'}</button>
          <button>{page}</button>
          <button onClick={() => setPage((prev) => prev + 1)} disabled={page >= maxPage || isLoading} className="btn btn-link">{'-->'}</button>
        </div>
      </div>
      {message.length > 0 && <p className={`${message[0] ? 'text-green-700' : 'text-red-700'} flex-auto text-center`}>{message[1]}</p>}
    </div>
  )
}

export default UsersBrowser;