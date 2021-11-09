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

export const CrearUsuarioComponent = () => {


    const [group, setGroup] = useState([])
    const [dato, setDatos] = useState([])

    useEffect(() => {
        API.get('api/usuarios/asesor/list_grupos')
            .then(({ data }) => {
                setGroup(data)
                console.log(data)
                document.getElementById("login-form").reset();
            })

    }, [])

    const handleInput = (e) => {
        setDatos({
            ...dato,
            [e.target.name]: e.target.value
        })
    }

    const enviarDatos = async (e) => {
        e.preventDefault();
        console.log(dato)
        API.post('api/usuarios/asesor/crear-usuario/', JSON.stringify(dato))
        .then( ({data}) => {
            const resp = data;
            if(resp.mensaje){   
                const mensaje = resp.mensaje;
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: mensaje,
                    showConfirmButton: false,
                    timer: 1500
                });
                document.getElementById("login-form").reset();
            }else{
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: resp.error,
                })
            }
        })
        .catch(console.error)

    }
    return (

        <>
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
        </>
    )
}
