import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../../Utils/API'

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
                        <div className="form-f-h">
                            <div className="form-fecha">
                                <label htmlFor="fecha">Fecha</label>
                                <input type="date" className="form-control fecha"/>
                            </div>
                            <div className="form-hora">
                                <label htmlFor="hora">Hora</label>
                                <input type="text" className="form-control hora" placeholder="Digite la hora..."/>
                            </div>
                        </div>
                        <div className="form-medico">
                                <label htmlFor="tipo">Medico</label>
                                    <select className="form-select" aria-label="Default select example">
                                        <option defaultValue> Medico</option>
                                        <option value="1"></option>
                                        <option value="2"></option>
                                        <option value="3"></option>
                                        <option value="4"></option>
                                    </select>
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
