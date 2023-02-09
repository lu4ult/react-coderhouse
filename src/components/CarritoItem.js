import { iconoTrash } from './Iconos';
import { useContext } from "react";
import { contexto } from "./CustomProvider";
import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';
import { formateaMoneda } from './utils';


const CarritoItem = ({ item }) => {
    const { borrarItemDelCarrito, productosTodos } = useContext(contexto);
    const productoCompleto = productosTodos.find(pr => pr.id === item.id)

    return (
        <div className='productos__producto'>
            <img alt='Producto' src={productoCompleto.imgMeliUrl}></img>
            <Link className='producto__titulo' to={"/item/" + item.id}>{productoCompleto.title}</Link>
            <ItemCount producto={productoCompleto} esCarrito={true}/>
            <p>{formateaMoneda(productoCompleto.price * item.cantidadIndividual)}</p>
            <button onClick={() => { borrarItemDelCarrito(item) }} >{iconoTrash}</button>
        </div>)
}

export default CarritoItem;