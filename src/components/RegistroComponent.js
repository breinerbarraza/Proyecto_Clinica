import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
import API from '../Utils/API';
import Swal from 'sweetalert2';

export const RegistroComponent = () => {
    
    const estate = {
        id:"",
        first_name:"",
        last_name:"",
        email:"",
        username:"",
        password:"",
        password2: ""
    }   
    const {id} = useParams() 

    const [registros, setRegistros] = useState(estate)
    const [state_error, setState_error] = useState(false);
    const [msg_error, setmsg_error] = useState("")
    const [data_user, setData_user] = useState({});

    useEffect(()=>{
        
        API.get("api/usuarios/user/"+id)
        .then(item => {
            const respuesta = item.data;
            console.log(respuesta)
            setData_user(respuesta)
        })
    }, [id])

    const handleSubmit = (e)=>{
        e.preventDefault()
        setState_error(false);
        console.log(registros)
        API.post('api/usuarios/asesor/register/', JSON.stringify(registros))
        .then ( item => {
            const resp = item.data;
            console.log(resp);
            if(resp.data){
                let error_msg = resp.data
                return Swal.fire({
                    icon: 'error',
                    title: 'Ha ocurrido el siguiente error!',
                    text: error_msg,
                  });
            }else if(resp.error){
                setState_error(true);
                setmsg_error(resp.error);
            }else{
                const mensaje = resp.mensaje;
                Swal.fire({
                    icon: 'success',
                    text: mensaje,
                    timer: 2500
                });
                setTimeout(()=>{
                    window.location = "/";
                }, 2000);
            }
        })
    }

    const handleInputChange =  (e)=> {
        setState_error(false);
        setRegistros({
            ...registros,
            [e.target.name] : e.target.value,
            'id': id
        })
    }

    return (
        <>
        <div className="div-container-registro">
            <div className="contenedor-div-registro">
                <h3 className="h3-registro">
                    ¡Harás parte de la red de referidos de <b className="b-registro">{data_user.nombre_completo}</b> al ingresar tus datos!
                </h3>
            </div>
            <form onSubmit={handleSubmit} className="form-registro-responsive">
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
                <div className="div-separador">
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
                </div>
                    
                <div className="div-separador">
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
                </div>  
               <div className="div-separador"> 
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
                </div>
                <div className="div-separador">
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
                </div>
                <div className="div-separador">
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
                </div>
                {
                    state_error && (
                        <p style={{marginTop:"7px", backgroundColor:"rgba(255,0,0,0.7)", color:"#fff", paddingLeft:"10px"}}>{msg_error}</p>
                    )
                }
                <div className="form-submit">
                    <button type="submit" className="btn btn-primary btn-referir">Registrarse</button>
                </div>
            </form>
        </div>

        <div className="page-registro">
            <div className="registro-container">
                <div className="formulario-registro">
                    <form onSubmit={handleSubmit}>
                        <img alt="clinica" className="logo_clinica-registro" src={logo_clinica} />
                        <h3 className="h3-registro">¡Hola,</h3>
                        <p className="p-registro"><b>{data_user.nombre_completo}</b> quiere que hagas parte de su red de referidos!</p>
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
                                <p style={{marginTop:"7px", backgroundColor:"rgba(255,0,0,0.7)", color:"#fff", paddingLeft:"10px"}}>{msg_error}</p>
                            )
                        }
                        
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
        </>
    )
}
