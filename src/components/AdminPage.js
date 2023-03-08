import md5 from 'md5'
import uuid from 'react-uuid';
import { useState, useEffect } from 'react'
import { doc, collection, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { db } from './Firebase';
import { iconoEmail, iconoFloppyDisk, iconoGuardarArchivo, iconoTrash } from './Iconos';
import { firestoreTimestampToHumanDate } from './utils';
import { Confirm } from 'notiflix';
import { crearEtiquetaEnvio } from './correos';

const AdminPage = () => {
    const [adminLogueado, setAdminLogueado] = useState(false);
    const [listadoOrdenes, setListadoOrdenes] = useState([]);
    const [analizarTNs, setAnalizarTNs] = useState(false);
    const opcionesEstadoCompra = ["Procesando", "En camino", "Finalizada", "Cancelar", "Cancelada"];

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
                    lista.sort((a, b) => b.fecha - a.fecha);
                    setListadoOrdenes(lista);
                    setAnalizarTNs(true);
                })
        }
        else {
            alert("contraseña incorrecta");
        }
    }

    useEffect(() => {
        if (analizarTNs) {
            const ordenesCopia = [...listadoOrdenes];
            ordenesCopia.forEach(orden => {
                const analizarTn = orden.trackingNumber.substring(0, 5);

                if (analizarTn === '36000') {
                    fetch(`https://apidestinatarios.andreani.com/api/envios/${orden.trackingNumber}/trazas`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.code === 404) {
                                alert(`Error en TN de id ${orden.id}. Borrar objeto desde FireStore. https://console.firebase.google.com/u/0/project/react-coderhouse-ac264/firestore`);
                                alert(`Error en TN de id ${orden.id}. Borrar objeto desde FireStore. https://console.firebase.google.com/u/0/project/react-coderhouse-ac264/firestore`);
                            }
                            else {
                                orden.andreani = [...data];
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
            setListadoOrdenes(ordenesCopia);
        }
    }, [analizarTNs])

    // useEffect(() => {
    //     listadoOrdenes.forEach(ord => {
    //         console.log(ord.andreani);
    //     })
    // }, [listadoOrdenes])


    const actualizarOrden = (id) => {
        const listadOrdenesCopia = listadoOrdenes.filter(el => el.id !== id);
        const ordenAModificar = listadoOrdenes.find(el => el.id === id)
        const estadoActual = document.getElementById("estado" + id).value;
        const tn = document.getElementById("tn" + id).value.replace(' ', '').substring(0, 23);

        if (tn.length < 15) {
            alert("tn demasiado corto")
        }
        else {
            ordenAModificar.trackingNumber = tn;
        }

        ordenAModificar.estado = estadoActual;

        setListadoOrdenes([ordenAModificar, ...listadOrdenesCopia]);

        //while(ordenAModificar.andreani length > 1 ) ordenAModificar.andreani.pop
        setDoc(doc(db, "ordenes", id), ordenAModificar, { merge: true });
    }

    const eliminarOrden = (orden) => {
        Confirm.show(
            'Seguro??',
            `Vas a eliminar esta orden`,
            'Si, eliminar',
            'No,mantenerla',
            () => {
                deleteDoc(doc(db, "ordenes", orden.id));
                const listadOrdenesReducida = listadoOrdenes.filter(or => or !== orden)
                setListadoOrdenes(listadOrdenesReducida);
            }
        );
    }

    const descargarEtiquetaCorreo = (orden) => {
        Confirm.prompt(
            'Seleccionar Servicio de envío',
            'Paq Ar / Andreani / Buspack',
            'Paq Ar',
            'Generar',
            'Cancelar',
            (clientAnswer) => {
                crearEtiquetaEnvio(orden, clientAnswer.toLowerCase().replace(' ', ''));
            },
            (clientAnswer) => {
                crearEtiquetaEnvio(orden, clientAnswer.toLowerCase().replace(' ', ''));
            }
        );
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
                <div className='adminPage__section ordenes-container'>
                    {
                        listadoOrdenes.map((orden, indice) => {
                            return (
                                <div className={`orden ${indice % 2 ? "impar" : "par"}`} key={uuid()}>
                                    <img src={orden.usuario.picture} alt="Foto perfil"></img>
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

                                    <input type="text" id={"tn" + orden.id} defaultValue={orden.trackingNumber || "TN pendiente"}></input>


                                    {/* TODO: deshabilitar los botones de email/whatsapp según la respuesta del usuario */}
                                    {
                                        orden.andreani === undefined
                                            ? <a></a>
                                            : <a>
                                                <select>
                                                    {
                                                        orden.andreani.map(evento => {
                                                            return (
                                                                <option key={uuid()}>
                                                                    {evento.evento || "upss"} - {evento.fecha.dia || "upss"} {evento.fecha.hora || "upss"}
                                                                </option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                            </a>
                                    }

                                    <select id={"estado" + orden.id} defaultValue={orden.estado}>
                                        {
                                            opcionesEstadoCompra.map(opc => {
                                                return (
                                                    <option key={uuid()} value={opc}>{opc}</option>
                                                )
                                            })
                                        }
                                    </select>

                                    <button className={indice === 0 ? 'paqar' : null} onClick={() => { descargarEtiquetaCorreo(orden) }}>{iconoGuardarArchivo}</button>
                                    <button className={indice === 0 ? 'email' : null} onClick={() => { window.open(`mailto: ${orden.usuario.correo}?subject=Tu compra en LU4ULT`); }} >{iconoEmail}</button>
                                    <button className={indice === 0 ? 'eliminar' : null} onClick={() => { eliminarOrden(orden) }}>{iconoTrash}</button>
                                    <button className={indice === 0 ? 'guardar' : null} onClick={() => { actualizarOrden(orden.id) }}>{iconoFloppyDisk}</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>);
    }
}
export default AdminPage;