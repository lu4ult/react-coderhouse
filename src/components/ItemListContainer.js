import BeatLoader from "react-spinners/BeatLoader";
import { useEffect, useState } from "react"
import ItemList from "./ItemList"
import ItemDetailContainer from "./ItemDetailContainer";
import CategoriesContainer from "./CategoriesContainer";


/*
Se encarga de pedir el array de productos a products.json alojado en el repo.
También, decide si debe renderizar, en función de los props boobleanos que recibe qué debe renderizar:
1) la página principal:     ItemList => Item
2) individual de producto:  ItemDetailContainer
3) página por categoría:    CategoriesContainer => ItemList => Item

*/
const ItemListContainer = (props) => {

    const renderIsDetails = props.render === 'detalle';
    const renderIsCategories = props.render === 'categoria';


    const [productos, setProductos] = useState([]);
    const [estanProductosCargados, setEstanProductosCargados] = useState(false);

    useEffect(() => {
        console.log("Inicio useEffect")
        //       setTimeout(() => {
        fetch('https://raw.githubusercontent.com/lu4ult/react-coderhouse/gh-pages/data/products.json')
            .then(response => response.json())
            .then(data => {
                //Intento 1:

                data.forEach(e => {
                    fetch('https://api.mercadolibre.com/items/' + e.idMeli)
                        .then(response => response.json())
                        .then(data => {
                            e.imgMeliUrl = data['pictures'][0]['secure_url'];
                        })
                })

                //TODO: solucionar esto.
                setTimeout(() => {
                    setEstanProductosCargados(true);
                    setProductos(data);
                }, 1000);

                //Acá estaba originalmente
                //setProductos(data);
                //setEstanProductosCargados(true);
            })
            .catch(error => console.log(error))
        //      }, 1000)
        console.log("Fin useEffect");
    }, [estanProductosCargados]);



    const addToCart = (e) => {
        console.log(e.target.value)
        console.log(productos);
        //setCartCounter(cartCounter +1);   //No anduvo
        //setCartCounter(cartCounter);
    }


    //Si no recibió que debe renderizar un sólo producto con sus detalles o una categoría, es porque estamos en la página principal y mostramos todos los productos.
    if (renderIsCategories === false && renderIsDetails === false) {
        return (
            <>
                {
                    estanProductosCargados ?
                        <ItemList productos={productos} />
                        : <BeatLoader color="#36d7b7" loading={!estanProductosCargados} />
                }
            </>
        );
    }

    //Nota: no usamos 'else' ya que como está el return no llega y no es necesario

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