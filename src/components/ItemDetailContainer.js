import { useParams } from "react-router-dom";
import MoreProducts from "./MoreProducts";

const ItemDetailContainer = ({ productos }) => {

    console.log("Hola Detail Container")
    const { currentId } = useParams();

    // console.log(currentId);


    const indexOfCurrentProd = productos.findIndex(e => e.id === parseInt(currentId));
    const productoAMostrar = productos.find(e => e.id === parseInt(currentId));

    //En este array guardamos el objeto actual, el anterior y el siguiente, para pasarle el array al componente que renderiza el banner.
    const productosParaBanner = [];
    for (let i=1; i<=5; i++) {
        productosParaBanner.push(productos.at(indexOfCurrentProd - i));             //Hacemos -1 para recorrer el array de atrás a adelante, ya que se puede acceder por índice negativo pero no por índice mayor a la longitud
    }

    console.log(productosParaBanner);

    //console.log(productoAMostrar)
    return (
        <>
            <div className="itemDetalles">
                <h3>{productoAMostrar.title}</h3>
                <img src={productoAMostrar.imgMeliUrl}></img>
                <p>{productoAMostrar.internalCategory}</p>
                <p>{productoAMostrar.price} $</p>
                <input type="number" value={productoAMostrar.stock?1:0}  min={0} max={productoAMostrar.stock}></input>
                <button></button>
            </div>
            <MoreProducts productos={productosParaBanner} />
        </>


    );
}

export default ItemDetailContainer;

//