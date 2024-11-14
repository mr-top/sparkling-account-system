import ToggleTheme from './ToggleTheme';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { Link } from 'react-router-dom';
import Logout from './Logout';

function Navbar() {
  const user = useContext(UserContext);

  const info = user.getInfo();

  let buttons;

  if (info.logged) {
    buttons = (
      <>
        <Link to='/profile'><button className="btn btn-primary w-[6.5rem]">Profile</button></Link>
        <Logout/>
      </>
    )
  } else {
    buttons = (
      <>
        <ToggleTheme />
        <Link to='/login'><button className="btn btn-primary w-[6.5rem]">Log In</button></Link>
        <Link to='/register'><button className="btn w-[6.5rem]">Register</button></Link>
      </>
    )
  }



  return (
    <nav className="flex-none bg-base-100 navbar">
      <div className="navbar-start">
        <p>Sparkling Account System Co.</p>
      </div>
      <div className="navbar-center">

      </div>
      <div className="navbar-end">
        <div className='hidden sm:flex space-x-3'>
          {buttons}
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-30 p-2 shadow space-y-3">
            {buttons}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;