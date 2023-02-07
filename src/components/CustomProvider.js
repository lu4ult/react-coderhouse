import { createContext, useState, useEffect } from "react"

export const contexto = createContext();
const Provider = contexto.Provider;

const CustomProvider = ({ children }) => {

    const [totalProductos, setTotalProductos] = useState(0);
    const [carrito, setCarrito] = useState([]);
    const [productosTodos, setProductosTodos] = useState([]);


    // function ubicacionEnArraySegunId(id, array) {
    //     return array.findIndex(el => el.id === id)
    // }


    // useEffect(()=>{
    //     totalesDelCarrito();

    // },[carrito])

    // function totalesDelCarrito() {
    //     console.log(carrito)


    //     console.log(cantidadDeProductos)


    //     const costoTotal = carrito
    //         .map(e => (e.cantidadIndividual * ))
    // }

    /*
    const cantidadDeProductos = carrito
            .map(e => e.cantidadIndividual)
            .reduce((a, b) => a + b, 0)
    */

    function estaProductoEnCarrito(id) {
        const indiceHallado = carrito.findIndex(el => el.id === id)

        return indiceHallado >= 0;
    }

    const borrarItemDelCarrito = (productoABorrar) => {
        setTotalProductos(totalProductos - productoABorrar.cantidadIndividual);

        const carritoCopia = [...carrito].filter(pr => pr.id !== productoABorrar.id);
        setCarrito(carritoCopia);
    }

    const agregarAlCarrito = (producto) => {
        if (estaProductoEnCarrito(producto.id) === false) {
            setCarrito([...carrito, producto]);
        }
        else {
            const carritoCopia = [...carrito];
            const productoAModificar = carritoCopia.find(el => el.id === producto.id)

            productoAModificar.cantidadIndividual += producto.cantidadIndividual;
            setCarrito(carritoCopia);
        }

        setTimeout(() => { localStorage.setItem('tiendaLu4ult_cart', JSON.stringify(carrito)) }, 2000);

    }


    const valorDelContexto = {
        carrito: carrito,
        totalProductos: totalProductos,
        setTotalProductos: setTotalProductos,
        agregarAlCarrito: agregarAlCarrito,
        borrarItemDelCarrito: borrarItemDelCarrito,
        productosTodos: productosTodos,
        setProductosTodos: setProductosTodos

    }

    return (
        <Provider value={valorDelContexto}>
            {children}
        </Provider>
    );
}

export default CustomProvider;