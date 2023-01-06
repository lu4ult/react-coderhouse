import CartWidget from "./CartWidget";

const NavBar = () => {
    return (
        <>
            <div className="header__navbar-categories">
                <a href="/" className="active">Inicio</a>
                <a href="/" className="">Industria</a>
                <a href="/" className="">Hogar</a>
                <a href="/" className="">Arduino</a>
            </div>
            <CartWidget cartSum={Math.floor(Math.random()*10)} />
        </>
    );
}

export default NavBar;