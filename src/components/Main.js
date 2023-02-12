import ItemListContainer from "./ItemListContainer";
import { Route, Routes } from "react-router-dom"
import Error from "./Error";
import UserData from "./UserData";
import AdminPage from "./AdminPage";
import CarritoContainer from "./CarritoContainer";

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<ItemListContainer />} />
                <Route path="/productos/:categoria" element={<ItemListContainer render="categoria" />} />
                <Route path="/item/:currentId" element={<ItemListContainer render="detalle" />} />
                <Route path="/user" element={<UserData />} />
                <Route path="/carrito" element={<CarritoContainer />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </main>
    );
}

export default Main;