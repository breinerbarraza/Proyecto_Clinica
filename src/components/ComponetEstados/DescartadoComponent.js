import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../../Utils/API'

export const DescartadoComponent = () => {
    const [data_descartado, setData_descartado] = useState({})
  

    const {id} = useParams();
    console.log(id)
    useEffect(() => {
        API.get("api/referidos/"+id)
        .then(item =>  setData_descartado(item.data) )
    }, [id])


    return (
        <>
            <div className="contendor-prequi">
                <div className="link-p">
                    <Link to="/listado" style={{textDecoration:"none"}}><h3 className="h3-prequi"><i className="fas fa-angle-left" style={{marginRight:"10px"}}></i>{data_descartado.get_nombreCompleto}</h3></Link>
                    <p className="estado-p">{data_descartado.estadoReferido}</p>
                </div>
                <div className="infomacion">
                    <div className ="nacimiento">
                    <label className="label-info"><b>Fecha de nacimiento: </b>{data_descartado.fechaNacimiento}</label>
                    </div>
                    <div className="edad">
                    <label className="label-info-edad"><b>Edad: </b>{data_descartado.edad}</label><b/>
                    </div>
                    <label className="label-info"><b>C.C: </b>{data_descartado.numeroIdentificacion}</label><br/>
                    <label className="label-info"><b>Correo: </b>{data_descartado.correo_electronico}</label><br/>
                    <label className="label-info"><b>Referio por: </b></label><br/>
                </div>
                <h5 className="prequi-p"><b>· Comentarios</b></h5>
                <p>Despuès de realizados los pre-quirùgicos el paciente no es apto para realizar el procedimiento</p>
            </div>
        </>
    )
}
