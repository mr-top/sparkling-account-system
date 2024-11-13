import { Link } from "react-router-dom";

function Footer() {
  
  return (
    <footer className="footer p-7 flex-none bg-base-100">
      <nav>
        <h6 className="footer-title">Services</h6>
        <Link to='/login'><p className="link link-hover">Log in</p></Link>
        <Link to='/register'><p className="link link-hover">Register</p></Link>
        <Link to='/home'><p className="link link-hover">Home</p></Link>
        <Link to='/settings'><p className="link link-hover">Settings</p></Link>
      </nav>
      <nav>
        <h6 className="footer-title">Links</h6>
        <Link to='https://www.instagram.com/'><p className="link link-hover">Instagram</p></Link>
        <Link to='https://github.com/'><p className="link link-hover">Github</p></Link>
        <Link to='https://daisyui.com/'><p className="link link-hover">Daisyui</p></Link>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <Link to='/terms'></Link><p className="link link-hover">Terms of use</p>
        <Link to='/privacy'></Link><p className="link link-hover">Privacy policy</p>
        <Link to='/cookie'></Link><p className="link link-hover">Cookie policy</p>
      </nav>
    </footer>
  )
}

export default Footer;