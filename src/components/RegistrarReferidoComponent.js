import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
import Swal from 'sweetalert2';
import API from '../Utils/API';

export const RegistrarReferidoComponent = () => {

    const [identificacion, setIdentificacion] = useState([])
    const [state_referido, setState_referido] = useState([])
    const {id} = useParams();

    useEffect(() => {
        API.get('api/configuracion/tipoIdentificacion')
            .then(({ data }) => {
                const item = data;
                setIdentificacion(item)
            })
        console.log(id);
    }, []);

    const handleInput = (e) => {
        setState_referido({
            ...state_referido,
            [e.target.name]: e.target.value,
            id_user: id
        })
    }
    const enviarDatos = (e) => {
        e.preventDefault();
        console.log(state_referido)
        API.post('api/referidos/register-referidos/', JSON.stringify(state_referido))
            .then(item => {
                const resp = item.data;
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
        <>
        <div className="div-container">
            <div className="contenedor-div">
                <h3 className="h3-referir">¡Estás ingresando tus datos para ser un candidato para librarte de tus gafas!</h3>

            </div>
            <form onSubmit={enviarDatos} className="form-referir">
                <TextField
                    type="text"
                    name="nombres"
                    placeholder="Escribe..."
                    label="Nombres"
                    required
                    className="form-control"
                    style={{ marginBottom: "30px" }}
                    onChange={handleInput}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <div className="div-separador">
                    <TextField
                        type="text"
                        name="nombres"
                        placeholder="Escribe..."
                        label="Nombres"
                        required
                        className="form-control"
                        style={{ marginBottom: "30px" }}
                        onChange={handleInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="div-separador">
                    <TextField
                        type="text"
                        name="apellidos"
                        placeholder="Escribe..."
                        label="Apellidos"
                        required
                        className="form-control RegistrarReferido"
                        style={{ marginBottom: "30px" }}
                        onChange={handleInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
              </div>
              <div className="div-separador-identificacion">
                <FormControl fullWidth  >
                        <InputLabel shrink id="demo-simple-select-standard-label">Tipo de identificacion</InputLabel>
                        <Select
                            name="tipoIdentificacion"
                            label="Tipo de Identificacion"
                            required
                            id="demo-simple-select-standard"
                            className="select-indentificacion-cmb"
                            style={{ marginBottom: "-4px" }}
                            onChange={handleInput}
                        >
                            {
                                identificacion.map(data => {
                                    return <MenuItem key={data.id} value={data.id}>{data.descripcion}</MenuItem>
                                })
                            }
                        </Select>
                </FormControl>
              </div>
                <div className="div-separador">
                <TextField
                    type="text"
                    name="numeroIdentificacion"
                    placeholder="Escribe..."
                    label="Numero de identidad"
                    required
                    className="form-control RegistrarReferido"
                    style={{ marginBottom: "30px" }}
                    onChange={handleInput}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                </div>                                
               
                <div className="div-separador">
                    <TextField
                        type="date"
                        name="fechaNacimiento"
                        placeholder="Escribe..."
                        label="Fecha de nacimiento"
                        required
                        className="form-control RegistrarReferido"
                        style={{ marginBottom: "30px" }}
                        onChange={handleInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>

                <div className="div-separador">
                    <TextField
                    type="text"
                    name="celular"
                    placeholder="Escribe..."
                    label="Celular"
                    required
                    className="form-control RegistrarReferido"
                    style={{marginBottom: "30px"}}
                    onChange={handleInput}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                </div>
                <div className="div-separador">
                    <TextField
                        type="email"
                        name="correo_electronico"
                        placeholder="Escribe..."
                        label="Email"
                        required
                        className="form-control RegistrarReferido"
                        style={{ marginBottom: "30px" }}
                        onChange={handleInput}
                        InputLabelProps={{
                            shrink: true,
                        }}
                />
                </div>       

                <div className="form-submit">
                    <button type="submit" className="btn btn-primary btn-referir">Enviar</button>
                </div>
            </form>
        </div>
        <div className="page-registrarefe">
            <div className="registrarefe-container">
                <div className="formulario-registrarefe">
                    <form onSubmit={enviarDatos} className="_form-registro" id="login-form">
                        <div className="msg">
                        <img alt="clinica" className="logo_clinica-registrarefe" src={logo_clinica} />
                            <h3 className="h3-registrarefe">¡Hola,</h3>
                            <p className="p-registrarefe">a continuación ingresarás tus datos para ser un candidato más y liberarte de tus gafas! </p>
                        </div>
                        <TextField
                            type="text"
                            name="nombres"
                            placeholder="Escribe..."
                            label="Nombres"
                            required
                            className="form-control"
                            style={{ marginBottom: "30px" }}
                            onChange={handleInput}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="text"
                            name="apellidos"
                            placeholder="Escribe..."
                            label="Apellidos"
                            required
                            className="form-control RegistrarReferido"
                            style={{ marginBottom: "30px" }}
                            onChange={handleInput}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="date"
                            name="fechaNacimiento"
                            placeholder="Escribe..."
                            label="Fecha de nacimiento"
                            required
                            className="form-control RegistrarReferido"
                            style={{ marginBottom: "30px" }}
                            onChange={handleInput}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <div className="_container-referidos">
                            <div className="container-Select-cedula">
                                <div className="select">
                                    <FormControl fullWidth  >
                                        <InputLabel shrink id="demo-simple-select-standard-label">Tipo de Documento</InputLabel>
                                        <Select
                                            name="tipoIdentificacion"
                                            label="Tipo de Documento"
                                            required
                                            id="demo-simple-select-standard"
                                            style={{ marginBottom: "-4px" }}
                                            onChange={handleInput}
                                        >
                                            {
                                                identificacion.map(data => {
                                                    return <MenuItem key={data.id} value={data.id}>{data.descripcion}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </div>
                                <TextField
                                    type="text"
                                    name="celular"
                                    placeholder="Escribe..."
                                    label="Celular"
                                    required
                                    className="form-control RegistrarReferido"
                                    style={{marginBottom: "30px"}}
                                    onChange={handleInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div className="container-identidad-email">
                                <TextField
                                    type="text"
                                    name="numeroIdentificacion"
                                    placeholder="Escribe..."
                                    label="Numero de identidad"
                                    required
                                    className="form-control RegistrarReferido"
                                    style={{ marginBottom: "30px" }}
                                    onChange={handleInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    type="email"
                                    name="correo_electronico"
                                    placeholder="Escribe..."
                                    label="Email"
                                    required
                                    className="form-control RegistrarReferido"
                                    style={{ marginBottom: "30px" }}
                                    onChange={handleInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">REGISTRARSE</button>
                    </form>
                </div>
                <div className="container-logo-registrarefe msg">
                    <div className="logo-registrarefe">
                        <img alt="clinica" src={liberate} />
                    </div>
                </div>
            </div>
        </div>
        
    </>
    )
}
