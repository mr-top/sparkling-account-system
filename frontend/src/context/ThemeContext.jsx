import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

function ThemeProvider (props) {
  const [darkOn, setDarkOn] = useState(localStorage.getItem('darkOn') === 'true');

  function toggleTheme () {
    setDarkOn(prev => !prev);
  }

  useEffect(() => {
    localStorage.setItem('darkOn', String(darkOn));
  }, [darkOn]);

  return (
    <ThemeContext.Provider value={{darkOn, toggleTheme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export {ThemeContext, ThemeProvider}