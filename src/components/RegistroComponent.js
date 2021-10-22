import React from 'react'
import './registro.css';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
export const RegistroComponent = () => {
    return (
        <div className="page-container">
            <div className="login-container">
                <div className="formulario">
                    <form >
                        <img className="logo_clinica" src={logo_clinica} />
                        <h3>¡Hola,</h3>
                        <p><b>Alberto Hernandez</b> quieres que haga parate de tu red de referidos!                </p>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre..."
                            className="form-control"
                        />
                         <input
                            type="text"
                            name="apellidos"
                            placeholder="Apellidos.."
                            className="form-control"
                        />
                         <input
                            type="email"
                            name="email"
                            placeholder="Email..."
                            className="form-control"
                        />
                        <input
                            type="text"
                            name="useario"
                            placeholder="Usuario....."
                            className="form-control"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña..."
                            className="form-control"
                        />

                        <input
                            type="password"
                            name="password1"
                            placeholder="Confirmar Contraseña..."
                            className="form-control"
                        /><br />
                        <button type="submit" className="btn btn-primary">REGISTRARSE</button>
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
