import React, { useState } from 'react'
import './header.css';
import { Link } from 'react-router-dom'
import useradd from '../image/Recursos-Femto/user-add.svg';
import chart_line_white from '../image/Recursos-Femto/chart-line-up-White.svg';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import user_add_blue from '../image/Recursos-Femto/user-add-Blue.svg';

function Button(){
    return(
        <button><Link to="/referir_paciente"><img className="img" src={user_add_blue}/></Link></button>
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
                <div className="container">
                    <a className="navbar-brand" href="">
                    <img src={logo_clinica} width="100" height="40" style={{'color': '#fff'}}/>
                    </a>
                    { !imagen && (
                        <button onClick={() => handleButtonClick()}><Link to="/referir_paciente"><img src={useradd}/></Link></button>
                    ) }
                    { imagen && (
                        <Button />
                    )}
                    <Link to="/tabla">
                        <button ><img src={chart_line_white}/></button>
                    </Link>
                </div>
            </nav>
        </div>
    )
}
