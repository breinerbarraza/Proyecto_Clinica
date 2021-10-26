import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import useradd from '../image/Recursos-Femto/user-add.svg';
import chart_line_white from '../image/Recursos-Femto/chart-line-up-White.svg';
import user_add_blue from '../image/Recursos-Femto/user-add-Blue.svg';
import chart_line_up_white from '../image/Recursos-Femto/chart-line-up.svg';

function ButtonReferir(){
    return(
        <button>
            <Link to="/referir">
                <img className="img" src={user_add_blue}/>
            </Link>
        </button>
    ) 
}
function ButtonListar(){
    return(
        <button >
            <Link to="/listado">
                <img className="imglista" src={chart_line_up_white  }/>
            </Link>
        </button>
    )
}

export const HeaderComponent = ({users, dashboard}) => {

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
                    <a className="navbar-brand" href="">
                    <img src={logo_clinica} width="100" height="40" style={{'color': '#fff'}}/>
                    </a>
                    { !imagen && (
                        <button onClick={() => handleButtonClick()}><Link to="/referir"><img src={useradd}/></Link></button>
                    ) }
                    { imagen && (
                        <ButtonReferir />
                    )}
                    { !imagen1 && (
                        <button onClick={() => handleButtonClick1()}><Link to="/listado"><img src={chart_line_white}/></Link></button>
                    ) }
                    { imagen1 && (
                        <ButtonListar />
                    )}
                    
            </nav>
        </div>
    )
}
