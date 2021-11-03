import React from 'react'
import TextField from '@mui/material/TextField';
import { MenuItem, Select } from '@mui/material';
import { PerfilComponent } from './perfil/PerfilComponent';
export const CrearUsuarioComponent = () => {
    return (
        <>
        <PerfilComponent/>
            <div className="usuario-container">
                <form className="formulario-usuario">
                    <h3 className="h3-usuario"> Crear Usuario</h3>
                        <Select
                            name="tipoUser"
                            label="Tipo de usuario"
                            className="form-control "
                            style={{ marginBottom: "30px"}}
                            onChange={""}
                        >
                            <MenuItem>medico</MenuItem>
                        </Select>
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
                    <div className="E-C_usuraio">
                        <div className="container-ce-usuario">
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
                    
                        <div className="container-e-usuario">
                        <TextField
                                    type="email"
                                    name="email"
                                    placeholder="Escribe..."
                                    label="E-mail"
                                    className="form-control RegistrarReferido"
                                    style={{ marginBottom: "30px" }}
                                    onChange={""}
                                />
                        </div>
                    </div>
                        <div className="cargo_usuario">
                        <TextField
                                    type="text"
                                    name="cargo"
                                    placeholder="Escribe..."
                                    label="Cargo"
                                    className="form-control RegistrarReferido"
                                    style={{ marginBottom: "30px" }}
                                    onChange={""}
                                />
                        </div>
                    
                    <button type="submit" className="button_usuario">Crear Usario</button>
                </form>
            </div>
        </>
    )
}
