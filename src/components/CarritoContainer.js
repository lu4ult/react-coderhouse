import uuid from 'react-uuid';
import { iconoTrash } from './Iconos';
import { useContext } from "react";
import { contexto } from "./CustomProvider";
import CarritoItem from './CarritoItem';

const CarritoContainer = () => {
    const { carrito, productosTodos } = useContext(contexto);

    const preciosCarrito = carrito.map(item => {
        const producto = productosTodos.find(pr => pr.id === item.id)
        return producto.price * item.cantidadIndividual;
    })
    const precioTotalCarrito = preciosCarrito.reduce((a, b) => (a + b), 0)

    return (
        <div className="carritoContainer">
            <div className='productos'>
                {
                    carrito.map(item => {
                        return (
                            <CarritoItem key={uuid()} item={item} />
                        )
                    })
                }
            </div>
            <div className='carrito__subTotal'>
                <h6>Total: {precioTotalCarrito}</h6>
            </div>
            <button>Finalizar Compra</button>
        </div>
    );
}


export default CarritoContainer;