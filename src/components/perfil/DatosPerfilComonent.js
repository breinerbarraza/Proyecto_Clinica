import React, { useEffect,useState } from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { Link } from 'react-router-dom';
import API from '../../Utils/API';

export const DatosPerfilComonent = () => {

    const datosUser = {
        nombres:"",
        apellidos:"",
        username:""
    }
    const [userData, setUserData] = useState(datosUser);

    const handleInput = (e) =>{
        e.preventDeafault()
        API.post('',JSON.stringify(userData))
    }
    const handleInputChange =  (e)=> {
        setUserData({
            ...userData,
            [e.target.name] : e.target.value
        })
    }
    const [datos, setDatos] = useState({});
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
        setDatos(objeto);
    }, []);
    return (
        <>
            <div className="datos">
                <div className="datos-personales">
                <div className="salir">
                        <Link to="/">
                             <button className="btn btn-primary-outline inicio"><i className="fas fa-angle-left" style={{ marginRight: "10px" }}></i><i class="fas fa-home"></i> Inicio</button>
                        </Link>
                    <h4 className="h4-datos">Datos personales</h4></div>
                    <form>
                    <FormControl fullWidth >
                        <TextField
                            type="text"
                            name="nombre"
                            placeholder="Escribe..."
                            label="Nombre"
                            className="form-control"
                            style={{ marginBottom: "30px" }}
                            value={datos.nombres}
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
                            value={datos.apellidos}
                            onChange={handleInputChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="text"
                            name="usuario"
                            placeholder="Escribe..."
                            label="Usuario"
                            className="form-control"
                            style={{ marginBottom: "30px" }}
                            value={datos.username}
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
