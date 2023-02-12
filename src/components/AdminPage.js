import md5 from 'md5'
import uuid from 'react-uuid';
import { useState } from 'react'
import { doc, collection, getDocs, setDoc } from "firebase/firestore";
import { db } from './Firebase';
import { iconoEmail, iconoFloppyDisk } from './Iconos';
import { firestoreTimestampToHumanDate } from './utils';


const AdminPage = () => {
    const [adminLogueado, setAdminLogueado] = useState(false);
    const [listadoOrdenes, setListadoOrdenes] = useState([]);
    const opcionesEstadoCompra = ["Procesando", "En camino", "Finalizada"];

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
                    let lista = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                    setListadoOrdenes(lista);
                })
        }
        else {
            alert("contraseña incorrecta");
        }
    }

    const actualizarOrden = (id) => {
        const ordenAModificar = listadoOrdenes.find(el => el.id === id)
        const estadoActual = document.getElementById("estado" + id).value;
        const tn = document.getElementById("tn" + id).value;

        ordenAModificar.trackingNumber = tn;
        ordenAModificar.estado = estadoActual;

        setDoc(doc(db, "ordenes", id), ordenAModificar, { merge: true });
    }



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
                    <ul>
                        {
                            listadoOrdenes.map((orden, indice) => {
                                return (
                                    <li className={indice % 2 ? "impar" : "par"} key={uuid()}>
                                        <img src={orden.usuario.picture}></img>
                                        <p className='nombreUsuario'>{orden.usuario.nombre}</p>
                                        <p>{orden.id}</p>
                                        <p>{firestoreTimestampToHumanDate(orden.fecha)}</p>
                                        <select>
                                            {
                                                orden.productos.map(producto => {
                                                    return (<option key={uuid()}>{JSON.stringify(producto)}</option>);
                                                })
                                            }
                                        </select>
                                        <select id={"estado" + orden.id} defaultValue={orden.estado}>
                                            {
                                                opcionesEstadoCompra.map(opc => {
                                                    return (
                                                        <option value={opc}>{opc}</option>
                                                    )
                                                })
                                            }

                                        </select>

                                        {/* TODO: deshabilitar los botones de email/whatsapp según la respuesta del usuario */}
                                        <input type="text" id={"tn" + orden.id} defaultValue={orden.trackingNumber || "Tracking Number pendiente"}></input>
                                        <a className={indice === 0 ? 'email' : null} href={`mailto: ${orden.usuario.correo}?subject=Tu compra en LU4ULT`}>{iconoEmail}</a>
                                        <button className={indice === 0 ? 'guardar' : null} onClick={() => { actualizarOrden(orden.id) }}>{iconoFloppyDisk}</button>
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