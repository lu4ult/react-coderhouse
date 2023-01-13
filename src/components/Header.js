import NavBar from "./NavBar";
import UserLogin from "./UserLogin"
import { NavLink } from "react-router-dom"

const Header = (props) => {
    //console.log(props);
    return (
        <header>
            <NavLink to="/react-coderhouse">
                <img src="./img/logo.png" alt="LU4ULT logo"></img>
            </NavLink>
            <NavBar />
            <UserLogin greeting="Hola Usuario!" />
        </header>
    );
}

export default Header;