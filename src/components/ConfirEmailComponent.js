import React from 'react'
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
export const ConfirEmailComponent = () => {
    return (
        <div>
            <div className="login-container">
                <div className="formulario">
                    <form>
                        <img className="logo_clinica" src={logo_clinica} />
                        <label>dakshda</label>
                        <input
                            type="text"
                            name="usuario"
                            placeholder="Usuario"
                            className="form-control"
                        />
                    </form>
                    <div className="container-logo">
                        <div className="logo">
                            <img src={liberate} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
