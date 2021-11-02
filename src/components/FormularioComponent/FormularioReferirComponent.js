import React,{useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';
import { MenuItem, Select } from '@mui/material';
import API from '../../Utils/API';
import Swal from 'sweetalert2';

export const FormularioReferirComponent = () => {

    const [identificacion, setIdentificacion] = useState([])

    const [select_state, setSelect_state] = useState([])

    useEffect(() => {
        API.get('api/configuracion/tipoIdentificacion')
        .then(({data}) => {
            const item = data;
            setIdentificacion(item)
        } )
    }, [])

    const handleSelect = (e)=>{
        setSelect_state({
            ...select_state,
            [e.target.name] : e.target.value
        })
    }

    const enviarDatos = async(e) => {
        e.preventDefault();
        console.log(select_state)
        API.post('api/referidos/register-referidos/', JSON.stringify(select_state))
        .then( item =>{
            const resp = item.data;
            console.log(resp)
            if(resp.mensage){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: resp.mensaje,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }else{

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: resp.error,
                  })
            }
        })


    }

    return (
        <div>
            <form className="formulario-referir" onSubmit={enviarDatos}>
                <div className="textfile">
                <h3 className="h3-referir"> Referir paciente</h3>
                        <TextField
                            type="text"
                            name="nombres"
                            placeholder="Escribe..."
                            label="Nombre"
                            className="form-control"
                            style={{marginBottom: "30px"}}
                            onChange={handleSelect}
                        />
                        <TextField
                            type="text"
                            name="apellidos"
                            placeholder="Escribe..."
                            label="Apellidos"
                            className="form-control"
                            style={{marginBottom: "30px"}}
                            onChange={handleSelect}
                        />
                        <TextField
                            type="text"
                            name="fechaNacimiento"
                            placeholder="Escribe..."
                            label="Fecha de nacimiento"
                            className="form-control"
                            style={{marginBottom: "30px"}}
                            onChange={handleSelect}
                        />
                </div>

                <div className="contenedor-referir">
                    <div className="documento">
                        <Select
                                name="tipoIdentificacion"
                                placeholder="Escribe..."
                                label="Tipo de Documento"
                                className="form-control"
                                onChange={handleSelect}
                                style={{"padding":"20px", "border":"none"}}
                        >
                           
                           { 
                            identificacion.map( data => {
                                return <MenuItem key={data.id} values={data.id}>{data.descripcion}</MenuItem>
                            } )
                           }
                        </Select>
                    {/*
                        <select>
                            <option value="selected">--Seleccione--</option>
                            {
                                identificacion.map(item =>{
                                    return<option value="{item.id}">{item.descripcion}</option>
                                })
                            }
                            
                        </select> */}
                    <TextField
                            type="text"
                            name="numeroIdentificacion"
                            placeholder="Escribe..."
                            label="Numero de identidad"
                            className="form-control"
                            style={{marginBottom: "30px"}}
                            onChange={handleSelect}
                        />
                    </div>
                    <div className="container-ce">
                    <TextField
                            type="text"
                            name="celular"
                            placeholder="Escribe..."
                            label="Celular"
                            className="form-control"
                            style={{marginBottom: "30px"}}
                            onChange={handleSelect}
                        />
                     <TextField
                            type="email"
                            name="correo_electronico"
                            placeholder="Escribe..."
                            label="Email"
                            className="form-control"
                            style={{marginBottom: "30px"}}
                            onChange={handleSelect}
                        />
                       
                        <button type="submit">Referir</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
