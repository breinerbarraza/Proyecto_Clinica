import React, { useState } from 'react'
import './header.css';
import { Link } from 'react-router-dom'
/* Logo */
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
/*Logo de referir, Listado (blanco y azul)*/ 
import useradd from '../image/Recursos-Femto/user-add.svg';
import chart_line_white from '../image/Recursos-Femto/chart-line-up-White.svg';
import user_add_blue from '../image/Recursos-Femto/user-add-Blue.svg';
import chart_line_up_white from '../image/Recursos-Femto/chart-line-up.svg';

function ButtonReferir(){
    return(
        <button>
            <Link to="/referir_paciente">
                <img className="img" src={user_add_blue}/>
            </Link>
        </button>
    ) 
}
function ButtonListar(){
    return(
        <button >
            <Link to="/listadoReferido">
                <img src={chart_line_up_white}/>
            </Link>
        </button>
    )
}

export const HeaderComponent = () => {

    let estado = false;
    const [imagen, setImagen] = useState(estado);
    
    const handleButtonClick = (e)=>{
        setImagen(true);
    }

    return (
        <div className="header">
            <nav className="nav-header">
                    <a className="navbar-brand" href="">
                    <img src={logo_clinica} width="100" height="40" style={{'color': '#fff'}}/>
                    </a>
                    { !imagen && (
                        <button onClick={() => handleButtonClick()}><Link to="/referir_paciente"><img src={useradd}/></Link></button>
                    ) }
                    { imagen && (
                        <ButtonReferir />
                    )}
                    { !imagen && (
                        <button onClick={() => handleButtonClick()}><Link to="/referir_paciente"><img src={chart_line_white}/></Link></button>
                    ) }
                    { imagen && (
                        <ButtonListar />
                    )}
                    
            </nav>
        </div>
    )
}
