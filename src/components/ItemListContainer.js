import {useEffect, useState } from "react"

const ItemListContainer = (props) => {
    //console.log(props)

    const [productos,setProductos] = useState([]);
    const [estanProductosCargados, setEstanProductosCargados] = useState(false);

    useEffect(()=>{
        console.log("useEffect")
        fetch('https://github.com/lu4ult/react-coderhouse/blob/master/src/products.json')
        .then(response => {console.log(response)})
    },[])


    return (
        <p></p>

    );
}

export default ItemListContainer;