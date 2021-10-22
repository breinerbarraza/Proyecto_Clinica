import React from 'react';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
export const ConfirEmailComponent = () => {
    return (
        <div className="page-container">
            <div className="email-container">
                <div className="formulario-email">
                    <form className="email-form">
                        <img className="logo_clinica_email" src={logo_clinica} />

                        <p>Confirma tu e-mail</p>
                        <input
                            type="text"
                            name="email"
                            placeholder="Confrimar tu email..."
                            className="form-control email"
                        />
                        <button type="submit" >CONFIRMAR</button>
                    </form>
                </div>
                <div className="container-logo-email">
                    <div className="logo-email">
                        <img src={liberate} />
                    </div>
                </div>
            </div>
        </div>
    )
}
