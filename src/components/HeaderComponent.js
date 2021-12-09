import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ClinicaBlanco from '../image/Recursos-Femto2/ClinicaBlanco.svg';
import useradd from '../image/Recursos-Femto/user-add.svg';
import chart_line_white from '../image/Recursos-Femto/chart-line-up-White.svg';
import user_add_blue from '../image/Recursos-Femto/user-add-Blue.svg';
import chart_line_up_white from '../image/Recursos-Femto/chart-line-up.svg';
import Logout from '../image/Recursos-Femto2/Logout.svg'

function ButtonReferir() {
    return (
        <button>
            <Link to="/referir">
                <img alt="clinica" className="imgActiva" src={user_add_blue} />
            </Link>
        </button>
    )
}
function ButtonListar() {
    return (
        <button className="btn_listar">
            <Link to="/listado">
                <img alt="listar" className="imgActiva" src={chart_line_up_white} />
            </Link>
        </button>
    )
}
export const HeaderComponent = ({ users, dashboard }) => {

    const cerrarSesion = (token, idUser, username, nombres, apellidos, password, super_user) => {
        localStorage.removeItem(token);
        localStorage.removeItem(idUser);
        localStorage.removeItem(username);
        localStorage.removeItem(nombres);
        localStorage.removeItem(apellidos);
        localStorage.removeItem(password);
        localStorage.removeItem(super_user);
        window.location = "/";
    }

    let estado = users;
    const [imagen, setImagen] = useState(estado);

    let estado1 = dashboard;
    const [imagen1, setImagen1] = useState(estado1);

    const handleButtonClick = (e) => {
        setImagen(true);
    }

    const handleButtonClick1 = (e) => {
        setImagen1(true);
    }

    return (
        <div className="header">
            <nav className="nav-header">
                <div className="imgLogo">
                    <a className="navbar-brand" href="/">
                        <img alt="clinica" className="logo-clinica" src={ClinicaBlanco} style={{ 'color': '#fff' }} />
                    </a>
                </div>
                <div className="lista-registro">
                    {!imagen && (
                        <button onClick={() => handleButtonClick()}><Link to="/referir"><img alt="clinica" src={useradd} /></Link></button>
                    )}
                    {imagen && (
                        <>
                            <div style={{
                                width: "100%",
                                height: "30px",
                                backgroundColor: '#FFF'
                            }}>
                                <div style={{
                                    backgroundColor: '#10305b',
                                    width: "100%",
                                    height: "30px",
                                    borderBottomRightRadius: "30px"
                                }} />
                            </div>
                            <ButtonReferir />
                            <div style={{
                                width: "100%",
                                height: "30px",
                                backgroundColor: '#FFF'
                            }}>
                                <div style={{
                                    backgroundColor: '#10305b',
                                    width: "100%",
                                    height: "30px",
                                    borderTopRightRadius: "30px"
                                }} />
                            </div>
                        </>
                    )}
                    {!imagen1 && (
                        <button onClick={() => handleButtonClick1()}><Link to="/listado"><img alt="listado_" className="listado_" src={chart_line_white} /></Link></button>
                    )}
                    {imagen1 && (
                        <>
                            <div style={{
                                width: "100%",
                                height: "30px",
                                backgroundColor: '#FFF'
                            }}>
                                <div style={{
                                    backgroundColor: '#10305b',
                                    width: "100%",
                                    height: "30px",
                                    borderBottomRightRadius: "30px"
                                }} />
                            </div>
                            <ButtonListar />
                            <div style={{
                                width: "100%",
                                height: "30px",
                                backgroundColor: '#FFF'
                            }}>
                                <div style={{
                                    backgroundColor: '#10305b',
                                    width: "100%",
                                    height: "30px",
                                    borderTopRightRadius: "30px"
                                }} />
                            </div>
                        </>
                    )}
                </div>
                <div className="cerrarSesion">
                    <img className="img-cerrar" onClick={() => cerrarSesion('token','id_user','username','nombres','apellidos','password', 'super_user')} alt="cerrar" src={Logout} style={{ "width": "50px", "cursor": "pointer" }} />
                    <span style={{color: '#FFF'}}>Cerrar sesión</span>
                </div>
            </nav>
        </div>
    )
}
