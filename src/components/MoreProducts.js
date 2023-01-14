import { Link } from "react-router-dom"

const MoreProducts = (props) => {



    const productosAMostrarMiniatura = [...props.productos]
    console.log("More Products");

    console.log(productosAMostrarMiniatura);
    return (
        <div className="miniatura__container">
            {
                productosAMostrarMiniatura.map(e => {
                    return (
                        <Link to={"/item/" + e.id} key={"miniatura" + e.id} className="miniatura__individual">
                            <p className="miniatura__titulo">{e.title}</p>
                            <div className="miniatura__img-container">
                                <img src={e.imgMeliUrl} alt="miniatura"></img>
                            </div>
                            <p className="miniatura__individual-precio">{e.price}</p>
                        </Link>

                    )
                })
            }

        </div>


    );
}

export default MoreProducts;