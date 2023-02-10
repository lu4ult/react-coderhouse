import ItemList from "./ItemList";
//import { useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const CategoriesContainer = ({ productos }) => {

    console.log(productos.length)

    //ya no se hace acá sino en ItemListContainer, recibimos el param de categoría y llamamos a firestore directamente filtrado
    //quizás sí hacerlo aca...


    //const { categoria } = useParams();
    console.log(productos)
    //const productosFiltrados = productos.filter(e => e.category.toLowerCase().includes(categoria));
    const estaCardado = productos.length === 0;
    console.log(estaCardado)
    return (
        <>
            {
                productos.length === 0 ?
                    <div className="spinner">
                        <BeatLoader color="#36d7b7" loading={true} />
                    </div>
                    : <ItemList productos={productos} />
            }
        </>
    );
}

export default CategoriesContainer;