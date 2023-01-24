import { useSearchParams } from "react-router-dom";
import FirebaseComponent from "./FirebaseComponent";
import { doc, setDoc, getFirestore } from "firebase/firestore";

import { NomPropio } from "./utils";

const UserData = () => {
    console.log("user data")
    let provinciasLista = ["BUENOS AIRES", "CAPITAL FEDERAL", "CATAMARCA", "CHACO", "CHUBUT", "CORDOBA", "CORRIENTES", "ENTRE RIOS", "FORMOSA", "JUJUY", "LA PAMPA", "LA RIOJA", "MENDOZA", "MISIONES", "NEUQUEN", "RIO NEGRO", "SALTA", "SAN JUAN", "SAN LUIS", "SANTA CRUZ", "SANTA FE", "SANTIAGO DEL ESTERO"];
    let usuarioDatos = {};

    let dataLeidaLocal = localStorage.getItem('tiendaLu4ult_userData');
    if (dataLeidaLocal === null) {
        console.log("creando usuario por primera vez")
        let newUser = {
            email: 'nombre@email.com',
            nombre: 'Juan Perez',
            dni: '12345678',
            provincia: 'CAPITAL FEDERAL',
            localidad: 'Ciudad',
            calle: 'Calle',
            altura: '123',
            piso: '11',
            unidad: 'B',
            cp: '1234',
            codarea: '0000',
            celular: '151234567',
            trackCode: 'Email',
            cuit: '20123456780',
            iva: 'Consumidor Final'
        }
        localStorage.setItem('tiendaLu4ult_userData', JSON.stringify(newUser));
        setTimeout(() => { document.getElementById("firstInputField").focus(); }, 1000);
    }

    usuarioDatos = JSON.parse(localStorage.getItem('tiendaLu4ult_userData'));
    const [params] = useSearchParams();
    console.log(params.get('email'))

    if (params.get('email') != null) {
        usuarioDatos = {
            email: params.get('email'),
            nombre: NomPropio(params.get('nombre')),
            dni: params.get('dni'),
            provincia: params.get('provincia'),
            localidad: NomPropio(params.get('loc')),
            calle: params.get('calle'),
            altura: params.get('altura'),
            piso: params.get('piso'),
            unidad: params.get('unidad'),
            cp: params.get('cp'),
            codarea: params.get('codarea'),
            celular: params.get('cel'),
            trackCode: params.get('trackCode'),
            cuit: params.get('cuit'),
            iva: params.get('iva')
        }
        console.log("aca")
        setTimeout(() => { localStorage.setItem('tiendaLu4ult_userData', JSON.stringify(usuarioDatos)) }, 1000);

        const db = getFirestore();
        setDoc(doc(db, "usuarios", usuarioDatos.nombre), usuarioDatos, { merge: true })

    }

    let inputs = document.querySelectorAll('.form__field input');
    inputs.forEach(e => {
        e.addEventListener('focus', () => {
            e.value = ""
        });
    });


    //TODO: agregar Login con auth0
    //TODO: si se guardaron los datos y el CUIT es igual al por defecto, colocar el DNI y consumidor final.

    return (
        <>
            <FirebaseComponent />
            <form>
                <h3>Info envío</h3>
                <div className="form__field">
                    <input id="firstInputField" placeholder="correo" type="email" name="email" defaultValue={usuarioDatos.email}></input>
                    <p>Tu dirección de correo electrónico</p>
                </div>

                <div className="form__field">
                    <input placeholder={usuarioDatos.nombre} type="text" name="nombre" defaultValue={usuarioDatos.nombre}></input>
                    <p>Tu nombre y apellido</p>
                </div>

                <div className="form__field">
                    <input placeholder={usuarioDatos.dni} type="number" name="dni" defaultValue={usuarioDatos.dni}></input>
                    <p>DNI sin puntos</p>

                </div>

                <div className="form__field">
                    <input placeholder="Seleccione de lista" list="provincias" name="provincia" id="provinciaa" defaultValue={usuarioDatos.provincia}></input>
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
                    <input type="text" name="loc" defaultValue={usuarioDatos.localidad}></input>
                    <p>Localidad</p>
                </div>
                <div className="form__field">
                    <input type="text" name="calle" defaultValue={usuarioDatos.calle}></input>
                    <p>Calle</p>
                </div>
                <div className="form__field">
                    <input type="text" name="altura" defaultValue={usuarioDatos.altura}></input>
                    <p>Número</p>
                </div>
                <div className="form__field">
                    <input type="text" name="piso" defaultValue={usuarioDatos.piso}></input>
                    <p>Piso (si es departamento)</p>
                </div>
                <div className="form__field">
                    <input type="text" name="unidad" defaultValue={usuarioDatos.unidad}></input>
                    <p>Unidad (Si es departamento)</p>
                </div>
                <div className="form__field">
                    <input type="number" name="cp" defaultValue={usuarioDatos.cp}></input>
                    <p><a href="https://www.correoargentino.com.ar/formularios/cpa" target="_blank" rel="noopener noreferrer">Código Postal. Si no lo conoce puede buscarlo aquí</a></p>
                </div>

                <div className="form__field">
                    <input type="number" name="codarea" defaultValue={usuarioDatos.codarea}></input>
                    <p>Teléfono - Sólo código de área</p>
                </div>
                <div className="form__field">
                    <input type="number" name="cel" defaultValue={usuarioDatos.celular}></input>
                    <p>Teléfono</p>
                </div>
                <div className="form__field">
                    <input list="paqartrack" name="trackCode" placeholder="Seleccione"></input>
                    <datalist id="paqartrack">
                        <option value="Email"></option>
                        <option value="Whatsapp"></option>
                        <option value="Ambos"></option>
                    </datalist>
                    <p>Cómo le enviamos el código de tracking?</p>
                </div>

                <h5>Datos Facturación</h5>
                <div className="form__field">
                    <input type="number" defaultValue={usuarioDatos.celular}></input>
                    <p>CUIT. Si es consumidor final dejar en blanco</p>
                </div>
                <div className="form__field">
                    <input list="ivas" name="iva" value={usuarioDatos.iva}></input>
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
    );
}
export default UserData;