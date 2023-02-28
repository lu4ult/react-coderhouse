import ItemCount from "./ItemCount";
import { formateaMoneda } from "./utils";

import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import uuid from "react-uuid";

const ItemDetail = ({ productoAMostrar }) => {

    const imgsUrls = productoAMostrar.imgMeliUrl.map(i => i.url);

    const handleClickSlide = (index) => {
        //console.log(imgsUrls.at(index))
        //TODO: modal para imágen grande
    }

    return (
        <div className="itemDetalles">
            <h3 className="itemDetalles__titulo">{productoAMostrar.title}</h3>
            <div className="itemDetalles__imagen">
                <Carousel showArrows="true" onClickItem={handleClickSlide} autoPlay={true} interval={3000} infiniteLoop="true" useKeyboardArrows={true}>
                    {
                        imgsUrls.map(i => <img src={i} key={uuid()} alt={`Foto Producto ${i} ${productoAMostrar.title}`}></img>)
                    }
                </Carousel>

                {productoAMostrar.video != null ?
                    <iframe className="itemDetalles__video" src={"https://www.youtube.com/embed/" + productoAMostrar.video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    : null
                }
            </div>

            <div className="itemDetalles__datos">
                <p>{productoAMostrar.internalCategory}</p>
                <p>{formateaMoneda(productoAMostrar.price)}</p>
                {
                    productoAMostrar.fullFilment === false ?
                        <ItemCount producto={productoAMostrar} esCarrito={false} />
                        : <p className="fullMsg">Este producto se encuentra en Full, por lo que sólo se puede comprar en Mercado Libre</p>
                }
                <a className="meliButton" href={"https://articulo.mercadolibre.com.ar/" + productoAMostrar.idMeli.replace("MLA", "MLA-")} target="_blank" rel="noopener noreferrer">Ver en mercado libre</a>
            </div>
            <div className="itemDetalles__share">
                <a href={"https://wa.me/542954692293?text=Hola!%0aQuería consultar sobre el *" + productoAMostrar.title + "* que ví en la web."} target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg></a>
                <a href={
                    `https://wa.me/?text=¡Te recomiendo que veas este *
                    ${encodeURIComponent(productoAMostrar.title)}*!%0a
                    ${encodeURIComponent(window.location.href)}?share=wa
                    `} target="_blank" rel="noopener noreferrer"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" /></svg></a>
            </div>
        </div>
    );


}

export default ItemDetail;
