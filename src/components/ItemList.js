import uuid from "react-uuid";
import Item from "./Item"

const ItemList = ({ productos }) => {

    productos.sort((a, b) => b.popularidad - a.popularidad);        //Ordenamos el array por "Popularidad" que es la cantidad de ventas
    return (
        <div className="productsContainer">
            {
                productos.map((producto) => {
                    return (
                        <Item producto={producto} key={uuid()} />
                    )
                })
            }
        </div>
    );
}

export default ItemList;