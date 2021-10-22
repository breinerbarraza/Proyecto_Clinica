import React from 'react'
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
export const RegistroComponent = () => {
    return (
        <div className="page-registro">
            <div className="registro-container">
                <div className="formulario-registro">
                    <form >
                        <img className="logo_clinica-registro" src={logo_clinica} />
                        <h3 className="h3-registro">¡Hola,</h3>
                        <p className="p-registro"><b>Alberto Hernandez</b> quieres que haga parate de tu red de referidos!                </p>
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
                            className="form-control registro"
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
                <div className="container-logo-registro">
                    <div className="logo-registro">
                        <img src={liberate} />
                    </div>
                </div>
            </div>
        </div>
    )
}
