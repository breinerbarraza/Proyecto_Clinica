import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../Utils/API'

export const GestionComponent = () => {
    const [data_gestion, setData_gestion] = useState({})
  

    const {id} = useParams();
    console.log(id)
    useEffect(() => {
        API.get("api/referidos/"+id)
        .then(item =>  setData_gestion(item.data) )
    })


    return (
        <>
            <div className="contendor-prequi">
                <div className="link-p">
                    <Link to="/listado" style={{textDecoration:"none"}}><h3 className="h3-prequi"><i className="fas fa-angle-left" style={{marginRight:"10px"}}></i>{data_gestion.get_nombreCompleto}</h3></Link>
                    <p className="estado-p">{data_gestion.estadoReferido}</p>
                </div>
                <div className="infomacion">
                    <div className ="nacimiento">
                    <label className="label-info"><b>Fecha de nacimiento: </b>{data_gestion.fechaNacimiento}</label>
                    </div>
                    <div className="edad">
                    <label className="label-info-edad"><b>Edad: </b>{data_gestion.edad}</label><b/>
                    </div>
                    <label className="label-info"><b>C.C: </b>{data_gestion.numeroIdentificacion}</label><br/>
                    <label className="label-info"><b>Correo: </b>{data_gestion.correo_electronico}</label><br/>
                    <label className="label-info"><b>Referio por: </b></label><br/>
                </div>
                <h5 className="prequi-p"><b>· Comentarios</b></h5>
                <label className="label-info-gestion"><b>Pròxima gestion:</b></label>
                <p>El referido no tenìa disponibilidad para la gestiòn, pidìo que se le contrate en 1 semana para recibir la</p>
                <p> infromaciòn con respecto al procedimiento refractivo. </p>
            </div>
        </>
    )
}
