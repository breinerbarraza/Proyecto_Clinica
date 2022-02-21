import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
import API from '../Utils/API';
import Swal from 'sweetalert2';


export const Registro = () => {

    const estate = {
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        password: "",
        password2: ""
    }

    const [registros, setRegistros] = useState(estate)
    const [state_error, setState_error] = useState(false);
    const [msg_error, setmsg_error] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(registros)
        setState_error(false)
        API.post('api/usuarios/asesor/register/', JSON.stringify(registros))
        .then( item => {
            const resp = item.data
            if(resp.data){
                let error_msg = resp.data
                return Swal.fire({
                    icon: 'error',
                    title: 'Ha ocurrido el siguiente error!',
                    text: error_msg,
                    position: 'center',
                });
            }else if(resp.error){
                setState_error(true);
                setmsg_error(resp.error);
            }else{
                const mensaje = resp.mensaje;
                Swal.fire({
                    icon: 'success',
                    position: 'center',
                    text: mensaje,
                    timer: 2500
                });
                return setTimeout(() => {
                    window.location = "/";
                }, 2000);
            }
        })
    }

    const handleInputChange = (e)=>{
        setState_error(false);
        setRegistros({
            ...registros,
            [e.target.name]: e.target.value
        })
    }

  return (
    <div className="page-registro">
    <div className="registro-container">
        <div className="formulario-registro">
            <form onSubmit={handleSubmit}>
                <img alt="clinica" className="logo_clinica-registro" src={logo_clinica} />
                <br />
                <TextField
                    type="text"
                    name="first_name"
                    placeholder="Escribe..."
                    label="Nombre"
                    required
                    className="form-control"
                    style={{ marginBottom: "30px" }}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    type="text"
                    name="last_name"
                    placeholder="Escribe..."
                    label="Apellidos"
                    required
                    className="form-control RegistrarReferido"
                    style={{ marginBottom: "30px" }}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    type="email"
                    name="email"
                    placeholder="Escribe..."
                    label="E-mail"
                    required
                    className="form-control RegistrarReferido"
                    style={{ marginBottom: "30px" }}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    type="text"
                    name="username"
                    placeholder="Escribe..."
                    label="Usuario"
                    required
                    className="form-control RegistrarReferido"
                    style={{ marginBottom: "30px" }}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    type="password"
                    name="password"
                    placeholder="Escribe..."
                    label="Contraseña"
                    required
                    className="form-control RegistrarReferido"
                    style={{ marginBottom: "30px" }}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    type="password"
                    name="password2"
                    placeholder="Escribe..."
                    label="Confirmar Contraseña"
                    required
                    className="form-control RegistrarReferido"
                    style={{ marginBottom: "30px" }}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {
                    state_error && (
                        <p style={{ marginTop: "7px", backgroundColor: "rgba(255,0,0,0.7)", color: "#fff", paddingLeft: "10px" }}>{msg_error}</p>
                    )
                }

                <button type="submit" className="btn btn-primary">REGISTRARSE</button>
                <Link to="/login" className='fas fa-arrow-left'> Atras</Link>
            </form>
        </div>
        <div className="container-logo-registro">
            <div className="logo-registro">
                <img alt="clinica" src={liberate} />
            </div>
        </div>
    </div>
</div>

  )
}
