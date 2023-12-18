import "./navbar.css";
import logo from "./../images/logo.png";
import { Link } from "react-router-dom";
export function NavBar() {
  return (
    <nav className="NavBar">
      <ul className="NavBar">
        <li className="menu-logo">
          <Link className="menu-logo" to={"/"}>
            <img src={logo} /> XTREME FITNESS
          </Link>
        </li>
        <li className="menu">
          <Link className="link" to={"/"}>
            Home
          </Link>
        </li>
        <li className="menu">
          <Link className="link" to={"/diet"}>
            Diet Details
          </Link>
        </li>
        <li className="menu">
          <Link className="link" to={"/suppliment"}>
            Supliment Details
          </Link>
        </li>
        <li className="menu">
          <Link className="link" to={"/profile"}>
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
