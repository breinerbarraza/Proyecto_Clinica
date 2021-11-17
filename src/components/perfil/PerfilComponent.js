import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ClinicaBlanco from '../../image/Recursos-Femto/logo.png';
export const PerfilComponent = () => {

    const [datos_perfil, setdatos_perfil] = useState({});
    useEffect(() => {
        const nombres = JSON.parse(localStorage.getItem('nombres'));
        const apellidos = JSON.parse(localStorage.getItem('apellidos'));
        const id_user = JSON.parse(localStorage.getItem('id_user'));
        const username = JSON.parse(localStorage.getItem('username'));
        const superuser = (JSON.parse(localStorage.getItem('super_user'))) ? JSON.parse(localStorage.getItem('super_user')) : "" ;
        const objeto = {
            id_user,
            nombres,
            apellidos,
            username,
            superuser,            
        }
        setdatos_perfil(objeto);
    }, []);

    console.log(datos_perfil)
    const cerrarSesion = (token, idUser, nombres, apellidos,username, password, super_user)=>{
        localStorage.removeItem(token);
        localStorage.removeItem(idUser);
        localStorage.removeItem(nombres);
        localStorage.removeItem(apellidos);
        localStorage.removeItem(username);
        localStorage.removeItem(password);
        localStorage.removeItem(super_user);
        window.location = "/";
    }
    

    return (
        <div className="container-perfil">
            <div className="btn-group">
                <button type="button" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    { datos_perfil.nombres} {datos_perfil.apellidos}
                </button>
                <img alt="clinica" src={ClinicaBlanco} width="50" height="50"/>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><Link to="/datos_perfil"><button className="dropdown-item" type="button">Perfil</button></Link></li>
                    {
                        datos_perfil.superuser && (
                            <>
                            <li><Link to="/crear_usuario"><button className="dropdown-item" type="button">Crear usuario</button></Link></li>
                            <li><Link to="/listado_usuario"><button className="dropdown-item" type="button">Listado Usuario</button></Link></li>
                            <li><Link to="/"><button className="dropdown-item" type="button">Listado Referidos</button></Link></li>
                            <li><Link to="/listado"><button className="dropdown-item" type="button">Listado Comision</button></Link></li>
                            <li><Link to="/dashboard"><button className="dropdown-item" type="button">Dashboard</button></Link></li>
                            <li><Link to="/dashboard2"><button className="dropdown-item" type="button">Metas</button></Link></li>
                            </>
                        )
                    }
                    <li><button onClick={() => cerrarSesion('token', 'id_user', 'nombres', 'apellidos', 'username', 'password', 'super_user')} className="dropdown-item" type="button">Cerrar Sesión</button></li>
                </ul>
            </div>
        </div>
    )
}
