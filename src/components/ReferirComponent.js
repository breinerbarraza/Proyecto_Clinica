import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import './referir.css'

export const ReferirComponent = () => {
    return (
        <div className="formulario-container">
            <h2>Referir paciente</h2>
            <div className="formulario" style={{display: 'block'}}>

                <TextField  
                label="Nombre"
                variant="outlined"
                 />
                <TextField  
                className="apellidos"
                label="Apellidos" 
                variant="outlined" 
                />
                <Stack component="form" noValidate spacing={3}>
                    <TextField
                        label="Fecha de nacimiento"
                        type="date"
                        defaultValue="2017-05-24"
                        sx={{ width: 220 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Stack>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    
                    value={''}
                    label="Tipo de Identificación"
                    onChange={''}
                >
                    <MenuItem value={10}>Cédula de Ciudadanía</MenuItem>
                    <MenuItem value={20}>Cédula Extranjera</MenuItem>
                    <MenuItem value={30}>Registro Civil</MenuItem>
                    <MenuItem value={40}>Targeta de Identidad</MenuItem>
                </Select>
                <TextField  label="Numero de Identidad" variant="outlined" />
                <TextField  label="Celular" variant="outlined" />
                <TextField  label="Email" variant="outlined" />
            </div>
        </div>

    )
}







