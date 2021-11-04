import React from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

export const DatosPerfilComonent = () => {
    return (
        <>
            
            <div className="datos">
                <div className="datos-personales">
                <div className="salir">
                        <button className="btn btn-primary-outline"><i className="fas fa-angle-left" style={{ marginRight: "10px" }}></i><i class="fas fa-home"></i>Inicio</button>
                        
                    <h4 className="h4-datos">Datos personales</h4></div>
                    <FormControl fullWidth  >
                        <TextField
                            type="text"
                            name="nombre"
                            placeholder="Escribe..."
                            label="Nombre"
                            className="form-control"
                            style={{ marginBottom: "30px" }}
                            onChange={""}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="text"
                            name="apellidos"
                            placeholder="Escribe..."
                            label="Apellidos"
                            className="form-control"
                            style={{ marginBottom: "30px" }}
                            onChange={""}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="text"
                            name="usuario"
                            placeholder="Escribe..."
                            label="Usuario"
                            className="form-control"
                            style={{ marginBottom: "30px" }}
                            onChange={""}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    
                        <div className="actualizar-cambiar">
                            <button className="btn btn-primary actualizar"><i className="far fa-edit" style={{ marginRight: "10px" }}></i>Actulizar datos</button>
                            <button className="btn btn-primary cambiar"><i className="fas fa-key" style={{ marginRight: "10px" }}></i>Cambiar contraseña</button>
                        </div>
                    
                </div>
            </div>

        </>
    )
}
