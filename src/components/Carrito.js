import uuid from 'react-uuid';
import { useContext } from "react";
import { contexto } from "./CustomProvider";

const Carrito = () => {

    const { carrito } = useContext(contexto)
    return (
        <div className="carritoContainer">
            <div className='carrito__productos'>
                {
                    carrito.map(p => {
                        return (
                            <div className='carrito__productos-producto' key={uuid()}>
                                <img alt='Producto'></img>
                                <p>Título</p>
                                <p>{p.id}</p>
                                <p>Cantidad: {p.cantidadIndividual}</p>
                                <p>Total: {Math.random()}</p>
                                <p>X</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className='carrito__subTotal'>
                <h6>Total: {Math.random()}</h6>
            </div>
        </div>
    );
}


export default Carrito;