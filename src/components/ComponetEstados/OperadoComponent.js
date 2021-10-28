import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../../Utils/API'

export const OperadoComponent = () => {
    const [data_operado, setData_operado] = useState({})
  

    const {id} = useParams();
    console.log(id)
    useEffect(() => {
        API.get("api/referidos/"+id)
        .then(item =>  setData_operado(item.data) )
    })


    return (
        <>
            <div className="contendor-prequi">
                <div className="link-p">
                    <Link to="/listado" style={{textDecoration:"none"}}><h3 className="h3-prequi"><i className="fas fa-angle-left" style={{marginRight:"10px"}}></i>{data_operado.get_nombreCompleto}</h3></Link>
                    <p className="estado-p">{data_operado.estadoReferido}</p>
                </div>
                <div className="infomacion">
                    <div className ="nacimiento">
                    <div className ="nacimiento">
                    <p><b>Fecha de nacimiento: </b>{data_operado.fechaNacimiento} <b className="edad">Edad: </b>{data_operado.edad}</p>
    
                    </div>
                    </div>
                    <label className="label-info"><b>C.C: </b>{data_operado.numeroIdentificacion}</label><br/>
                    <label className="label-info"><b>Correo: </b>{data_operado.correo_electronico}</label><br/>
                    <label className="label-info"><b>Referio por: </b></label><br/>
                </div>
                <h5 className="prequi-p"><b>· Comentarios</b></h5>
                <p>El paciente ha sido operado</p>
            </div>
        </>
    )
}
