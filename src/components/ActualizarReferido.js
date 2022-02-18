import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader, ModalFooter, } from 'reactstrap';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import API from '../Utils/API';
import Swal from 'sweetalert2';
import { Chip } from '@mui/material';



export const ActualizarReferido = () => {

    const [referido_modal, setReferido_modal] = useState(true)
    const [data_referidos, setData_referidos] = useState({})
    const [data_estados, setData_estados ] = useState([])
    const { id }  = useParams();

    const cargarDatoReferido = ()=>{
        API.get(`api/referidos/${id}`)
        .then( ({data}) =>{
            const resp = data
            setData_referidos(resp)
        })
    }

    const cargarEstados = ()=>{
        API.get('api/configuracion/estadoReferido/get_estados/')
        .then( ({data})=>{
            const resp = data
            setData_estados(resp)
        } )
    }

    const cerrarModal = ()=>{
        setReferido_modal(false);
        return window.location = "/"
    }

    const handleInputChange = (e)=>{
        setData_referidos(
            {
                ...data_referidos,
                id_referido : id,
                [e.target.name] : e.target.value
            }
        )
    }

    const actualizarReferido = async(e)=>{
        e.preventDefault()
        const nombres = document.getElementById("nombres")
        const apellidos = document.getElementById("apellidos")
        const celular = document.getElementById("celular")
        //const estadoReferido = document.getElementById("estadoReferido")
        
        if(nombres.value == "" || apellidos.value == "" || celular.value == ""){
            return alert("Asegura de llenar campos obligatorios")
        }
        await API.put(`api/referidos/updated_referidos/`, JSON.stringify(data_referidos))
        .then( ({data})=>{
            const resp = data
            if(resp){
                Swal.fire({
                    icon:'success',
                    text: resp.msg,
                    position: 'center',
                    timer:1500
                })
                /* setTimeout(() => {
                    return window.location = "/actualizar_referido/"+id
                }, 2000); */
            }else{
                const error = resp.error;
                return Swal.fire({
                    icon: 'error',
                    position: 'center',
                    text: resp.error,
                    timer: 3500
                })
            }
        })
        .catch(console.error)
    }

    //Si es admin lo deje actualizar referido, si no lo bloquea
    useEffect(() => {
        let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
        if (!super_user) {
            return window.location = "/";
        }
        cargarDatoReferido()
        cargarEstados()
    }, []);

  return (
    <>
    <Modal isOpen={referido_modal}>
        <ModalHeader>
            <h3>Actualizar referido</h3>
        </ModalHeader>

        <ModalBody>
        <div className="body_modal">
            <form onSubmit={actualizarReferido} id="modal">
                <TextField
                    id="nombres"
                    type="text"
                    name="nombres"
                    value={data_referidos.nombres}
                    label="Nombres"
                    required
                    className="form-control RegistrarReferido"
                    style={{ marginBottom: "50px" }}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    id="apellidos"
                    type="text"
                    name="apellidos"
                    value={data_referidos.apellidos}
                    label="Apellidos"
                    required
                    className="form-control RegistrarReferido"
                    style={{ marginBottom: "50px" }}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    id="numeroIdentificacion"
                    type="text"
                    name="numeroIdentificacion"
                    value={data_referidos.numeroIdentificacion}
                    label="numero de identificacion"
                    className="form-control RegistrarReferido"
                    style={{ marginBottom: "50px" }}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    id="correo_electronico"
                    type="text"
                    name="correo_electronico"
                    value={data_referidos.correo_electronico}
                    label="Correo electronico"
                    className="form-control RegistrarReferido"
                    style={{ marginBottom: "50px" }}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    id="celular"
                    type="text"
                    name="celular"
                    value={data_referidos.celular}
                    label="Celular"
                    required
                    className="form-control RegistrarReferido"
                    style={{ marginBottom: "50px" }}
                    onChange={handleInputChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                 <p>Actualmente se encuentra en estado: <Chip label={`• ${
                        data_referidos.estadoReferido
                }`} style={{ backgroundColor: data_referidos.color_estado }}/></p> 
               {/*  <p>Actualmente se encuentra en estado: <Chip label={`• ${
                    (data_referidos.estadoReferido == 1)
                    ? "En Gestion"
                    :(data_referidos.estadoReferido == 2)
                    ? "Operado"
                    :(data_referidos.estadoReferido == 3)
                    ? "Pre-quirúrgico"
                    :(data_referidos.estadoReferido == 4)
                    ? "Pendiente"
                    :(data_referidos.estadoReferido == 5)
                    ? "Programado"
                    : (data_referidos.estadoReferido == 6)
                    ? "Descartado"
                    : data_referidos.estadoReferido

                }`} style={{ backgroundColor: "rgb(2, 48, 91)", color: "#fff" }} /></p>  */}
               {/*  <InputLabel shrink id="demo-simple-select-standard-label">Seleccione el estado</InputLabel>
                    <Select
                        displayEmpty
                            name="estadoReferido"
                            required
                            label="estadoReferido"
                            id="estadoReferido"
                            onChange={handleInputChange}
                        >
                            {
                                data_estados.map((item, key) => {
                                    return <MenuItem key={key} value={item.codigo} >{item.descripcion}</MenuItem>
                                })
                            }

                    </Select> */}
            </form>
        </div>

        </ModalBody>
        <ModalFooter>
                <button className="btn btn" style={{background:"#02305b", color:"white"}} onClick={actualizarReferido}>Guardar referido</button>
                <button className="btn btn" style={{background:"#02305b", color:"white"}} onClick={cerrarModal}>Cerrar</button>
        </ModalFooter>

    </Modal>
    </>
  )
}
