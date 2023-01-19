import ItemListContainer from "./ItemListContainer";
import { Route, Routes } from "react-router-dom"
//import Carrito from "./Carrito";
import Error from "./Error";

const Main = () => {
    //const mainPath = "/";                                                                   //Agrego esto a la URL porque sino en Github Pages me manda a cualquier lado.
    //const mainPath = "/react-coderhouse";                                                                   //Agrego esto a la URL porque sino en Github Pages me manda a cualquier lado.
    return (
        <main>
            <Routes>
                <Route path="/" element={<ItemListContainer />} />
                <Route path="/productos/:categoria" element={<ItemListContainer render="categoria"/>} />
                <Route path="/item/:currentId" element={<ItemListContainer render="detalle" />} />

                <Route path="*" element={<Error />} />
            </Routes>
        </main>
    );
}

export default Main;


//
//<Route path="/carrito" element={<Carrito />} />
