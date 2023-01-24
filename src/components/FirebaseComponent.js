import { collection, getDocs, getFirestore } from "firebase/firestore"
import { useState } from "react";
import { useEffect } from "react";

const FirebaseComponent = () => {

    //const [productos, setProductos] = useState([]);

    useEffect(() => {
        console.log("aca")
        const db = getFirestore();

        const biciRef = collection(db, "items");
        getDocs(biciRef)
            .then((snapshot) => {
                snapshot.docs.forEach(e => {console.log(e.data())})
            })

    }, [])
    return (
        <>
        </>
    );
}

export default FirebaseComponent;