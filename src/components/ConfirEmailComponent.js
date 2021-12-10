import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import logo_clinica from "../image/Recursos-Femto/Logo Clinica.svg";
import liberate from "../image/Recursos-Femto/Liberate.png";
import { Link } from "react-router-dom";
import API from "../Utils/API";
import Swal from "sweetalert2";
export const ConfirEmailComponent = () => {
    const estado = {
        correo_electronico: "correo@gmail.com",
    };
    const [data_initial, setData_initial] = useState(estado);

    const handleInputChange = (e) => {
        setData_initial({
            ...data_initial,
            [e.target.name]: e.target.value,
        });
    };

    const handleInputSubmit = async (e) => {
        e.preventDefault();
        console.log(data_initial);
        await API.post(
            "api/usuarios/user/send_email/",
            JSON.stringify(data_initial)
        ).then((item) => {
            const respuesta = item.data;
            if (respuesta.mensaje) {
                return Swal.fire({
                    icon: "success",
                    title: "Mensaje!",
                    text: respuesta.mensaje,
                });
            } else {
                return Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: respuesta.error,
                });
            }
        });
    };

    return (
        <>
            <div className="div_container_email">
                <div className="page-email1">
                    <div className="email1-container">
                        <Link to="/login">
                            <i class="fas fa-home"></i>
                        </Link>
                        <div className="formulario-email1">
                            <form className="_form-email1" onSubmit={handleInputSubmit}>
                                <img
                                    className="logo_clinica-email1"
                                    src={logo_clinica}
                                    alt="clinica"
                                />
                                <p className="p-email1">Confirma tu e-mail</p>
                                <TextField
                                    type="email"
                                    name="correo_electronico"
                                    placeholder={data_initial.correo_electronico}
                                    label="Email"
                                    className="form-control"
                                    required
                                    style={{ marginBottom: "30px" }}
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <button type="submit" className="btn btn-primary">
                                    CONFIRMAR
                                </button>
                            </form>
                        </div>
                        <div className="container-logo-email1">
                            <div className="logo-email1" alt="logo">
                                <img alt="clinica" src={liberate} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="div_container_email_media">
                <div className="container-logo-email1">
                    <div className="logo-email1" style={{marginBottom:"250px"}} alt="logo">
                        <img alt="clinica" src={liberate} />
                    </div>
                </div>
                    <div className="email1-container">
                       {/* <Link to="/login">
                            <i class="fas fa-home"></i>
                                </Link>*/}
                        <div className="formulario-email1">
                            <form className="_form-email1" onSubmit={handleInputSubmit}>
                                <p className="p-email1">Confirma tu e-mail</p>
                                <TextField
                                    type="email"
                                    name="correo_electronico"
                                    placeholder={data_initial.correo_electronico}
                                    label="Email"
                                    className="form-control"
                                    required
                                    style={{ marginBottom: "30px" }}
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <button type="submit" className="btn btn-primary">
                                    CONFIRMAR
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
        </>
    );
};
