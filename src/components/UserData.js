import { useSearchParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";

//import { NomPropio } from "./utils";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useState, useEffect } from "react";

import { BeatLoader } from "react-spinners";
//import { useEffect } from "react";

const UserData = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [params] = useSearchParams();
    const [usuarioDatosHook, setUsuarioDatosHook] = useState({});



    //const { logout } = useAuth0();
    //TODO: probar si al loguearse con facebook (que no tiene email) logramos hacer el deslogueo automáticamente

    //TODO: utilizar el hook para el objeto.
    console.log("user data")

    console.log(user)
    console.log(isAuthenticated)
    console.log(isLoading)

    let provinciasLista = ["BUENOS AIRES", "CAPITAL FEDERAL", "CATAMARCA", "CHACO", "CHUBUT", "CORDOBA", "CORRIENTES", "ENTRE RIOS", "FORMOSA", "JUJUY", "LA PAMPA", "LA RIOJA", "MENDOZA", "MISIONES", "NEUQUEN", "RIO NEGRO", "SALTA", "SAN JUAN", "SAN LUIS", "SANTA CRUZ", "SANTA FE", "SANTIAGO DEL ESTERO"];
    let usuarioDatos = {};

    useEffect(() => {
        console.log(`cambio isAU: ${isAuthenticated}`)

        if (isAuthenticated) {
            //Acá leer los datos desde firestores

            console.log(`ID usuario: ${user.name}`)
            console.log(`email: ${user.email}`)

            if (user.email === undefined) {
                console.log("no valido")
                alert(`Esta cuenta de ${user.sub.split('|')[0]} no tiene un email válido`);
                //logout({ logoutParams: { returnTo: window.location.origin + "/user"} })
            }

            const db = getFirestore();
            const biciRef = doc(db, "usuarios", user.name);
            getDoc(biciRef).then(snapshot => {
                if (snapshot.exists()) {
                    console.log("recibido user de firestore")
                    //setUsuarioDatos(snapshot.data());
                    setUsuarioDatosHook(snapshot.data());
                    console.log(snapshot.data())
                    usuarioDatos = snapshot.data();
                    console.log(usuarioDatos.dni)

                }
                else {
                    console.log("ups")
                }
            })
            console.log(usuarioDatos.dni)
        }
        console.log(usuarioDatos.dni)
    }, [isAuthenticated])

    if (isLoading === false && isAuthenticated) {
        usuarioDatos = {
            nickname: user.nickname,
            email: user.email,
            nombre: user.name,
            sub: user.sub,
            updated_at: user.updated_at,
            picture: user.picture,
            locale: user.locale
        }


        //Si recibimos datos por query parámetros los guardamos
        if (params.get('dni') != null) {
            usuarioDatos.dni = params.get('dni');
            usuarioDatos.provincia = params.get('provincia');
            usuarioDatos.localidad = params.get('localidad');
            usuarioDatos.calle = params.get('calle');
            usuarioDatos.altura = params.get('altura');
            usuarioDatos.piso = params.get('piso');
            usuarioDatos.unidad = params.get('unidad');
            usuarioDatos.cp = params.get('cp');
            usuarioDatos.codarea = params.get('codarea');
            usuarioDatos.celular = params.get('cel');
            usuarioDatos.trackCode = params.get('trackCode');
            usuarioDatos.cuit = params.get('cuit');
            usuarioDatos.iva = params.get('iva');

            const dbSet = getFirestore();
            setDoc(doc(dbSet, "usuarios", user.name), usuarioDatos, { merge: true })
            console.log("veces")
        }
        // setTimeout(() => { localStorage.setItem('tiendaLu4ult_userData', JSON.stringify(usuarioDatos)) }, 1000);
    }

    // console.log(usuarioDatos.dni)
    // console.log(usuarioDatosHook.dni);




    // console.log(usuarioDatos)

    // let inputs = document.querySelectorAll('.form__field input');
    // inputs.forEach(e => {
    //     e.addEventListener('focus', () => {
    //         e.value = ""
    //     });
    // });

    //console.log(usuarioDatos)

    //TODO: si se guardaron los datos y el CUIT es igual al por defecto, colocar el DNI y consumidor final.
    return (
        <div className="userData-container">
            {
                isAuthenticated === false ?
                    isLoading ? <div className="spinner"><BeatLoader color="#36d7b7" loading={true} /></div>
                        : <LoginButton />
                    : <>
                        <div className="userData">
                            <img src={usuarioDatos.picture}></img>
                            <p>{usuarioDatos.nombre}</p>
                            <p>{usuarioDatos.email}</p>
                            <LogoutButton />
                        </div>
                        <form>
                            <h3>Datos para el envío</h3>
                            <div className="form__field">
                                <input placeholder={usuarioDatosHook.email || usuarioDatos.email} disabled={true} type="email" name="email" defaultValue={usuarioDatosHook.email}></input>
                                <p>Tu dirección de correo electrónico</p>
                            </div>

                            <div className="form__field">
                                <input placeholder={usuarioDatos.nombre} disabled={true} type="text" name="nombre" defaultValue={usuarioDatosHook.nombre}></input>
                                <p>Tu nombre y apellido</p>
                            </div>

                            <div className="form__field">
                                <input id="firstInputField" placeholder={usuarioDatos.dni} type="number" name="dni" defaultValue={usuarioDatosHook.dni}></input>
                                <p>DNI sin puntos</p>

                            </div>

                            <div className="form__field">
                                <input placeholder="Seleccione de lista" list="provincias" name="provincia" id="provinciaa" defaultValue={usuarioDatosHook.provincia}></input>
                                <datalist id="provincias">
                                    {
                                        provinciasLista.map(prov => {
                                            return (<option value={prov} key={prov}></option>)
                                        })

                                    }
                                </datalist>
                                <p>Provincia</p>
                            </div>

                            <div className="form__field">
                                <input type="text" name="localidad" defaultValue={usuarioDatosHook.localidad}></input>
                                <p>Localidad</p>
                            </div>
                            <div className="form__field">
                                <input type="text" name="calle" defaultValue={usuarioDatosHook.calle} placeholder={usuarioDatosHook.calle || "Calle"}></input>
                                <p>Calle</p>
                            </div>
                            <div className="form__field">
                                <input type="text" name="altura" defaultValue={usuarioDatosHook.altura} placeholder={usuarioDatosHook.altura || "Numero"}></input>
                                <p>Número</p>
                            </div>
                            <div className="form__field">
                                <input type="text" name="piso" defaultValue={usuarioDatosHook.piso} placeholder={usuarioDatosHook.piso || "11"}></input>
                                <p>Piso (si es departamento)</p>
                            </div>
                            <div className="form__field">
                                <input type="text" name="unidad" defaultValue={usuarioDatosHook.unidad} placeholder={usuarioDatosHook.unidad || "B"}></input>
                                <p>Unidad (Si es departamento)</p>
                            </div>
                            <div className="form__field">
                                <input type="number" name="cp" defaultValue={usuarioDatosHook.cp} placeholder={usuarioDatosHook.cp || "1234"}></input>
                                <p><a href="https://www.correoargentino.com.ar/formularios/cpa" target="_blank" rel="noopener noreferrer">Código Postal. Si no lo conoce puede buscarlo aquí</a></p>
                            </div>

                            <div className="form__field">
                                <input type="number" name="codarea" defaultValue={usuarioDatosHook.codarea} placeholder={usuarioDatosHook.codarea || "011"}></input>
                                <p>Teléfono - Sólo código de área</p>
                            </div>
                            <div className="form__field">
                                <input type="number" name="cel" defaultValue={usuarioDatosHook.celular} placeholder={usuarioDatosHook.celular || "123456"}></input>
                                <p>Teléfono</p>
                            </div>
                            <div className="form__field">
                                <input list="paqartrack" name="trackCode" defaultValue={usuarioDatosHook.trackCode} placeholder={usuarioDatosHook.trackCode || "Seleccione de la lista"}></input>
                                <datalist id="paqartrack">
                                    <option value="Email"></option>
                                    <option value="Whatsapp"></option>
                                    <option value="Ambos"></option>
                                </datalist>
                                <p>Cómo le enviamos el código de tracking?</p>
                            </div>

                            <h5>Datos Facturación</h5>
                            <div className="form__field">
                                <input type="number" name="cuit" defaultValue={usuarioDatosHook.cuit} placeholder={usuarioDatosHook.cuit || "20-12345678-0"}></input>
                                <p>CUIT. Si es consumidor final dejar en blanco</p>
                            </div>
                            <div className="form__field">
                                <input list="ivas" name="iva" defaultValue={usuarioDatosHook.iva} placeholder={usuarioDatosHook.iva || "Seleccione de la lista o dejar en blanco"}></input>
                                <datalist id="ivas">
                                    <option value="Consumidor Final"></option>
                                    <option value="Responsable Inscripto"></option>
                                    <option value="Excento"></option>
                                    <option value="Monotributo"></option>
                                </datalist>
                                <p>Condición frente al IVA</p>
                            </div>

                            <input type="submit" className="submitButton" value="Guardar mis datos"></input>
                        </form>
                    </>
            }

        </div>
    );
}
export default UserData;