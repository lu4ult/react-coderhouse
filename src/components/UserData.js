const UserData = () => {
    return (
        <div className="userDataContainer">
            <p>Info envío</p>
            <input type="text" value="Nombre"></input>
            <br></br>
            <input type="text" value="Apellido"></input>
            <br></br>
            <input type="text" value="email"></input>
            <br></br>
            <input type="text" value="Teléfono"></input>
            <br></br>
            <input type="text" value="Provincia"></input>
            <br></br>
            <input type="text" value="Localidad"></input>
            <br></br>
            <input type="text" value="Codigo Postal"></input>
            <br></br>
            <input type="text" value="Calle"></input>
            <br></br>
            <input type="text" value="Altura"></input>
            <br></br>
            <input type="text" value="Departamento"></input>
            <br></br>
            <br></br>
            <br></br>
            <p>Datos Facturación</p>
            <input type="text" value="CUIT"></input>
            <br></br>

            <input list="browsers" name="browser" id="browser"></input>
            <datalist id="browsers">
                <option value="Consumidor Final"></option>
                <option value="Responsable Inscripto"></option>
                <option value="Excento"></option>
                <option value="Monotributo"></option>
            </datalist>
            <input type="submit"></input>
        </div>

    );
}
export default UserData;