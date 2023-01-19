import { useState } from "react"

const ItemCount = ({ producto }) => {
    const [contador, setContador] = useState(0);

    const handleSumar = () => {
        if (contador < producto.stock) {
            setContador(contador + 1);
        }
    }

    const handleRestar = () => {
        if (contador) {
            setContador(contador - 1);
        }
    }

    return (
        <div className="itemCount">
            <button onClick={handleRestar}>-</button>
            <button className="plus" disabled={contador >= producto.stock} onClick={handleSumar}>+</button>
        </div>
    );
}

export default ItemCount;

/*

<input type="text" value={contador} onChange={handleOnChange}></input>
*/

/*

const handleOnChange = (e) => {
        console.log("se")
        setContador(parseInt(e.target.value))
    }

    */