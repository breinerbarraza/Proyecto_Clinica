import React from 'react';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
export const ConfirEmailComponent = () => {
    return (
        <div className="page-email1">
            <div className="email1-container">
                <div className="formulario-email1">
                    <form className="_form-email1">
                        <img className="logo_clinica-email1" src={logo_clinica} />
                        <p className="p-email1">Confirma tu E-amil</p>
                        
                                   
                                   
                                    <input
                                        type="email1"
                                        name="email1"
                                        placeholder="Email..."
                                        className="form-control"
                                    /><br />
                       
                     
                        
                        <button type="submit" className="btn btn-primary">REGISTRARSE</button>
                    </form>
                </div>
                <div className="container-logo-email1">
                    <div className="logo-email1">
                        <img src={liberate} />
                    </div>
                </div>
            </div>
        </div>
    )
}
