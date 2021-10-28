import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import API from '../../Utils/API'

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
                    <label className="label-info"><b>Fecha de nacimiento: </b>{data_preQuirugico.fechaNacimiento}</label>
                    </div>
                    <div className="edad">
                    <label className="label-info-edad"><b>Edad: </b>{data_preQuirugico.edad}</label><b/>
                    </div>
                    <label className="label-info"><b>C.C: </b>{data_preQuirugico.numeroIdentificacion}</label><br/>
                    <label className="label-info"><b>Correo: </b>{data_preQuirugico.correo_electronico}</label><br/>
                    <label className="label-info"><b>Referio por: </b></label><br/>
                </div>
                <p className="prequi-p"><b>· Definir fecha de pre-quirùgico</b></p>
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
                        <div className="prequi-button">
                            <button type="submit" className="prequi-b">ASIGNAR</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
