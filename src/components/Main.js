import ItemListContainer from "./ItemListContainer";
import { Route, Routes } from "react-router-dom"
import Carrito from "./Carrito";
import Error from "./Error";

const Main = () => {
    const mainPath = "/react-coderhouse";
    return (
        <main>
            <Routes>
                <Route path={mainPath} element={<ItemListContainer />} />
                <Route path={mainPath + "/productos/:categoria"} element={<ItemListContainer />} />
                <Route path="/item/:id" element={<ItemListContainer />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </main>
    );
}

export default Main;


/*



*/