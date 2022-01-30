import React, {useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import API from '../../Utils/API';
import Swal from 'sweetalert2';

export const CambioContraseña = () => {

    let estado = false;
    const [data_password, setPassword] = useState([]);
    const [data_user, setData_user] = useState([]);
    const [data_msg, setData_msg] = useState(estado);
    const [msg_Error, setMsg_Error] = useState("");

    useEffect(()=>{
        const id = JSON.parse(localStorage.getItem('id_user'))
        API.get('api/usuarios/user/'+id)
        .then( data => {
            const respuesta = data.data;
            setData_user(respuesta)

        } )
    },[]);

    useEffect(()=>{

    }, []);

    const handleInputChange = (e)=>
    {
        setPassword({
            ...data_password,
            [e.target.name]: e.target.value
        });
        setData_msg(false);
    }

    const handleChangePassword = (e)=>{
        setData_msg(false);
        e.preventDefault()
        data_password.password_user = data_user.password
        API.put('api/usuarios/user/updated_password/', JSON.stringify(data_password))
        .then( resp =>{
            const respuesta = resp.data;
            if(respuesta.msg){
                setData_msg(true);
                setMsg_Error(respuesta.msg)

            }else if(respuesta.error){
                setData_msg(true);
                setMsg_Error(respuesta.error)

            }else{
                const msg_affirmation = respuesta.data;
                Swal.fire({
                    icon: 'sucess',
                    title: 'Exitoso!...',
                    text: msg_affirmation,
                  });
                setTimeout(()=>{
                    window.location = "/datos_perfil"
                }, 2000)
            }
        })
    }

    return (
            <>
            <div className="datos">
                <div className="datos-personales">
                <div className="salir">
                        <Link to="datos_perfil">
                             <button className="btn btn-primary-outline inicio"><i className="fas fa-angle-left" style={{ marginRight: "10px" }}></i><i className="far fa-address-card"></i> Datos personales</button>
                        </Link>
                    <h4 className="h4-datos">Cambiar contraseña</h4></div>
                    <form onSubmit={handleChangePassword}>
                    <FormControl fullWidth >
                        <TextField
                            type="password"
                            name="old_password"
                            placeholder="Escribe..."
                            label="Contraseña antigua"
                            className="form-control"
                            onChange={handleInputChange}
                            required
                            style={{ marginBottom: "30px" }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                       
                        <TextField
                            type="password"
                            name="password"
                            placeholder="Escribe..."
                            label="Nueva contraseña"
                            className="form-control"
                            onChange={handleInputChange}
                            required
                            style={{ marginBottom: "30px" }}
                            InputLabelProps={{  
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="password"
                            name="password2"
                            placeholder="Escribe..."
                            label="Confirmar contraseña"
                            className="form-control"
                            onChange={handleInputChange}
                            required
                            style={{ marginBottom: "30px" }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                         {
                            data_msg && (
                                <p style={{marginTop:"5px", backgroundColor:"rgba(255,0,0,0.7)", color:"#fff", paddingLeft:"10px"}}>{msg_Error}</p>
                            )
                        }
                    </FormControl>
                        <div className="actualizar-cambiar">
                            <button className="btn btn-primary actualizar2" type="submit"><i className="far fa-edit" style={{ marginRight: "10px" }}></i>Actualizar contraseña</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Media query */}
            <div className="datosMediaC">
                <div className="datos-personales" >
                <div className="salir">
                        <Link to="datos_perfil">
                             <button className="btn btn-primary-outline inicio"><i className="fas fa-angle-left" style={{ marginRight: "10px" }}></i><i className="far fa-address-card"></i> Datos personales</button>
                        </Link>
                    <h4 className="h4-datos" style={{marginBottom:"10px", marginTop:"80px"}}>Cambiar contraseña</h4></div>
                    <form onSubmit={handleChangePassword} >
                    <FormControl fullWidth >
                        <TextField
                            type="password"
                            name="old_password"
                            placeholder="Escribe..."
                            label="Contraseña antigua"
                            className="form-control"
                            onChange={handleInputChange}
                            required
                            style={{ marginBottom: "30px" }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                       
                        <TextField
                            type="password"
                            name="password"
                            placeholder="Escribe..."
                            label="Nueva contraseña"
                            className="form-control"
                            onChange={handleInputChange}
                            required
                            style={{ marginBottom: "30px" }}
                            InputLabelProps={{  
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="password"
                            name="password2"
                            placeholder="Escribe..."
                            label="Confirmar contraseña"
                            className="form-control"
                            onChange={handleInputChange}
                            required
                            style={{ marginBottom: "30px" }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                         {
                            data_msg && (
                                <p style={{marginTop:"5px", backgroundColor:"rgba(255,0,0,0.7)", color:"#fff", paddingLeft:"10px"}}>{msg_Error}</p>
                            )
                        }
                    </FormControl>
                        <div className="actualizar-cambiarc">
                            <button className="btn btn-primary actualizar2" type="submit"><i className="far fa-edit" style={{ marginRight: "10px" }}></i>Actualizar contraseña</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
