import { useEffect } from "react";
import { useState } from "react"
import { useContext } from "react";
import { contexto } from "./CustomProvider";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { iconoCarritoMas } from "./Iconos";
import { notiflixPersonalizacion } from "./utils";


const ItemCount = ({ producto, esCarrito }) => {
    const { totalProductos, setTotalProductos, agregarAlCarrito, carrito } = useContext(contexto);
    const [contador, setContador] = useState(1);

    useEffect(() => {
        const cantidadEnCarrito = carrito.find(e => e.id === producto.id) || { cantidadIndividual: 0, id: 0 };
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
            Notify.success('Agregado al carrito!', notiflixPersonalizacion);
        }
    }

    return (
        <div className="itemCountContainer">
            <div className="itemCount">
                <button onClick={handleRestar} disabled={contador === 1}>-</button>
                <input type="number" value={contador} onChange={handleOnChange} disabled={esCarrito}></input>
                <button className="plus" disabled={contador >= producto.stock} onClick={handleSumar}>+</button>
            </div>
            {esCarrito ? "" : <button className="botonAgregarAlCarrito" onClick={handleAddToCart} disabled={producto.stock === 0}>{iconoCarritoMas}Agregar al carrito</button>}
        </div>
    );
}

export default ItemCount;