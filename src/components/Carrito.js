import uuid from 'react-uuid';
import { iconoTrash } from './Iconos';
import { useContext } from "react";
import { contexto } from "./CustomProvider";

const Carrito = () => {

    const { carrito,borrarItemDelCarrito } = useContext(contexto);
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
                                <button onClick={()=>{borrarItemDelCarrito(p)}} >{iconoTrash}</button>
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