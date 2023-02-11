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
import { Link } from 'react-router-dom';

const CarritoContainer = () => {

    //TODO: en vez de usar isAuthenticated ver cómo detectarlo con los datos del contexto
    const { user, isAuthenticated, isLoading } = useAuth0();

    const { carrito, productosTodos, setTotalProductos, borrarItemDelCarrito, datosUsuarioContext } = useContext(contexto);

    const preciosCarrito = carrito.map(item => {
        const producto = productosTodos.find(pr => pr.id === item.id)
        return producto.price * item.cantidadIndividual;
    });
    const precioTotalCarrito = preciosCarrito.reduce((a, b) => (a + b), 0);


    const ordenDeCompra = {
        productos: carrito,
        fecha: serverTimestamp(),
        user_sub: datosUsuarioContext.sub,
        usuario: { ...datosUsuarioContext }

    }

    const handleFinalizarCompra = () => {
        Loading.hourglass();

        let textoItemsComprados = "<ul>";
        ordenDeCompra.productos.forEach(item => { textoItemsComprados += `<li> ${item.cantidadIndividual}x ${item.id}</li>` });
        textoItemsComprados += '</ul>'
        console.log(textoItemsComprados)

        const coleccionCompras = collection(db, "ordenes");
        addDoc(coleccionCompras, ordenDeCompra)
            .then((docRef) => {
                Report.info(
                    '¡Gracias!',
                    `Comenzamos a trabajar en tu orden ${docRef.id}, vas a recibir más información por email`,
                    'Finalizar',
                );

                // 'productos': ordenDeCompra.productos.map(item => { `* ${item.cantidadIndividual}x ${item.id} ` })
                emailjs.send('service_k3tj0b9', 'template_aznyypc', {
                    'destinatario': datosUsuarioContext.correo,
                    'fecha': new Date().toString(),
                    'id_pedido': docRef.id,
                    'from_name': datosUsuarioContext.name,
                    'productos': textoItemsComprados
                }, '840utIXux0aomLktd');



                carrito.map(prod => borrarItemDelCarrito(prod));
                setTotalProductos(0);
                localStorage.setItem("tiendaLu4ult_cart","[]")

                Loading.remove(2000);
            })

        console.log(ordenDeCompra)

    }

    console.log(isAuthenticated)
    console.log(datosUsuarioContext.correo)
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
            {
                isAuthenticated === false ? <Link to="/user" className='botonFinalizarCompra noLogueado'>Inicia sesión para poder continuar la compra</Link>
                    : datosUsuarioContext.correo === undefined ? <Link to="/user" className='botonFinalizarCompra noLogueado'>Ingresá un correo real para poder continuar</Link>
                        : <button className="botonFinalizarCompra" onClick={handleFinalizarCompra}>Finalizar Compra</button>
            }
        </div>
    );
}


export default CarritoContainer;