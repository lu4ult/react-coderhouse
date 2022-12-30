import CartWidget from "./CartWidget";

const NavBar = () => {
    return (
        <>
            <div className="header__navbar-categories">
                <a href="/" >Industria</a>
                <a href="/" >Hogar</a>
                <a href="/" >Arduino</a>
            </div>
            <CartWidget cartSum={22} />
        </>
    );
}

export default NavBar;