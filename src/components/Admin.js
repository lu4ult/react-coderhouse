import md5 from 'md5'
import uuid from 'react-uuid';
import { useState } from 'react'
import { doc, onSnapshot, addDoc, collection, getDocs, setDoc, getFirestore, deleteDoc, firestore } from "firebase/firestore";
import { db } from './Firebase';
import { iconoFloppyDisk } from './Iconos';
import { firestoreTimestampToHumanDate } from './utils';



const AdminPage = () => {
    const [adminLogueado, setAdminLogueado] = useState(false);
    const [listadoOrdenes, setListadoOrdenes] = useState([]);

    // const unsub = onSnapshot(doc(db, "productos", "5lScuTzuOYX6phzP46YK"), (doc) => {
    //     console.log("Current data: ", doc.data());
    // });


    const handleLogin = () => {

        let user = document.getElementById("adminLogin-user").value.toLowerCase();
        let pass = document.getElementById("adminLogin-pass").value.toLowerCase();
        let hash = md5(user + pass + '1b34dcaa-a6d6-ed0b-fe82-874c784fb914');

        if (hash === 'a496c45e8ea1cdf6e33381f96fdc7c52') {
            setAdminLogueado(true);
            setTimeout(() => { setAdminLogueado(false) }, 15 * 60 * 1000);


            const ordersColection = collection(db, "ordenes", "");
            getDocs(ordersColection)
                .then(snapshot => {
                    let lista = snapshot.docs.map(doc => doc.data());
                    console.log(JSON.stringify(lista))
                    setListadoOrdenes(lista)
                    //setListadoUsuarios(snapshot.docs.map(doc => doc.data()))
                    // lista.sort((a, b) => new Date(b.last_update) - new Date(a.last_update));
                    //setListadoUsuarios(lista);
                })
        }
        else {
            alert("contraseña incorrecta")
        }
    }

    const actualizarOrden = (orden) => {
        console.log(orden)
    }



    console.log(listadoOrdenes)
    if (adminLogueado === false) {
        return (
            <div className="adminPage">
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
                <div className='adminPage__section ordenes'>
                    {/* <div>
                        <img></img>
                        <p>Nombre</p>
                        <p>Productos</p>
                        <p>Estado</p>
                        <p>Seguimiento</p>
                    </div> */}
                    <ul>
                        {
                            listadoOrdenes.map((orden, indice) => {
                                return (
                                    <li className={indice % 2 ? "impar" : "par"} key={uuid()}>
                                        <img src={orden.usuario.picture}></img>
                                        <p className='nombreUsuario'>{orden.usuario.nombre}</p>
                                        <p>{firestoreTimestampToHumanDate(orden.fecha)}</p>
                                        <select>
                                            {
                                                orden.productos.map(producto => {
                                                    return (<option key={uuid()}>{JSON.stringify(producto)}</option>);
                                                })
                                            }
                                        </select>
                                        <select value={orden.estado}>
                                            <option value="Compra Recibida">Compra Recibida</option>
                                            <option value="En camino">En camino</option>
                                            <option value="Finalizada">Finalizada</option>
                                        </select>
                                        <input type="text" id="trackingNumberInput" value={orden.trackingNumber || "Tracking Number pendiente"}></input>
                                        <button onClick={actualizarOrden(orden)}>{iconoFloppyDisk}</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
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