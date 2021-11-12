import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import API from '../../Utils/API';
import Swal from 'sweetalert2';
import defecto_perfil from '../../image/Recursos-Femto/logo.png';

export const DatosPerfilComonent = () => {
    
    const estado_inicial = {
        id_user: "",
        nombres: "",
        apellidos: "",
        username: ""
    }
    const [estadoStorage, set_estadoStorage] = useState(estado_inicial)
    


    useEffect(() => {
        const first_name = JSON.parse(localStorage.getItem('nombres'));
        const last_name = JSON.parse(localStorage.getItem('apellidos'));
        const id_user = JSON.parse(localStorage.getItem('id_user'));
        const username = JSON.parse(localStorage.getItem('username'));
        const password = JSON.parse(localStorage.getItem("password"));
        const objeto = {
            id_user,
            first_name,
            last_name,
            username,
            password
        }
        set_estadoStorage(objeto)
    }, []);

    console.log(estadoStorage)

    const handleSubmit = (e) => {
        e.preventDefault()
        API.put(`api/usuarios/user/${estadoStorage.id_user}/`, JSON.stringify(estadoStorage))
            .then(item => {
                const first_name = document.getElementById('first_name');
                const last_name = document.getElementById('last_name');
                const username = document.getElementById('username');
                if (first_name.value === '' || last_name.value === '' || username.value === '') {
                    return Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Favor rellenar los campos',
                        showConfirmButton: false,
                        timer: 1500
                    });   
                }else{
                    const resp = item.data;
                    console.log(resp);
                    borrarDatos('nombres', 'apellidos', 'username','password')
                    guardarDatos(resp.first_name, resp.last_name, resp.username, resp.password);
                    return Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Usuario actualizado correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    }); 
                }
                
            })
    }
    const guardarDatos = (first_name, last_name, username, password) => {
        localStorage.setItem('nombres', JSON.stringify(first_name))
        localStorage.setItem('apellidos', JSON.stringify(last_name))
        localStorage.setItem('username', JSON.stringify(username))
        localStorage.setItem('password', JSON.stringify(password))
    }
    const borrarDatos = (first_name, last_name, username) => {
        localStorage.removeItem(first_name);
        localStorage.removeItem(last_name);
        localStorage.removeItem(username);
    }

    const handleInputChange = (e) => {
        set_estadoStorage({
            ...estadoStorage,
            [e.target.name]: e.target.value
        })
    }


    return (
        <>
            <div className="datos">
                <div className="datos-personales">
                    <div className="salir">
                        <Link to="/">
                            <button className="btn btn-primary-outline inicio"><i className="fas fa-angle-left" style={{ marginRight: "10px" }}></i><i className="fas fa-home"></i> Inicio</button>
                        </Link>
                    </div>
                    <h4 className="h4-datos">Datos personales</h4>             
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth >
                            <TextField
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder="Escribe..."
                                label="Nombre"
                                className="form-control"
                                style={{ marginBottom: "30px" }}
                                value={estadoStorage.first_name}
                                onChange={handleInputChange}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                type="text"
                                id="last_name"
                                name="last_name"
                                placeholder="Escribe..."
                                label="Apellidos"
                                className="form-control"
                                style={{ marginBottom: "30px" }}
                                value={estadoStorage.last_name}
                                onChange={handleInputChange}
                                required

                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Escribe..."
                                label="Usuario"
                                className="form-control"
                                style={{ marginBottom: "30px" }}
                                value={estadoStorage.username}
                                onChange={handleInputChange}
                                required

                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>

                        <div className="actualizar-cambiar">
                            <button className="btn btn-primary actualizar"><i className="far fa-edit" style={{ marginRight: "10px" }}></i>Actualizar datos</button>
                            <Link to="/cambio_contraseña">
                                <button className="btn btn-primary cambiar"><i className="fas fa-key" style={{ marginRight: "10px" }}></i>Cambiar contraseña</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
