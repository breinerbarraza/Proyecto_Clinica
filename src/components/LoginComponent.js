import React, {useState } from 'react'
//import Box from '@mui/material/Box'
//import TextField from '@mui/material/TextField';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';

 const login = {
        usuario:"",
        password:""
    }

export const LoginComponent = () => {

    const [datos, setDatos] = useState(login)

    const handleInputChange = (e)=>{
        setDatos({
            ...datos,
        [e.target.name] : e.target.value
        })

    }
    const enviarDatos = async(e) => {
        e.preventDefault() 
        const obj = {
            nombre: datos.usuario,
            password: datos.password
        }
        /*const resp = await fetch(url, { method:'POST', headers: { 'Content-type':'application/json' }, body: JSON.stringify(obj) });
        const dato = await resp.json();
        console.log(dato);*/
    }

    return (

        <div className="login">
            <div className="login-container">
                <div className="formulario">
                
                    <form onClick={enviarDatos}>
                       <img className="logo_clinica" src={logo_clinica} /> 
                        <label >Usuario</label><br />
                        <input
                            type="text"
                            name="usuario"
                            placeholder="Usuario"
                            className="form-control"
                            onChange={handleInputChange}
                        /><br />
                        <label >Contraseña</label><br />
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            className="form-control"
                            onChange={handleInputChange}
                        /><br /><br />
                        <button type="submit" className="btn btn-primary">INICIAR SESIÓN</button>
                    </form>

                </div>
                <div className="container-logo">
                    <div className="logo">
                        <img src={liberate} />
                    </div>
                </div>
            </div>
        </div>
    )
}
