import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
import API from '../Utils/API';
import Swal from 'sweetalert2';

export const RegistroComponent = () => {


    
    const estate = {
        id:10,
        first_name:"",
        last_name:"",
        email:"",
        username:"",
        password:""
    }    

    const [registros, setRegistros] = useState(estate)

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(registros)
        API.post('api/usuarios/asesor/register/', JSON.stringify(registros))
        .then ( item => {
            const resp = item.data;
            console.log(resp);
            if(resp.data){
                let error_msg = resp.data
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error_msg,
                  });
            }else{
                const mensaje = resp.mensaje;
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: mensaje,
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(()=>{
                    window.location = "/";
                }, 2000);
            }
        })
    }

    const handleInputChange =  (e)=> {
        setRegistros({
            ...registros,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div className="page-registro">
            <div className="registro-container">
                <div className="formulario-registro">
                    <form onSubmit={handleSubmit}>
                        <img alt="clinica" className="logo_clinica-registro" src={logo_clinica} />
                        <h3 className="h3-registro">¡Hola,</h3>
                        <p className="p-registro"><b>Alberto Hernandez</b> quiere que hagas parte de su red de referidos!                </p>
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
                            name="password"
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
                        
                        <button type="submit" className="btn btn-primary">REGISTRARSE</button>
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
