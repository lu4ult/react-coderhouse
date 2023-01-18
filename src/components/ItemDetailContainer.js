import { useParams } from "react-router-dom";
import MoreProducts from "./MoreProducts";
import NumericInput from 'react-numeric-input';

import shuffleArray from "./ShuffleArray";
import ItemCount from "./ItemCount";

const ItemDetailContainer = ({ productos }) => {

    const { currentId } = useParams();


    //console.log(currentId);
    // console.log( productos );


    //const indexOfCurrentProd = productos.findIndex(e => e.id === parseInt(currentId));
    const productoAMostrar = productos.find(e => e.id === parseInt(currentId));

    let viewportWidth = window.innerWidth;
    console.log(viewportWidth)
    let cantidadDeMiniaturas = Math.floor(viewportWidth / 250);
    if (cantidadDeMiniaturas <= 1)
        cantidadDeMiniaturas = 2;
    if (cantidadDeMiniaturas > 6)
        cantidadDeMiniaturas = 6;
    console.log(cantidadDeMiniaturas)

    /*

    Para que los productos del banner sean aleatorios y no consecutivos primero hacemos una copia y los ordenamos de manera random.
    Luego pasamos a productosParaBanner desde los último elementos porque ya están desordenados.
    */
    const productosCopia = [...productos]
    const productosParaBanner = [];
    shuffleArray(productosCopia);

    for (let i = 1; i <= cantidadDeMiniaturas; i++) {
        //productosParaBanner.push(productosCopia.at(indexOfCurrentProd - i));             //Hacemos -1 para recorrer el array de atrás a adelante, ya que se puede acceder por índice negativo pero no por índice mayor a la longitud
        productosParaBanner.push(productosCopia.pop());
    }

    //TODO: hacer un componente ItemDetail y que haga esto
    //TODO: reemplazar el NumericInput por button disabled

    //TODO: reemplazar los botones por ItemCount



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
                    <ItemCount producto={productoAMostrar}/>
                    <a className="meliButton" href={"https://articulo.mercadolibre.com.ar/" + productoAMostrar.idMeli.replace("MLA", "MLA-")} target="_blank">Ver en mercado libre</a>
                    <button>Agregar al carrito</button>
                </div>
            </div>
            <MoreProducts productos={productosParaBanner} />
        </>
    );
}

export default ItemDetailContainer;


//<NumericInput mobile className="form-control" min={productoAMostrar.stock ? 1 : 0} max={productoAMostrar.stock} value={productoAMostrar.stock ? 1 : 0} />
