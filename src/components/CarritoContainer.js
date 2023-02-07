import uuid from 'react-uuid';
import { iconoTrash } from './Iconos';
import { useContext } from "react";
import { contexto } from "./CustomProvider";
import CarritoItem from './CarritoItem';

const CarritoContainer = () => {

    const { carrito,borrarItemDelCarrito,productosTodos } = useContext(contexto);

    
    console.log(productosTodos)
    return (
        <div className="carritoContainer">
            <div className='productos'>
                {
                    carrito.map(item => {
                        return (
                           <CarritoItem key={uuid()} item={item}/>
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


export default CarritoContainer;