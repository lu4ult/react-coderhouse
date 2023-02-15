import md5 from 'md5'
import uuid from 'react-uuid';
import { useState } from 'react'
import { doc, collection, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { db } from './Firebase';
import { iconoEmail, iconoFloppyDisk, iconoGuardarArchivo, iconoTrash } from './Iconos';
import { firestoreTimestampToHumanDate } from './utils';
import { Confirm } from 'notiflix';

const AdminPage = () => {
    const [adminLogueado, setAdminLogueado] = useState(false);
    const [listadoOrdenes, setListadoOrdenes] = useState([]);
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
                    lista.sort((a, b) => b.fecha - a.fecha)
                    setListadoOrdenes(lista);
                })
        }
        else {
            alert("contraseña incorrecta");
        }
    }

    const descargarPaqAr = (orden) => {
        const provinciasEquivalentes = {
            "BUENOS_AIRES": "B",
            "CAPITAL_FEDERAL": "C",
            "CATAMARCA": "K",
            "CHACO": "H",
            "CHUBUT": "U",
            "CORDOBA": "X",
            "CORRIENTES": "W",
            "ENTRE_RIOS": "E",
            "FORMOSA": "P",
            "JUJUY": "Y",
            "LA_PAMPA": "L",
            "LA_RIOJA": "F",
            "MENDOZA": "M",
            "MISIONES": "N",
            "NEUQUEN": "Q",
            "RIO NEGRO": "R",
            "SALTA": "A",
            "SAN JUAN": "J",
            "SAN LUIS": "D",
            "SANTA CRUZ": "Z",
            "SANTA FE": "S",
            "SANTIAGO DEL ESTERO": "G",
            "TIERRA DEL FUEGO": "V",
            "TUCUMAN": "T"
        }

        const matrizParaArchivo = [
            ["tipo_producto", "largo", "ancho", "altura", "peso", "valor_del_contenido", "provincia_destino", "sucursal_destino", "localidad_destino", "calle_destino", "altura_destino", "piso", "dpto", "codpostal_destino", "destino_nombre", "destino_email", "cod_area_tel", "tel", "cod_area_cel", "cel"],
            ["CP", "30", "20", "15", "1", orden.totalCosto, provinciasEquivalentes[orden.usuario.provincia.replace(" ", "_")], "", orden.usuario.localidad, orden.usuario.calle, orden.usuario.altura, orden.usuario.piso || "", orden.usuario.unidad || "", orden.usuario.cp, orden.usuario.nombre, orden.usuario.correo, "", "", orden.usuario.codarea, orden.usuario.cel, orden.usuario.codarea, orden.usuario.cel]
        ];

        console.table(matrizParaArchivo)
        let csvContent = "data:text/csv;charset=utf-8,";                                                    //https://stackoverflow.com/questions/14964035
        matrizParaArchivo.forEach(function (rowArray) {
            let row = rowArray.join(",");                                                                   //Transformamos esa matriz bidimensional en algo tipo CSV
            csvContent += row + "\r\n";
        });

        let encodedUri = encodeURI(csvContent);
        let anchorDescarga = document.createElement('a')
        anchorDescarga.setAttribute("href", encodedUri);                                                    //Para poder descargar el archivo creado hay que "adjuntarlo" a un anchor, el cuál no está visible en el DOM.
        anchorDescarga.setAttribute("download", "envio_paq_ar.csv");
        anchorDescarga.click();
        anchorDescarga.remove();

        window.open("https://www.correoargentino.com.ar/MiCorreo/public/importExport");
    }

    const actualizarOrden = (id) => {
        const ordenAModificar = listadoOrdenes.find(el => el.id === id)
        const estadoActual = document.getElementById("estado" + id).value;
        const tn = document.getElementById("tn" + id).value;

        ordenAModificar.trackingNumber = tn;
        ordenAModificar.estado = estadoActual;

        setDoc(doc(db, "ordenes", id), ordenAModificar, { merge: true });
    }

    const eliminarOrden = (orden) => {
        Confirm.show(
            'Seguro??',
            `Vas a eliminar esta orden`,
            'Si, eliminar',
            'No,mantenerla',
            () => {
                const id = orden.id;
                deleteDoc(doc(db, "ordenes", orden.id));
                const listadOrdenesReducida = listadoOrdenes.filter(or => or != orden)
                setListadoOrdenes(listadOrdenesReducida);
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
                                        <input type="text" id={"tn" + orden.id} defaultValue={orden.trackingNumber || "TN pendiente"}></input>
                                        <button className={indice === 0 ? 'paqar' : null} onClick={() => { descargarPaqAr(orden) }}>{iconoGuardarArchivo}</button>
                                        <a className={indice === 0 ? 'email' : null} href={`mailto: ${orden.usuario.correo}?subject=Tu compra en LU4ULT`}>{iconoEmail}</a>
                                        <button className={indice === 0 ? 'eliminar' : null} onClick={() => { eliminarOrden(orden) }}>{iconoTrash}</button>
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