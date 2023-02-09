import uuid from 'react-uuid';
import { useContext } from "react";
import { contexto } from "./CustomProvider";
import CarritoItem from './CarritoItem';
import { useAuth0 } from "@auth0/auth0-react";

import { addDoc, collection, getDocs, query, where, serverTimestamp } from "firebase/firestore"
import { db } from "./Firebase";

const CarritoContainer = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    const { carrito, productosTodos } = useContext(contexto);

    const preciosCarrito = carrito.map(item => {
        const producto = productosTodos.find(pr => pr.id === item.id)
        return producto.price * item.cantidadIndividual;
    })
    const precioTotalCarrito = preciosCarrito.reduce((a, b) => (a + b), 0);


    const ordenDeCompra = {
        productos: carrito,
        fecha: serverTimestamp(),
        usuario: { ...user }

    }

    const handleFinalizarCompra = () => {

        console.log(carrito)

        const coleccionCompras = collection(db, "ordenes");
        addDoc(coleccionCompras, ordenDeCompra)
            .then((docRef) => {
                console.log(docRef)
                console.log(docRef.id)
                alert(docRef.id);
            })
    }

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
            <div className='carritoContainer__subTotal'>
                <h6>Total: {precioTotalCarrito}</h6>
            </div>
            <button disabled={!isAuthenticated} className={`botonFinalizarCompra ${isAuthenticated?"":" noLogueado"}`} onClick={handleFinalizarCompra}>
                {isAuthenticated?"Finalizar Compra":"Inicia sesión para poder finalizar la compra"}
            </button>

        </div>
    );
}


export default CarritoContainer;