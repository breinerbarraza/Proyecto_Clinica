import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FormularioEstado } from './FormularioEstado/FormularioEstado'
import API from '../../Utils/API'
import { HeaderComponent } from '../HeaderComponent'
import Chip from '@mui/material/Chip';

export const PendienteComponent = () => {
    const [data_pendiente, setData_pendiente] = useState({})
    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        API.get("api/referidos/" + id)
            .then(item => {
                console.log(item.data)
                setData_pendiente(item.data)
            })
    }, [])
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
                            <p><b>Fecha de nacimiento: </b>{data_pendiente.fechaNacimiento} <b className="edad">Edad: </b>{data_pendiente.edad}</p>

                        </div>
                    </div>
                    <p><b>C.C: </b>{data_pendiente.numeroIdentificacion}</p>
                    <p><b>Correo: </b>{data_pendiente.correo_electronico}</p>
                    <p><b>Referido por: </b></p>
                </div>

                {data_pendiente.estadoReferido === "Pendiente" && (
                    <>
                        <p className="prequi-p"><h5>· Comentario</h5></p>
                        <div className="form-pendiente">
                            <form>
                                <div className="form-f-pendiente">
                                    <div className="form-fecha-pendiente">
                                        <TextField
                                            type="date"
                                            name="fecha"
                                            label="Pròxima gestiòn"
                                            required
                                            className="form-control RegistrarReferido"
                                            style={{ marginBottom: "30px" }}
                                            onChange={""}
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
                                            onChange={""}
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
                        <h5 className="prequi-p"><b>· Comentarios</b></h5>
                        <p>El paciente ha sido operado</p>
                    </>
                )}
                {data_pendiente.estadoReferido === "En Gestion" && (
                    <>
                        <h5 className="prequi-p"><b>· Comentarios</b></h5>
                        <label className="label-info-gestion"><b>Pròxima gestion:</b></label>
                        <p>El referido no tenìa disponibilidad para la gestiòn, pidìo que se le contrate en 1 semana para recibir la</p>
                        <p> infromaciòn con respecto al procedimiento refractivo. </p>
                    </>
                )}
                {data_pendiente.estadoReferido === "Descartado" && (
                    <>
                        <h5 className="prequi-p"><b>· Comentarios</b></h5>
                        <p>Despuès de realizados los pre-quirùgicos el paciente no es apto para realizar el procedimiento</p>
                    </>
                )}
                {data_pendiente.estadoReferido === "Programado" && (
                    <>
                        <p className="prequi-p"><b>· Definir fecha de procedimiento</b></p>
                        <div className="form-prequi">
                            <div>
                                <FormularioEstado />
                                <div className="form-medico">
                                    <FormControl fullWidth >
                                        <InputLabel shrink id="demo-simple-select-standard-label">Medico</InputLabel>
                                        <Select
                                            name="medico"
                                            labelId="demo-simple-select-standard-label"
                                            id="demo-simple-select-standard"
                                            label="Medico"
                                        >
                                            <MenuItem >dsfgdsf</MenuItem>

                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="prequi-button">
                                    <button type="submit" className="prequi-b">ASIGNAR</button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {data_pendiente.estadoReferido === "Pre-quirúrgico" && (
                    <>
                        <p className="prequi-p"><b>· Definir fecha de pre-quirùgico</b></p>
                        <div className="form-prequi">
                            <form>
                                <FormularioEstado />
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
