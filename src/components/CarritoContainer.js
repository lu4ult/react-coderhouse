import uuid from 'react-uuid';
import { useContext } from "react";
import { contexto } from "./CustomProvider";
import CarritoItem from './CarritoItem';
import { useAuth0 } from "@auth0/auth0-react";

import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "./Firebase";
import { Loading, Report } from 'notiflix';
import { formateaMoneda, fechaJsAFechaHumana, esProduccion } from './utils';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
import CaraTristeAnimacion from './CaraTristeAnimacion';

const CarritoContainer = () => {
    const { isAuthenticated } = useAuth0();
    const { carrito, productosTodos, totalProductos, vaciarCarrito, datosUsuarioContext } = useContext(contexto);

    const preciosCarrito = carrito.map(item => {
        const producto = productosTodos.find(pr => pr.id === item.id)
        return producto.price * item.cantidadIndividual;
    });
    const precioTotalCarrito = preciosCarrito.reduce((a, b) => (a + b), 0);


    const ordenDeCompra = {
        totalProductos: totalProductos,
        totalCosto: precioTotalCarrito,
        productos: carrito,
        fecha: serverTimestamp(),
        estado: "Procesando",
        user_sub: datosUsuarioContext.sub,
        usuario: { ...datosUsuarioContext }

    }

    const handleFinalizarCompra = () => {
        Loading.hourglass();

        let textoItemsComprados = "* ";
        ordenDeCompra.productos.forEach(item => { textoItemsComprados += `${item.cantidadIndividual}x ${item.id}` });

        const coleccionCompras = collection(db, "ordenes");
        addDoc(coleccionCompras, ordenDeCompra)
            .then((docRef) => {

                if (esProduccion()) {
                    emailjs.send('service_k3tj0b9', 'template_aznyypc', {
                        'destinatario': datosUsuarioContext.correo,
                        'fecha': fechaJsAFechaHumana(new Date()),
                        'id_pedido': docRef.id,
                        'from_name': datosUsuarioContext.nombre,
                        'total_productos': totalProductos,
                        'total_costo': formateaMoneda(precioTotalCarrito),
                        'address': `${datosUsuarioContext.calle} ${datosUsuarioContext.altura}, ${datosUsuarioContext.localidad} ${datosUsuarioContext.provincia}`,
                        'productos': textoItemsComprados
                    }, '840utIXux0aomLktd');
                }

                Loading.remove(3000);
                setTimeout(() => {
                    Report.info(
                        '¡Gracias!',
                        `Comenzamos a trabajar en tu orden ${docRef.id}, vas a recibir más información por email`,
                        'Finalizar',
                        () => {
                            vaciarCarrito();
                            window.location.replace(window.location.origin + "/user")
                        }
                    );
                }, 2000);
                fetch(`https://api.callmebot.com/whatsapp.php?phone=+5492954692293&text=%22${`Compra de ${datosUsuarioContext.nombre}`}%22&apikey=727958`)
            })
    }

    return (
        <div className="carritoContainer">
            <div className='productos'>
                {
                    JSON.stringify(carrito) === "[]" ? <CaraTristeAnimacion mensaje="Sin productos" />
                        : carrito.map(item => {
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
                        : <button disabled={JSON.stringify(carrito) === "[]"} className="botonFinalizarCompra" onClick={handleFinalizarCompra}>Finalizar Compra</button>
            }
        </div>
    );
}


export default CarritoContainer;