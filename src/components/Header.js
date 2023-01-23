import logo from "./logoSrc.png"
import NavBar from "./NavBar";
import UserLogin from "./UserLogin"
import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <header>
            <NavLink to="/" className="header__logo">
                <img src={logo} alt="LU4ULT logo"></img>
            </NavLink>
            <NavBar />
            <UserLogin greeting="Hola Usuario!" />
        </header>
    );
}

export default Header;