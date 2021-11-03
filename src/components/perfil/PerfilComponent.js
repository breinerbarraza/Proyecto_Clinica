import React, { useEffect, useState } from 'react'
import ClinicaBlanco from '../../image/Recursos-Femto/logo.png';
export const PerfilComponent = () => {


    const [datos_perfil, setdatos_perfil] = useState({});

    useEffect(() => {

        const nombres = JSON.parse(localStorage.getItem('nombres'));
        const apellidos = JSON.parse(localStorage.getItem('apellidos'));
        const id_user = JSON.parse(localStorage.getItem('id_user'));
        const objeto = {
            id_user,
            nombres,
            apellidos
        }
        setdatos_perfil(objeto);
    }, []);


    const cerrarSesion = (token, idUser, nombres, apellidos)=>{
        localStorage.removeItem(token);
        localStorage.removeItem(idUser);
        localStorage.removeItem(nombres);
        localStorage.removeItem(apellidos);
        window.location = "/";
    }
    

    return (
        <div className="container-perfil">
            <div className="btn-group">
                <button type="button" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    { datos_perfil.nombres} {datos_perfil.apellidos}
                </button>
                <img alt="clinica" src={ClinicaBlanco} width="80" height="50"/>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><button className="dropdown-item" type="button">Perfil</button></li>
                    <li><button onClick={() => cerrarSesion('token', 'id_user', 'nombres', 'apellidos')} className="dropdown-item" type="button">Cerrar Sesiòn</button></li>
                    {/*<li><button className="dropdown-item" type="button">Something else here</button></li>*/}
                </ul>
            </div>
        </div>
    )
}
