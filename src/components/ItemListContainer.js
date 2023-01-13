import BeatLoader from "react-spinners/BeatLoader";
import { useEffect, useState } from "react"
import ItemList from "./ItemList"


const ItemListContainer = () => {

    const [productos, setProductos] = useState([]);
    const [estanProductosCargados, setEstanProductosCargados] = useState(false);

    useEffect(() => {
        console.log("Inicio useEffect")
        setTimeout(() => {
            fetch('https://raw.githubusercontent.com/lu4ult/react-coderhouse/gh-pages/data/products.json')
                .then(response => response.json())
                .then(data => {
                    //console.table(data);
                    //setProductos(data);


                    //Intento 1:
                    /*
                    data.forEach(e => {
                        if (e.idMeli.includes("MLA")) {
                            fetch('https://api.mercadolibre.com/items/' + e.idMeli)
                                .then(response => response.json())
                                .then(data => {
                                    e.imgMeliUrl = data['pictures'][0]['secure_url'];
                                    //console.log(data['pictures'][0]['secure_url'])
                                    //console.log(data)
                                })
                        }
                    })
                    */

                    //Intento 2:
                    /*
                    async function awaitImageFromMeLi(id) {
                        const rtta = await fetch('https://api.mercadolibre.com/items/' + id)
                                .then(response => response.json())
                                .then(data => {
                                    const imgUrl = data['pictures'][0]['secure_url'];
                                    //console.log(imgUrl)
                                    return imgUrl;
                            });
                        return rtta;
                    }

                    data.forEach((e)=>{
                        e.imgMeliUrl = awaitImageFromMeLi(e.idMeli);
                    });
                    */

                    //Intento 3:
                    /*
                     const promesaDeImagenes = data.map(producto => {
                        if (producto.idMeli.includes("MLA")) {
                            return (
                                fetch('https://api.mercadolibre.com/items/' + producto.idMeli)
                                .then(response => response.json())
                                .then(data => data['pictures'][0]['secure_url'])
                            )
                        }
                    })

                    const productosSinImagenes = [...data,{id:99,"title":"test"}];

                    console.log(productosSinImagenes)
                    Promise.all(promesaDeImagenes)
                    .then((valor) => {
                        productosSinImagenes.forEach((e,indice)=>{e.imgMeliUrl=valor[indice]});
                        console.log(valor)
                    });
                    */

                    setEstanProductosCargados(true);
                    setProductos(data);
                })
                .catch(error => console.log(error))
        }, 2000)
        console.log("Fin useEffect");
    }, []);



    const addToCart = (e) => {
        console.log(e.target.value)
        console.log(productos);
        //setCartCounter(cartCounter +1);   //No anduvo
        //setCartCounter(cartCounter);
    }

    return (
        <>
            {estanProductosCargados ? <ItemList productos={productos} /> : <BeatLoader color="#36d7b7" loading={!estanProductosCargados} />}
        </>
    );
}

export default ItemListContainer;