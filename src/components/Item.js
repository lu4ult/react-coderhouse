import { Link } from "react-router-dom"

const Item = ({ producto }) => {
    return (
        <article>
            <a href={'https://articulo.mercadolibre.com.ar/' + producto.idMeli.replace("MLA", "MLA-")} target="_blank">{producto.title}</a>
            <img alt={producto.title} src={producto.imgMeliUrl}></img>
            <div className="article__price">{producto.price} $</div>
            <div>Stock: {producto.stock}</div>
            <div>{producto.idMeli}</div>
            <div>Full: {producto.fullFilment ? "si" : "no"}</div>
            <div>Cat: {producto.internalCategory}</div>
            <div>ID: {producto.id}</div>
            {producto.fullFilment ?
                <button className="meliButton">Ver en MercadoLibre</button> :
                <button disabled={producto.stock === 0} value={producto.idMeli}>Agregar al carrito</button>
            }
            <Link to={"/item/" + producto.id} >Más Información</Link>
        </article>
    );
}

export default Item;