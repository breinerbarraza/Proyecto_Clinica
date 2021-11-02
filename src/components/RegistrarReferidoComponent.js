import React from 'react'
import TextField from '@mui/material/TextField';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
export const RegistrarReferidoComponent = () => {
    return (

        <div className="page-registrarefe">
            <div className="registrarefe-container">
                <div className="formulario-registrarefe">
                    <form className="_form-registro">
                        <img alt="clinica" className="logo_clinica-registrarefe" src={logo_clinica} />
                        <h3 className="h3-registrarefe">¡Hola,</h3>
                        <p className="p-registrarefe">a continuación ingresarás tus datos para ser un candidato más y liberarte de tus gafas! </p>
                        <TextField
                            type="text"
                            name="nombre"
                            placeholder="Escribe..."
                            label="Nombre"
                            className="form-control"
                            style={{ marginBottom: "30px" }}
                            onChange={""}
                        />
                        <TextField
                            type="text"
                            name="apellido"
                            placeholder="Escribe..."
                            label="Apellidos"
                            className="form-control RegistrarReferido"
                            style={{ marginBottom: "30px" }}
                            onChange={""}
                        />
                        <TextField
                            type="text"
                            name="fecha"
                            placeholder="Escribe..."
                            label="Fecha de nacimiento"
                            className="form-control RegistrarReferido"
                            style={{ marginBottom: "30px" }}
                            onChange={""}
                        />
                        <div className="_container-referidos">
                            <div className="container-Select-cedula">
                                <div className="select">
                                <TextField
                                    select
                                    name="identidad"
                                    placeholder="Escribe..."
                                    label="Tipo de Documento"
                                    className="form-control "
                                    style={{ marginBottom: "30px"}}
                                    onChange={""}
                                >
                                    <option value="">Choose one option</option>
                                    <option value="3">03</option>
                                    <option value="6">06</option>
                                    <option value="9">09</option>
                                    <option value="12">12</option>
                                    <option value="16">16</option>
                                    <option value="18">18</option>
                                </TextField></div>
                                <TextField
                                    type="text"
                                    name="celular"
                                    placeholder="Escribe..."
                                    label="Celular"
                                    className="form-control RegistrarReferido"
                                    style={{ marginBottom: "30px" }}
                                    onChange={""}
                                />
                                
                            </div>
                            <div className="container-identidad-email">
                                <TextField
                                    type="text"
                                    name="identidad"
                                    placeholder="Escribe..."
                                    label="Numero de identidad"
                                    className="form-control RegistrarReferido"
                                    style={{ marginBottom: "30px" }}
                                    onChange={""}
                                />
                                <TextField
                                    type="email"
                                    name="email"
                                    placeholder="Escribe..."
                                    label="Email"
                                    className="form-control RegistrarReferido"
                                    style={{ marginBottom: "30px" }}
                                    onChange={""}
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">REGISTRARSE</button>
                    </form>
                </div>
                <div className="container-logo-registrarefe">
                    <div className="logo-registrarefe">
                        <img alt="clinica" src={liberate} />
                    </div>
                </div>
            </div>
        </div>
    )
}
