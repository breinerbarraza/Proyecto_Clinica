import React from 'react'
import TextField from '@mui/material/TextField';
import Select from "@material-ui/core/Select";
import { HeaderComponent } from './HeaderComponent'


export const ReferirComponent = () => {
    return (
        <>
            <HeaderComponent users={true} dashboard={false}/> 
            <div className="referir-container">
                
            <form className="formulario-referir">
                <div className="textfile">
                <h3 className="h3-referir"> Referir paciente</h3>
                <TextField
                            key={true}
                            type="text"
                            name="nombre"
                            label="Nombre"
                            className="form-control"
                            style={{marginBottom: "30px"}}
                            onChange={""}
                        />
                        <TextField
                            key={true}
                            type="text"
                            name="apellido"
                            label="Apellidos"
                            className="form-control"
                            style={{marginBottom: "30px"}}
                            onChange={""}
                        />
                        <TextField
                            key={true}
                            type="date"
                            name="fecha"
                            label="Fecha de nacimiento"
                            className="form-control"
                            style={{marginBottom: "30px"}}
                            onChange={""}
                        />
                        </div>

                <div className="contenedor-referir">
                    <div className="documento">
                    <TextField
                            key={true}
                            select
                            name="identidad"
                            label="Tipo de Document"
                            className="form-control"
                            style={{marginBottom: "30px"}}
                            onChange={""}
                    >
                            <option value="">Choose one option</option>
                            <option value="3">03</option>
                            <option value="6">06</option>
                            <option value="9">09</option>
                            <option value="12">12</option>
                            <option value="16">16</option>
                            <option value="18">18</option>
                    </TextField>
                    <TextField
                            key={true}
                            type="text"
                            name="identidad"
                            label="Numero de identidad"
                            className="form-control"
                            style={{marginBottom: "30px"}}
                            onChange={""}
                        />
                    </div>
                    <div className="container-ce">
                    <TextField
                            key={true}
                            type="text"
                            name="celular"
                            label="Celular"
                            className="form-control"
                            style={{marginBottom: "30px"}}
                            onChange={""}
                        />
                     <TextField
                            key={true}
                            type="email"
                            name="email"
                            label="Email"
                            className="form-control"
                            style={{marginBottom: "30px"}}
                            onChange={""}
                        />
                       
                        <button type="submit">Referir</button>
                    </div>
                </div>
            </form>
            </div>
        </>
    )
}
