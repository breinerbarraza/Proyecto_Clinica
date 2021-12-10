import React, {useEffect, useState} from 'react'
import { HeaderComponent } from './HeaderComponent'
import { PerfilComponent } from './perfil/PerfilComponent';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import API from '../Utils/API';
import Swal from 'sweetalert2';
import {ButtonReferir_change_class ,ButtonListar_change_class } from './FuncionesComponent';


export const ReferirComponent = () => {

    let estado1 = true;
    let estado2 = false;
    const [identificacion, setIdentificacion] = useState([]);
    const [select_state, setSelect_state] = useState({});
    const [storage, setstorage] = useState({});
    const [imagen1, setImagen1] = useState(estado1);
    const [imagen2, setImagen2] = useState(estado2);


    useEffect(() => {
        API.get('api/configuracion/tipoIdentificacion')
            .then(({ data }) => {
                const item = data;
                setIdentificacion(item)
            })
    }, []);

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem("token"));
        const id_user = JSON.parse(localStorage.getItem("id_user"));
        const objeto = {
            id_user,
            token
        };
        setstorage(objeto);
    }, []);

    const changeState1 = ()=>{
        setImagen1(true);
    }

    const changeState2 = ()=>{
        setImagen2(true);
    }

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
        <>
            <div className="container-principal">
                <HeaderComponent users={true} dashboard={false}/> 
                <PerfilComponent/>
                <div className="referir-container">
                        <form id="login-form" className="formulario-referir" onSubmit={enviarDatos}>
                            <FormControl fullWidth  >
                                <div className="textfile">
                                    <h3 className="h3-referir"> Referir paciente</h3>
                                    <TextField
                                        type="text"
                                        name="nombres"
                                        placeholder="Escribe..."
                                        label="Nombres"
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
            </div>
            {/* Contenido responsive */}
            <div className="container-responsive-referir">
                <div className="div_perfil">
                    <div>
                        <b>Referir Paciente</b>
                    </div>
                    <div>
                        <i><PerfilComponent/></i>
                    </div>
                </div>
                <div className="div-formulario-referir">
                    <form id="login-form" onSubmit={enviarDatos}>
                        <div className="div-separador">
                            <TextField
                                type="text"
                                name="nombres"
                                placeholder="Escribe..."
                                label="Nombres"
                                className="form-control"
                                required
                                style={{ marginBottom: "30px" }}
                                onChange={handleSelect}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
        
                        </div>

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
                        
                    <div className='div-separador-identificacion'>
                        <FormControl fullWidth  >
                                <InputLabel shrink id="demo-simple-select-standard-label">Tipo de identificacion</InputLabel>
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
                        </div> 
                            <TextField
                                    type="text"
                                    name="numeroIdentificacion"
                                    placeholder="Escribe..."
                                    label="N°.Identificacion"
                                    className="form-control"
                                    required
                                    style={{ marginBottom: "33px" }}
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
                        <button className="btn-referir-paciente" type="submit">Referir</button>
                    </form>                                            
                </div>
                {/* FOOTER */}
                <div className="footer-paciente">
                    <div className="footer-header-navbar">
                        <ButtonReferir_change_class />
                        <ButtonListar_change_class />
                    </div>
                </div>
            </div>    
        </>
    )
}
