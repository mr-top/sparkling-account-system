import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Home() {
  const theme = useContext(ThemeContext);

  const themeClass = theme.darkOn ? 'bg-zinc-900 text-slate-100' : 'bg-slate-100 text-zinc-900';

  return (
    <div className={`${themeClass} rounded-lg flex-auto max-w-[40rem] my-10 mx-10 flex flex-col space-y-5 justify-start`}>
      <h1 className="text-center text-lg sm:text-2xl flex-none pt-10">Managing accounts demonstration</h1>
      <div className="flex flex-col sm:flex-row justify-center space-y-5 sm:space-y-0 sm:space-x-5 pl-10 sm:pl-0 pb-10 flex-none">
        <div>
          <h2 className="text-sm text-zinc-500 pb-2">Available features</h2>
          <ul>
            <li>User registration and login</li>
            <li>Session persistence through cookies</li>
            <li>Account control as an user</li>
            <li>User browser</li>
          </ul>
        </div>
        <div className="pb-10 sm:pb-0">
          <h2 className="text-sm text-zinc-500 pb-2">Features in works</h2>
          <ul>
            <li>Power users</li>
            <li>Email OTP</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home;