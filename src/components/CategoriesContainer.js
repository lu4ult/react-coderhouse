import ItemList from "./ItemList";
import BeatLoader from "react-spinners/BeatLoader";

const CategoriesContainer = ({ productos }) => {
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