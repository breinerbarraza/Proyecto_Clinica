import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label, ModalHeader } from 'reactstrap';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import API from '../Utils/API';
import Swal from 'sweetalert2';
import { textAlign } from '@mui/system';

const arreglo_meses = [
    { "valor": 1, "mes": "Enero" },
    { "valor": 2, "mes": "Febrero" },
    { "valor": 3, "mes": "Marzo" },
    { "valor": 4, "mes": "Abril" },
    { "valor": 5, "mes": "Mayo" },
    { "valor": 6, "mes": "Junio" },
    { "valor": 7, "mes": "Julio" },
    { "valor": 8, "mes": "Agosto" },
    { "valor": 9, "mes": "Septiembre" },
    { "valor": 10, "mes": "Octubre" },
    { "valor": 11, "mes": "Noviembre" },
    { "valor": 12, "mes": "Diciembre" },
]

const arreglo_metas = [
    { "valor": 'referidos', "metas": "Número de referido" },
    { "valor": 'gestiones', "metas": "Gestiones" },
    { "valor": 'operaciones', "metas": "Operaciones" },
]

export const ComponentModalMetas = () => {
    //Estados 
    const [metas_Modal, setMetas_Modal] = useState(true);
    const [dataForm, setDataForm] = useState({})
    const [empleado, setEmpleado] = useState([])
    const [arreglo_de_Todos, setArreglo_de_Todos] = useState([])
    //carga los empleados por defectos
    useEffect(() => {
        API.get('api/usuarios/user/grupo_empleado')
            .then(({ data }) => {
                const resp = data;
                setEmpleado(resp)
            })
        API.get('api/usuarios/user/grupo_all')
            .then(({data}) => {
                const resp = data.ids_empleados
                const ids = resp.map(item => item.id)
                setArreglo_de_Todos(ids);
            })
    }, [])
    //validando si es administrador o no 
    useEffect(() => {
        let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
        if (!super_user) {
            return window.location = "/";
        }
    }, []);
    //cerrar el modal
    const cerrarModal = () => {
        setMetas_Modal(false);
        return window.location = "/listado_meta";
    }
    const handleInputChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        });
    }
    //captura y envia los datos a la base de datos
    const enviarMeta = async (e) => {
        e.preventDefault();
        const inputAnio = document.getElementById("anio")
        const fechaActual = new Date().getFullYear();
        if(inputAnio.value < fechaActual){
            return Swal.fire({
                icon: 'Error',
                title: 'Atencion!',
                text: "El año debe ser mayor o igual al año actual",
            });
        } 
        else{
            await API.post('api/usuarios/metas/create_metas/', JSON.stringify(dataForm))
            .then(({ data }) => {
                const resp = data
                if (resp.data) {
                    const mensaje = resp.data;
                    document.getElementById("modal").reset();
                    return Swal.fire({
                        icon: 'success',
                        title: 'Exito!',
                        text: mensaje,
                        position: 'center',
                        timer: 4200
                    })
                }else{
                    const error = resp.error;
                    return Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        position: 'center',
                        text: error,
                        timer: 3500
                    })
                }
            })
        }   
    }


    return (
        <Modal isOpen={metas_Modal} >
            <ModalHeader>
                <h5 className="add_meta_msg_">¡Agregar una meta!</h5>
            </ModalHeader>
            <ModalBody>
                <div className="body_modal">
                    <form onSubmit={enviarMeta} id='modal'>
                        <FormControl fullWidth id='modal' >
                            <FormControl fullWidth >
                                <InputLabel shrink id="demo-simple-select-standard-label">Seleccione Mes</InputLabel>
                                <Select
                                    name="mes"
                                    required
                                    label="mes"
                                    id="demo-simple-select-standard"
                                    onChange={handleInputChange}
                                >
                                    {
                                        arreglo_meses.map((item, key) => {
                                            return <MenuItem key={key} value={item.valor} >{item.mes}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>
                            <TextField
                                id="anio"
                                type="number"
                                name="anio"
                                label="Año"
                                required
                                className="form-control RegistrarReferido"
                                style={{ marginBottom: "50px" }}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <FormControl fullWidth >
                                <InputLabel shrink id="demo-simple-select-standard-label">Tipo de Metas</InputLabel>
                                <Select
                                    name="tipoMeta"
                                    required
                                    label="metas"
                                    id="demo-simple-select-standard"
                                    onChange={handleInputChange}
                                >
                                    {
                                        arreglo_metas.map((item, key) => {
                                            return <MenuItem key={key} value={item.valor} >{item.metas}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>
                            <TextField
                                type="number"
                                name="cantidad"
                                label="Cantidad"
                                required
                                className="form-control RegistrarReferido"
                                style={{ marginBottom: "50px" }}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <FormControl fullWidth >
                                <InputLabel shrink id="demo-simple-select-standard-label">Empleados</InputLabel>
                                <Select
                                    name="empleados"
                                    required
                                    label="empleados"
                                    id="demo-simple-select-standard"
                                    onChange={handleInputChange}
                                    displayEmpty
                                >
                                    <MenuItem value={arreglo_de_Todos}>Todos los empleados</MenuItem>
                                    {
                                        empleado.map((item, key) => {
                                            return <MenuItem key={key} value={item.id} >{item.first_name} {item.last_name}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>
                        </FormControl>
                    </form>
                </div>
            </ModalBody>
            <ModalFooter>
                <button className="btn btn" style={{background:"#02305b", color:"white"}} onClick={enviarMeta}>Guardar Meta</button>
                <button className="btn btn" style={{background:"#02305b", color:"white"}} onClick={cerrarModal}>Cerrar</button>
            </ModalFooter>
        </Modal>
    )
}
