import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import API from '../Utils/API';
import Swal from 'sweetalert2';

import Select from 'react-select';

import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

// const arreglo_meses = [
//     { "valor": 1, "mes": "Enero" },
//     { "valor": 2, "mes": "Febrero" },
//     { "valor": 3, "mes": "Marzo" },
//     { "valor": 4, "mes": "Abril" },
//     { "valor": 5, "mes": "Mayo" },
//     { "valor": 6, "mes": "Junio" },
//     { "valor": 7, "mes": "Julio" },
//     { "valor": 8, "mes": "Agosto" },
//     { "valor": 9, "mes": "Septiembre" },
//     { "valor": 10, "mes": "Octubre" },
//     { "valor": 11, "mes": "Noviembre" },
//     { "valor": 12, "mes": "Diciembre" },
// ]

const dataMeses = [
    { value: 1 , label: 'Enero' },
    { value: 2 , label: 'Febrero' },
    { value: 3, label: "Marzo" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Mayo" },
    { value: 6, label: "Junio" },
    { value: 7, label: "Julio" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Septiembre" },
    { value: 10, label: "Octubre" },
    { value: 11, label: "Noviembre" },
    { value: 12, label: "Diciembre" },
  ];

const arreglo_metas = [
    { value: 'referidos', label: "Número de referido" },
    { value: 'gestiones', label: "Gestiones" },
    { value: 'operaciones', label: "Operaciones" },
]

export const ComponentModalMetas = () => {
    const [metas_Modal, setMetas_Modal] = useState(true);
    //const [dataForm, setDataForm] = useState({})
    const [empleado, setEmpleado] = useState([])
    //const [arreglo_de_Todos, setArreglo_de_Todos] = useState([])
    const [cantidad, setCantidad] = useState("")
    const [anio, setAnio] = useState("")
    const [meses, setMeses] = useState([])
    const [tipoMeta, setTipoMeta] = useState("")
    const [empleados, setEmpleados] = useState([])


    useEffect(() => {
        cargarEmpleados()
        //cargarAllUser()
    }, [])

    useEffect(() => {
        let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
        if (!super_user) {
            return window.location = "/";
        }
    }, []);

    const formatearEmpleado = (data)=>{
        const arr = []
        data.forEach((d1)=> {
            const obj = {
                value : d1.id,
                label : d1.first_name + " " + d1.last_name
            }
            arr.push(obj)
        })
        return arr
    }

    const cargarEmpleados = async()=>{
        await API.get('api/usuarios/user/grupo_empleado')
        .then(({ data }) => {
            const resp = data;
            const formateado = formatearEmpleado(resp)
            setEmpleado(formateado)

        }).catch(console.error)
    }

    // const cargarAllUser = async()=>{
    //     await API.get('api/usuarios/user/grupo_all')
    //     .then(({data}) => {
    //         const resp = data.ids_empleados
    //         const ids = resp.map(item => item.id)
    //         setArreglo_de_Todos(ids);

    //     }).catch(console.error)
    // }

    const cerrarModal = () => {
        setMetas_Modal(false);
        return window.location = "/listado_meta";
    }
    
    const mapearDatos = (datos)=>{
        const arr = []
        datos.forEach((d1) => {
            arr.push(d1.value)
        })
        return arr
    }
    
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
            const dataForm = {
                cantidad,
                anio,
                meses,
                tipoMeta,
                empleados

            }
            console.log(dataForm)
           
            await API.post('api/usuarios/metas/create_metas/', JSON.stringify(dataForm))
            .then(({ data }) => {
                const resp = data
                if (resp.data) {
                    const mensaje = resp.data;
                    document.getElementById("modal").reset();
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
                            <TextField
                                    type="number"
                                    name="cantidad"
                                    label="Cantidad"
                                    required
                                    className="form-control RegistrarReferido"
                                    style={{ marginBottom: "50px" }}
                                    onChange={(e)=> setCantidad(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            <TextField
                                    id="anio"
                                    type="number"
                                    name="anio"
                                    label="Año"
                                    required
                                    className="form-control RegistrarReferido"
                                    style={{ marginBottom: "50px" }}
                                    onChange={(e)=> setAnio(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            <FormControl fullWidth >
                                <label style={{marginTop:'11px', marginBottom: '5px'}} >Meses</label>
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    name='mes'W
                                    required
                                    options={dataMeses}
                                    onChange={(e)=> setMeses(mapearDatos(e))
                                    }
                                />
                            </FormControl>
                           

                            <FormControl fullWidth >
                                <label style={{marginTop:'11px', marginBottom: '5px'}} >Tipo de meta</label>
                                 <Select
                                    name="tipoMeta"
                                    required
                                    label="metas"
                                    id="demo-simple-select-standard"
                                    onChange={(e)=> setTipoMeta(e.value)}
                                    options={arreglo_metas} 
                                />
                            </FormControl>
                            
                            <FormControl fullWidth >
                                <label style={{marginTop:'11px', marginBottom: '5px'}} >Empleados</label>
                                <Select
                                    name="empleados"
                                    required
                                    id="demo-simple-select-standard"
                                    label="empleados"
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    onChange={(e)=> setEmpleados(mapearDatos(e))}
                                    options={empleado} 
                                />
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
