import React, {useState, useEffect} from 'react'
import logo_clinica from '.././../image/Recursos-Femto2/ClinicaBlanco.svg';
import API from '../../Utils/API'
import { useParams } from 'react-router';
export const ReferidoMedia = ({cambiarEstado}) =>{

    const {id} = useParams()
    const [name, setName] = useState({})

    useEffect(() => {
        API.get("api/usuarios/user/"+id)
        .then(item =>{
            const resp = item.data;
            console.log(resp)
            setName(resp)
        })
    }, [id])
    return(
    <>
    <div className="container_media">
        <div className="logoMedia">
            <img alt="clinica" className="logo_clinica_media" src={logo_clinica} style={{width:"90%", marginLeft:"10px", padding:"20px"}}/>
            <h1 className="h1_media">!Hola,</h1>
            <p style={{color:"white", fontSize:'17px'}}><b>{name.nombre_completo}</b> quiere que hagas parte de su red de referidos!</p>
           
        </div>
        <div className="div2">
        <button onClick={cambiarEstado} className="botonmedia">CONTINUAR</button>
        </div>
    </div>
    </>
    )
}