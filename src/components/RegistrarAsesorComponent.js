import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
import API from '../Utils/API'
export const RegistrarAsesorComponent = () => {
    const [asesor, setAsesor] = useState([])

    const hendleinput = (e) => {
        setAsesor({
            ...asesor,
            [e.target.name] : e.target.value
        })
    }
    console.log(asesor)

    const enviarDatos = (e) =>{
        e.preventDefault();
        API.post('api/', JSON.stringify(asesor))
        .then(item =>{
            const resp = item.data;
            console.log(resp)
        })
    }
    return (
        <div className="page-registrarefe">
            <div className="registrarefe-container">
                <div className="formulario-registrarefe">
                    <form onSubmit={enviarDatos} className="_form-registro" id="login-form">
                        <img alt="clinica" className="logo_clinica-registrarefe" src={logo_clinica} />
                        <h3 className="h3-registrarefe">¡Hola,</h3>
                        <p className="p-registrarefe"><b>Alberto Hernandez</b> quiere que hagas parte de su red de referidos! </p>
                        <TextField
                            type="text"
                            name="nombres"
                            placeholder="Escribe..."
                            label="Nombre"
                            required
                            className="form-control"
                            style={{ marginBottom: "30px" }}
                            onChange={hendleinput}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="text"
                            name="apellidos"
                            placeholder="Escribe..."
                            label="Apellidos"
                            required
                            className="form-control RegistrarReferido"
                            style={{ marginBottom: "30px" }}
                            onChange={hendleinput}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="email"
                            name="email"
                            placeholder="Escribe..."
                            label="E-mail"
                            required
                            className="form-control RegistrarReferido"
                            style={{ marginBottom: "30px" }}
                            onChange={hendleinput}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="text"
                            name="usuario"
                            placeholder="Escribe..."
                            label="Usuario"
                            required
                            className="form-control RegistrarReferido"
                            style={{ marginBottom: "30px" }}
                            onChange={hendleinput}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="password"
                            name="password"
                            placeholder="Escribe..."
                            label="Contraseña"
                            required
                            className="form-control RegistrarReferido"
                            style={{ marginBottom: "30px" }}
                            onChange={hendleinput}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            type="password"
                            name="password"
                            placeholder="Escribe..."
                            label="Confirmar contraseña"
                            required
                            className="form-control RegistrarReferido"
                            style={{ marginBottom: "30px" }}
                            onChange={hendleinput}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <button type="submit" className="btn btn-primary">REGISTRARSE</button>
                    </form>
                </div>
                <div className="container-logo-registrarefe">
                    <div className="logo-registrarefe">
                        <img alt="clinica" src={liberate} />
                    </div>
                </div>
            </div>
        </div>
    )
}
