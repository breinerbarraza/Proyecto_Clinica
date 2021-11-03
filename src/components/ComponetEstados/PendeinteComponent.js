import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FormularioEstado } from './FormularioEstado/FormularioEstado'
import API from '../../Utils/API'


export const PendienteComponent = () => {
    const [data_pendiente, setData_pendiente] = useState({})
    const { id } = useParams();
    console.log(id)
    useEffect(() => {
        API.get("api/referidos/" + id)
            .then(item => {
                setData_pendiente(item.data)
            })
    }, [])
    return (
        <>
            <div className="contendor-prequi">
                <div className="link-p">
                    <Link to="/listado" style={{ textDecoration: "none" }}><h3 className="h3-prequi"><i class="fas fa-angle-left" style={{ marginRight: "10px" }}></i>{data_pendiente.get_nombreCompleto}</h3></Link>
                    <p className="estado-p">{data_pendiente.estadoReferido}</p>
                </div>
                <div className="infomacion">
                    <div className="nacimiento">
                        <div className="nacimiento">
                            <p><b>Fecha de nacimiento: </b>{data_pendiente.fechaNacimiento} <b className="edad">Edad: </b>{data_pendiente.edad}</p>

                        </div>
                    </div>
                    <label className="label-info"><b>C.C: </b>{data_pendiente.numeroIdentificacion}</label><br />
                    <label className="label-info"><b>Correo: </b>{data_pendiente.correo_electronico}</label><br />
                    <label className="label-info"><b>Referio por: </b></label><br />
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
                                            placeholder="Escribe..."
                                            label="Pròxima gestiòn"
                                            className="form-control RegistrarReferido"
                                            style={{ marginBottom: "30px" }}
                                            onChange={""}
                                        />
                                        <TextField
                                            textarea
                                            type="text"
                                            name="comentario"
                                            placeholder="Escribe..."
                                            label="Comentario"
                                            multiline
                                            rows={4}
                                            className="form-control"
                                            style={{ marginBottom: "30px" }}
                                            onChange={""}
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
                            <form>
                                <FormularioEstado />
                                <div className="form-medico">
                                    <TextField
                                        select
                                        name="mdico"
                                        label="Medico"
                                        className="form-control "
                                        style={{ marginBottom: "30px" }}
                                        onChange={""}
                                    >
                                        <option value="">Choose one option</option>
                                        <option value="3">03</option>
                                        <option value="6">06</option>
                                        <option value="9">09</option>
                                        <option value="12">12</option>
                                        <option value="16">16</option>
                                        <option value="18">18</option>
                                    </TextField>
                                </div>

                                <div className="prequi-button">
                                    <button type="submit" className="prequi-b">ASIGNAR</button>
                                </div>
                            </form>
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
