import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ClinicaBlanco from '../../image/Recursos-Femto/logo.png';
import API from '../../Utils/API';
export const PerfilComponent = () => {

    const [datos_perfil, setdatos_perfil] = useState({});
    const [estadoEmpleado, setEstadoEmpleado] = useState(true)

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

        API.get(`api/referidos/comprobar_empleado/?id_empleado=${id_user}`)
        .then( ({data}) =>{
            const resp = data;
            if(resp.msg){
                //No muestre las metas programadas porque es asesor, tiene que ser empleado
                setEstadoEmpleado(true)
            }else{
                setEstadoEmpleado(false)
            }
        })

    }, []);


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
                    <li><Link to="/datos_perfil"><button className="dropdown-item" type="button"><i className="fas fa-user"></i> Perfil</button></Link></li>
                    {
                        !estadoEmpleado && datos_perfil.superuser == "" && (
                            <>
                                <li><Link to="/metas_programadas"><button className="dropdown-item" type="button"><i className="fas fa-chart-line"></i>Metas programadas</button></Link></li>
                                <li><Link to="/mi_progeso"><button className="dropdown-item" type="button"><i className="fa fa-bar-chart-o"></i>Progreso</button></Link></li>
                            </>   
                        )
                    }

                    {
                        datos_perfil.superuser && (
                            <>
                            <li><Link to="/crear_usuario"><button className="dropdown-item" type="button"><i className="fas fa-user-plus"></i> Crear Usuario</button></Link></li>
                            <li><Link to="/listado_usuario"><button className="dropdown-item" type="button"><i className="fas fa-list-ul"></i> Listado Usuario</button></Link></li>
                            <li><Link to="/listado_usuarios_pagos"><button className="dropdown-item" type="button"><i class="fas fa-money-bill"></i> Usuarios Pagados</button></Link></li>
                            <li><Link to="/"><button className="dropdown-item" type="button"><i className="fas fa-list-ul"></i> Listado Referidos</button></Link></li>
                            <li><Link to="/listado"><button className="dropdown-item" type="button"><i className="fas fa-list-ul"></i> Listado Comision</button></Link></li>
                            <li><Link to="/listado_meta"><button className="dropdown-item" type="button"><i className="fas fa-list-ul"></i> Listado Metas</button></Link></li>
                            <li><Link to="/dashboard"><button className="dropdown-item" type="button"><i className="fas fa-chart-pie"></i> Dashboard</button></Link></li>
                            <li><Link to="/dashboardMeta"><button className="dropdown-item" type="button"><i className="fas fa-chart-pie    "></i> Dashboard Canales</button></Link></li>
                            <li><Link to="/add_metas"><button className="dropdown-item" type="button"><i className="fas fa-chart-line"></i> Agregar Metas</button></Link></li>
                            {/* <li><Link to="/add_metas_estate"><button className="dropdown-item" type="button"><i className="fas fa-chart-line"></i> Agregar Meta con estado</button></Link></li> */}
                            <li><Link to="/dashboard2"><button className="dropdown-item" type="button"><i className="fas fa-chart-line"></i> Metas</button></Link></li>
                            </>
                        )
                    }
                        
                    {
                        datos_perfil.super_user || !estadoEmpleado && (
                            <>
                                <li><Link to="/tabla-solicitudes"><button className="dropdown-item" type="button"><i class="fas fa-angle-double-right"></i> Solicitudes pendientes</button></Link></li>
                            </>
                        )
                    }

                    <li><button onClick={() => cerrarSesion('token', 'id_user', 'nombres', 'apellidos', 'username', 'password', 'super_user')} className="dropdown-item" type="button"><i className="fas fa-times"></i> Cerrar Sesi??n</button></li>
                </ul>
            </div>
        </div>
    )
}
