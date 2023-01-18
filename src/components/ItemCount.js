import { useState } from "react"

const ItemCount = ({ producto }) => {
    const [contador, setContador] = useState(0);

    const handleSumar = () => {
        if (contador < producto.stock) {
            setContador(contador + 1)
        }
    }

    const handleRestar = () => {
        if (contador) {
            setContador(contador - 1)
        }
    }

    const handleOnChange = (e) => {
        setContador(parseInt(e.target.value))
    }

    return (
        <div>
            <button onClick={handleRestar}>-</button>
            <input type="text" value={contador} onChange={handleOnChange}></input>
            <button onClick={handleSumar}>+</button>
        </div>
    );
}

export default ItemCount;