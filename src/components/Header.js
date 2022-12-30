import NavBar from "./NavBar";
import CartWidget from "./CartWidget";
import UserLogin from "./UserLogin"

const Header = (props) => {
    console.log(props);
    return (
        <header>
            <img src="/img/logo.png" alt="LU4ULT logo"></img>
            <NavBar />
            <CartWidget cartSum={3} />
            <UserLogin />
        </header>
    );
}

export default Header;