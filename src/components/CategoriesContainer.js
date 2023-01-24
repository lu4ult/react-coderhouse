import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const CategoriesContainer = ({ productos }) => {
    const { categoria } = useParams();
    console.log(productos)
    const productosFiltrados = productos.filter(e => e.category.toLowerCase().includes(categoria));
    const estaCardado = productos.length === 0;
    console.log(estaCardado)
    return (
        <>
            {
                productos.length === 0 ?
                    <div className="spinner">
                        <BeatLoader color="#36d7b7" loading={true} />
                    </div>
                    : <ItemList productos={productosFiltrados} />
            }
        </>
    );
}

export default CategoriesContainer;