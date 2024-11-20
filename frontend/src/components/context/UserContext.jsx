import { useState, useEffect, createContext } from "react";

const UserContext = createContext();

function UserProvider (props) {
  const [logged, setLogged] = useState(localStorage.getItem('logged') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [description, setDescription] = useState(localStorage.getItem('description') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');

  function login (username, description, userId) {
    setLogged(true);
    setUsername(username);
    setDescription(description);
    setUserId(userId);
  }

  function logout () {
    setLogged(false);
    setUsername('');
    setDescription('');
    setUserId('');
  }

  function getInfo () {
    return {logged, username, description, userId}
  }

  useEffect(() => {
    localStorage.setItem('logged', String(logged));
  }, [logged]);

  useEffect(() => {
    localStorage.setItem('username', String(username));
  }, [username]);

  useEffect(() => {
    localStorage.setItem('description', String(description));
  }, [description]);

  useEffect(() => {
    localStorage.setItem('userId', String(userId));
  }, [userId]);

  return (
    <UserContext.Provider value={{login, logout, getInfo}}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext };
