import { useEffect } from "react";
import { useState } from "react"
import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { contexto } from "./CustomProvider";

const ItemCount = ({ producto, esCarrito }) => {
    const { totalProductos, setTotalProductos, agregarAlCarrito, carrito } = useContext(contexto);
    const [contador, setContador] = useState(1);

    useEffect(() => {
        const cantidadEnCarrito = carrito.find(e => e.id === producto.id) || {cantidadIndividual:0,id:0};
        console.log(cantidadEnCarrito)
        console.log(producto)

        if (cantidadEnCarrito.cantidadIndividual > producto.stock) {
            setContador(producto.stock);
        }
        else {
            setContador(cantidadEnCarrito ? cantidadEnCarrito.cantidadIndividual : 1);
        }

    }, [])


    //console.log(producto)
    const handleSumar = () => {

        if (contador < producto.stock) {
            setContador(contador + 1);
            agregarAlCarrito({
                id: producto.id,
                cantidadIndividual: 1
            });
        }

        //if(!escarrito) setTotalProductos(
    }

    const handleRestar = () => {
        if (contador) {
            setContador(contador - 1);
            agregarAlCarrito({
                id: producto.id,
                cantidadIndividual: -1
            });
        }
    }

    const handleOnChange = (e) => {
        const cantDeseada = parseInt(e.target.value) || 1;
        console.log(cantDeseada);
        setContador(cantDeseada);
        if (cantDeseada > producto.stock) {
            setTimeout(() => { setContador(producto.stock) }, 1000);
        }
    }


    //console.log(totalProductos)
    //console.log()

    const handleAddToCart = () => {
        setTotalProductos(totalProductos + contador);
        agregarAlCarrito({
            id: producto.id,
            cantidadIndividual: contador
        });

        if (esCarrito === false) {
            setContador(1);
            toast.success(`${producto.internalCategory} agregado al carrito!`, {
                autoClose: 3000,
                pauseOnHover: false
            });
        }
    }

    return (
        <>
            <div className="itemCount">
                <button onClick={handleRestar} disabled={contador === 1}>-</button>
                <input type="number" value={contador} onChange={handleOnChange} disabled={esCarrito}></input>
                <button className="plus" disabled={contador >= producto.stock} onClick={handleSumar}>+</button>
            </div>
            {esCarrito ? "" : <button onClick={handleAddToCart} disabled={producto.stock === 0}>Agregar al carrito</button>}

            <ToastContainer />
        </>

    );
}

export default ItemCount;