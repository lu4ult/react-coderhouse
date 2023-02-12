import CartWidget from "./CartWidget";
import { NavLink } from "react-router-dom"
import { useContext } from "react";
import { contexto } from "./CustomProvider"
const NavBar = () => {
    const { totalProductos } = useContext(contexto);

    return (
        <>
            <div className="header__navbar">
                <NavLink className="header__link" to="/productos/arduino">Arduino</NavLink>
                <NavLink className="header__link" to="/productos/iot">IOT</NavLink>
                <NavLink className="header__link" to="/productos/industria">Industria</NavLink>
                <NavLink className="header__link" to="/productos/hogar">Hogar</NavLink>
            </div>
            <CartWidget cartSum={totalProductos} />
        </>
    );
}

export default NavBar;