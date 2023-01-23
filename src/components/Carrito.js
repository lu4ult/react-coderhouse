import uuid from 'react-uuid';
import { useContext } from "react";
import { contexto } from "./CustomProvider";

const Carrito = () => {

    const { carrito, totalProductos } = useContext(contexto)
    return (
        <div className="carritoContainer">
            <p>Total Productos: {totalProductos}</p>
            <ul>
                {
                    carrito.map(p => {
                        return (
                            <li key={uuid()} id={uuid()}>
                                <img alt='Producto'></img>
                                <p>Título</p>
                                <p>{p.id}</p>
                                <p>Cantidad: {p.cantidadIndividual}</p>
                                <p>Total: {Math.random()}</p>
                                <p>X</p>


                            </li>
                        )
                    })
                }
            </ul>
            <div className='carrito__subTotal'>
                <h6>Total: {Math.random()}</h6>
            </div>
        </div>
    );
}


export default Carrito;