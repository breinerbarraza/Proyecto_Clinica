import React, { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import TextField from '@mui/material/TextField';

import { useParams } from 'react-router-dom'
import { FormControl } from '@mui/material';
import Swal from 'sweetalert2';

import API from '../Utils/API';

var moment = require('moment')

export const PagoComponent = () => {
    const { id } = useParams()
    const [pago_modal, setPagoModal] = useState(true);
    const [numero_pacientes, setNumeroPacientes] = useState("")
    const [valor_total, setValorTotal] = useState("")
    const [fechaConsignacion, setFechaConsignacion] = useState("")
    const [today, setToday] = useState(new Date())

    const cerrarModal = () => {
        setPagoModal(false);
        return window.location = "/listado_usuario";
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const obj = {
            id,
            numero_pacientes,
            valor_total,
            fecha_consignacion: fechaConsignacion,
        }    
        await API.post('api/usuarios/pagos/add_pagos/', JSON.stringify(obj))
        .then(({data})=>{
            const resp = data;
            if(resp.data){
                const mensaje = resp.data
                return Swal.fire({
                    icon: 'success',
                    text: mensaje,
                    position: 'center',
                    timer: 4200
                })
            }else{
                const error = resp.error;
                return Swal.fire({
                    icon: 'error',
                    position: 'center',
                    text: error,
                    timer: 3500
                })
            }
        }).catch(console.error)
    }
    
    
  return (
    <Modal isOpen={pago_modal} >
            <ModalHeader>
                <h5 className="add_meta_msg_">¡Modal de pago!</h5>
            </ModalHeader>
            <ModalBody>
                <div className="body_modal">
                   
                    <form>
                        <FormControl fullWidth id='modal'>
                            <FormControl fullWidth>
                                <TextField
                                id="numero_paciente"
                                type="number"
                                name="anio"
                                label="Numero de pacientes"
                                required
                                className="form-control RegistrarReferido"
                                style={{ marginBottom: "50px" }}
                                onChange={(e)=> setNumeroPacientes(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            </FormControl>

                            <FormControl fullWidth>
                                <TextField
                                id="valor_total"
                                type="number"
                                name="valor_total"
                                label="Valor"
                                required
                                className="form-control RegistrarReferido"
                                style={{ marginBottom: "50px" }}
                                onChange={(e)=> setValorTotal(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            </FormControl>

                            <FormControl fullWidth>
                                <TextField
                                InputProps={{inputProps: { max: moment(today).format('YYYY-MM-DD')} }}
                                id="fecha_consignacion"
                                type="date"
                                name="fecha_consignacion"
                                label="Fecha de consignacion"
                                required
                                className="form-control RegistrarReferido"
                                style={{ marginBottom: "50px" }}
                                onChange={(e)=> setFechaConsignacion(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            </FormControl>


                        </FormControl>
                    </form>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn" style={{background:"#02305b", color:"white"}} onClick={(e)=> handleSubmit(e)}>Pagar</button>
                <button className="btn btn" style={{background:"#02305b", color:"white"}} onClick={()=> cerrarModal()}>Cerrar</button>
            </ModalFooter>
        </Modal>
  )
}
