import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ClinicaBlanco from '../image/Recursos-Femto2/ClinicaBlanco.svg';
import useradd from '../image/Recursos-Femto/user-add.svg';
import chart_line_white from '../image/Recursos-Femto/chart-line-up-White.svg';
import user_add_blue from '../image/Recursos-Femto/user-add-Blue.svg';
import chart_line_up_white from '../image/Recursos-Femto/chart-line-up.svg';
import Logout from '../image/Recursos-Femto2/Logout.svg'

function ButtonReferir(){
    return(
        <button>
            <Link to="/referir">
                <img alt="clinica" className="imgActiva" src={user_add_blue}/>
            </Link>
        </button>
    ) 
}
function ButtonListar(){
    return(
        <button >
            <Link to="/listado">
                <img alt="clinica" className="imgInactiva" src={chart_line_up_white}/>
            </Link>
        </button>
    )
}
export const HeaderComponent = ({users, dashboard}) => {

    const cerrarSesion = (token, idUser, nombres, apellidos)=>{
        localStorage.removeItem(token);
        localStorage.removeItem(idUser);
        localStorage.removeItem(nombres);
        localStorage.removeItem(apellidos);
        window.location = "/";
    }

    let estado = users;
    const [imagen, setImagen] = useState(estado);

    let estado1 = dashboard;
    const [imagen1, setImagen1] = useState(estado1);

    const handleButtonClick = (e)=>{
        setImagen(true);
    }

    const handleButtonClick1 = (e)=>{
        setImagen1(true);
    }

    return (
        <div className="header">
            <nav className="nav-header">
                <div className="imgLogo">
                    <a className="navbar-brand" href="/">
                    <img alt="clinica" className="logo-clinica" src={ClinicaBlanco} style={{'color': '#fff'}}/>
                    </a>
                </div>
                <div className="lista-registro">
                    { !imagen && (
                        <button onClick={() => handleButtonClick()}><Link to="/referir"><img alt="clinica" src={useradd}/></Link></button>
                    ) }
                    { imagen && (
                        <ButtonReferir />
                    )}
                    { !imagen1 && (
                        <button onClick={() => handleButtonClick1()}><Link to="/listado"><img alt="clinica" src={chart_line_white}/></Link></button>
                    )}
                    { imagen1 && (
                        <ButtonListar />
                    )}
                </div>
                <div className="cerrarSesion">
                    <img className="img-cerrar" onClick={()=>cerrarSesion('token', 'idUser', 'nombres', 'apellidos')} alt="cerrar" src={Logout} style={{"width":"50px","cursor":"pointer"}}/>
            
                </div>
            </nav>
        </div>
    )
}
