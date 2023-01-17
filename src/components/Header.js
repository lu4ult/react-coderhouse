import NavBar from "./NavBar";
import UserLogin from "./UserLogin"
import { NavLink } from "react-router-dom"

const Header = () => {
    //console.log(props);
    return (
        <header>
            <NavLink to="/react-coderhouse" className="header__logo">
            <img src="./img/logo.png" alt="LU4ULT logo"></img>
            </NavLink>
            <NavBar />
            <UserLogin greeting="Hola Usuario!" />
        </header>
    );
}

export default Header;


//<img src="./public/img/logo.png" alt="LU4ULT logo"></img>
//./img/logo.png