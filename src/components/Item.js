import { useContext } from "react";
import { Link } from "react-router-dom"
import { contexto } from "./CustomProvider";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { notiflixPersonalizacion } from './utils'

const Item = ({ producto }) => {
    const { totalProductos, setTotalProductos, agregarAlCarrito } = useContext(contexto);

    //const notiflixPersonalizacion = {distance:"100px",showOnlyTheLastOne: true}

    const handleOnClick = () => {
        if (producto.stock === 0) {
            //Notify.dismiss();
            Notify.failure('Ups! Sin stock!',notiflixPersonalizacion);
            return;
        }

        setTimeout(() => {
            setTotalProductos(totalProductos + 1);
            agregarAlCarrito({
                id: producto.id,
                cantidadIndividual: 1
            });


            Notify.success('Agregado al carrito!',notiflixPersonalizacion);

        }, 500);

    }

    return (
        <article>
            <div className="article__img-container">
                <img loading="lazy" alt={"Foto producto " + producto.title} src={producto.imgMeliUrl}></img>
            </div>
            <Link className="article__title" to={"/item/" + producto.id} rel="noopener noreferrer">{producto.title}</Link>
            <div className="article__category">
                <div>{producto.popularidad} - {producto.internalCategory}</div>
            </div>

            <div className="article__price"><strong>{producto.price}</strong> $</div>
            {
                producto.stock === 0 ?
                    <div className="sinStock">Agotado</div> :
                    ""
            }
            <div className="article__buttonsContainer">
                {
                    producto.fullFilment ?
                        <a className="meliButton" href={"https://articulo.mercadolibre.com.ar/" + producto.idMeli.replace("MLA", "MLA-")} target="_blank" rel="noopener noreferrer">Ver en Mercado Libre</a>
                        : <>
                            <Link to={"/item/" + producto.id} className="mas_informacion" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z" /></svg></Link>
                            <Link onClick={handleOnClick} className={`agregar_carrito${producto.stock ? " conStock" : " noStock"}`} rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z" /></svg></Link>
                        </>
                }
            </div>
        </article>
    );
}

export default Item;