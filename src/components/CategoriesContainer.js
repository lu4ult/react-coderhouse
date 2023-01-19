import ItemList from "./ItemList";
import { useParams } from "react-router-dom";

const CategoriesContainer = ({ productos }) => {
    const { categoria } = useParams();
    const productosFiltrados = productos.filter(e => e.category.toLowerCase().includes(categoria));

    return (
        <ItemList productos={productosFiltrados} />
    );
}

export default CategoriesContainer;