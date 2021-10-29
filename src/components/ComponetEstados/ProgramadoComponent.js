import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../../Utils/API'
import { FormularioEstado } from './FormularioEstado/FormularioEstado'


export const ProgramadoComponent = () => {
    const [data_prorgramado, setData_programado] = useState({})
    
    const {id} = useParams();
    console.log(id)
    useEffect(() => {
        API.get("api/referidos/"+id)
        .then(item =>  setData_programado(item.data) )
    }, [id])


    return (
        <>
            <div className="contendor-prequi">
                <div className="link-p">
                    <Link to="/listado" style={{textDecoration:"none"}}><h3 className="h3-prequi"><i class="fas fa-angle-left" style={{marginRight:"10px"}}></i>{data_prorgramado.get_nombreCompleto}</h3></Link>
                    <p className="estado-p">{data_prorgramado.estadoReferido}</p>
                </div>
                <div className="infomacion">
                    <div className ="nacimiento">
                    <p><b>Fecha de nacimiento: </b>{data_prorgramado.fechaNacimiento} <b className="edad">Edad: </b>{data_prorgramado.edad}</p>
    
                    </div>
                    <label className="label-info"><b>C.C: </b>{data_prorgramado.numeroIdentificacion}</label><br/>
                    <label className="label-info"><b>Correo: </b>{data_prorgramado.correo_electronico}</label><br/>
                    <label className="label-info"><b>Referio por: </b></label><br/>
                </div>
                <p className="prequi-p"><b>· Definir fecha de procedimiento</b></p>
                <div className="form-prequi">
                    <form>
                        <FormularioEstado/>
                        <div className="form-medico">
                            <TextField
                                        key={true}
                                        select
                                        name="mdico"
                                        label="Medico"
                                        className="form-control "
                                        style={{ marginBottom: "30px"}}
                                        onChange={""}
                                    >
                                        <option value="">Choose one option</option>
                                        <option value="3">03</option>
                                        <option value="6">06</option>
                                        <option value="9">09</option>
                                        <option value="12">12</option>
                                        <option value="16">16</option>
                                        <option value="18">18</option>
                            </TextField>
                        </div>

                        <div className="prequi-button">
                            <button type="submit" className="prequi-b">ASIGNAR</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
