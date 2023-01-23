import uuid from "react-uuid";
import Item from "./Item"

const ItemList = ({productos}) => {
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