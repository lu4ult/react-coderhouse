import BeatLoader from "react-spinners/BeatLoader";
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom";
import ItemList from "./ItemList"
import ItemDetailContainer from "./ItemDetailContainer";
import CategoriesContainer from "./CategoriesContainer";

import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./Firebase";
import { contexto } from "./CustomProvider";


const ItemListContainer = (props) => {
    const { setProductosTodos } = useContext(contexto);
    const renderIsDetails = props.render === 'detalle' || false;
    const renderIsCategories = props.render === 'categoria' || false;
    const { categoria } = useParams();

    const [productos, setProductos] = useState([]);
    const [estanProductosCargados, setEstanProductosCargados] = useState(false);

    useEffect(() => {
        setEstanProductosCargados(false);
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
                }, 1000);

                const productos = respuesta.docs.map(doc =>
                    ({ ...doc.data() }))

                productos.map(e => {
                    fetch('https://api.mercadolibre.com/items/' + e.idMeli)
                        .then(response => response.json())
                        .then(data => {
                            e.imgMeliUrl = data['pictures'][0]['secure_url'];
                            e.video = data['video_id'];
                            e.popularidad = data['sold_quantity'];

                            e.price = Math.floor(0.9 * parseInt(data['price']));
                            if (e.fullFilment === true)
                                e.price = Math.floor(1 * parseInt(data['price']));
                            //e.stock = parseInt(data['available_quantity']);               //No porque no es el stock
                        })
                })

            })
            .catch((error) => {
                console.log(error)
            });

    }, [categoria]);


    if (!estanProductosCargados) {
        return (
        <div className="spinner">
            <BeatLoader color="#36d7b7" loading={true} />
        </div>);
    }

    if (renderIsCategories === false && renderIsDetails === false) {
        return (
            <ItemList productos={productos} />
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