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
                        required
                        className="form-control RegistrarReferido"
                        style={{ marginBottom: "30px" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="form-hora">
                    <TextField
                        type="text"
                        name="hora"
                        placeholder="Escribe..."
                        label="Hora"
                        required
                        className="form-control RegistrarReferido"
                        style={{ marginBottom: "30px" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>

            </div>
        </form>
        </div>
    )
}
