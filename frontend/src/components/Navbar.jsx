import ToggleTheme from './ToggleTheme';
import { Link } from 'react-router-dom';

function Navbar() {
  let user;

  let buttons;

  if (user) {
    buttons = (
      <>
        <Link to='/profile'><button className="btn btn-primary w-[6.5rem]">Profile</button></Link>
        <Link to='/logout'><button className="btn w-[6.5rem]">Logout</button></Link>
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
    <nav className="flex-none bg-primary-content navbar">
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
            className="menu menu-sm dropdown-content bg-primary-content rounded-box z-[1] mt-3 w-30 p-2 shadow space-y-3">
            {buttons}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;