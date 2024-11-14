import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
const env = process.env;

function UsersBrowser() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const example = [
    {name: 'name1', id: 1},
    {name: 'name2', id: 2},
    {name: 'name3', id: 3},
    {name: 'name4', id: 4}
  ]

  function getUsers() {
    setIsLoading(true);

    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:${env.back_port}/users`, { page })
      .then(result => {
        if (result.data.success) {
          setUsers(result.data.users);
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
    <div className="bg-base-100 my-10 px-10 py-5 rounded-md space-y-5 w-[22rem] sm:w-[8rem]">
      
    </div>
  )
}

export default UsersBrowser;