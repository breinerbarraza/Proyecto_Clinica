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
    const [estadoEmpleado, setEstadoEmpleado] = useState(false)
    const [data_estado, setData_estado] = useState([])
    const [cmbListado, setCmbListado] = useState([]);
    const [data_temporal_pendiente, setData_temporal_pendiente] = useState({})
    const [observacion_, setObservacion_] = useState({});
    const [observacion_gestion, setObservacion_gestion] = useState([]);
    const [observacion_operado, setObservacion_operado ] = useState([]);
    const { id } = useParams();

    useEffect(() => {

        API.get("api/referidos/" + id)
            .then(item => {
                setData_pendiente(item.data)
            })
        
        API.get(`api/referidos/get_observacion_descartado/?id_referido=${id}`)
        .then( data => {
            const resp = data.data;
            setObservacion_(resp.observacion)
        } )

        API.get(`api/referidos_cambio_estado/obtener_observacion_gestion/?id_referido=${id}`)
        .then( data => {
            const resp = data.data;
            setObservacion_gestion(resp)
        })

        API.get(`api/referidos_cambio_estado/get_observacion_operado/?id_referido=${id}`)
        .then( data => {
            const resp = data.data;
            setObservacion_operado(resp)

        })

    }, [id]);
    
    useEffect(() => {
        const id = localStorage.getItem('id_user')

        API.get(`api/referidos/comprobar_empleado/?id_empleado=${id}`)
            .then(data => {
                console.log(data.data)
                const respuesta = data.data;
                if (respuesta.msg) {
                    setEstadoEmpleado(true);
                } else {
                    setEstadoEmpleado(false);
                }
            })

        API.get("api/usuarios/user/grupo_medico")
            .then(data => {
                setData_medicos(data.data)
            })
        API.get("api/configuracion/estadoReferido/")
            .then(data => {
                setCmbListado(data.data);
            })
    }, [data, data_pendiente]);

    const handleClickPendiente = async (e) => {
        e.preventDefault();
        data.referido = id;
        console.log(data)
        await API.post('api/referidos_cambio_estado/register-estado-pendiente/', JSON.stringify(data))
            .then(data => {
                const resp = data.data;
                if (resp) {
                    return Swal.fire({
                        icon: 'success',
                        text: resp.mensaje,
                    })
                } else {
                    return Swal.fire({
                        icon: 'error',
                        text: 'Ha ocurrido un error',
                    })
                }
            })
    }

    const handleClickProgramado = async (e) => {
        e.preventDefault();
        data.referido = id;
        console.log(data)
        await API.post('api/referidos_cambio_estado/register-estado-programado/', JSON.stringify(data))
            .then(data => {
                const resp = data.data;
                if (resp) {
                    return Swal.fire({
                        icon: 'success',
                        text: resp.mensaje,
                    })
                } else {
                    return Swal.fire({
                        icon: 'error',
                        text: 'Ha ocurrido un error',
                    })
                }
            })
    }

    const handleClickPrequirurgico = async (e) => {
        e.preventDefault();
        data.referido = id;
        console.log(data)
        await API.post('api/referidos_cambio_estado/register-estado-prequirurgico/', JSON.stringify(data))
            .then(data => {
                const resp = data.data;
                if (resp) {
                    return Swal.fire({
                        icon: 'success',
                        text: resp.mensaje,
                    })
                } else {
                    return Swal.fire({
                        icon: 'error',
                        text: 'Ha ocurrido un error',
                    })
                }
            })
            .catch(console.error)
    }

    const handleChangeEstado = (e) => {
        e.preventDefault();
        data_estado.id_user_referido = id;
        data_estado.nombre = data_pendiente.get_nombreCompleto
        if (data_temporal_pendiente.estado_referido == "Descartado") {
            const observacion = document.querySelector("#observacion")
            if (observacion.value == "") {
                return alert("Porfavor llene la observacion")
            }
            data_estado.observacion = observacion.value;
        }
        if(data_temporal_pendiente.estado_referido == "Operado"){
            const ordenServicio = document.querySelector("#ordenServicio")
            if(ordenServicio.value != ""){
                data_estado.ordenServicio = ordenServicio.value;
            }
        }
        API.put('api/referidos/updated_estado/', JSON.stringify(data_estado))
            .then(({ data }) => {
                if (data.msg) {
                    return Swal.fire({
                        icon: 'success',
                        text: data.msg,
                        confirmButtonText: "Ok"
                    }).then((result) => {
                        if (result.isConfirmed) window.location = "/lista/estado/" + id;
                    })
                } else {
                    return Swal.fire({
                        icon: 'error',
                        text: data.error,
                    })
                }
            })
    }

    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })

    }

    const handleInput2 = (e) => {
        const select_estado = document.querySelector(".select-estado")
        const selected = select_estado.options[select_estado.selectedIndex].text;
        console.log(selected)
        setData_temporal_pendiente({ 'estado_referido': selected })
        setData_estado({
            ...data_estado,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div className="estados_">
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
                        {
                            !estadoEmpleado && (
                                <form onSubmit={handleChangeEstado}>
                                    <select className="select-estado" name="estadoReferido" onChange={handleInput2}>
                                        <option selected="selected">--CAMBIE EL ESTADO--</option>
                                        {
                                            cmbListado.map((item) => {
                                                return <option key={item.id} value={item.id} style={{ backgroundColor: item.color }} >{item.descripcion}</option>
                                            })
                                        }
                                    </select>
                                    <button type="submit" className="btn btn-primary change_estado" title="Actualizar Estado" ><i class="fas fa-edit"></i></button>
                                </form>
                            )
                        }

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
                        <p><b>Referido por: </b>{(data_pendiente.usuarioRegistro) ? data_pendiente.usuarioRegistro : data_pendiente.empleadoInicial} </p>
                    </div>
                    {
                        data_temporal_pendiente.estado_referido === "Pendiente" && (
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
                        )

                    }

                    {data_pendiente.estadoReferido === "Pendiente" && !data_temporal_pendiente.estado_referido && (
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

                    {
                        data_temporal_pendiente.estado_referido === "Operado" && (
                            <>
                                <h5 className="prequi-p" style={{ color: "#1c3678" }}><b>· N° Orden servicio</b></h5>
                                {/* <p>El paciente ha sido operado</p> */}
                                <TextField
                                    type="number"
                                    name="ordenServicio"
                                    id="ordenServicio"
                                    // value={dataForm.cantidad}
                                    label="N° Orden Servicio"
                                    required
                                    style={{ marginTop: "10px", width:'230px'}}
                                    onChange={handleInput2}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </>
                        )
                    }

                    {data_pendiente.estadoReferido === "Operado" && !data_temporal_pendiente.estado_referido && (
                        <>
                            <h5 className="prequi-p" style={{ color: "#1c3678" }}><b>· Comentarios</b></h5>
                            {/* <p>El paciente ha sido operado</p> */}
                            {
                                observacion_operado.length > 0 && (
                                    <>
                                    {
                                        observacion_operado.map(item => {
                                        return <p>Orden servicio: <b>{item.ordenServicio}</b></p>
                                    })
                                 }
                                 </>
                            
                                )
                            }
                        </>
                    )}

                    {
                        data_temporal_pendiente.estado_referido === "En Gestion" && (
                            <>
                                <h5 className="prequi-p" style={{ color: "#1c3678" }}><b >· Comentarios</b></h5>
                                
                            </>
                        )
                    }

                    {data_pendiente.estadoReferido === "En Gestion" && !data_temporal_pendiente.estado_referido && (
                        <>
                            <h5 className="prequi-p" style={{ color: "#1c3678" }}><b >· Comentarios</b></h5>
                            <label className="label-info-gestion"><b>Próxima gestion:</b></label>
                            {
                                observacion_gestion.length > 0 && (
                                    <ul>
                                         {
                                            observacion_gestion.map(item => {
                                                return <li>{item.observaciones}</li>
                                            })
                                        }
                                    </ul>
                                )
                            }
                           
                        </>
                    )}

                    {
                        data_temporal_pendiente.estado_referido === "Descartado" && (
                            <>
                                <h5 className="prequi-p" style={{ color: "#1c3678" }}><b>· Comentarios</b></h5>

                                <TextField
                                    textarea
                                    type="text"
                                    name="observacion"
                                    id="observacion"
                                    placeholder="Escribe..."
                                    label="Comentario"
                                    required
                                    multiline
                                    rows={4}
                                    className="form-control"
                                    style={{ marginBottom: "30px", width: '350px' }}
                                    onChange={handleInput2}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />


                            </>
                        )
                    }


                    {data_pendiente.estadoReferido === "Descartado" && !data_temporal_pendiente.estado_referido && (
                        <>
                            <h5 className="prequi-p" style={{ color: "#1c3678" }}><b>· Comentarios</b></h5>
                            <p>{observacion_}</p>
                        </>
                    )}

                    {
                        data_temporal_pendiente.estado_referido === "Programado" && (
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
                                                        onChange={handleInput}
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
                                                        onChange={handleInput}
                                                        className="form-control RegistrarReferido"
                                                        style={{ marginBottom: "30px" }}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                    />
                                                </div>

                                                <div className="form-hora">
                                                    <TextField
                                                        type="text"
                                                        name="direccion"
                                                        placeholder="Escribe..."
                                                        label="Direccion"
                                                        onChange={handleInput}
                                                        required
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
                                                        onChange={handleInput}
                                                    >
                                                        {
                                                            data_medicos.map(item => {
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
                        )
                    }

                    {data_pendiente.estadoReferido === "Programado" && !data_temporal_pendiente.estado_referido && (
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
                                                    onChange={handleInput}
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
                                                    onChange={handleInput}
                                                    className="form-control RegistrarReferido"
                                                    style={{ marginBottom: "30px" }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </div>

                                            <div className="form-hora">
                                                <TextField
                                                    type="text"
                                                    name="direccion"
                                                    placeholder="Escribe..."
                                                    label="Direccion"
                                                    onChange={handleInput}
                                                    required
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
                                                    onChange={handleInput}
                                                >
                                                    {
                                                        data_medicos.map(item => {
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


                    {
                        data_temporal_pendiente.estado_referido === "Pre-quirúrgico" && (
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
                                                    onChange={handleInput}
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
                                                    onChange={handleInput}
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
                                                    type="text"
                                                    name="direccion"
                                                    placeholder="Escribe..."
                                                    label="Direccion"
                                                    onChange={handleInput}
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
                        )
                    }


                    {data_pendiente.estadoReferido === "Pre-quirúrgico" && !data_temporal_pendiente.estado_referido && (
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
                                                onChange={handleInput}
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
                                                onChange={handleInput}
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
                                                    type="text"
                                                    name="direccion"
                                                    placeholder="Escribe..."
                                                    label="Direccion"
                                                    onChange={handleInput}
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
            </div>



            {/* MEDIA QUERYYYYYYYY */}

            <div className='estadosMedia'>
                <div className="contendor-prequi_">
                    <div className="link-p_">
                        <Link to="/listado" style={{ textDecoration: "none" }}><h3 className="h3-prequi_"><i className="fas fa-angle-left" style={{ marginRight: "10px" }}></i>{data_pendiente.get_nombreCompleto}
                            <Chip
                                label={`• ${data_pendiente.estadoReferido}`}
                                style={{
                                    marginLeft: "1px",
                                    backgroundColor: data_pendiente.color_estado
                                }}
                            /></h3></Link>

                        <form onSubmit={handleChangeEstado}>
                            <select className="select-estado_" name="estadoReferido" onChange={handleInput}>
                                <option selected="selected">--CAMBIE EL ESTADO--</option>
                                {
                                    cmbListado.map((item) => {
                                        return <option key={item.id} value={item.id} style={{ backgroundColor: item.color }} >{item.descripcion}</option>
                                    })
                                }
                            </select>
                            <button type="submit" className="btn btn-primary change_estado_" title="Actualizar Estado" ><i class="fas fa-edit"></i></button>
                        </form>
                    </div>
                    <div className="infomacion_">
                        <div className="nacimiento">
                            <div className="nacimiento">
                                <p><b>Fecha de nacimiento: </b>{data_pendiente.fechaNacimiento}</p>
                                <p><b className="edad_"> Edad: </b>{data_pendiente.edad} años</p>
                            </div>
                        </div>
                        <p><b>C.C: </b>{data_pendiente.numeroIdentificacion}</p>
                        <p><b>Correo: </b>{data_pendiente.correo_electronico}</p>
                        <p><b>Referido por: </b>{(data_pendiente.usuarioRegistro) ? data_pendiente.usuarioRegistro : data_pendiente.empleadoInicial} </p>
                    </div>

                    {data_pendiente.estadoReferido === "Pendiente" && (
                        <div className="comentario_">
                            <p className="prequi-p"><h5>· Comentario</h5></p>
                            <div className="form-pendiente">
                                <form onSubmit={handleClickPendiente}>
                                    <div className="form-f-pendiente">
                                        <div className="form-fecha-pendiente_">
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
                                    <div className="pendiente-button_pendiente">
                                        <button type="submit" className="prequi-b_" style={{ marginLeft: "-0px" }}>ASIGNAR</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {data_pendiente.estadoReferido === "Operado" && (
                        <div className="comentario_">
                            <h5 className="prequi-p" style={{ color: "#1c3678" }}><b>· Comentarios</b></h5>
                            <p>El paciente ha sido operado</p>
                        </div>
                    )}
                    {data_pendiente.estadoReferido === "En Gestion" && (
                        <div className="comentario_">
                            <h5 className="prequi-p" style={{ color: "#1c3678" }}><b >· Comentarios</b></h5>
                            <label className="label-info-gestion"><b>Próxima gestion:</b></label>
                            <p>El referido no tenía disponibilidad para la gestión, pidío que se le contrate en 1 semana para recibir la</p>
                            <p> infromación con respecto al procedimiento refractivo. </p>
                        </div>
                    )}
                    {data_pendiente.estadoReferido === "Descartado" && (
                        <div className="comentario_">
                            <h5 className="prequi-p" style={{ color: "#1c3678" }}><b>· Comentarios</b></h5>
                            <p>Después de realizados los pre-quirúgicos el paciente no es apto para realizar el procedimiento</p>
                        </div>
                    )}
                    {data_pendiente.estadoReferido === "Programado" && (
                        <div className="comentario_">
                            <p className="prequi-p"><b>· Definir fecha de procedimiento</b></p>
                            <div className="form-prequi">
                                <div>
                                    <form onSubmit={handleClickProgramado}>
                                        <div className="form-f-h_">
                                            <div className="form-fecha_">
                                                <TextField
                                                    type="date"
                                                    name="fecha"
                                                    placeholder="Escribe..."
                                                    label="Fecha"
                                                    onChange={handleInput}
                                                    className="form-control RegistrarReferido"
                                                    style={{ marginBottom: "30px" }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </div>
                                            <div className="form-hora_">
                                                <TextField
                                                    type="time"
                                                    name="hora"
                                                    placeholder="Escribe..."
                                                    label="Hora"
                                                    onChange={handleInput}
                                                    className="form-control RegistrarReferido"
                                                    style={{ marginBottom: "30px" }}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </div>

                                        </div>
                                        <div className="form-medico_">
                                            <FormControl fullWidth >
                                                <InputLabel shrink id="demo-simple-select-standard-label">Medico</InputLabel>
                                                <Select
                                                    name="medico"
                                                    label="Medico"
                                                    id="demo-simple-select-standard"
                                                    onChange={handleInput}
                                                >
                                                    {
                                                        data_medicos.map(item => {
                                                            return <MenuItem key={item.id} value={item.id} >{item.first_name} {item.last_name}</MenuItem>
                                                        })
                                                    }

                                                </Select>
                                            </FormControl>
                                        </div>

                                        <div className="prequi-button_">
                                            <button type="submit" className="prequi-b">ASIGNAR</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    {data_pendiente.estadoReferido === "Pre-quirúrgico" && (
                        <div className="comentario_">
                            <p className="prequi-p"><b>· Definir fecha de pre-quirúgico</b></p>
                            <div className="form-prequi">
                                <form onSubmit={handleClickPrequirurgico}>
                                    <div className="form-f-h_">
                                        <div className="form-fecha_">

                                            <TextField
                                                type="date"
                                                name="fecha"
                                                placeholder="Escribe..."
                                                label="Fecha"
                                                onChange={handleInput}
                                                required
                                                className="form-control RegistrarReferido"
                                                style={{ marginBottom: "30px" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>
                                        <div className="form-hora_">
                                            <TextField
                                                type="time"
                                                name="hora"
                                                placeholder="Escribe..."
                                                label="Hora"
                                                onChange={handleInput}
                                                required
                                                className="form-control RegistrarReferido"
                                                style={{ marginBottom: "30px" }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </div>

                                    </div>
                                    <div className="prequi-button_">
                                        <button type="submit" className="prequi-b_">ASIGNAR</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </>
    )
}
