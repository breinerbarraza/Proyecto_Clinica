import React, {useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import API from '../../Utils/API';

export const CambioContraseña = () => {

    const [data_password, setPassword] = useState([]);
    const [data_user, setData_user] = useState([]);

    useEffect(()=>{
        const id = JSON.parse(localStorage.getItem('id_user'))
        console.log(id)
        API.get('api/usuarios/user/'+id)
        .then( data => {
            const respuesta = data.data;
            console.log(respuesta)
            setData_user(respuesta)

        } )
    },[]);

    const handleInputChange = (e)=>
    {
        setPassword({
            ...data_password,
            [e.target.name]: e.target.value
        });
    }

    const handleChangePassword = (e)=>{
        e.preventDefault()
        console.log("Entro en el cambio de contraseña")
        data_password.password_user = data_user.password
        console.log(data_password)
        API.put('api/usuarios/user/updated_password/', JSON.stringify(data_password))
        .then( resp =>{
            const respuesta = resp.data;
            if(respuesta.msg){
                alert(respuesta.msg)
            }else if(respuesta.error){
                alert(respuesta.error)
            }else{
                const msg_affirmation = respuesta.data;
                alert(msg_affirmation)
                window.location = "/datos_perfil"
            }
        })
    }

    return (
        <div>
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
                    </FormControl>
                        <div className="actualizar-cambiar">
                            <button className="btn btn-primary actualizar2" type="submit"><i className="far fa-edit" style={{ marginRight: "10px" }}></i>Actualizar contraseña</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
        </div>
    )
}
