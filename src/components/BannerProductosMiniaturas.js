import { Link } from "react-router-dom"

const BannerProductosMiniaturas = (props) => {
    const productosAMostrarMiniatura = [...props.productos]

    return (
        <div className="miniatura__container">
            {
                productosAMostrarMiniatura.map(e => {
                    return (
                        <Link to={"/item/" + e.id} key={"miniatura" + e.id} className="miniatura__individual" rel="noopener noreferrer">
                            <p className="miniatura__titulo">{e.title}</p>
                            <div className="miniatura__img-container">
                                <img src={e.imgMeliUrl} alt={"Foto miniatura de " + e.title}></img>
                            </div>
                            <p className="miniatura__individual-precio">{e.price}</p>
                        </Link>
                    )
                })
            }
        </div>
    );
}

export default BannerProductosMiniaturas;