import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Login () {
  const theme = useContext(ThemeContext);

  const themeClass = theme.darkOn ? 'bg-zinc-900 text-slate-100' : 'bg-slate-100 text-zinc-900';

  return (
    <div className={`${themeClass} rounded-lg flex-auto max-w-[35rem] my-10 mx-10 flex flex-col space-y-5 justify-start`}>
      
    </div>
  )
}

export default Login;