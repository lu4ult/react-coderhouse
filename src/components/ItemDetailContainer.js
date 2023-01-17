import { useParams } from "react-router-dom";
import MoreProducts from "./MoreProducts";
import NumericInput from 'react-numeric-input';
import shuffleArray from "./ShuffleArray";

const ItemDetailContainer = ({ productos }) => {

    const { currentId } = useParams();

    // console.log(currentId);
    // console.log( productos );


    const indexOfCurrentProd = productos.findIndex(e => e.id === parseInt(currentId));
    const productoAMostrar = productos.find(e => e.id === parseInt(currentId));

    let viewportWidth = window.innerWidth;
    console.log(viewportWidth)
    let cantidadDeMiniaturas = Math.floor(viewportWidth / 200);
    if (cantidadDeMiniaturas <= 1)
        cantidadDeMiniaturas = 2;
    if (cantidadDeMiniaturas > 5)
        cantidadDeMiniaturas = 5;
    console.log(cantidadDeMiniaturas)

    /*

    Para que los productos del banner sean aleatorios y no consecutivos primero hacemos una copia y los ordenamos de manera random.
    Luego pasamos a productosParaBanner desde los último elementos porque ya están desordenados.
    */
    const productosCopia = [...productos]
    shuffleArray(productosCopia);
    //console.log(productosCopia);

    const productosParaBanner = [];
    for (let i = 1; i <= cantidadDeMiniaturas; i++) {
        //productosParaBanner.push(productosCopia.at(indexOfCurrentProd - i));             //Hacemos -1 para recorrer el array de atrás a adelante, ya que se puede acceder por índice negativo pero no por índice mayor a la longitud
        productosParaBanner.push(productosCopia.pop());
    }

    // console.log(productosParaBanner);

    //console.log(productoAMostrar)
    return (
        <>
            <div className="itemDetalles">
                <h3 className="itemDetalles__titulo">{productoAMostrar.title}</h3>
                <div className="itemDetalles__imagen">
                    <img src={productoAMostrar.imgMeliUrl}></img>
                </div>
                <div className="itemDetalles__datos">
                    <p>{productoAMostrar.internalCategory}</p>
                    <p>{productoAMostrar.price} $</p>
                    <NumericInput mobile className="form-control" min={productoAMostrar.stock ? 1 : 0} max={productoAMostrar.stock} value={productoAMostrar.stock ? 1 : 0} />
                    <a href={"https://articulo.mercadolibre.com.ar/" + productoAMostrar.idMeli.replace("MLA", "MLA-")} target="_blank">Ver en mercado libre</a>
                    <button>Agregar al carrito</button>
                </div>
            </div>
            <MoreProducts productos={productosParaBanner} />
        </>
    );
}

export default ItemDetailContainer;


//