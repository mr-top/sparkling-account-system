import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Footer() {
  const theme = useContext(ThemeContext);

  const themeClass = theme.darkOn ? 'bg-zinc-900 text-slate-100' : 'bg-slate-100 text-zinc-900';

  return (
    <footer className={`${themeClass} flex flex-col sm:flex-row pl-5 py-10 space-y-5 sm:space-y-0 flex-initial`}>
      <div className="flex-auto space-y-3">
        <p className="text-sm text-zinc-500">Services</p>
        <div>
          <Link to='/login'><p>Log in</p></Link>
          <Link to='/register'><p>Register</p></Link>
          <Link to='/home'><p>Home</p></Link>
        </div>
      </div>
      <div className="flex-auto space-y-3">
        <p className="text-sm text-zinc-500">Links</p>
        <div>
          <Link to='https://www.instagram.com'><p>Instagram</p></Link>
          <Link to='https://github.com'><p>Github</p></Link>
          <Link to='https://tailwindcss.com/docs/customizing-colors'><p>Tailwind Colours</p></Link>
        </div>
      </div>
      <div className="flex-auto space-y-3">
        <p className="text-sm text-zinc-500">Legals</p>
        <div>
          <Link to='/terms'><p>Terms of use</p></Link>
          <Link to='/privacy'><p>Privacy policy</p></Link>
          <Link to='/cookie'><p>Cookie policy</p></Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;