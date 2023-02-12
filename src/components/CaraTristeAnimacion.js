import sadFaceIcon from "./../img/sadFaceIcon.gif"

const CaraTristeAnimacion = ({ mensaje }) => {
    return (
        <div className="caraTriste">
            <p>{mensaje}</p>
            <img src={sadFaceIcon} alt="Cara triste al no tener compras"></img>
        </div>

    );
}

export default CaraTristeAnimacion;