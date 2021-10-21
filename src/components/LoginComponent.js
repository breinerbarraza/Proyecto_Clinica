import React from 'react'
//import Box from '@mui/material/Box'
//import TextField from '@mui/material/TextField';
import './Login.css'
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';


export const LoginComponent = () => {
    return (

        <div className="page-container">
            <div className="login-container">
                <div className="formulario">
                    <form>
                        <img className="logo_clinica" src={logo_clinica} />

                        <label >Usuario</label><br />
                        <input
                            type="text"
                            name="usuario"
                            placeholder="Usuario"
                            className="form-control"
                        /><br />
                        <label >Contraseña</label><br />
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            className="form-control"
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
