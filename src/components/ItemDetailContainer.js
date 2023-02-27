import { useParams } from "react-router-dom";
import BannerProductosMiniaturas from "./BannerProductosMiniaturas";
import { shuffleArray } from "./utils";
import ItemDetail from "./ItemDetail";
import BeatLoader from "react-spinners/BeatLoader";


const ItemDetailContainer = ({ productos }) => {
    const { currentId } = useParams();
    let productoAMostrar = {};

    if (productos.length) {
        productoAMostrar = productos.find(e => e.id === parseInt(currentId));
    }

    /*******************************************/
    let viewportWidth = window.innerWidth;
    let cantidadDeMiniaturas = Math.floor(viewportWidth / 250);
    if (cantidadDeMiniaturas <= 1)
        cantidadDeMiniaturas = 2;
    if (cantidadDeMiniaturas > 6)
        cantidadDeMiniaturas = 6;


    const productosCopia = productos.filter(e => e.id !== parseInt(currentId))
    const productosParaBanner = [];
    shuffleArray(productosCopia);

    if (productos.length) {
        for (let i = 1; i <= cantidadDeMiniaturas; i++) {
            productosParaBanner.push(productosCopia.pop());
        }
    }

    /*******************************************/
    if (productos.length) {
        return (
            <>
                <ItemDetail productoAMostrar={productoAMostrar} />
                <BannerProductosMiniaturas productos={productosParaBanner} />
            </>
        );

    }
    else {
        return (
            <div className="spinner">
                <BeatLoader color="#36d7b7" loading={true} />
            </div>
        );
    }
}

export default ItemDetailContainer;