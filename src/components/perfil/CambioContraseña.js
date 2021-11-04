import React from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
export const CambioContraseña = () => {
    return (
        <div>
            <>
            <div className="datos">
                <div className="datos-personales">
                <div className="salir">
                        <Link to="datos_perfil">
                             <button className="btn btn-primary-outline inicio"><i className="fas fa-angle-left" style={{ marginRight: "10px" }}></i><i className="far fa-address-card"></i> Datos personales</button>
                        </Link>
                    <h4 className="h4-datos">Cambiar contraseña</h4></div>
                    <form>
                    <FormControl fullWidth >
                        <TextField
                            type="password"
                            name="contraseña"
                            placeholder="Escribe..."
                            label="Contraseña antigua"
                            className="form-control"
                            style={{ marginBottom: "30px" }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="password"
                            name="contraseña1"
                            placeholder="Escribe..."
                            label="Nueva contraseña"
                            className="form-control"
                            style={{ marginBottom: "30px" }}
                            InputLabelProps={{  
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="password"
                            name="contraseña2"
                            placeholder="Escribe..."
                            label="Confirmar contraseña"
                            className="form-control"
                            style={{ marginBottom: "30px" }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>

                        <div className="actualizar-cambiar">
                            <Link to="/datos_perfil">
                                <button className="btn btn-primary actualizar"><i className="far fa-edit" style={{ marginRight: "10px" }}></i>Actulizar contraseña</button>
                            </Link>
                        </div>
                        </form>
                </div>
            </div>
        </>
        </div>
    )
}
