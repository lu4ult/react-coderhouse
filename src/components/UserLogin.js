import { Link } from "react-router-dom";
import { iconoUsuario } from "./Iconos";

const UserLogin = (props) => {
    const greetings = props.greeting;
    return (
        <Link className="header__userLogin" to="/user">
            {iconoUsuario}
            <span className="user__name">{greetings}</span>
        </Link>
    );
}

export default UserLogin;