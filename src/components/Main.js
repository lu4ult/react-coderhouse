import ItemListContainer from "./ItemListContainer";
import { Route, Routes } from "react-router-dom"
import Carrito from "./Carrito";
import Error from "./Error";

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<ItemListContainer />} />
                <Route path="/productos/:categoria" element={<ItemListContainer />} />
                <Route path="/item/:id" element={<ItemListContainer />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="*" element={<Error />} />

            </Routes>
            <ItemListContainer />
        </main>
    );
}

export default Main;


/*



*/