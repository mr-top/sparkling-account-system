import { Link } from "react-router-dom";

function Footer() {
  
  return (
    <footer className="footer p-7 flex-none bg-primary-content">
      <nav>
        <h6 className="footer-title">Services</h6>
        <Link to='/login'><a className="link link-hover">Log in</a></Link>
        <Link to='/register'><a className="link link-hover">Register</a></Link>
        <Link to='/home'><a className="link link-hover">Home</a></Link>
      </nav>
      <nav>
        <h6 className="footer-title">Links</h6>
        <Link to='https://www.instagram.com/'><a className="link link-hover">Instagram</a></Link>
        <Link to='https://github.com/'><a className="link link-hover">Github</a></Link>
        <Link to='https://daisyui.com/'><a className="link link-hover">Daisyui</a></Link>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <Link to='/terms'></Link><a className="link link-hover">Terms of use</a>
        <Link to='/privacy'></Link><a className="link link-hover">Privacy policy</a>
        <Link to='/cookie'></Link><a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  )
}

export default Footer;