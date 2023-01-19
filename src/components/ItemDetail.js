import ItemCount from "./ItemCount";


const ItemDetail = ({ productoAMostrar }) => {
return (
        <div className="itemDetalles">
            <h3 className="itemDetalles__titulo">{productoAMostrar.title}</h3>
            <div className="itemDetalles__imagen">
                <img src={productoAMostrar.imgMeliUrl}></img>
            </div>
            <div className="itemDetalles__datos">
                <p>{productoAMostrar.internalCategory}</p>
                <p>{productoAMostrar.price} $</p>
                <ItemCount producto={productoAMostrar} />
                <a className="meliButton" href={"https://articulo.mercadolibre.com.ar/" + productoAMostrar.idMeli.replace("MLA", "MLA-")} target="_blank">Ver en mercado libre</a>
                <button>Agregar al carrito</button>
            </div>
        </div>
    );
}

export default ItemDetail;