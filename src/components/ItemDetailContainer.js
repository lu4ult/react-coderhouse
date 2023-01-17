import { useParams } from "react-router-dom";
import MoreProducts from "./MoreProducts";
import NumericInput from 'react-numeric-input';

const ItemDetailContainer = ({ productos }) => {

    const { currentId } = useParams();

    // console.log(currentId);
    // console.log( productos );


    const indexOfCurrentProd = productos.findIndex(e => e.id === parseInt(currentId));
    const productoAMostrar = productos.find(e => e.id === parseInt(currentId));

    //En este array guardamos el objeto actual, el anterior y el siguiente, para pasarle el array al componente que renderiza el banner.
    const productosParaBanner = [];
    for (let i = 1; i <= 5; i++) {
        productosParaBanner.push(productos.at(indexOfCurrentProd - i));             //Hacemos -1 para recorrer el array de atrás a adelante, ya que se puede acceder por índice negativo pero no por índice mayor a la longitud
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