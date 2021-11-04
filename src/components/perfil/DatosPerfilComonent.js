import React, { useEffect,useState } from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import API from '../../Utils/API';

export const DatosPerfilComonent = () => {

    const estado_inicial = {
        id_user: "",
        nombres: "",
        apellidos: "",
        username: ""
    }

    const [estadoStorage, set_estadoStorage] = useState(estado_inicial)
    
    useEffect(() => {
        const nombres = JSON.parse(localStorage.getItem('nombres'));
        const apellidos = JSON.parse(localStorage.getItem('apellidos'));
        const id_user = JSON.parse(localStorage.getItem('id_user'));
        const username = JSON.parse(localStorage.getItem('username'));
        const objeto = {
            id_user,
            nombres,
            apellidos,
            username
        }
        set_estadoStorage(objeto)
        
    }, []);

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(estadoStorage)
        API.put('api/',JSON.stringify(estadoStorage))
        .then( item => {
            const resp = item.data;
            console.log(resp);
        })
    }

    const handleInputChange =  (e)=> {
        set_estadoStorage({
            ...estadoStorage,
            [e.target.name] : e.target.value
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
                    <h4 className="h4-datos">Datos personales</h4></div>
                    <form onSubmit={handleSubmit}>
                    <FormControl fullWidth >
                        <TextField
                            type="text"
                            name="nombres"
                            placeholder="Escribe..."
                            label="Nombre"
                            className="form-control"
                            style={{ marginBottom: "30px" }}
                            value={estadoStorage.nombres}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="text"
                            name="apellidos"
                            placeholder="Escribe..."
                            label="Apellidos"
                            className="form-control"
                            style={{ marginBottom: "30px" }}
                            value={estadoStorage.apellidos}
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
                            className="form-control"
                            style={{ marginBottom: "30px" }}
                            value={estadoStorage.username}
                            onChange={handleInputChange}
                            
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>

                        <div className="actualizar-cambiar">
                            <button className="btn btn-primary actualizar"><i className="far fa-edit" style={{ marginRight: "10px" }}></i>Actulizar datos</button>
                            <button className="btn btn-primary cambiar"><i className="fas fa-key" style={{ marginRight: "10px" }}></i>Cambiar contraseña</button>
                        </div>
                        </form>
                </div>
            </div>
        </>
    )
}
