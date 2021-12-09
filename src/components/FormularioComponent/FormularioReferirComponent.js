import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import API from '../../Utils/API';
import Swal from 'sweetalert2';

export const FormularioReferirComponent = () => {


    const [identificacion, setIdentificacion] = useState([])
    const [select_state, setSelect_state] = useState({})
    const [storage, setstorage] = useState({})

    useEffect(() => {
        API.get('api/configuracion/tipoIdentificacion')
            .then(({ data }) => {
                const item = data;
                setIdentificacion(item)
            })
    }, [])

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem("token"));
        const id_user = JSON.parse(localStorage.getItem("id_user"));
        const objeto = {
            id_user,
            token
        };
        setstorage(objeto);
    }, []);

    const handleSelect = (e) => {
        setSelect_state({
            ...select_state,
            [e.target.name]: e.target.value
        })
    }
    const enviarDatos = async (e) => {
        e.preventDefault();
        select_state.id_user = storage.id_user
        API.post('api/referidos/register-referidos/', JSON.stringify(select_state))
            .then(item => {
                const resp = item.data;
                console.log(resp)
                document.getElementById("login-form").reset();
                if (resp.mensaje) {
                    return Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: resp.mensaje,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: resp.error,
                    })
                }
            })
    }
    return (
        <div>
            <form id="login-form" className="formulario-referir" onSubmit={enviarDatos}>
                <FormControl fullWidth  >
                    <div className="textfile">
                        <h3 className="h3-referir"> Referir paciente</h3>
                        <TextField
                            type="text"
                            name="nombres"
                            placeholder="Escribe..."
                            label="Nombre"
                            className="form-control"
                            required
                            style={{ marginBottom: "30px" }}
                            onChange={handleSelect}
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
                            required
                            style={{ marginBottom: "30px" }}
                            onChange={handleSelect}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="date"
                            name="fechaNacimiento"
                            placeholder="Escribe..."
                            label="Fecha de nacimiento"
                            className="form-control"
                            required
                            style={{ marginBottom: "30px" }}
                            onChange={handleSelect}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>

                    <div className="contenedor-referir">
                        <div className="documento">
                            <FormControl fullWidth  >
                                <InputLabel shrink id="demo-simple-select-standard-label">Tipo de Documento</InputLabel>
                                <Select
                                    name="tipoIdentificacion"
                                    label="Tipo de Documento"
                                    className= "select-document"
                                    id="demo-simple-select-standard"
                                    onChange={handleSelect}
                                    
                                >

                                    {
                                        identificacion.map(data => {
                                            return <MenuItem key={data.id} value={data.id}>{data.descripcion}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <TextField
                                type="text"
                                name="celular"
                                placeholder="Escribe..."
                                label="Celular"
                                className="form-control"
                                required
                                style={{ marginBottom: "30px" }}
                                onChange={handleSelect}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div className="container-ce">
                        <TextField
                                type="text"
                                name="numeroIdentificacion"
                                placeholder="Escribe..."
                                label="Numero de identidad"
                                className="form-control"
                                required
                                style={{ marginBottom: "33px" }}
                                onChange={handleSelect}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            
                            <TextField
                                type="email"
                                name="correo_electronico"
                                placeholder="Escribe..."
                                label="Email"
                                className="form-control"
                                required
                                style={{ marginBottom: "30px" }}
                                onChange={handleSelect}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <button style={{ "marginTop": "20px" }} type="submit">Referir</button>
                        </div>
                    </div>
                </FormControl>
            </form>
        </div>
    )
}
