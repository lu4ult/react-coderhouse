import { useState } from "react"
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { contexto } from "./CustomProvider";

const ItemCount = ({ producto }) => {
    const [contador, setContador] = useState(1);
    // if(producto.stock) {
    //     setContador(1);
    // }

    //console.log(contador)
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

    const handleOnChange = (e) => {
        const cantDeseada = parseInt(e.target.value) || 1;
        //console.log(cantDeseada);
        setContador(cantDeseada);
        if (cantDeseada > producto.stock) {
            setTimeout(() => { setContador(producto.stock) }, 1000);
        }
    }

    const { totalProductos, setearTotalProductos, agregarAlCarrito } = useContext(contexto);
    //console.log(totalProductos)
    //console.log()

    const handleAddToCart = () => {
        // console.log("click");
        // console.log(totalProductos);
        // console.log(contador)
        setearTotalProductos(totalProductos + contador);
        agregarAlCarrito({
            id: producto.id,
            cantidadIndividual: contador
        })

        setContador(1);
        toast.success(`${producto.internalCategory} agregado al carrito!`, {
            autoClose: 3000,
            pauseOnHover: false
        });
    }

    return (
        <>
            <div className="itemCount">
                <button onClick={handleRestar} disabled={contador === 1}>-</button>
                <input type="number" value={contador} onChange={handleOnChange}></input>
                <button className="plus" disabled={contador >= producto.stock} onClick={handleSumar}>+</button>
            </div>
            <button onClick={handleAddToCart} disabled={producto.stock === 0}>Agregar al carrito</button>
            <ToastContainer />
        </>

    );
}

export default ItemCount;