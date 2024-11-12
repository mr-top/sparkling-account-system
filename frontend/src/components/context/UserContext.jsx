import { useState, useEffect, createContext } from "react";

const UserContext = createContext();

function UserProvider (props) {
  const [logged, setLogged] = useState(localStorage.getItem('logged') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [description, setDescription] = useState(localStorage.getItem('description') || '');

  function login (username, description) {
    setLogged(true);
    setUsername(username);
    setDescription(description);
  }

  function logout () {
    setLogged(false);
    setUsername('');
    setDescription('');
  }

  function getInfo () {
    return {logged, username, description}
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

  return (
    <UserContext.Provider value={{login, logout, getInfo}}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext };
