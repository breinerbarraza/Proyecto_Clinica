import React from 'react'
import TextField from '@mui/material/TextField';
export const FormularioEstado = () => {
    return (
        <div><form>
            <div className="form-f-h">

                <div className="form-fecha">

                    <TextField
                        type="date"
                        name="fecha"
                        placeholder="Escribe..."
                        label="Fecha"
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
        </form>
        </div>
    )
}
