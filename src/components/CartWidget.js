import { iconoCarrito } from "./Iconos";
import { Link } from "react-router-dom"

const CartWidget = ({ cartSum }) => {
    return (
        <Link to="/carrito" className="header__carrito">
            {iconoCarrito}
            {cartSum?<div className="counter">{cartSum}</div>:null}
        </Link>
    );
}

export default CartWidget;