import { iconoTrash } from './Iconos';
import { useContext } from "react";
import { contexto } from "./CustomProvider";
import { Link } from 'react-router-dom';


const CarritoItem = ({ item }) => {
    const { carrito, borrarItemDelCarrito, productosTodos } = useContext(contexto);

    const productoCompleto = productosTodos.find(pr => pr.id === item.id)

    return (
        <div className='productos__producto'>
            <img alt='Producto' src={productoCompleto.imgMeliUrl}></img>
            <Link className='producto__titulo' to={"/item/" + item.id}>{productoCompleto.title}</Link>
            <p>Cantidad: {item.cantidadIndividual}</p>
            <p>Total: {productoCompleto.price * item.cantidadIndividual}</p>
            <button onClick={() => { borrarItemDelCarrito(item) }} >{iconoTrash}</button>
        </div>)
}

export default CarritoItem;