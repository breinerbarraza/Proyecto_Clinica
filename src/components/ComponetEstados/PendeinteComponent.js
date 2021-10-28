import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../../Utils/API'


export const PendienteComponent = () => {
    const [data_pendiente, setData_pendiente] = useState({})
    
    const {id} = useParams();
    console.log(id)
    useEffect(() => {
        API.get("api/referidos/"+id)
        .then(item =>  setData_pendiente(item.data) )
    })


    return (
        <>
            <div className="contendor-prequi">
                <div className="link-p">
                    <Link to="/listado" style={{textDecoration:"none"}}><h3 className="h3-prequi"><i class="fas fa-angle-left" style={{marginRight:"10px"}}></i>{data_pendiente.get_nombreCompleto}</h3></Link>
                    <p className="estado-p">{data_pendiente.estadoReferido}</p>
                </div>
                <div className="infomacion">
                    <div className ="nacimiento">
                    <div className ="nacimiento">
                    <p><b>Fecha de nacimiento: </b>{data_pendiente.fechaNacimiento} <b className="edad">Edad: </b>{data_pendiente.edad}</p>
    
                    </div>
                    </div>
                    <label className="label-info"><b>C.C: </b>{data_pendiente.numeroIdentificacion}</label><br/>
                    <label className="label-info"><b>Correo: </b>{data_pendiente.correo_electronico}</label><br/>
                    <label className="label-info"><b>Referio por: </b></label><br/>
                </div>
                <p className="prequi-p"><h5>· Comentario</h5></p>
                <div className="form-pendiente">
                    <form>
                        <div className="form-f-pendiente">
                            <div className="form-fecha-pendiente">
                                <label htmlFor="fecha">Fecha</label>
                                <input type="date" className="form-control fecha"/>
                                <textarea className="form-control" placeholder="Escribe..."/>
                            </div>
                        </div>
                        <div className="pendiente-button">
                            <button type="submit" className="prequi-b">ASIGNAR</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
