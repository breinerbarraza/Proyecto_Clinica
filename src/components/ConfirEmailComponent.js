import React from 'react';
import './ConfirmarEmail.css';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
export const ConfirEmailComponent = () => {
    return (
        <div className="page-container">
            <div className="login-container">
                <div className="formulario">
                    <form>
                        <img className="logo_clinica" src={logo_clinica} />

                        <p>Confirma tu e-mail</p>
                        <input
                            type="text"
                            name="email"
                            placeholder="Confrimar tu email..."
                            className="form-control"
                        />
                        <button type="submit" >CONFIRMAR</button>
                    </form>
                </div>
                <div className="container-logo">
                    <div className="logo">
                        <img src={liberate} />
                    </div>
                </div>
            </div>
        </div>
    )
}
