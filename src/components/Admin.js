import md5 from 'md5-hash'
import { useState } from 'react'

const AdminPage = () => {

    const [adminLogueado, setAdminLogueado] = useState(false);
    //adminLogueado = false;

    const handleLogin = () => {

        let user = document.getElementById("adminLogin-user").value;
        let pass = document.getElementById("adminLogin-pass").value;
        let hash = md5(user + pass);
        console.log(user)
        console.log(pass)
        console.log(hash)

        if (hash === '51d64431677ac4d136b39258dec1cfab') {
            setAdminLogueado(true);
            setTimeout(() => { setAdminLogueado(false) }, 5000)
        }
    }

    if (adminLogueado === false) {
        return (
            <div className="adminPage">
                <div className='adminPage__credenciales'>
                    <input id="adminLogin-user" type="text" defaultValue="Usuario"></input>
                    <input id="adminLogin-pass" type="password" ></input>
                    <button onClick={handleLogin}>Acceder</button>
                </div>
            </div>
        );
    }
    else {
        return (<div className="adminPage">Estoy logueado</div>);
    }
}

export default AdminPage;