import { createContext, useState } from "react"

export const contexto = createContext();
const Provider = contexto.Provider;

const CustomProvider = ({ children }) => {

    const [totalProductos, setTotalProductos] = useState(0);
    const [carrito, setCarrito] = useState([]);

    const setearTotalProductos = (nuevaCantidad) => {
        setTotalProductos(nuevaCantidad);
    }

    const agregarAlCarrito = (prod) => {
        //console.log(prod);
        setCarrito([...carrito, prod]);
        setTimeout(() => { localStorage.setItem('tiendaLu4ult_cart', JSON.stringify(carrito)) }, 2000);
    }

    //console.log(carrito)

    const valorDelContexto = {
        carrito: carrito,
        totalProductos: totalProductos,
        setearTotalProductos: setearTotalProductos,
        agregarAlCarrito: agregarAlCarrito
    }

    return (
        <Provider value={valorDelContexto}>
            {children}
        </Provider>
    );
}

export default CustomProvider;