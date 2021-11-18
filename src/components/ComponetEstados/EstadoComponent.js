import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
//import { FormularioEstado } from './FormularioEstado/FormularioEstado'
import API from '../../Utils/API'
import { HeaderComponent } from '../HeaderComponent'
import Chip from '@mui/material/Chip';
import Swal from 'sweetalert2';

export const EstadoComponent = () => {
    const [data_pendiente, setData_pendiente] = useState({})
    const [data, setData] = useState({})
    const [data_medicos, setData_medicos] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        API.get("api/referidos/" + id)
            .then(item => {
                console.log(item.data)
                setData_pendiente(item.data)
            })
    }, [id]);

    useEffect(()=>{
        API.get("api/usuarios/user/grupo_medico")
        .then( data => {
            setData_medicos(data.data)
        })
    }, []);


    const handleClickPendiente = async(e)=>{
        e.preventDefault();
        data.referido = id;
        console.log(data)
        await API.post('api/referidos_cambio_estado/register-estado-pendiente/', JSON.stringify(data))
        .then( data => {
            const resp = data.data;
            if(resp){
                return Swal.fire({
                    icon: 'success',
                    title: 'Mensaje!',
                    text: resp.mensaje,
                })
            }else{
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ha ocurrido un error',
                })
            }
        })
    }

    const handleClickProgramado =async(e)=>{
        e.preventDefault();
        data.referido = id;
        console.log(data)
        await API.post('api/referidos_cambio_estado/register-estado-programado/', JSON.stringify(data))
        .then( data => {
            const resp = data.data;
            if(resp){
                return Swal.fire({
                    icon: 'success',
                    title: 'Mensaje!',
                    text: resp.mensaje,
                })
            }else{
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ha ocurrido un error',
                })
            }
        })
    }

    const handleClickPrequirurgico = async(e)=>{
        e.preventDefault();
        data.referido = id;
        await API.post('api/referidos_cambio_estado/register-estado-prequirurgico/', JSON.stringify(data))
        .then( data => {
            const resp = data.data;
            if(resp){
                return Swal.fire({
                    icon: 'success',
                    title: 'Mensaje!',
                    text: resp.mensaje,
                })
            }else{
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ha ocurrido un error',
                })
            }
        })
        .catch(console.error)
    }

    const handleInput =(e)=>{
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    return (
        <>
            <HeaderComponent users={false} dashboard={true} />
            <div className="contendor-prequi">
                <div className="link-p">
                    <Link to="/listado" style={{ textDecoration: "none" }}><h3 className="h3-prequi"><i className="fas fa-angle-left" style={{ marginRight: "10px" }}></i>{data_pendiente.get_nombreCompleto}</h3></Link>
                    <Chip 
                        label={`• ${data_pendiente.estadoReferido}`}
                        style={{
                            marginLeft: "20px",
                            backgroundColor: data_pendiente.color_estado
                        }}
                    />
                </div>
                <div className="infomacion">
                    <div className="nacimiento">
                        <div className="nacimiento">
                            <p><b>Fecha de nacimiento: </b>{data_pendiente.fechaNacimiento}
                            <b className="edad"> Edad: </b>{data_pendiente.edad} años</p>

                        </div>
                    </div>
                    <p><b>C.C: </b>{data_pendiente.numeroIdentificacion}</p>
                    <p><b>Correo: </b>{data_pendiente.correo_electronico}</p>
                    <p><b>Referido por: </b>{ (data_pendiente.usuarioRegistro) ? data_pendiente.usuarioRegistro : data_pendiente.empleadoInicial } </p>
                </div>

                {data_pendiente.estadoReferido === "Pendiente" && (
                    <>
                        <p className="prequi-p"><h5>· Comentario</h5></p>
                        <div className="form-pendiente">
                            <form onSubmit={handleClickPendiente}>
                                <div className="form-f-pendiente">
                                    <div className="form-fecha-pendiente">
                                        <TextField
                                            type="date"
                                            name="fecha"
                                            label="Próxima gestión"
                                            required
                                            className="form-control RegistrarReferido"
                                            style={{ marginBottom: "30px" }}
                                            onChange={handleInput}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            textarea
                                            type="text"
                                            name="comentario"
                                            placeholder="Escribe..."
                                            label="Comentario"
                                            required
                                            multiline
                                            rows={4}
                                            className="form-control"
                                            style={{ marginBottom: "30px" }}
                                            onChange={handleInput}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="pendiente-button">
                                    <button type="submit" className="prequi-b">ASIGNAR</button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
                {data_pendiente.estadoReferido === "Operado" && (
                    <>
                        <h5 className="prequi-p" style={{color:"#1c3678"}}><b>· Comentarios</b></h5>
                        <p>El paciente ha sido operado</p>
                    </>
                )}
                {data_pendiente.estadoReferido === "En Gestion" && (
                    <>
                        <h5 className="prequi-p" style={{color:"#1c3678"}}><b >· Comentarios</b></h5>
                        <label className="label-info-gestion"><b>Próxima gestion:</b></label>
                        <p>El referido no tenía disponibilidad para la gestión, pidío que se le contrate en 1 semana para recibir la</p>
                        <p> infromación con respecto al procedimiento refractivo. </p>
                    </>
                )}
                {data_pendiente.estadoReferido === "Descartado" && (
                    <>
                        <h5 className="prequi-p" style={{color:"#1c3678"}}><b>· Comentarios</b></h5>
                        <p>Después de realizados los pre-quirúgicos el paciente no es apto para realizar el procedimiento</p>
                    </>
                )}
                {data_pendiente.estadoReferido === "Programado" && (
                    <>
                        <p className="prequi-p"><b>· Definir fecha de procedimiento</b></p>
                        <div className="form-prequi">
                            <div>
                            <form onSubmit={handleClickProgramado}>
                                <div className="form-f-h">
                                    <div className="form-fecha">
                                        <TextField
                                            type="date"
                                            name="fecha"
                                            placeholder="Escribe..."
                                            label="Fecha"      
                                            onChange= {handleInput}                         
                                            className="form-control RegistrarReferido"
                                            style={{ marginBottom: "30px" }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                    <div className="form-hora">
                                        <TextField
                                            type="time"
                                            name="hora"
                                            placeholder="Escribe..."
                                            label="Hora"
                                            onChange= {handleInput}   
                                            className="form-control RegistrarReferido"
                                            style={{ marginBottom: "30px" }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>

                                </div>
                                <div className="form-medico">
                                    <FormControl fullWidth >
                                        <InputLabel shrink id="demo-simple-select-standard-label">Medico</InputLabel>
                                        <Select
                                            name="medico"
                                            label="Medico"
                                            id="demo-simple-select-standard"
                                            onChange= {handleInput}   
                                            >
                                            {
                                                data_medicos.map(item =>{
                                                    return <MenuItem key={item.id} value={item.id} >{item.first_name} {item.last_name}</MenuItem>
                                                })
                                            }

                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="prequi-button">
                                    <button type="submit" className="prequi-b">ASIGNAR</button>
                                </div>
                            </form>
                            </div>
                        </div>
                    </>
                )}
                {data_pendiente.estadoReferido === "Pre-quirúrgico" && (
                    <>
                        <p className="prequi-p"><b>· Definir fecha de pre-quirúgico</b></p>
                        <div className="form-prequi">
                            <form onSubmit={handleClickPrequirurgico}>
                            <div className="form-f-h">
                                <div className="form-fecha">

                                    <TextField
                                        type="date"
                                        name="fecha"
                                        placeholder="Escribe..."
                                        label="Fecha"
                                        onChange= {handleInput}   
                                        required
                                        className="form-control RegistrarReferido"
                                        style={{ marginBottom: "30px" }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                                <div className="form-hora">
                                    <TextField
                                        type="time"
                                        name="hora"
                                        placeholder="Escribe..."
                                        label="Hora"
                                        onChange= {handleInput}   
                                        required
                                        className="form-control RegistrarReferido"
                                        style={{ marginBottom: "30px" }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>

                                </div>
                                <div className="prequi-button">
                                    <button type="submit" className="prequi-b">ASIGNAR</button>
                                </div>
                            </form>
                        </div>
                    </>
                )}

            </div>
        </>
    )
}
