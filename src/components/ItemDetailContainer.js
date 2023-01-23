import { useParams } from "react-router-dom";
import BannerProductosMiniaturas from "./BannerProductosMiniaturas";
//import shuffleArray from "./ShuffleArray";
import { shuffleArray } from "./utils";
import ItemDetail from "./ItemDetail";
import BeatLoader from "react-spinners/BeatLoader";



const ItemDetailContainer = ({ productos }) => {
    const { currentId } = useParams();

    //Si colocamos la url "manualmente" (por ej.: /item/102) este array llega vacío y react colapsa. Para evitar eso creamos este objeto producto vacío.

    let productoAMostrar = {};
    //let indiceProductoAMostrar;
    /*
    let productoAMostrar = {
        title: undefined,
        stock: 0,
        id: 0,
        category: "",
        fullFilment: false,
        idMeli: "MLA",
        internalCategory: "",
        imgMeliUrl: "https://i.ytimg.com/vi/-6vnomecItA/maxresdefault.jpg",
        video: null,
        price: 0
    };
    */
    //Si el array llegó correctamente ahora si encontramos el producto correspondiente según el id del param.
    if (productos.length) {
        productoAMostrar = productos.find(e => e.id === parseInt(currentId));
        //indiceProductoAMostrar = productos.indexOf(productoAMostrar);
        //console.log(indiceProductoAMostrar);
    }

    /*******************************************/
    let viewportWidth = window.innerWidth;
    let cantidadDeMiniaturas = Math.floor(viewportWidth / 250);
    if (cantidadDeMiniaturas <= 1)
        cantidadDeMiniaturas = 2;
    if (cantidadDeMiniaturas > 6)
        cantidadDeMiniaturas = 6;


    /*
    Para que los productos del banner sean aleatorios y no consecutivos primero hacemos una copia y los ordenamos de manera random.
    Luego pasamos a productosParaBanner desde los último elementos porque ya están desordenados.
    */

    const productosCopia = [...productos];
    const productosParaBanner = [];
    shuffleArray(productosCopia);

    if (productos.length) {
        for (let i = 1; i <= cantidadDeMiniaturas; i++) {
            //productosParaBanner.push(productosCopia.at(indexOfCurrentProd - i));             //Hacemos -1 para recorrer el array de atrás a adelante, ya que se puede acceder por índice negativo pero no por índice mayor a la longitud
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