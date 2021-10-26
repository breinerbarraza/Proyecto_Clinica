import React from 'react'
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
export const RegistrarReferidoComponent = () => {
    return (
        <div className="page-registrarefe">
            <div className="registrarefe-container">
                <div className="formulario-registrarefe">
                    <form className="_form-registro">
                        <img className="logo_clinica-registrarefe" src={logo_clinica} />
                        <h3 className="h3-registrarefe">¡Hola,</h3>
                        <p className="p-registrarefe">a contianuaciòn ingresaràs tus datos para ser un candidato mas y liberarte de tus gafas! </p>
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
                            type="date"
                            name="date"
                            className="form-control"
                        />
                        <div className="_container-referidos">
                            <div className="container-Select-cedula">
                                    <select className="form-select" aria-label="Default select example">
                                        <option defaultValue>Tipo de documeto</option>
                                        <option value="1">Cedula de Ciudadania</option>
                                        <option value="2">Cedula Extrangera</option>
                                        <option value="3">Targeta de Identidad</option>
                                        <option value="4">Registro Civil</option>
                                    </select>
                                    
                                    <input
                                        type="celular"
                                        name="text"
                                        placeholder="Nuemero de celular..."
                                        className="form-control"
                                    />
                            </div>
                                    <div className="container-identidad-email">
                                    <input
                                        type="identidad"
                                        name="text"
                                        placeholder="Numero de identidad..."
                                        className="form-control"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email..."
                                        className="form-control"
                                    /><br />
                            </div>
                        </div>
                        
                        <button type="submit" className="btn btn-primary">REGISTRARSE</button>
                    </form>
                </div>
                <div className="container-logo-registrarefe">
                    <div className="logo-registrarefe">
                        <img src={liberate} />
                    </div>
                </div>
            </div>
        </div>
    )
}
