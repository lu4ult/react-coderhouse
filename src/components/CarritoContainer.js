import uuid from 'react-uuid';
import { useContext } from "react";
import { contexto } from "./CustomProvider";
import CarritoItem from './CarritoItem';
import { useAuth0 } from "@auth0/auth0-react";

import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "./Firebase";
import { Loading, Report } from 'notiflix';
import { formateaMoneda, fechaJsAFechaHumana, esProduccion, notificarMePorWhatsapp } from './utils';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
import CaraTristeAnimacion from './CaraTristeAnimacion';
import paqArLogo from '../img/paqar.png'

const CarritoContainer = () => {
    const { isAuthenticated } = useAuth0();
    const { carrito, productosTodos, totalProductos, vaciarCarrito, datosUsuarioContext } = useContext(contexto);

    const preciosCarrito = carrito.map(item => {
        const producto = productosTodos.find(pr => pr.id === item.id)
        return producto.price * item.cantidadIndividual;
    });
    const costoCarrito = preciosCarrito.reduce((a, b) => (a + b), 0);

    let costoDelEnvioGratis = Math.floor(1300 - costoCarrito * 0.05);

    if (costoDelEnvioGratis < 500) {
        costoDelEnvioGratis = 0;
    }

    const ordenDeCompra = {
        totalProductos: totalProductos,
        totalCosto: costoCarrito + costoDelEnvioGratis,
        productos: carrito,
        fecha: serverTimestamp(),
        estado: "Procesando",
        user_sub: datosUsuarioContext.sub,
        usuario: { ...datosUsuarioContext }

    }

    const handleFinalizarCompra = () => {
        Loading.hourglass();

        document.getElementById("botonFinalizarCompra").disabled = true;

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
                        'total_costo': formateaMoneda(costoCarrito + costoDelEnvioGratis),
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

                notificarMePorWhatsapp(`Compra de ${datosUsuarioContext.nombre}`);
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

                {
                    JSON.stringify(carrito) === "[]" ? <></>
                        : <div className={`${costoDelEnvioGratis === 0 ? "envioGratis" : ""} productos__producto`}>
                            <img alt='Producto' src={paqArLogo}></img>
                            <label>Envio Paq Ar (Correo Argentino)</label>
                            <div></div>
                            <p>{formateaMoneda(costoDelEnvioGratis)}</p>
                            <button disabled="true"></button>
                        </div>
                }

            </div>

            {
                JSON.stringify(carrito) === "[]" ? <></>
                    : <div className='carritoContainer__subTotal'>
                        <h6>Total: {formateaMoneda(costoCarrito + costoDelEnvioGratis)}</h6>
                    </div>
            }

            {
                isAuthenticated === false ? <Link to="/user" className='botonFinalizarCompra noLogueado'>Inicia sesión para poder continuar la compra</Link>
                    : datosUsuarioContext.correo === undefined ? <Link to="/user" className='botonFinalizarCompra noLogueado'>Ingresá un correo real para poder continuar</Link>
                        : <button id="botonFinalizarCompra" disabled={JSON.stringify(carrito) === "[]"} className="botonFinalizarCompra" onClick={handleFinalizarCompra}>Finalizar Compra</button>
            }
        </div>
    );
}


export default CarritoContainer;