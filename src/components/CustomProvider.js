import { createContext, useState, useEffect } from "react"

export const contexto = createContext();
const Provider = contexto.Provider;

const CustomProvider = ({ children }) => {

    const [totalProductos, setTotalProductos] = useState(0);
    const [carrito, setCarrito] = useState([]);
    const [productosTodos, setProductosTodos] = useState([]);
    const [datosUsuarioContext, setDatosUsuarioContext] = useState({});


    function recalcularTotalDelCarrito(_array) {
        const arrayDeCantidades = _array.map(item => item.cantidadIndividual)
        return arrayDeCantidades.reduce((a, b) => a + b, 0)
    }


    useEffect(() => {
        localStorage.setItem('tiendaLu4ult_cart', JSON.stringify(carrito))
        setTotalProductos(recalcularTotalDelCarrito(carrito));

    }, [carrito]);

    useEffect(() => {
        const carritoLocalStorage = JSON.parse(localStorage.getItem("tiendaLu4ult_cart"));
        setCarrito(carritoLocalStorage);
    }, []);



    function estaProductoEnCarrito(id) {
        const indiceHallado = carrito.findIndex(el => el.id === id)

        return indiceHallado >= 0;
    }

    const vaciarCarrito = () => {
        setCarrito([]);
        //localStorage.setItem("tiendaLu4ult_cart", "[]");

    }

    const borrarItemDelCarrito = (productoABorrar) => {
        const carritoCopia = [...carrito].filter(pr => pr.id !== productoABorrar.id);
        setCarrito(carritoCopia);
    }

    const agregarAlCarrito = (producto) => {
        console.log("agregando" + JSON.stringify(producto))
        if (estaProductoEnCarrito(producto.id) === false) {
            setCarrito([...carrito, producto]);
        }
        else {
            const carritoCopia = [...carrito];
            const productoAModificar = carritoCopia.find(el => el.id === producto.id)

            productoAModificar.cantidadIndividual += producto.cantidadIndividual;
            setCarrito(carritoCopia);
        }
    }



    // useEffect(() => {
    //     let carritoLeidoLS = JSON.parse(localStorage.getItem("tiendaLu4ult_cart"));
    //     console.log(carritoLeidoLS)

    //     if (carritoLeidoLS.length) {
    //         console.log("va")
    //         //console.log(carrito)
    //         //carritoLeidoLS.map(item => agregarAlCarrito(item))
    //         //setCarrito(carritoLeidoLS)

    //         carritoLeidoLS.forEach(item => agregarAlCarrito(item))
    //     }

    // }, [])


    const valorDelContexto = {
        carrito: carrito,
        totalProductos: totalProductos,
        agregarAlCarrito: agregarAlCarrito,
        vaciarCarrito:vaciarCarrito,
        borrarItemDelCarrito: borrarItemDelCarrito,
        productosTodos: productosTodos,
        setProductosTodos: setProductosTodos,
        datosUsuarioContext: datosUsuarioContext,
        setDatosUsuarioContext: setDatosUsuarioContext

    }

    return (
        <Provider value={valorDelContexto}>
            {children}
        </Provider>
    );
}

export default CustomProvider;