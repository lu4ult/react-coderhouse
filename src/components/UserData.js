import { useSearchParams } from "react-router-dom";

const UserData = () => {

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
            cuit: '20123456780',
            iva: 'Consumidor Final'
        }
        localStorage.setItem('tiendaLu4ult_userData', JSON.stringify(newUser))
    }

    usuarioDatos = JSON.parse(localStorage.getItem('tiendaLu4ult_userData'));


    const [params] = useSearchParams();
    console.log(params.get('email'))

    if (params.get('email') != null) {
        usuarioDatos = {
            email: params.get('email'),
            nombre: params.get('nombre'),
            dni: params.get('dni'),
            provincia: params.get('provincia'),
            localidad: params.get('loc'),
            calle: params.get('calle'),
            altura: params.get('altura'),
            piso: params.get('piso'),
            unidad: params.get('unidad'),
            cp: params.get('cp'),
            codarea: params.get('codarea'),
            celular: params.get('cel'),
            cuit: params.get('cuit'),
            iva: params.get('iva')
        }
        setTimeout(() => { localStorage.setItem('tiendaLu4ult_userData', JSON.stringify(usuarioDatos)) }, 1000);
    }

    let inputs = document.querySelectorAll('.userData__field input');
    inputs.forEach(e => {
        e.addEventListener('focus', () => {
            e.value = ""
        });
    })

    return (
        <div className="userDataContainer">
            <form>
                <h3>Info envío</h3>
                <div className="userData__field">
                    <input type="email" name="email" defaultValue={usuarioDatos.email}></input>
                    <p>Tu dirección de correo electrónico</p>
                </div>

                <div className="userData__field">
                    <input type="text" name="nombre" defaultValue={usuarioDatos.nombre}></input>
                    <p>Su nombre</p>
                </div>

                <div className="userData__field">
                    <input type="number" name="dni" defaultValue={usuarioDatos.dni}></input>
                    <p>DNI sin puntos</p>

                </div>

                <div className="userData__field">
                    <input list="provincias" name="provincia" id="provinciaa" defaultValue={usuarioDatos.provincia}></input>
                    <datalist id="provincias">
                        {
                            provinciasLista.map(prov => {
                                return (<option value={prov} key={prov}></option>)
                            })

                        }
                    </datalist>
                    <p>Provincia destino</p>
                </div>

                <div className="userData__field">
                    <input type="text" name="loc" defaultValue={usuarioDatos.localidad}></input>
                    <p>Localidad</p>
                </div>
                <div className="userData__field">
                    <input type="text" name="calle" defaultValue={usuarioDatos.calle}></input>
                    <p>Calle</p>
                </div>
                <div className="userData__field">
                    <input type="text" name="altura" defaultValue={usuarioDatos.altura}></input>
                    <p>(número)</p>
                </div>
                <div className="userData__field">
                    <input type="text" name="piso" defaultValue={usuarioDatos.piso}></input>
                    <p>Piso (si es departamento)</p>
                </div>
                <div className="userData__field">
                    <input type="text" name="unidad" defaultValue={usuarioDatos.unidad}></input>
                    <p>Unidad (Si es departamento)</p>
                </div>
                <div className="userData__field">
                    <input type="text" name="cp" defaultValue={usuarioDatos.cp}></input>
                    <p><a href="https://www.correoargentino.com.ar/formularios/cpa" target="_blank" rel="noopener noreferrer">Código Postal. Si no lo conoce puede buscarlo aquí</a></p>
                </div>

                <div className="userData__field">
                    <input type="text" name="codarea" defaultValue={usuarioDatos.codarea}></input>
                    <p>Sólo código de área</p>
                </div>
                <div className="userData__field">
                    <input type="text" name="cel" defaultValue={usuarioDatos.celular}></input>
                    <p></p>
                </div>


                <h6>Datos Facturación</h6>
                <div className="userData__field">
                    <input type="numbre" defaultValue={usuarioDatos.celular}></input>
                    <p>CUIT. Si es consumidor final dejar en blanco</p>
                </div>
                <div className="userData__field">
                    <input list="ivas" name="iva" value={usuarioDatos.iva}></input>
                    <datalist id="ivas">
                        <option value="Consumidor Final"></option>
                        <option value="Responsable Inscripto"></option>
                        <option value="Excento"></option>
                        <option value="Monotributo"></option>
                    </datalist>
                    <p>asfdasdf</p>
                </div>


                <input type="submit" className="submitButton"></input>
            </form>
        </div>
    );
}
export default UserData;



//<input type="button" value="Guardar Datos" onClick={handleOnSubmit}></input>
// <button onClick={handleOnSubmit}>Guardameee</button>


/*



 


                */