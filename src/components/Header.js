import NavBar from "./NavBar";
import UserLogin from "./UserLogin"

const Header = (props) => {
    //console.log(props);
    return (
        <header>
            <img src="/img/logo.png" alt="LU4ULT logo"></img>
            <NavBar />
            <UserLogin greeting="Hola Usuario!" />
        </header>
    );
}

export default Header;