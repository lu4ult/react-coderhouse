import uuid from 'react-uuid';
import { useContext } from "react";
import { contexto } from "./CustomProvider";
import CarritoItem from './CarritoItem';
import { useAuth0 } from "@auth0/auth0-react";

import { addDoc, collection, getDocs, query, where, serverTimestamp } from "firebase/firestore"
import { db } from "./Firebase";
import { Loading, Notify, Report } from 'notiflix';
import { formateaMoneda } from './utils';
import emailjs from '@emailjs/browser';

const CarritoContainer = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    const { carrito, productosTodos, setTotalProductos, borrarItemDelCarrito } = useContext(contexto);

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
        Loading.hourglass();

        const coleccionCompras = collection(db, "ordenes");
        addDoc(coleccionCompras, ordenDeCompra)
            .then((docRef) => {
                // 'productos': ordenDeCompra.productos.map(item => { `* ${item.cantidadIndividual}x ${item.id} ` })
                emailjs.send('service_k3tj0b9', 'template_aznyypc', {
                    'destinatario': 'lu4ult+tienda@gmail.com',
                    'fecha': ordenDeCompra.fecha,
                    'id_pedido': docRef.id,
                    'from_name': user.name
                }, '840utIXux0aomLktd');

                Report.info(
                    '¡Gracias!',
                    `Comenzamos a trabajar en tu orden ${docRef.id}, vas a recibir más información por email`,
                    'Finalizar',
                );

                carrito.map(prod => borrarItemDelCarrito(prod));
                setTotalProductos(0);

                Loading.remove(1000);
            })



        console.log(ordenDeCompra)

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
                <h6>Total: {formateaMoneda(precioTotalCarrito)}</h6>
            </div>
            <button disabled={!isAuthenticated} className={`botonFinalizarCompra ${isAuthenticated ? "" : " noLogueado"}`} onClick={handleFinalizarCompra}>
                {isAuthenticated ? "Finalizar Compra" : "Inicia sesión para poder finalizar la compra"}
            </button>

        </div>
    );
}


export default CarritoContainer;