import CartWidget from "./CartWidget";
import { NavLink } from "react-router-dom"
const NavBar = () => {
    return (
        <>
            <div className="header__navbar">
                <NavLink className="header__link" to="/productos/arduino">Arduino</NavLink>
                <NavLink className="header__link" to="/productos/iot">IOT</NavLink>
                <NavLink className="header__link" to="/productos/industria">Industria</NavLink>
                <NavLink className="header__link" to="/productos/hogar">Hogar</NavLink>
            </div>
            <CartWidget cartSum={0} />
        </>
    );
}

export default NavBar;