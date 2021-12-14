import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PerfilComponent } from './perfil/PerfilComponent';
import API from '../Utils/API';
import { HeaderComponent } from './HeaderComponent'
import Swal from 'sweetalert2';
import { Loading } from './Loading';
import { ButtonListar_change_class, ButtonReferir_change_class } from './FuncionesComponent';
import { PerfilComponentSinNombre } from './perfil/Perfil_sin_nombre';


export const CrearUsuarioComponent = () => {

    const [group, setGroup] = useState([])
    const [dato, setDatos] = useState([])
    const [identificacion, setIdentificacion] = useState([]);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        const super_user = (JSON.parse(localStorage.getItem('super_user'))) ? JSON.parse(localStorage.getItem('super_user')) : "";
        if(!super_user){
            window.location = "/";
        }
        API.get('api/usuarios/asesor/list_grupos')
            .then(({ data }) => {
                setGroup(data)
                console.log(data)
        })
        
        API.get('api/configuracion/tipoIdentificacion')
        .then(({ data }) => {
            const item = data;
            setIdentificacion(item)
        })
        
    }, [])

    const handleInput = (e) => {
        setDatos({
            ...dato,
            [e.target.name]: e.target.value
        })
    }
    const enviarDatos = async(e) => {
        e.preventDefault();
        console.log(dato);
        setSpinner(true);
        setTimeout(()=>{
            setSpinner(false);
        }, 3000)
        await API.post('api/usuarios/asesor/crear-usuario/', JSON.stringify(dato))
        .then( ({data}) => {
            const resp = data;
            console.log(resp);
            if(resp.mensaje){   
                const mensaje = resp.mensaje;
                document.getElementById("login-form").reset();
                setSpinner(false);
                return Swal.fire({
                    icon: 'success',
                    title: 'Exito!',
                    text : mensaje,
                    timer: 4000
                });
            }else{
                const error = resp.error;
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                    timer: 3500
                })
            }
        })
        .catch(console.error)
    }

    if(spinner){
        return (
            <Loading />
        )
    }else{
        
    return (
        <>
            <div className="div_crear_usuario">
                <HeaderComponent users={true} dashboard={false} />
                <PerfilComponent />

                <div className="usuario-container">
                    <h3 className="h3-usuario"> Crear Usuario</h3>
                    <form id="login-form" onSubmit={enviarDatos}>
                        <FormControl fullWidth  >
                            <InputLabel shrink id="demo-simple-select-standard-label">Tipo Usuario</InputLabel>
                            <Select
                                name="tipo_usuario"
                                required
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                onChange={handleInput}
                                label="Tipo Usuario"
                            >
                                {
                                    group.map(data => {
                                        return <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                    })
                                }
                            </Select>
                            <TextField
                                type="text"
                                name="nombres"
                                required
                                placeholder="Escribe..."
                                label="Nombre"
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
                                required
                                placeholder="Escribe..."
                                label="Apellidos"
                                className="form-control RegistrarReferido"
                                style={{ marginBottom: "30px" }}
                                onChange={handleInput}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <div className="E-C_usuraio">
                                <div className="container-ce-usuario">
                                    <TextField
                                        type="text"
                                        name="celular"
                                        required
                                        placeholder="Escribe..."
                                        label="Celular"
                                        className="form-control RegistrarReferido"
                                        style={{ marginBottom: "30px" }}
                                        onChange={handleInput}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>

                                <div className="container-e-usuario">
                                    <TextField
                                        type="email"
                                        name="correo"
                                        required
                                        placeholder="Escribe..."
                                        label="E-mail"
                                        className="form-control RegistrarReferido"
                                        style={{ marginBottom: "30px" }}
                                        onChange={handleInput}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            
                           <Select style={{marginTop:'20px'}}
                                name="tipoIdentificacion"
                                required
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                onChange={handleInput}
                                label="Tipo Identificacion"
                            >
                                {
                                    identificacion.map(data => {
                                        return <MenuItem key={data.id} value={data.id}>{data.descripcion}</MenuItem>
                                    })
                                }
                            </Select>
                    
                
                            <div className="cargo_usuario">
                                <TextField
                                    type="text"
                                    name="numeroIdentificacion"
                                    required
                                    placeholder="Escribe..."
                                    label="Numero de identificacion"
                                    className="form-control RegistrarReferido"
                                    style={{ marginBottom: "30px" }}
                                    onChange={handleInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>

                            <div className="cargo_usuario">
                                <TextField
                                    type="text"
                                    name="cargo"
                                    required
                                    placeholder="Escribe..."
                                    label="Cargo"
                                    className="form-control RegistrarReferido"
                                    style={{ marginBottom: "30px" }}
                                    onChange={handleInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>

                            <div className="cargo_usuario">
                                <TextField
                                    type="text"
                                    name="cargo"
                                    required
                                    placeholder="Escribe..."
                                    label="Cargo"
                                    className="form-control RegistrarReferido"
                                    style={{ marginBottom: "30px" }}
                                    onChange={handleInput}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>

                        </FormControl>
                        <button type="submit" className="button_usuario">Crear Usario</button>
                    </form>
                </div>
            </div>


            <div className="div_crear_usuario_responsive">
                <div className="div_perfil_usuario">
                        <div>
                            <b>Crear usuario</b>
                        </div>
                        <div>
                            <i><PerfilComponentSinNombre/></i>
                        </div>
                </div>
                <div className="div_form_crear_usuario">
                    <form id="login-form" onSubmit={enviarDatos}>
                            <FormControl fullWidth  >
                                <InputLabel shrink id="demo-simple-select-standard-label">Tipo Usuario</InputLabel>
                                <Select
                                    name="tipo_usuario"
                                    required
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    onChange={handleInput}
                                    label="Tipo Usuario"
                                >
                                    {
                                        group.map(data => {
                                            return <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            
                                <TextField
                                        type="text"
                                        name="nombres"
                                        required
                                        placeholder="Escribe..."
                                        label="Nombres"
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
                                        required
                                        placeholder="Escribe..."
                                        label="Apellidos"
                                        className="form-control"
                                        style={{ marginBottom: "30px" }}
                                        onChange={handleInput}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                        
                                        <TextField
                                            type="text"
                                            name="celular"
                                            required
                                            placeholder="Escribe..."
                                            label="Celular"
                                            className="form-control"
                                            style={{ marginBottom: "30px" }}
                                            onChange={handleInput}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                

                                    <TextField
                                        type="email"
                                        name="correo"
                                        required
                                        placeholder="Escribe..."
                                        label="E-mail"
                                        className="form-control"
                                        style={{ marginBottom: "30px" }}
                                        onChange={handleInput}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                            
                        
                                    <Select style={{marginTop:'20px'}}
                                        name="tipoIdentificacion"
                                        required
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        onChange={handleInput}
                                        label="Tipo Identificacion"
                                    >
                                        {
                                            identificacion.map(data => {
                                                return <MenuItem key={data.id} value={data.id}>{data.descripcion}</MenuItem>
                                            })
                                        }
                                    </Select>

                                    <TextField
                                        type="text"
                                        name="numeroIdentificacion"
                                        required
                                        placeholder="Escribe..."
                                        label="Numero identificacion"
                                        className="form-control"
                                        style={{ marginBottom: "30px" }}
                                        onChange={handleInput}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                    <TextField
                                        type="text"
                                        name="cargo"
                                        required
                                        placeholder="Escribe..."
                                        label="Cargo"
                                        className="form-control"
                                        style={{ marginBottom: "30px" }}
                                        onChange={handleInput}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                            </FormControl>
                            <button className="btn-referir-paciente" type="submit">Crear Usario</button>
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

}
