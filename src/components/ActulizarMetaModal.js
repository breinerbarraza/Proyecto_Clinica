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
import { useParams } from 'react-router-dom';

const arreglo_meses = [
    { "valor": 1, "mes": "Enero" },
    { "valor": 2, "mes": "Febrero" },
    { "valor": 3, "mes": "Marzo" },
    { "valor": 4, "mes": "Abrir" },
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

export const ActualizarMetaModal = () => {

    const [metas_Modal, setMetas_Modal] = useState(true);
    const [dataForm, setDataForm] = useState({})
    const [empleado, setEmpleado] = useState([])
    const [estado, setEstado] = useState([])
    const {id} = useParams();

    const cargarEstados = async () => {
        await API.get('api/configuracion/estadoReferido/get_estados')
          .then(data => {
            const resp = data.data;
            setEstado(resp)
            console.log(resp);
          })
          .catch(console.error);
    }

    useEffect(() => {
        API.get('api/usuarios/user/grupo_empleado')
            .then(({ data }) => {
                const resp = data;
                console.log(resp)
                setEmpleado(resp)
                cargarEstados();
            })

        API.get(`api/usuarios/metas/${id}`)
        .then(({data}) => {
            const resp = data;
            console.log(resp)
            setDataForm(resp)
        })
    }, [])

    useEffect(() => {
        let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
        if (!super_user) {
            return window.location = "/";
        }
    }, []);

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

    const actualizarMeta = async (e) => {
        e.preventDefault();
        console.log(dataForm)
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
            await API.put(`api/usuarios/metas/${id}/`, JSON.stringify(dataForm))
            .then(({ data }) => {
                const resp = data
                if (resp) {
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
                <h3>Actualizar Meta</h3>
            </ModalHeader>
            <ModalBody>
                <div className="body_modal">
                    <form onSubmit={actualizarMeta} id='modal'>
                        <FormControl fullWidth id='modal' >
                            <FormControl fullWidth >
                                <InputLabel shrink id="demo-simple-select-standard-label">Seleccione Mes</InputLabel>
                                <Select
                                 displayEmpty
                                    name="mes"
                                    required
                                    label="mes"
                                    id="demo-simple-select-standard"
                                    onChange={handleInputChange}
                                    value={dataForm.mes}
                                >
                                    {
                                        arreglo_meses.filter( item => (
                                            item.valor == dataForm.mes 
                                        ))
                                        .map(item => {
                                            return <MenuItem >{item.mes} </MenuItem>
                                        })
                                    
                                     
                                    }

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
                                value={dataForm.anio}
                                label="Anio"
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
                                    value={dataForm.tipoMeta}
                                    required
                                    displayEmpty
                                    label="metas"
                                    id="demo-simple-select-standard"
                                    onChange={handleInputChange}
                                    style={{marginBottom:"20px"}}
                                >
                                    <MenuItem>{dataForm.tipoMeta}</MenuItem>
                                    {
                                        arreglo_metas.map((item, key) => {
                                            return <MenuItem key={key} value={item.valor} >{item.metas}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>

                            <FormControl fullWidth >
                                <InputLabel shrink id="demo-simple-select-standard-label">Tipo de estado</InputLabel>
                                <Select
                                    name="estado"
                                    required
                                    displayEmpty
                                    label="estados"
                                    id="demo-simple-select-standard"
                                    onChange={handleInputChange}
                                >
                                    <MenuItem>{dataForm.nombre_estado}</MenuItem>
                                    {
                                        estado.map((item, key) => {
                                            return <MenuItem key={key} value={item.id} >{item.descripcion}</MenuItem>
                                        })
                                    }

                                </Select>
                            </FormControl>
                            <TextField
                                type="number"
                                name="cantidad"
                                value={dataForm.cantidad}
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
                                    displayEmpty
                                    label="empleados"
                                    id="demo-simple-select-standard"
                                    onChange={handleInputChange}
                                >
                                    <MenuItem>{dataForm.empleado}</MenuItem>
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
                <button className="btn btn" style={{background:"#02305b", color:"white"}} onClick={actualizarMeta}>Guardar Meta</button>
                <button className="btn btn" style={{background:"#02305b", color:"white"}} onClick={cerrarModal}>Cerrar</button>
            </ModalFooter>
        </Modal>
    )
}
