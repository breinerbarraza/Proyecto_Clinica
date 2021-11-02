import React from 'react'
import TextField from '@mui/material/TextField';
export const FormularioEstado = () => {
    return (
        <div>
            <div className="form-f-h">
                            <div className="form-fecha">
                                <TextField
                                    type="date"
                                    name="fecha"
                                    placeholder="Escribe..."
                                    label="Fecha de nacimiento"
                                    className="form-control RegistrarReferido"
                                    style={{ marginBottom: "30px" }}
                                    onChange={""}
                                />
                            </div>
                            <div className="form-hora">
                                <TextField
                                    type="text"
                                    name="hola"
                                    placeholder="Escribe..."
                                    label="Hora"
                                    className="form-control RegistrarReferido"
                                    style={{ marginBottom: "30px" }}
                                    onChange={""}
                                />
                            </div>
                        </div>
        </div>
    )
}
