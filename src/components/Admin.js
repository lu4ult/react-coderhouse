import md5 from 'md5'
import uuid from 'react-uuid';
import { useState } from 'react'
import { doc, onSnapshot, addDoc, collection, getDocs, setDoc, getFirestore, deleteDoc, firestore } from "firebase/firestore";
import { db } from './Firebase';
import { CacheKey } from '@auth0/auth0-spa-js';


const AdminPage = () => {

    const [productosDesdeArchivo, setProductosDesdeArchivo] = useState([]);
    const [adminLogueado, setAdminLogueado] = useState(true);
    const [listadoUsuarios, setListadoUsuarios] = useState([]);

    const unsub = onSnapshot(doc(db, "productos", "5lScuTzuOYX6phzP46YK"), (doc) => {
        console.log("Current data: ", doc.data());
    });


    const handleLogin = () => {

        let user = document.getElementById("adminLogin-user").value.toLowerCase();
        let pass = document.getElementById("adminLogin-pass").value.toLowerCase();
        let hash = md5(user + pass + '1b34dcaa-a6d6-ed0b-fe82-874c784fb914');

        if (hash === 'a496c45e8ea1cdf6e33381f96fdc7c52') {
            setAdminLogueado(true);
            setTimeout(() => { setAdminLogueado(false) }, 15 * 60 * 1000);


            // console.log("a borrar:")
            // deleteDoc(doc(db, "productos", "EwEBl0ofwAPgtMi1u1sA"));

            /*
            console.log("get users")
            //Obtención de usuario registrados desde Firestore
            const db = getFirestore();
            const itemsCollection = collection(db, "usuarios", "");
            getDocs(itemsCollection).then(snapshot => {
                let lista = snapshot.docs.map(doc => doc.data());
                //setListadoUsuarios(snapshot.docs.map(doc => doc.data()))
                lista.sort((a, b) => new Date(b.last_update) - new Date(a.last_update));
                setListadoUsuarios(lista);
            })
            */
        }
    }

    const handleFirebaseClick = () => {

        // const productosCollection = collection(db, "productos")
        // getDocs(productosCollection)
        // .then(snapshot => {
        //     const productos = snapshot.docs.map(doc =>
        //         ({ ...doc.data(), "idFs": doc.data().id}))
        //     console.log(productos)
        // })
        if (productosDesdeArchivo.length) {
            productosDesdeArchivo.forEach((producto) => {
                const productosColeccion = collection(db, "productos")
                addDoc(productosColeccion, producto, {merge:true})
                    .then((resultado) => {
                        console.log(resultado.id)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            });
        }
        // else {
        //     console.log("archivo vacío")
        // }
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
                <div className='adminPage__section JSONHandler'>
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
                </div>

            </div>);
    }

}

export default AdminPage;

// productosDesdeArchivo.map(line => {return <p>{line}</p>})

/*


<div className='adminPage__section usersList'>
                    <ul>
                        {
                            listadoUsuarios.map(user => { return <li key={uuid()}><img src={user.picture}></img> <p>{user.nombre}</p><p>{user.email}</p><p>{user.last_update}</p></li> })
                        }
                    </ul>
                </div>


*/