import BeatLoader from "react-spinners/BeatLoader";
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom";
import ItemList from "./ItemList"
import ItemDetailContainer from "./ItemDetailContainer";
import CategoriesContainer from "./CategoriesContainer";
//import { useParams } from "react-router-dom";

import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./Firebase";

import { contexto } from "./CustomProvider";



//import Filters from "./Filters";

/*
Se encarga de pedir el array de productos a products.json alojado en el repo.
También, decide si debe renderizar, en función de los props booleanos que recibe qué debe renderizar:
1) la página principal:     ItemList => Item
2) individual de producto:  ItemDetailContainer
3) página por categoría:    CategoriesContainer => ItemList => Item

*/
const ItemListContainer = (props) => {
    const { setProductosTodos } = useContext(contexto);
    const renderIsDetails = props.render === 'detalle' || false;
    const renderIsCategories = props.render === 'categoria' || false;

    const { categoria } = useParams();

    const [productos, setProductos] = useState([]);
    const [estanProductosCargados, setEstanProductosCargados] = useState(false);


    useEffect(() => {
        const productosCollection = collection(db, "productos")
        let filtro = query(productosCollection)

        if (categoria !== undefined) {
            filtro = query(productosCollection, where("category", "array-contains", categoria))
        }

        getDocs(filtro)
            .then((respuesta) => {
                setTimeout(() => {
                    setEstanProductosCargados(true);
                    setProductos(productos);
                    setProductosTodos(productos);
                }, 500)

                const productos = respuesta.docs.map(doc =>
                    ({ ...doc.data() }))

                productos.map(e => {
                    fetch('https://api.mercadolibre.com/items/' + e.idMeli)
                        .then(response => response.json())
                        .then(data => {
                            e.imgMeliUrl = data['pictures'][0]['secure_url'];
                            e.video = data['video_id'];
                            e.popularidad = data['sold_quantity'];

                            e.price = Math.floor(0.89 * parseInt(data['price']));
                            if (e.fullFilment === true)
                                e.price = Math.floor(1 * parseInt(data['price']));
                            //e.stock = parseInt(data['available_quantity']);               //No porque no es el stock
                        })
                })

            })
            .catch((error) => {
                console.log(error)
                //toast.error("Hubo un error, vuelva a intentarlo!" + error.message)
            })

    }, [categoria]);




    //Si no recibió que debe renderizar un sólo producto con sus detalles o una categoría, es porque estamos en la página principal y mostramos todos los productos.
    if (renderIsCategories === false && renderIsDetails === false) {
        return (
            <>
                {
                    estanProductosCargados ?
                        <ItemList productos={productos} />
                        :
                        <div className="spinner">
                            <BeatLoader color="#36d7b7" loading={!estanProductosCargados} />
                        </div>
                }
            </>
        );
    }

    if (renderIsDetails === true) {
        return (
            <ItemDetailContainer productos={productos} />
        );
    }

    if (renderIsCategories === true) {
        return (
            <CategoriesContainer productos={productos} />
        );
    }
}

export default ItemListContainer;