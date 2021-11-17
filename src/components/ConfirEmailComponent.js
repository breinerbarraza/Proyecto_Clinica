import React from 'react';
import TextField from '@mui/material/TextField';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
import { Link } from 'react-router-dom';
export const ConfirEmailComponent = () => {
    return (
        <div className="page-email1">
            <div className="email1-container">
                <Link to="/login"><i class="fas fa-home"></i></Link>
                <div className="formulario-email1">
                    <form className="_form-email1">
                        <img className="logo_clinica-email1" src={logo_clinica} alt="clinica"/>
                        <p className="p-email1">Confirma tu E-mail</p>
                        <TextField
                            type="email"
                            name="email"
                            placeholder="Escribe..."
                            label="Email"
                            required
                            className="form-control"
                            style={{marginBottom: "30px"}}
                            onChange={""}
                        />
                        <button type="submit" className="btn btn-primary">REGISTRARSE</button>
                    </form>
                </div>
                <div className="container-logo-email1">
                    <div className="logo-email1" alt="logo">
                        <img alt="clinica" src={liberate} />
                    </div>
                </div>
            </div>
        </div>
    )
}
