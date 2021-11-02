import React, { useState } from 'react'
//import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
import API from '../Utils/API';
import Swal from 'sweetalert2';

 const login = {
        username:"",
        password:""
    }

export const LoginComponent = () => {
    

    const [datos, setDatos] = useState(login)

    const handleInputChange = (e)=>{
        setDatos({
            ...datos,
        [e.target.name] : e.target.value
        })

    }
    const enviarDatos = async(e) => {
        e.preventDefault() 
       console.log(datos)
       API.post('/api-token-auth/', JSON.stringify(datos))
        .then(item => {
            const data = item.data
            console.log(data) 
            if(data.error){
                const error_msg = data.error;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error_msg,
                  })
                document.getElementById("login-form").reset();
            }else{
                const token = data.token;
                const id_user = data.user_id;
                const nombres = data.firstname;
                const apellidos = data.lastname;
                guardarDataLocalStorage(token, id_user, nombres, apellidos);
                const token_guardado = obtenerLocalStorageToken('token')
                if(token_guardado !== "null"){
                    window.location = "/"
                }
            }
            }
        )
     
    }

    const obtenerLocalStorageToken = (nombre_token)=>{
        const dato = JSON.parse(localStorage.getItem(nombre_token))
        console.log(dato)
        return dato;
    }

    const guardarDataLocalStorage = (nombre_token, idUser,nombres, apellidos)=>{
        localStorage.setItem('token', JSON.stringify(nombre_token))
        localStorage.setItem('id_user', JSON.stringify(idUser));
        localStorage.setItem('nombres', JSON.stringify(nombres));
        localStorage.setItem('apellidos', JSON.stringify(apellidos));
    }

    return (

        <div className="login">
            <div className="login-container">
                <div className="formulario">
                
                    <form onSubmit={enviarDatos} id="login-form">
                       <img alt="clinica"className="logo_clinica" src={logo_clinica} /> 
                       
                        <TextField
                            type="text"
                            name="username"
                            label="Usuario"
                            className="form-control"
                            style={{marginBottom: "30px"}}
                            onChange={handleInputChange}
                        /><br />
              
                        <TextField
                            type="password"
                            name="password"
                            label="Contraseña"
                            className="form-control"
                            onChange={handleInputChange}
                        /><br /><br />
                        <button type="submit" className="btn btn-primary">INICIAR SESIÓN</button>
                    </form>

                </div>
                <div className="container-logo">
                    <div className="logo">
                        <img alt="clinica" src={liberate} />
                    </div>
                </div>
            </div>
        </div>
    )
}
