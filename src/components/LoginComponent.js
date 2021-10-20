import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import './Login.css'
import logo2 from '.././image/logo2.PNG'
import logo1 from '.././image/logo1.PNG'


export const LoginComponent = () => {
    return (

        <div className="page-container">
            <div className="login-container">
                <div className="formulario">
                    <form>
                        <img src={logo1} />

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
                <div className="logo">
                    <img src={logo2} />
                </div>
            </div>
        </div>
    )
}
