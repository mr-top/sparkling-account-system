import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ThemeContext } from '../context/ThemeContext';
import { PrimaryButton, SecondaryButton } from './Buttons';

function Navbar() {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  const themeClass = theme.darkOn ? 'bg-zinc-900 text-slate-100' : 'bg-slate-100 text-zinc-900';

  let buttons;

  if (user.userLogged) {
    buttons = 
      (<>
        <PrimaryButton onClick={() => navigate('/profile')}>Profile</PrimaryButton>
        <SecondaryButton onClick={() => { user.handleLogout(); navigate('/home') }}>Log Out</SecondaryButton>
      </>);
  } else {
    buttons = 
      (<>
        <SecondaryButton onClick={() => theme.toggleTheme()}>Theme</SecondaryButton>
        <PrimaryButton onClick={() => navigate('/login')}>Log In</PrimaryButton>
        <SecondaryButton onClick={() => navigate('/register')}>Register</SecondaryButton>
      </>);
  }

  return (
    <nav className={`${themeClass} flex flex-row px-4 py-2 flex-initial`}>

      <div className="flex-initial flex items-center">
        <p className="sm:text-xl">{theme.darkOn ? 'Dark' : 'Light'} Sparkling Water Co.</p>
      </div>

      <div className='flex-auto flex justify-end space-x-3'>
        {buttons}
      </div>

    </nav>
  )
}

export default Navbar;