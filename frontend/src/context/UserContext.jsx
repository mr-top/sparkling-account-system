import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

function UserProvider (props) {
  const [userLogged, setUserLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');

  function handleLogin (newUsername, newDescription) {
    setUserLogged(true);
    setUsername(newUsername);
    setDescription(newDescription);
    localStorage.setItem('userLogged', 'true');
    localStorage.setItem('username', newUsername);
    localStorage.setItem('description', newDescription);
  }

  function handleLogout () {
    setUserLogged(false);
    setUsername();
    setDescription();
    localStorage.removeItem('userLogged');
    localStorage.removeItem('username');
    localStorage.removeItem('description')
  }

  useEffect(() => {
    setUserLogged(localStorage.getItem('userLogged') === 'true');
    setUsername(localStorage.getItem('username'));
    setDescription(localStorage.getItem('description'));
  }, []);

  return (
    <UserContext.Provider value={{userLogged, username, description, handleLogin, handleLogout}}>
      {props.children}
    </UserContext.Provider>
  )
}

export {UserContext, UserProvider};