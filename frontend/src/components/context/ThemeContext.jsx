import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider (props) {
  const [theme, setTheme]  = useState(localStorage.getItem('theme') || 'winter');

  function handleToggle(e){
    if (e.target.checked) {
      setTheme('myDark');
    } else {
      setTheme('myLight');
    }
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{handleToggle, theme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export {ThemeContext, ThemeProvider};