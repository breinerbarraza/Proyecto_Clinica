import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../../Utils/API'
import { FormularioEstado } from './FormularioEstado/FormularioEstado';

export const PreQuirugicoComponent = () => {
    const [data_preQuirugico, setData_preQuirugico] = useState({})
  

    const {id} = useParams();
    console.log(id)
    useEffect(() => {
        API.get("api/referidos/"+id)
        .then(item =>  setData_preQuirugico(item.data) )
    })


    return (
        <>
            <div className="contendor-prequi">
                <div className="link-p">
                    <Link to="/listado" style={{textDecoration:"none"}}><h3 className="h3-prequi"><i className="fas fa-angle-left" style={{marginRight:"10px"}}></i>{data_preQuirugico.get_nombreCompleto}</h3></Link>
                    <p className="estado-p">{data_preQuirugico.estadoReferido}</p>
                </div>
                <div className="infomacion">
                    <div className ="nacimiento">
                    <div className ="nacimiento">
                    <p><b>Fecha de nacimiento: </b>{data_preQuirugico.fechaNacimiento} <b className="edad">Edad: </b>{data_preQuirugico.edad}</p>
                    </div>
                    </div>
                    <label className="label-info"><b>C.C: </b>{data_preQuirugico.numeroIdentificacion}</label><br/>
                    <label className="label-info"><b>Correo: </b>{data_preQuirugico.correo_electronico}</label><br/>
                    <label className="label-info"><b>Referio por: </b></label><br/>
                </div>
                <p className="prequi-p"><b>· Definir fecha de pre-quirùgico</b></p>
                <div className="form-prequi">
                    <form>
                        <FormularioEstado/>
                        <div className="prequi-button">
                            <button type="submit" className="prequi-b">ASIGNAR</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
