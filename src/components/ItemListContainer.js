import { useEffect, useState } from "react"

const ItemListContainer = () => {

    const [productos, setProductos] = useState([]);
    const [estanProductosCargados, setEstanProductosCargados] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetch('https://raw.githubusercontent.com/lu4ult/react-coderhouse/gh-pages/data/products.json')
                .then(response => response.json())
                .then(data => {
                    //console.log(data)
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
                        else {
                            console.log("nop " + e.idMeli);
                        }
                    })

                    console.log("aca hace set productos")
                    setEstanProductosCargados(true);
                })
                .catch(error => console.log(error))
        }, 1000)
    }, []);

    //productos.forEach(p => {})


    const addToCart = (e) => {
        console.log(e.target.value)
        console.log(productos);
    }

    return (
        <>
            {estanProductosCargados ? "" : "Cargando..."}
            <div className="productsContainer">
                {
                    productos.map((producto) => {
                        return (
                            <article>
                                <a href="https://articulo.mercadolibre.com.ar/">{producto.title}</a>
                                <img alt={producto.title} src={producto.imgMeliUrl}></img>
                                <div className="article__price">{producto.price} $</div>
                                <div>Stock: {producto.stock}</div>
                                <div>{producto.idMeli}</div>
                                <div>{producto.fullFillment}</div>
                                <div>{producto.internalID}</div>
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