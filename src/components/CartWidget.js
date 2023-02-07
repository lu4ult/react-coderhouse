import { iconoCarrito } from "./Iconos";
import { Link } from "react-router-dom"

const CartWidget = ({ cartSum }) => {
    return (
        <Link  to={cartSum?"/carrito":null} className="header__carrito">
            {iconoCarrito}
            {cartSum?<div className="counter">{cartSum}</div>:null}
        </Link>
    );
}

export default CartWidget;