import React, {useEffect, useState } from 'react'
//import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
import API from '../Utils/API';

 const login = {
        username:"",
        password:""
    }

export const LoginComponent = () => {
    

    const [datos, setDatos] = useState(login)


    useEffect(()=>{
        obtenerLocalStorage('token');
    }, [])

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
        guardarDataLocalStorage(data.token)
       const token_guardado = obtenerLocalStorage('token')
       if(token_guardado !== "null"){
           window.location = "/"
       }
       document.getElementById("login-form").reset();
       })
     
    }

    const obtenerLocalStorage = (nombre)=>{
        const dato = JSON.parse(localStorage.getItem(nombre))
        console.log(dato)
        return dato;
    }

    const guardarDataLocalStorage = (nombre)=>{
        localStorage.setItem('token', JSON.stringify(nombre))
    }

    return (

        <div className="login">
            <div className="login-container">
                <div className="formulario">
                
                    <form onSubmit={enviarDatos} id="login-form">
                       <img className="logo_clinica" src={logo_clinica} /> 
                       
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
                        <img src={liberate} />
                    </div>
                </div>
            </div>
        </div>
    )
}
