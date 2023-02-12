import { doc, getDoc, setDoc, getFirestore, collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import uuid from "react-uuid";
import { db } from "./Firebase";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useState, useEffect, useContext } from "react";

import { BeatLoader } from "react-spinners";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { contexto } from "./CustomProvider";
import { notiflixPersonalizacion,firestoreTimestampToHumanDate,formateaMoneda } from "./utils";
import CaraTristeAnimacion from "./CaraTristeAnimacion";


const UserData = () => {
    const { setDatosUsuarioContext } = useContext(contexto);

    const { user, isAuthenticated, isLoading } = useAuth0();
    const [datosUsuario, setDatosUsuario] = useState({});
    const [timeOutId, setTimeOutId] = useState();
    const [datosLeidosFirestore, setDatosLeidosFirestore] = useState(false);
    const provinciasLista = ["BUENOS AIRES", "CAPITAL FEDERAL", "CATAMARCA", "CHACO", "CHUBUT", "CORDOBA", "CORRIENTES", "ENTRE RIOS", "FORMOSA", "JUJUY", "LA PAMPA", "LA RIOJA", "MENDOZA", "MISIONES", "NEUQUEN", "RIO NEGRO", "SALTA", "SAN JUAN", "SAN LUIS", "SANTA CRUZ", "SANTA FE", "SANTIAGO DEL ESTERO"];

    const [ordenesDelUsuario, setOrdenesDelUsuario] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            if (datosLeidosFirestore === false) {
                const biciRef = doc(db, "usuarios", user.sub);
                getDoc(biciRef).then(snapshot => {
                    if (snapshot.exists()) {
                        setDatosUsuario({ ...snapshot.data() });
                        setDatosLeidosFirestore(true);
                    }
                    else {
                        setDatosUsuario({ ...user });
                        const dbSet = getFirestore();
                        setDoc(doc(dbSet, "usuarios", user.sub), { ...user }, { merge: true })
                    }
                })


                const ordenesDelUsuario = [];
                const userOrders = collection(db, "ordenes")
                const filtro = query(userOrders, where("user_sub", "==", user.sub.toString()))
                getDocs(filtro)
                    .then((respuesta) => {
                        console.log(respuesta.docs)
                        //const ordenes = respuesta.docs.map((doc,indice) => ({...doc.data(), indice:indice}))
                        const ordenes = respuesta.docs.forEach(order => {
                            ordenesDelUsuario.push({ ...order.data() })
                            console.log(order.data())
                        })
                        setOrdenesDelUsuario(ordenesDelUsuario)
                        console.log(ordenes)
                    })
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        console.log(ordenesDelUsuario)
    }, [ordenesDelUsuario])


    useEffect(() => {
        if (JSON.stringify(datosUsuario) !== "{}") {
            clearTimeout(timeOutId)
            const temporizadorId = setTimeout(() => {
                setDoc(doc(db, "usuarios", datosUsuario.sub), datosUsuario, { merge: true })
                setDatosUsuarioContext(datosUsuario);
            }, 1000);

            setTimeOutId(temporizadorId);
        }
    }, [datosUsuario])

    const handleFormChange = (e) => {
        const copiaDatosUsuario = { ...datosUsuario, [e.target.name]: e.target.value };
        setDatosUsuario(copiaDatosUsuario)
    };


    return (
        <div className="userData-container">
            {
                isAuthenticated === false ?
                    isLoading ? <div className="spinner"><BeatLoader color="#36d7b7" loading={true} /></div>
                        : <LoginButton />
                    : <>
                        <div className="userData">
                            <img src={datosUsuario.picture}></img>
                            <p>{datosUsuario.nombre}</p>
                            <p>{datosUsuario.email}</p>
                            <LogoutButton />
                        </div>
                        <div className="userOrders">
                            {
                                ordenesDelUsuario.length === 0 ?
                                    <div className="sinCompras-container">
                                        <CaraTristeAnimacion mensaje="Ninguna compra!"/>
                                    </div>

                                    : <ul>
                                        {
                                            ordenesDelUsuario.map((orden,indice) => (
                                                <li key={uuid()} className={indice%2?"impar":"par"}>
                                                    {firestoreTimestampToHumanDate(orden.fecha)}
                                                    <p>Productos: {orden.totalProductos}</p>
                                                    <p>Total: {formateaMoneda(orden.totalCosto)}</p>
                                                    {orden.estado}
                                                    {/* {JSON.stringify(orden.productos)} */}
                                                </li>
                                            ))
                                        }
                                    </ul>

                            }

                        </div>
                        <form>
                            <h3>Datos para el envío</h3>
                            <div className="form__field">
                                <input placeholder="correo@test.com" type="email" name="correo" defaultValue={datosUsuario.correo} required onChange={handleFormChange}></input>
                                <label>Tu dirección de correo electrónico</label>
                            </div>

                            <div className="form__field">
                                <input placeholder={datosUsuario.nombre} disabled={false} type="text" name="nombre" defaultValue={datosUsuario.nombre} onChange={handleFormChange}></input>
                                <label>Tu nombre y apellido</label>
                            </div>

                            <div className="form__field">
                                <input id="firstInputField" placeholder={datosUsuario.dni} type="number" name="dni" defaultValue={datosUsuario.dni} onChange={handleFormChange}></input>
                                <label>DNI sin puntos</label>

                            </div>

                            <div className="form__field">
                                <input placeholder="Seleccione de lista" list="provincias" name="provincia" id="provinciaa" defaultValue={datosUsuario.provincia} onChange={handleFormChange}></input>
                                <datalist id="provincias">
                                    {
                                        provinciasLista.map(prov => {
                                            return (<option value={prov} key={prov}></option>)
                                        })

                                    }
                                </datalist>
                                <label>Provincia</label>
                            </div>

                            <div className="form__field">
                                <input type="text" name="localidad" defaultValue={datosUsuario.localidad} onChange={handleFormChange}></input>
                                <label>Localidad</label>
                            </div>
                            <div className="form__field">
                                <input type="text" name="calle" defaultValue={datosUsuario.calle} placeholder={datosUsuario.calle || "Calle"} onChange={handleFormChange}></input>
                                <label>Calle</label>
                            </div>
                            <div className="form__field">
                                <input type="text" name="altura" defaultValue={datosUsuario.altura} placeholder={datosUsuario.altura || "Numero"} onChange={handleFormChange}></input>
                                <label>Número</label>
                            </div>
                            <div className="form__field">
                                <input type="text" name="piso" defaultValue={datosUsuario.piso} placeholder={datosUsuario.piso || "11"} onChange={handleFormChange}></input>
                                <label>Piso (si es departamento)</label>
                            </div>
                            <div className="form__field">
                                <input type="text" name="unidad" defaultValue={datosUsuario.unidad} placeholder={datosUsuario.unidad || "B"} onChange={handleFormChange}></input>
                                <label>Unidad (Si es departamento)</label>
                            </div>
                            <div className="form__field">
                                <input type="number" name="cp" defaultValue={datosUsuario.cp} placeholder={datosUsuario.cp || "1234"} onChange={handleFormChange}></input>
                                <label><a href="https://www.correoargentino.com.ar/formularios/cpa" target="_blank" rel="noopener noreferrer">Código Postal. Si no lo conoce puede buscarlo aquí</a></label>
                            </div>

                            <div className="form__field">
                                <input type="number" name="codarea" defaultValue={datosUsuario.codarea} placeholder={datosUsuario.codarea || "011"} onChange={handleFormChange}></input>
                                <label>Teléfono - Sólo código de área</label>
                            </div>
                            <div className="form__field">
                                <input type="number" name="cel" defaultValue={datosUsuario.celular} placeholder={datosUsuario.celular || "123456"} onChange={handleFormChange}></input>
                                <label>Teléfono</label>
                            </div>
                            <div className="form__field">
                                <input list="paqartrack" name="trackCode" defaultValue={datosUsuario.trackCode} placeholder={datosUsuario.trackCode || "Seleccione de la lista"} onChange={handleFormChange}></input>
                                <datalist id="paqartrack">
                                    <option value="Email"></option>
                                    <option value="Whatsapp"></option>
                                    <option value="Ambos"></option>
                                </datalist>
                                <label>Cómo le enviamos el código de tracking?</label>
                            </div>

                            <h5>Datos Facturación</h5>
                            <div className="form__field">
                                <input type="number" name="cuit" defaultValue={datosUsuario.cuit} placeholder={datosUsuario.cuit || "20-12345678-0"} onChange={handleFormChange}></input>
                                <label>CUIT. Si es consumidor final dejar en blanco</label>
                            </div>
                            <div className="form__field">
                                <input list="ivas" name="iva" defaultValue={datosUsuario.iva} placeholder={datosUsuario.iva || "Seleccione de la lista o dejar en blanco"} onChange={handleFormChange}></input>
                                <datalist id="ivas">
                                    <option value="Consumidor Final"></option>
                                    <option value="Responsable Inscripto"></option>
                                    <option value="Excento"></option>
                                    <option value="Monotributo"></option>
                                </datalist>
                                <label>Condición frente al IVA</label>
                            </div>

                            <button type="button" className="submitButton" onClick={() => { Notify.success('Datos Actualizados', notiflixPersonalizacion()); }}>Guardar mis datos</button>
                            {/* <input type="button" className="submitButton" value="Guardar mis datos"></input> */}
                        </form>
                    </>
            }
        </div>
    );
}

export default UserData;