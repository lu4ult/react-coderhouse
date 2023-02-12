import uuid from 'react-uuid';
import { useContext } from "react";
import { contexto } from "./CustomProvider";
import CarritoItem from './CarritoItem';
import { useAuth0 } from "@auth0/auth0-react";

import { addDoc, collection, getDocs, query, where, serverTimestamp } from "firebase/firestore"
import { db } from "./Firebase";
import { Loading, Notify, Report } from 'notiflix';
import { formateaMoneda, firestoreTimestampToHumanDate } from './utils';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';
import CaraTristeAnimacion from './CaraTristeAnimacion';

const CarritoContainer = () => {

    //TODO: en vez de usar isAuthenticated ver cómo detectarlo con los datos del contexto
    const { user, isAuthenticated, isLoading } = useAuth0();

    const { carrito, productosTodos, totalProductos, setTotalProductos, borrarItemDelCarrito, datosUsuarioContext } = useContext(contexto);

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

        // console.log(serverTimestamp())
        // console.log(serverTimestamp().toString())
        // console.log(JSON.stringify(serverTimestamp()))
        // console.log(JSON.stringify({...serverTimestamp()}))

        // console.log(firestoreTimestampToHumanDate(JSON.stringify(serverTimestamp())))
        // console.log(firestoreTimestampToHumanDate({...serverTimestamp()}))


        const coleccionCompras = collection(db, "ordenes");
        addDoc(coleccionCompras, ordenDeCompra)
            .then((docRef) => {

                emailjs.send('service_k3tj0b9', 'template_aznyypc', {
                    'destinatario': datosUsuarioContext.correo,
                    'fecha': firestoreTimestampToHumanDate(serverTimestamp()),
                    'id_pedido': docRef.id,
                    'from_name': datosUsuarioContext.name,
                    'total_productos': totalProductos,
                    'total_costo': formateaMoneda(precioTotalCarrito),
                    'address': `${datosUsuarioContext.calle} ${datosUsuarioContext.altura}, ${datosUsuarioContext.localidad} ${datosUsuarioContext.provincia}`,
                    'productos': textoItemsComprados
                }, '840utIXux0aomLktd');



                carrito.map(prod => borrarItemDelCarrito(prod));
                localStorage.setItem("tiendaLu4ult_cart", "[]")

                setTimeout(() => {
                    Loading.remove();
                    Report.info(
                        '¡Gracias!',
                        `Comenzamos a trabajar en tu orden ${docRef.id}, vas a recibir más información por email`,
                        'Finalizar',
                    )
                }, 1500);

            })

        console.log(ordenDeCompra)

    }

    console.log(isAuthenticated)
    console.log(datosUsuarioContext.correo)
    console.log(carrito)
    console.log(carrito.lenght)
    console.log(JSON.stringify(carrito))
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