import { useEffect, useState } from "react"
import CartWidget from './CartWidget.js'

const ItemListContainer = () => {

    const [productos, setProductos] = useState([]);
    const [estanProductosCargados, setEstanProductosCargados] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetch('https://raw.githubusercontent.com/lu4ult/react-coderhouse/gh-pages/data/products.json')
                .then(response => response.json())
                .then(data => {
                    //console.table(data);
                    //setProductos(data);

                    data.forEach(e => {
                        if(e.idMeli.includes("MLA")) {
                            fetch('https://api.mercadolibre.com/items/' + e.idMeli)
                            .then(response => response.json())
                            .then(data => {
                                e.imgMeliUrl = data['pictures'][0]['secure_url'];
                                //console.log(data['pictures'][0]['secure_url'])
                                //console.log(data)
                            })
                        }
                        /*
                        else {
                            console.log("nop " + e.idMeli);
                        }
                        */
                    })

                    console.log("aca hace set productos")
                    setEstanProductosCargados(true);
                    setProductos(data);
                })
                .catch(error => console.log(error))
        }, 2000)
    }, []);

    //productos.forEach(p => {})


    const addToCart = (e) => {
        console.log(e.target.value)
        console.log(productos);
        //setCartCounter(cartCounter +1);   //No anduvo
        //setCartCounter(cartCounter);
    }

    return (
        <>
            {estanProductosCargados ? "" : "Cargando..."}
            <div className="productsContainer">
                {
                    productos.map((producto) => {
                        return (
                            <article>
                                <a href={'https://articulo.mercadolibre.com.ar/'+producto.idMeli.replace("MLA","MLA-")} target="_blank">{producto.title}</a>
                                <img alt={producto.title} src={producto.imgMeliUrl}></img>
                                <div className="article__price">{producto.price} $</div>
                                <div>Stock: {producto.stock}</div>
                                <div>{producto.idMeli}</div>
                                <div>Full: {producto.fullFilment?"si":"no"}</div>
                                <div>Cat: {producto.internalCategory}</div>
                                <div>ID: {producto.id}</div>
                                <button disabled={producto.stock === 0} value={producto.idMeli} onClick={addToCart}>Agregar al carrito</button>
                            </article>
                        )
                    })
                }

            </div>
        </>

    );
}

export default ItemListContainer;