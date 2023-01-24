import md5 from 'md5-hash'
import uuid from 'react-uuid';
import { useState } from 'react'
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";


const AdminPage = () => {

    const [productosDesdeArchivo, setProductosDesdeArchivo] = useState([]);
    const [adminLogueado, setAdminLogueado] = useState(false);

    console.log(productosDesdeArchivo);
    const handleLogin = () => {

        let user = document.getElementById("adminLogin-user").value;
        let pass = document.getElementById("adminLogin-pass").value;
        let hash = md5(user + pass);
        console.log(user)
        console.log(pass)
        console.log(hash)

        if (hash === '51d64431677ac4d136b39258dec1cfab') {
            setAdminLogueado(true);
            setTimeout(() => { setAdminLogueado(false) }, 15 * 60 * 1000)
        }
    }

    const handleFirebaseClick = () => {
        console.log(productosDesdeArchivo);
        console.log(misProductos);
        document.getElementById("archivo-selector").value = "";

        if (productosDesdeArchivo.length) {
            const db = getFirestore();
            productosDesdeArchivo.forEach((producto) => {
                setDoc(doc(db, "items", producto.id.toString()), producto, { merge: true })
            });

            productosDesdeArchivo.forEach(fl => {
                console.log(...fl.toString())
            })
        }
    }

    const handleOnFileChange = (e) => {
        console.log("archivo leido")
        console.log(e.target.files[0].name)
        let archivo = e.target.files[0];
        let lector = new FileReader();
        lector.onload = (f) => {
            let contenido = JSON.parse(f.target.result);
            setProductosDesdeArchivo(contenido);
        };
        lector.readAsText(archivo);

    }


    if (adminLogueado === false) {
        return (
            <div className="adminPage">
                <p>Esta página se usará para generar los archivos de los envíos</p>
                <div className='adminPage__credenciales'>
                    <input id="adminLogin-user" type="text" placeholder="Usuario"></input>
                    <input id="adminLogin-pass" type="password" ></input>
                    <button type="submit" onClick={handleLogin}>Acceder</button>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="adminPage">
                <input type="file" onChange={handleOnFileChange} id="archivo-selector"></input>
                <ul>
                    {
                        productosDesdeArchivo.map(prod => {
                            return (
                                <li key={uuid()}>{prod.title}</li>
                            )
                        })
                    }
                </ul>
                <button onClick={handleFirebaseClick}>Setear firebase</button>
            </div>);
    }

}

export default AdminPage;

// productosDesdeArchivo.map(line => {return <p>{line}</p>})