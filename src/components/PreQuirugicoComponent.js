import React from 'react'
import { Link } from 'react-router-dom'

export const PreQuirugicoComponent = () => {
    return (
        <>
            <div>
                <Link to="/listado" style={{textDecoration:"none"}}><h3 className="h3-dashboar"><i class="fas fa-angle-left" style={{marginRight:"10px"}}></i>Carlos Parra Araùjo</h3></Link>
                <div className="infomacion">
                    <label className="label-info"><b>Fecha de nacimiento:</b> </label><br/>
                    <label className="label-info"><b>Edad: </b></label>
                    <label className="label-info"><b>C.C:</b> </label><br/>
                    <label className="label-info"><b>Correo:</b> </label><br/>
                    <label className="label-info"><b>Referio por:</b> </label><br/>
                </div>
            </div>
        </>
    )
}
