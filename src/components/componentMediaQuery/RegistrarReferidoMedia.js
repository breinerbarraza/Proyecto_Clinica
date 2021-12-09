import React from 'react'
import logo_clinica from '.././../image/Recursos-Femto2/ClinicaBlanco.svg';
export const RegistrarReferidoMedia = ({ cambiarEstado }) =>{

    return(
    <>
    <div className="container_media">
        <div className="logoMedia">
            <img alt="clinica" className="logo_clinica_media" src={logo_clinica} style={{width:"90%", marginLeft:"10px", padding:"20px"}}/>
            <h1 className="h1_media">!Hola,</h1>
            <p style={{color:"white"}}>al continuar podrás ingresar tus datos para ser un candidato y librate de tus gafas!</p>
        </div>
        <div className="div2">
        <button onClick={cambiarEstado} className="botonmedia">CONTINUAR</button>
        </div>
    </div>
    </>

      
    )
}